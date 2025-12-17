// Gestión del estado en memoria de los bingos activos
import { prisma } from "../config/prisma";
import type { BingoState, Prize, NumbersPlayed, WinnerDTO } from "./types";

// Cache en memoria para latencia baja
export const activeBingos = new Map<number, BingoState>();

/**
 * Genera el nombre de la sala de Socket.IO para un bingo
 */
export function roomName(bingoId: number): string {
  return `bingo:${bingoId}`;
}

/**
 * Carga el estado de un bingo desde la base de datos a la memoria
 */
export async function loadBingo(bingoId: number): Promise<void> {
  const b = await prisma.bingo.findUnique({
    where: { id: bingoId },
    include: { BingoCardboards: true },
  });

  if (!b) {
    throw new Error("Bingo no encontrado");
  }

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
