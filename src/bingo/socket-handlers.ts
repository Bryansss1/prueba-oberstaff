// Manejadores de eventos Socket.IO para el bingo
import { Server, Socket } from "socket.io";
import { prisma } from "../config/prisma";
import { activeBingos, loadBingo, roomName } from "./state";
import { verifyVictory, remainingPrizesCount } from "./verification";
import type { VictoryType, WinnerDTO, NumbersPlayed } from "./types";

/**
 * Registra los manejadores de eventos Socket.IO
 */
export function registerSocketHandlers(io: Server): void {
  io.on("connection", (socket: Socket) => {
    // Evento: join_bingo - Unirse a una sala de bingo
    socket.on("join_bingo", async ({ bingoId }: { bingoId: number }) => {
      try {
        await loadBingo(bingoId);
        socket.join(roomName(bingoId));
        const state = activeBingos.get(bingoId)!;

        socket.emit("bootstrap", {
          last5: state.numbersPlayed.last5,
          prizes: state.prizes,
          is_started: state.is_started,
          winners: state.winners,
        });
      } catch (error) {
        socket.emit("error", { message: "Error al unirse al bingo" });
      }
    });

    // Evento: claim_bingo - Reclamación de premio ("¡Bingo!")
    socket.on(
      "claim_bingo",
      async (payload: {
        bingoId: number;
        boardId: number;
        prize_id: number;
        type_of_victory: VictoryType;
        boardSnapshot?: any;
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
            include: { user: true },
          });
          if (!board || board.is_winner || board.bingo_id !== bingoId) {
            socket.emit("claim_result", {
              ok: false,
              reason: "Cartón inválido o ya ganador",
            });
            return;
          }

          // VALIDACIÓN DE OWNERSHIP: Verificar que el cartón pertenece al usuario autenticado
          const authenticatedUserId = socket.data.user?.id;
          if (!authenticatedUserId || board.user_id !== authenticatedUserId) {
            socket.emit("claim_result", {
              ok: false,
              reason: "No tienes permiso para reclamar este cartón",
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

          // Registrar ganador en winners JSON
          const bingoRow = await prisma.bingo.findUnique({
            where: { id: bingoId },
          });
          const winnersJSON = (bingoRow?.winners as any) ?? { data: [] };

          // Construir entrada del ganador con información completa
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
          state.winners.push(winnerEntry);

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
                is_finished: true,
              },
            });
            state.is_started = false;
            
            // 🏁 LOG: Fin del juego (automático)
            console.log(`\n${'='.repeat(60)}`);
            console.log(`[BINGO ${bingoId}] 🏁 JUEGO FINALIZADO - SIN PREMIOS RESTANTES`);
            console.log(`🎱 Números cantados: ${state.numbersPlayed.sequence.length}/75`);
            console.log(`🏆 Ganadores totales: ${state.winners.length}`);
            console.log(`⏰ Hora de finalización: ${new Date().toLocaleString()}`);
            console.log(`${'='.repeat(60)}\n`);
            
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
}
