// Manejadores de eventos Socket.IO para el bingo
import { Server, Socket } from "socket.io";
import { prisma } from "../config/prisma";
import { activeBingos, loadBingo, roomName, normalizeWinners } from "./state";
import {
  verifyVictory,
  areMarkedNumbersPlayed,
  remainingPrizesCount,
} from "./verification";
import { finishBingo } from "./number-feeder";
import { BingoConfig } from "../config/bingo.config";
import type { VictoryType, WinnerDTO } from "./types";

// ── Fix #4: Rate limiting por socket ──
const lastClaimBySocket = new Map<string, number>();
const CLAIM_COOLDOWN_MS = 2000; // 2 segundos entre claims del mismo socket

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
          game_mode: BingoConfig.gameMode, // REAL | PRUEBA (desde ENV BINGO_MODE)
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
          const { bingoId, boardId, prize_id, type_of_victory } = payload;

          // ── Fix #4: Rate limiting ──
          const now = Date.now();
          const lastClaim = lastClaimBySocket.get(socket.id);
          if (lastClaim && now - lastClaim < CLAIM_COOLDOWN_MS) {
            socket.emit("claim_result", {
              ok: false,
              reason: "Espera antes de reclamar de nuevo",
            });
            return;
          }
          lastClaimBySocket.set(socket.id, now);

          // ── Validaciones rápidas (sin DB) ──
          const state = activeBingos.get(bingoId);
          if (!state || !state.is_started) {
            socket.emit("claim_result", {
              ok: false,
              reason: "Bingo inactivo",
            });
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

          // ── Lectura inicial del cartón (early rejection, sin lock) ──
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

          const authenticatedUserId = socket.data.user?.id;
          if (!authenticatedUserId || board.user_id !== authenticatedUserId) {
            socket.emit("claim_result", {
              ok: false,
              reason: "No tienes permiso para reclamar este cartón",
            });
            return;
          }

          // ── Validaciones de patrón y números (computacionales, sin DB) ──
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

          if (
            !areMarkedNumbersPlayed(
              board.bingo_data_json,
              state.numbersPlayed.sequence
            )
          ) {
            socket.emit("claim_result", {
              ok: false,
              reason: "Números marcados no coinciden con los cantados",
            });
            return;
          }

          // ── Fix #2 + #3: Transacción con SELECT FOR UPDATE + referral unificado ──
          let winnerEntry!: WinnerDTO;

          try {
            await prisma.$transaction(async (tx) => {
              // Fix #2: Bloquear la fila del cartón para evitar race condition
              const locked: any[] = await tx.$queryRaw`
                SELECT id, is_winner, bingo_id, user_id
                FROM bingo_cardboards
                WHERE id = ${boardId}
                FOR UPDATE
              `;

              if (locked.length === 0) {
                throw new Error("BOARD_NOT_FOUND");
              }
              if (locked[0].is_winner) {
                throw new Error("ALREADY_CLAIMED");
              }
              if (
                locked[0].bingo_id !== bingoId ||
                locked[0].user_id !== authenticatedUserId
              ) {
                throw new Error("INVALID_BOARD");
              }

              // ── Fix #3: Referral en UNA sola query con include ──
              const codeRecord = await tx.codes.findUnique({
                where: { id: board.code_id, deleted_at: null },
                include: {
                  referred_code_codes_referred_codeToreferred_code: {
                    select: {
                      campaign_ref: true,
                      vip: true,
                      state: true,
                      country_code: true,
                      phone_number: true,
                      master: true,
                      city: true,
                    },
                  },
                },
              });

              const referralData: {
                winner_code?: string;
                referred_campaign_ref?: string;
                referred_vip?: string;
                referred_state?: string;
                referred_country_code?: string;
                referred_phone_number?: string;
                referred_master?: string | null;
                referred_city?: string | null;
              } = {};

              if (codeRecord) {
                referralData.winner_code = codeRecord.code;
                const ref =
                  codeRecord.referred_code_codes_referred_codeToreferred_code;
                if (ref) {
                  referralData.referred_campaign_ref = ref.campaign_ref;
                  referralData.referred_vip = ref.vip;
                  referralData.referred_state = ref.state;
                  referralData.referred_country_code = ref.country_code;
                  referralData.referred_phone_number = ref.phone_number;
                  referralData.referred_master = ref.master;
                  referralData.referred_city = ref.city;
                }
              }

              // Leer winners actuales dentro de la transacción
              const bingoRow = await tx.bingo.findUnique({
                where: { id: bingoId },
              });
              const winnersJSON = normalizeWinners(bingoRow?.winners);

              // Construir entrada del ganador
              winnerEntry = {
                user_id: board.user.id,
                user_email: board.user.email,
                user_names: board.user.names,
                user_last_names: board.user.last_names,
                user_phone_number: board.user.phone_number ?? undefined,
                user_account_owner_dni:
                  board.user.account_owner_dni ?? undefined,
                user_account_number: board.user.account_number ?? undefined,
                user_bank_name: board.user.bank_name ?? undefined,
                user_dni: board.user.dni ?? undefined,
                prize_id: prize.prize_id,
                prize_name: prize.name,
                prize_description: prize.description,
                prize_image: prize.image,
                type_of_victory,
                ...referralData,
              };
              winnersJSON.data.push(winnerEntry);

              // Escribir ambas tablas dentro de la transacción
              await tx.bingo.update({
                where: { id: bingoId },
                data: { winners: winnersJSON as any },
              });
              await tx.bingoCardboards.update({
                where: { id: boardId },
                data: { is_winner: true },
              });

              // Actualizar estado en memoria
              state.winners.push(winnerEntry);

              // Broadcast y respuesta al ganador
              io.to(roomName(bingoId)).emit("winner_announced", {
                boardId,
                prizeId: prize.prize_id,
                prizeName: prize.name,
                type_of_victory,
                time: Date.now(),
                winners: state.winners.map(
                  ({
                    winner_code: _wc,
                    referred_campaign_ref: _rcr,
                    referred_vip: _rv,
                    referred_state: _rs,
                    referred_country_code: _rcc,
                    referred_phone_number: _rpn,
                    referred_master: _rm,
                    referred_city: _rci,
                    ...publicWinner
                  }) => publicWinner
                ),
              });
              socket.emit("claim_result", {
                ok: true,
                winner_code: winnerEntry.winner_code,
                referred_campaign_ref: winnerEntry.referred_campaign_ref,
                referred_vip: winnerEntry.referred_vip,
                referred_state: winnerEntry.referred_state,
                referred_country_code: winnerEntry.referred_country_code,
                referred_phone_number: winnerEntry.referred_phone_number,
                referred_master: winnerEntry.referred_master,
                referred_city: winnerEntry.referred_city,
              });
            });

            // Fuera de la transacción: verificar si quedan premios
            const bingoRow = await prisma.bingo.findUnique({
              where: { id: bingoId },
            });
            const winnersJSON = normalizeWinners(bingoRow?.winners);
            const remaining = remainingPrizesCount(state.prizes, winnersJSON);
            if (remaining <= 0) {
              await finishBingo(bingoId, io, "Sin premios restantes");
            }
          } catch (txErr: any) {
            if (txErr.message === "ALREADY_CLAIMED") {
              socket.emit("claim_result", {
                ok: false,
                reason: "Cartón ya reclamado por otro jugador",
              });
              return;
            }
            if (
              txErr.message === "BOARD_NOT_FOUND" ||
              txErr.message === "INVALID_BOARD"
            ) {
              socket.emit("claim_result", {
                ok: false,
                reason: "Cartón inválido",
              });
              return;
            }
            throw txErr; // Re-lanzar errores inesperados
          }
        } catch (err) {
          console.error("claim_bingo error:", err);
          socket.emit("claim_result", { ok: false, reason: "Error interno" });
        }
      }
    );
  });
}
