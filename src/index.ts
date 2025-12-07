// src/server.ts
import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { bingo_victories } from "./database/prisma/generated/enums";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

type VictoryType = keyof typeof bingo_victories;

type Prize = {
  prize_id: number;
  name: string;
  description?: string;
  image?: string;
  type_of_victory: VictoryType;
};

type NumbersPlayed = { sequence: number[]; last5: number[] };

type WinnerDTO = {
  user_id: number;
  user_email: string;
  user_names: string;
  user_last_names: string;
  user_phone_number?: string;
  user_account_owner_dni?: string;
  user_account_number?: string;
  user_bank_name?: string;
  user_dni?: string;
  prize_id: number;
  prize_name: string;
  prize_description?: string;
  prize_image?: string;
  type_of_victory: VictoryType;
};

type BingoState = {
  id: number;
  is_started: boolean;
  prizes: Prize[];
  numbersPlayed: NumbersPlayed;
  winners: WinnerDTO[];
};

const isMarked = (num: number): boolean => {
  if (num === 0) return true; // FREE siempre válido
  return num < 0;
};
// Convierte el payload en una matriz 5x5 para trabajar más fácil
const toMatrix = (boardPayload: any): number[][] => {
  const size = boardPayload.size;
  const matrix: number[][] = Array.from({ length: size }, () =>
    Array(size).fill(0)
  );
  boardPayload.columns.forEach((col: any, colIdx: number) => {
    col.numbers.forEach((num: number, rowIdx: number) => {
      matrix[rowIdx][colIdx] = num;
    });
  });
  return matrix;
};

// Cache en memoria para latencia baja
const activeBingos = new Map<number, BingoState>();

function roomName(bingoId: number) {
  return `bingo:${bingoId}`;
}

// Carga estado desde DB a memoria
async function loadBingo(bingoId: number) {
  const b = await prisma.bingo.findUnique({
    where: { id: bingoId },
    include: { BingoCardboards: true },
  });
  if (!b) throw new Error("Bingo no encontrado");

  const prizes: Prize[] = ((b.bingo_prizes as any)?.prizes ?? []) as Prize[];
  const numbersPlayed: NumbersPlayed = (b.numbers_played as any) ?? {
    sequence: [],
    last5: [],
  };

  const winners: WinnerDTO[] = ((b.winners as any)?.data ?? []) as WinnerDTO[];

  const state: BingoState = {
    id: b.id,
    is_started: b.is_started,
    prizes,
    numbersPlayed,
    winners,
  };
  activeBingos.set(bingoId, state);
}

// Emite y persiste un nuevo número
async function pushNumber(bingoId: number, n: number) {
  const state = activeBingos.get(bingoId);
  if (!state || !state.is_started) return;

  state.numbersPlayed.sequence.push(n);
  state.numbersPlayed.last5 = state.numbersPlayed.sequence.slice(-5);

  await prisma.bingo.update({
    where: { id: bingoId },
    data: { numbers_played: state.numbersPlayed as any },
  });

  io.to(roomName(bingoId)).emit("number_drawn", {
    number: n,
    last5: state.numbersPlayed.last5,
    sequenceLength: state.numbersPlayed.sequence.length,
  });
}

// Simulador de extracción (reemplázalo con tu lógica)
function createNumberFeeder(bingoId: number) {
  const pool = Array.from({ length: 75 }, (_, i) => i + 1);
  const drawn = new Set<number>();

  const interval = setInterval(async () => {
    const state = activeBingos.get(bingoId);
    if (!state || !state.is_started) {
      clearInterval(interval);
      return;
    }
    if (drawn.size === pool.length) {
      clearInterval(interval);
      return;
    }

    let candidate: number | null = null;
    while (candidate === null) {
      const idx = Math.floor(Math.random() * pool.length);
      const n = pool[idx];
      if (!drawn.has(n)) candidate = n;
    }
    drawn.add(candidate!);
    await pushNumber(bingoId, candidate!);
  }, 5000);

  return interval;
}

