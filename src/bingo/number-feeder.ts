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
    data: { is_started: false, is_finished: true, is_pause: false },
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

    // 🔄 Inicializar `drawn` desde la secuencia persistida en el primer tick.
    // Necesario para el recovery post-restart: si el proceso se cayó con 50
    // números cantados, al reanudar el feeder el `drawn` Set estaba vacío
    // y podría redibujar números que ya están en la secuencia. Esta
    // inicialización ocurre UNA sola vez (después drawn.size > 0).
    if (drawn.size === 0 && state.numbersPlayed.sequence.length > 0) {
      for (const n of state.numbersPlayed.sequence) {
        drawn.add(n);
      }
    }

    // ⏸️ Sincronizar is_pause desde DB cada tick (operador puede haber
    // pausado/despausado desde su endpoint externo). Polling de 5s.
    // Si está pausado: no sacar números, mantener el interval vivo para
    // detectar el próximo despause. Si la transición a true ocurrió en
    // este tick, marcar was_paused=true (sticky) — sirve al scheduler
    // para no marcar el bingo como expirado al despausar tarde.
    const fresh = await prisma.bingo.findUnique({
      where: { id: bingoId },
      select: { is_pause: true },
    });
    const freshIsPause = fresh?.is_pause ?? false;
    const previousIsPause = state.is_pause;
    if (freshIsPause) {
      state.was_paused = true;
    }
    state.is_pause = freshIsPause;

    // 📋 Log SOLO en transiciones de pausa (no cada tick, sino el log se inunda)
    if (freshIsPause && !previousIsPause) {
      console.log(
        `[BINGO ${bingoId}] ⏸️  PAUSADO por operador — feeder inerte, was_paused=true (sticky)`
      );
    } else if (!freshIsPause && previousIsPause) {
      console.log(
        `[BINGO ${bingoId}] ▶️  DESPAUSADO por operador — feeder reanuda sorteo de números`
      );
    }

    if (state.is_pause) {
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
