// Servicio para obtener y cachear parámetros del sistema
import { prisma } from "./prisma";
import type { Parameters } from "@prisma/client";

// Cache de parámetros (actualizado por cron)
let cachedParameters: Parameters | null = null;
let lastParametersId: number | null = null;

/**
 * Obtiene los parámetros actuales desde el cache
 * El cache es actualizado periódicamente por un cron job
 */
export async function getCurrentParameters(): Promise<Parameters | null> {
  return cachedParameters;
}

/**
 * Refresca el cache de parámetros consultando la BD
 * Esta función se llama desde un cron job cada 2 minutos
 * @returns true si los parámetros cambiaron, false si no hubo cambios
 */
export async function refreshParametersCache(): Promise<boolean> {
  try {
    // Consultar BD - último registro ordenado por id descendente
    // Filtrar deleted_at IS NULL
    const parameters = await prisma.parameters.findFirst({
      where: { deleted_at: null },
      orderBy: { id: "desc" },
    });

    // Detectar si hubo cambios comparando el ID
    const hasChanged = parameters && parameters.id !== lastParametersId;

    cachedParameters = parameters;
    lastParametersId = parameters?.id ?? null;

    if (parameters) {
      if (hasChanged) {
        console.log(
          `✅ Parámetros actualizados desde BD (ID: ${parameters.id}) - CAMBIO DETECTADO`
        );
      } else {
        console.log(
          `✅ Parámetros actualizados desde BD (ID: ${parameters.id})`
        );
      }
    } else {
      console.log(
        `⚠️  No se encontraron parámetros en BD, usando fallback ENV`
      );
    }

    return hasChanged || false;
  } catch (error: any) {
    console.error(`❌ Error al refrescar parámetros:`, error.message);
    return false;
  }
}