// Endpoints REST
app.get("/bingo/:id", async (req, res) => {
  const id = Number(req.params.id);
  await loadBingo(id);
  const state = activeBingos.get(id)!;
  res.json({
    bingoId: id,
    is_started: state.is_started,
    prizes: state.prizes,
    numbersPlayed: state.numbersPlayed,
  });
});

app.post("/bingo/:id/start", async (req, res) => {
  const id = Number(req.params.id);
  await loadBingo(id);
  const st = activeBingos.get(id)!;
  if (!st.is_started) {
    await prisma.bingo.update({ where: { id }, data: { is_started: true } });
    st.is_started = true;
  }
  createNumberFeeder(id);
  res.json({ ok: true });
});

app.post("/bingo/:id/stop", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.bingo.update({ 
    where: { id }, 
    data: { 
      is_started: false,
      is_finished: true 
    } 
  });
  const st = activeBingos.get(id);
  if (st) st.is_started = false;
  
  // Notificar a todos los jugadores que el bingo terminó
  io.to(roomName(id)).emit("bingo_finished", {
    reason: "Bingo detenido manualmente por el administrador",
  });
  
  res.json({ ok: true });
});

// Socket.IO
io.on("connection", (socket) => {
  socket.on("join_bingo", async ({ bingoId }: { bingoId: number }) => {
    await loadBingo(bingoId);
    socket.join(roomName(bingoId));
    const state = activeBingos.get(bingoId)!;

    socket.emit("bootstrap", {
      last5: state.numbersPlayed.last5,
      prizes: state.prizes,
      is_started: state.is_started,
      winners: state.winners,
    });
  });

  // Reclamación de premio ("¡Bingo!")
  socket.on(
    "claim_bingo",
    async (payload: {
      bingoId: number;
      boardId: number;
      prize_id: number;
      type_of_victory: VictoryType;
      boardSnapshot?: any; // opcional para debugging
    }) => {
      try {
        console.log(
          "claim bingo payload carton",
          payload.boardSnapshot?.columns
        );

        const { bingoId, boardId, prize_id, type_of_victory } = payload;
        const state = activeBingos.get(bingoId);

        if (!state || !state.is_started) {
          socket.emit("claim_result", { ok: false, reason: "Bingo inactivo" });
          return;
        }

        const prize = state.prizes.find(
          (p) =>
            p.prize_id === prize_id && p.type_of_victory === type_of_victory
        );
        if (!prize) {
          socket.emit("claim_result", {
            ok: false,
            reason: "Premio/victoria inválidos",
          });
          return;
        }

        const board = await prisma.bingoCardboards.findUnique({
          where: { id: boardId },
          include: { user: true }, // Incluir información completa del usuario
        });
        if (!board || board.is_winner || board.bingo_id !== bingoId) {
          socket.emit("claim_result", {
            ok: false,
            reason: "Cartón inválido o ya ganador",
          });
          return;
        }

        const numbersPlayed: NumbersPlayed = ((
          await prisma.bingo.findUnique({ where: { id: bingoId } })
        )?.numbers_played as any) ?? { sequence: [], last5: [] };

        const isValid = await verifyVictory(
          type_of_victory,
          board.bingo_data_json
        );
        if (!isValid) {
          socket.emit("claim_result", {
            ok: false,
            reason: "Patrón no válido",
          });
          return;
        }

        // Registrar ganador en winners JSON usando información de la BD
        const bingoRow = await prisma.bingo.findUnique({
          where: { id: bingoId },
        });
        const winnersJSON = (bingoRow?.winners as any) ?? { data: [] };
        
        // Construir entrada del ganador con información completa de la BD
        const winnerEntry: WinnerDTO = {
          user_id: board.user.id,
          user_email: board.user.email,
          user_names: board.user.names,
          user_last_names: board.user.last_names,
          user_phone_number: board.user.phone_number ?? undefined,
          user_account_owner_dni: board.user.account_owner_dni ?? undefined,
          user_account_number: board.user.account_number ?? undefined,
          user_bank_name: board.user.bank_name ?? undefined,
          user_dni: board.user.dni ?? undefined,
          prize_id: prize.prize_id,
          prize_name: prize.name,
          prize_description: prize.description,
          prize_image: prize.image,
          type_of_victory,
        };
        winnersJSON.data.push(winnerEntry);
        state.winners.push(winnerEntry); // Actualizar estado en memoria

        await prisma.$transaction([
          prisma.bingo.update({
            where: { id: bingoId },
            data: { winners: winnersJSON as any },
          }),
          prisma.bingoCardboards.update({
            where: { id: boardId },
            data: { is_winner: true },
          }),
        ]);

        io.to(roomName(bingoId)).emit("winner_announced", {
          boardId,
          prizeId: prize.prize_id,
          prizeName: prize.name,
          type_of_victory,
          time: Date.now(),
          winners: state.winners,
        });
        socket.emit("claim_result", { ok: true });

        // Fin del bingo si no quedan premios
        const remaining = remainingPrizesCount(state.prizes, winnersJSON);
        if (remaining <= 0) {
          await prisma.bingo.update({
            where: { id: bingoId },
            data: { 
              is_started: false,
              is_finished: true 
            },
          });
          state.is_started = false;
          io.to(roomName(bingoId)).emit("bingo_finished", {
            reason: "Sin premios restantes",
          });
        }
      } catch (err) {
        socket.emit("claim_result", { ok: false, reason: "Error interno" });
      }
    }
  );
});

