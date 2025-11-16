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
  const numbersPlayed: NumbersPlayed = (b.numbersPlayed as any) ?? {
    sequence: [],
    last5: [],
  };

  const state: BingoState = {
    id: b.id,
    is_started: b.is_started,
    prizes,
    numbersPlayed,
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
    data: { numbersPlayed: state.numbersPlayed as any },
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
  await prisma.bingo.update({ where: { id }, data: { is_started: false } });
  const st = activeBingos.get(id);
  if (st) st.is_started = false;
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
      user: {
        user_id?: number;
        user_email?: string;
        user_names?: string;
        user_last_names?: string;
        user_phone_number?: string;
        user_account_owner_dni?: string;
        user_account_number?: string;
        user_bank_name?: string;
        user_dni?: string;
      };
      boardSnapshot?: any; // opcional
    }) => {
      try {
        const { bingoId, boardId, prize_id, type_of_victory, user } = payload;
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
        )?.numbersPlayed as any) ?? { sequence: [], last5: [] };

        const isValid = await verifyVictory(
          type_of_victory,
          board.bingo_data_json,
          numbersPlayed.sequence
        );
        if (!isValid) {
          socket.emit("claim_result", {
            ok: false,
            reason: "Patrón no válido",
          });
          return;
        }

        // Registrar ganador en winners JSON y deshabilitar cartón
        const bingoRow = await prisma.bingo.findUnique({
          where: { id: bingoId },
        });
        const winnersJSON = (bingoRow?.winners as any) ?? { data: [] };
        const winnerEntry: WinnerDTO = {
          user_id: user.user_id ?? 0,
          user_email: user.user_email ?? "",
          user_names: user.user_names ?? "",
          user_last_names: user.user_last_names ?? "",
          user_phone_number: user.user_phone_number,
          user_account_owner_dni: user.user_account_owner_dni,
          user_account_number: user.user_account_number,
          user_bank_name: user.user_bank_name,
          user_dni: user.user_dni,
          prize_id: prize.prize_id,
          prize_name: prize.name,
          prize_description: prize.description,
          prize_image: prize.image,
          type_of_victory,
        };
        winnersJSON.data.push(winnerEntry);

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
        });
        socket.emit("claim_result", { ok: true });

        // Fin del bingo si no quedan premios
        const remaining = remainingPrizesCount(state.prizes, winnersJSON);
        if (remaining <= 0) {
          await prisma.bingo.update({
            where: { id: bingoId },
            data: { is_started: false },
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

// Placeholder: implementa validaciones reales para cada patrón
async function verifyVictory(
  type: VictoryType,
  boardPayload: any,
  sequence: number[]
): Promise<boolean> {
  // boardPayload = { size, columns: [{letter, numbers: number[]}] }
  // sequence = números ya jugados
  // FREE = 0 siempre cuenta como válido
  // Implementa reglas aquí; por ahora dejamos true para flujo end-to-end.
  return true;
}

const PORT = process.env.PORT || 4000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
