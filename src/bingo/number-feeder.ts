// Lógica de generación y emisión de números del bingo
import { Server } from "socket.io";
import { prisma } from "../config/prisma";
import { BingoConfig } from "../config/bingo.config";
import { activeBingos, roomName } from "./state";

/** Tiempo de espera en modo REAL tras cantar los 75 números (5 minutos) */
const REAL_MODE_FINISH_DELAY_MS = 5 * 60 * 1000;

/**
 * Finaliza el bingo: actualiza BD, estado en memoria y emite bingo_finished.
 * Puede ser llamada desde socket-handlers (premios agotados) o desde el timeout en modo REAL.
 */
export async function finishBingo(
  bingoId: number,
  io: Server,
  reason: string
): Promise<void> {
  const state = activeBingos.get(bingoId);
  if (!state || !state.is_started) return;

  await prisma.bingo.update({
    where: { id: bingoId },
    data: { is_started: false, is_finished: true },
  });
  state.is_started = false;

  console.log(`\n${"=".repeat(60)}`);
  console.log(`[BINGO ${bingoId}] 🏁 JUEGO FINALIZADO - ${reason}`);
  console.log(`🎱 Números cantados: ${state.numbersPlayed.sequence.length}/75`);
  console.log(`🏆 Ganadores totales: ${state.winners.length}`);
  console.log(`⏰ Hora de finalización: ${new Date().toLocaleString()}`);
  console.log(`${"=".repeat(60)}\n`);

  io.to(roomName(bingoId)).emit("bingo_finished", { reason });
}

/**
 * Emite y persisste un nuevo número en el bingo
 */
export async function pushNumber(
  bingoId: number,
  n: number,
  io: Server
): Promise<void> {
  const state = activeBingos.get(bingoId);
  if (!state || !state.is_started) return;

  state.numbersPlayed.sequence.push(n);
  state.numbersPlayed.last5 = state.numbersPlayed.sequence.slice(-5);

  await prisma.bingo.update({
    where: { id: bingoId },
    data: { numbers_played: state.numbersPlayed as any },
  });

  // 📊 LOG: Número jugado
  console.log(
    `[BINGO ${bingoId}] 🎱 Número cantado: ${n} | Total cantados: ${state.numbersPlayed.sequence.length} (sin límite) | Hora: ${new Date().toLocaleTimeString()}`
  );

  io.to(roomName(bingoId)).emit("number_drawn", {
    number: n,
    last5: state.numbersPlayed.last5,
    sequenceLength: state.numbersPlayed.sequence.length,
  });
}

/**
 * Crea un simulador de extracción de números para el bingo.
 * Modo PRUEBA: reinicia el pool tras 75 números y sigue cantando; solo termina cuando hay ganador.
 * Modo REAL: al cantar los 75 números, deja de cantar y termina 5 minutos después.
 */
export function createNumberFeeder(
  bingoId: number,
  io: Server
): NodeJS.Timeout {
  const pool = Array.from({ length: 75 }, (_, i) => i + 1);
  const drawn = new Set<number>();

  const interval = setInterval(async () => {
    const state = activeBingos.get(bingoId);
    if (!state || !state.is_started) {
      clearInterval(interval);
      return;
    }

    // Modo REAL (desde ENV BINGO_MODE): al cantar 75 números, detener y programar fin en 5 min
    if (BingoConfig.gameMode === "REAL" && drawn.size === pool.length) {
      clearInterval(interval);
      console.log(
        `[BINGO ${bingoId}] 🎱 75 números cantados (modo REAL). Fin en 5 minutos.`
      );
      setTimeout(async () => {
        const st = activeBingos.get(bingoId);
        if (st && st.is_started) {
          await finishBingo(
            bingoId,
            io,
            "75 números cantados - tiempo agotado (modo REAL)"
          );
        }
      }, REAL_MODE_FINISH_DELAY_MS);
      return;
    }

    // Modo PRUEBA: si se agotaron los 75, reiniciar pool para permitir repeticiones
    if (drawn.size === pool.length) {
      drawn.clear();
    }

    let candidate: number | null = null;
    while (candidate === null) {
      const idx = Math.floor(Math.random() * pool.length);
      const n = pool[idx];
      if (!drawn.has(n)) candidate = n;
    }
    drawn.add(candidate!);
    await pushNumber(bingoId, candidate!, io);
  }, 5000);

  return interval;
}