// Conteo de premios restantes basado en configuración y winners JSON
function remainingPrizesCount(prizes: Prize[], winnersJSON: any): number {
  const total = prizes.length;
  const awarded = winnersJSON?.data?.length ?? 0;
  return Math.max(total - awarded, 0);
}

async function verifyVictory(
  type: VictoryType,
  boardPayload: any
): Promise<boolean> {
  console.log("Board payload:", boardPayload.columns["0"].numbers);

  const matrix = toMatrix(boardPayload);
  const size = boardPayload.size;

  console.log("Verifying victory type:", type);
  console.log("Board matrix:", matrix);

  switch (type) {
    case "CARTON_LLENO":
      return matrix.every((row) => row.every((num) => isMarked(num)));

    case "LINEA_SIMPLE":
      return (
        matrix.some((row) => row.every((num) => isMarked(num))) ||
        matrix[0].some((_, colIdx) =>
          matrix.every((row) => isMarked(row[colIdx]))
        )
      );

    case "LINEA_DOBLE":
      const rowsMarked = matrix.filter((row) =>
        row.every((num) => isMarked(num))
      ).length;
      const colsMarked = matrix[0].filter((_, colIdx) =>
        matrix.every((row) => isMarked(row[colIdx]))
      ).length;
      return rowsMarked >= 2 || colsMarked >= 2;

    case "CUATRO_ESQUINAS":
      return (
        isMarked(matrix[0][0]) &&
        isMarked(matrix[0][size - 1]) &&
        isMarked(matrix[size - 1][0]) &&
        isMarked(matrix[size - 1][size - 1])
      );

    case "PERIMETRO":
      for (let i = 0; i < size; i++) {
        if (!isMarked(matrix[0][i])) return false;
        if (!isMarked(matrix[size - 1][i])) return false;
        if (!isMarked(matrix[i][0])) return false;
        if (!isMarked(matrix[i][size - 1])) return false;
      }
      return true;

    case "LETRA_H":
      const midRow = Math.floor(size / 2);
      const leftCol = matrix.every((row) => isMarked(row[0]));
      const rightCol = matrix.every((row) => isMarked(row[size - 1]));
      const middleRow = matrix[midRow].every((num) => isMarked(num));
      return leftCol && rightCol && middleRow;

    case "NUMERO_7":
      const topRow = matrix[0].every((num) => isMarked(num));
      const diagonal = matrix.every((row, idx) =>
        isMarked(row[size - 1 - idx])
      );
      return topRow && diagonal;

    case "FLECHA":
      const diag = matrix.every((row, idx) => isMarked(row[idx]));
      const mid = matrix[Math.floor(size / 2)].every((num) => isMarked(num));
      return diag && mid;

    default:
      return false;
  }
}

const PORT = process.env.PORT || 4000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
