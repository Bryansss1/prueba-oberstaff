// Gestión del estado en memoria de los bingos activos
import { prisma } from "../config/prisma";
import type { BingoState, Prize, NumbersPlayed, WinnerDTO } from "./types";

// Cache en memoria para latencia baja
export const activeBingos = new Map<number, BingoState>();

/**
 * Normaliza el campo winners a la estructura consistente { data: WinnerDTO[] }
 * Maneja casos donde winners es null, undefined, o tiene estructura incorrecta
 * @param winners Valor del campo winners desde la BD (puede ser null, undefined, o cualquier estructura)
 * @returns Objeto normalizado con estructura { data: WinnerDTO[] }
 */
export function normalizeWinners(winners: any): { data: WinnerDTO[] } {
  // Si winners es null, undefined, o no es un objeto, retornar estructura vacía
  if (!winners || typeof winners !== 'object') {
    return { data: [] };
  }
  
  // Si winners no tiene la propiedad 'data' o 'data' no es un array, retornar estructura vacía
  if (!winners.data || !Array.isArray(winners.data)) {
    return { data: [] };
  }
  
  // Retornar estructura normalizada con el array de winners
  return { data: winners.data };
}

/**
 * Genera el nombre de la sala de Socket.IO para un bingo
 */
export function roomName(bingoId: number): string {
  return `bingo:${bingoId}`;
}

/**
 * Cuenta el número de participantes únicos activos en un bingo
 * (usuarios con al menos un cartón)
 */
export async function getActiveParticipantsCount(
  bingoId: number
): Promise<number> {
  const uniqueUsers = await prisma.bingoCardboards.groupBy({
    by: ["user_id"],
    where: {
      bingo_id: bingoId,
      deleted_at: null,
    },
  });

  return uniqueUsers.length;
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
  
  // Normalizar winners a estructura consistente { data: [] } antes de extraer el array
  const normalizedWinners = normalizeWinners(b.winners);
  const winners: WinnerDTO[] = normalizedWinners.data;

  const state: BingoState = {
    id: b.id,
    is_started: b.is_started,
    prizes,
    numbersPlayed,
    winners,
    min_number_of_participants: b.min_number_of_participants || 0,
  };

  activeBingos.set(bingoId, state);
}
