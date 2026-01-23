// Servicio para obtener y cachear parámetros del sistema
import { prisma } from "./prisma";
import type { Parameters } from "@prisma/client";

// Cache de parámetros (actualizado por cron)
let cachedParameters: Parameters | null = null;

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
 */
export async function refreshParametersCache(): Promise<void> {
  try {
    // Consultar BD - último registro ordenado por id descendente
    // Filtrar deleted_at IS NULL
    const parameters = await prisma.parameters.findFirst({
      where: { deleted_at: null },
      orderBy: { id: "desc" },
    });

    cachedParameters = parameters;

    if (parameters) {
      console.log(
        `✅ Parámetros actualizados desde BD (ID: ${parameters.id})`
      );
    } else {
      console.log(
        `⚠️  No se encontraron parámetros en BD, usando fallback ENV`
      );
    }
  } catch (error: any) {
    console.error(`❌ Error al refrescar parámetros:`, error.message);
  }
}
