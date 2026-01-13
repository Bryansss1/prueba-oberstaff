// Lógica de generación y emisión de números del bingo
import { Server } from "socket.io";
import { prisma } from "../config/prisma";
import { activeBingos, roomName } from "./state";

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
  console.log(`[BINGO ${bingoId}] 🎱 Número cantado: ${n} | Total cantados: ${state.numbersPlayed.sequence.length}/75 | Hora: ${new Date().toLocaleTimeString()}`);

  io.to(roomName(bingoId)).emit("number_drawn", {
    number: n,
    last5: state.numbersPlayed.last5,
    sequenceLength: state.numbersPlayed.sequence.length,
  });
}

/**
 * Crea un simulador de extracción de números para el bingo
 */
export function createNumberFeeder(bingoId: number, io: Server): NodeJS.Timeout {
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
    await pushNumber(bingoId, candidate!, io);
  }, 5000);

  return interval;
}
