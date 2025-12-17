// Lógica de verificación de patrones de victoria en el bingo
import type { VictoryType, Prize } from "./types";

/**
 * Verifica si un número está marcado (negativo o cero para FREE)
 */
export function isMarked(num: number): boolean {
  if (num === 0) return true; // FREE siempre válido
  return num < 0;
}

/**
 * Convierte el payload del cartón en una matriz 5x5
 */
export function toMatrix(boardPayload: any): number[][] {
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
}

/**
 * Verifica si un patrón de victoria es válido en el cartón
 */
export async function verifyVictory(
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

/**
 * Cuenta los premios restantes basado en configuración y ganadores
 */
export function remainingPrizesCount(prizes: Prize[], winnersJSON: any): number {
  const total = prizes.length;
  const awarded = winnersJSON?.data?.length ?? 0;
  return Math.max(total - awarded, 0);
}
