// Gestión de creación y actualización de bingos desde parámetros
import { prisma } from "../config/prisma";
import { getCurrentParameters } from "../config/parameters";
import moment from "moment-timezone";
import { BingoConfig, getScheduledStartTime } from "../config/bingo.config";

/**
 * Compara dos valores JSON de manera robusta
 * Maneja null, undefined, y objetos con diferentes órdenes de propiedades
 */
function compareJsonValues(a: any, b: any): boolean {
  // Si ambos son null o undefined, son iguales
  if ((a === null || a === undefined) && (b === null || b === undefined)) {
    return true;
  }
  
  // Si uno es null/undefined y el otro no, son diferentes
  if ((a === null || a === undefined) !== (b === null || b === undefined)) {
    return false;
  }
  
  // Si ambos son primitivos, comparar directamente
  if (typeof a !== 'object' || typeof b !== 'object') {
    return a === b;
  }
  
  // Comparar usando JSON.stringify
  // Nota: JSON.stringify puede tener problemas con orden de propiedades,
  // pero para objetos JSON simples del schema esto debería funcionar
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    // Si hay error al serializar, comparar directamente
    return a === b;
  }
}

/**
 * Crea un nuevo bingo usando los últimos parámetros del sistema
 */
export async function createBingoFromParameters(): Promise<number | null> {
  try {
    const parameters = await getCurrentParameters();

    if (!parameters) {
      console.log("⚠️  No hay parámetros disponibles para crear bingo");
      return null;
    }

    // Verificar si ya existe un bingo pendiente (no iniciado, no finalizado)
    const existingPending = await prisma.bingo.findFirst({
      where: {
        is_started: false,
        is_finished: false,
        deleted_at: null,
      },
    });

    if (existingPending) {
      console.log(
        `ℹ️  Ya existe un bingo pendiente (ID: ${existingPending.id}), no se crea uno nuevo`
      );
      return null;
    }

    // Crear nuevo bingo con los últimos parámetros
    const newBingo = await prisma.bingo.create({
      data: {
        cardboard_by_code: parameters.cardboard_per_code,
        min_number_of_participants: parameters.min_participants_for_bingo,
        bingo_prizes: parameters.bingo_prizes as any,
        start_time: parameters.start_time,
        is_started: false,
        is_finished: false,
        number_of_participants: 0,
        numbers_played: { sequence: [], last5: [] },
        winners: { data: [] },
      },
    });

    console.log(`\n${"=".repeat(60)}`);
    console.log(`✅ NUEVO BINGO CREADO (ID: ${newBingo.id})`);
    console.log(`📋 Cartones por código: ${newBingo.cardboard_by_code}`);
    console.log(
      `👥 Mínimo de participantes: ${newBingo.min_number_of_participants}`
    );
    console.log(
      `⏰ Hora de inicio: ${newBingo.start_time || "No configurada"}`
    );
    console.log(`🎁 Premios: ${parameters.bingo_prizes ? "Configurados" : "Sin premios"}`);
    console.log(`${"=".repeat(60)}\n`);

    return newBingo.id;
  } catch (error: any) {
    console.error(`❌ Error al crear bingo desde parámetros:`, error.message);
    return null;
  }
}

/**
 * Actualiza bingos pendientes (no iniciados) con los últimos parámetros
 */
export async function updatePendingBingosFromParameters(): Promise<void> {
  try {
    const parameters = await getCurrentParameters();

    if (!parameters) {
      return;
    }

    // Buscar bingos pendientes (no iniciados, no finalizados)
    const pendingBingos = await prisma.bingo.findMany({
      where: {
        is_started: false,
        is_finished: false,
        deleted_at: null,
      },
    });

    if (pendingBingos.length === 0) {
      return;
    }

    // Actualizar cada bingo pendiente con los últimos parámetros
    for (const bingo of pendingBingos) {
      const updateData: any = {};

      // Solo actualizar si hay cambios
      if (bingo.cardboard_by_code !== parameters.cardboard_per_code) {
        updateData.cardboard_by_code = parameters.cardboard_per_code;
      }

      if (
        bingo.min_number_of_participants !==
        parameters.min_participants_for_bingo
      ) {
        updateData.min_number_of_participants =
          parameters.min_participants_for_bingo;
      }

      if (!compareJsonValues(bingo.bingo_prizes, parameters.bingo_prizes)) {
        updateData.bingo_prizes = parameters.bingo_prizes;
      }

      if (bingo.start_time !== parameters.start_time) {
        updateData.start_time = parameters.start_time;
      }

      // Solo actualizar si hay cambios
      if (Object.keys(updateData).length > 0) {
        await prisma.bingo.update({
          where: { id: bingo.id },
          data: updateData,
        });

        console.log(
          `🔄 Bingo ${bingo.id} actualizado con nuevos parámetros:`,
          Object.keys(updateData).join(", ")
        );
      }
    }
  } catch (error: any) {
    console.error(
      `❌ Error al actualizar bingos pendientes:`,
      error.message
    );
  }
}

/**
 * Verifica si hay bingos finalizados y crea uno nuevo si es necesario
 */
export async function checkAndCreateNewBingo(): Promise<void> {
  try {
    // Buscar bingos finalizados
    const finishedBingos = await prisma.bingo.findMany({
      where: {
        is_finished: true,
        deleted_at: null,
      },
      orderBy: { id: "desc" },
      take: 1, // Solo el más reciente
    });

    if (finishedBingos.length === 0) {
      return; // No hay bingos finalizados
    }

    // Verificar si ya existe un bingo pendiente
    const pendingBingo = await prisma.bingo.findFirst({
      where: {
        is_started: false,
        is_finished: false,
        deleted_at: null,
      },
    });

    if (pendingBingo) {
      // Ya existe un bingo pendiente, no crear uno nuevo
      return;
    }

    // Crear nuevo bingo con los últimos parámetros
    await createBingoFromParameters();
  } catch (error: any) {
    console.error(
      `❌ Error al verificar y crear nuevo bingo:`,
      error.message
    );
  }
}

/**
 * Verifica si un cartón se jugó analizando el bingo_data_json
 * Un cartón no se jugó si:
 * - is_winner = false
 * - No tiene números marcados (negativos) en bingo_data_json
 */
function isCardboardPlayed(cardboard: {
  is_winner: boolean;
  bingo_data_json: any;
}): boolean {
  // Si es ganador, definitivamente se jugó
  if (cardboard.is_winner) {
    return true;
  }

  try {
    const bingoData = cardboard.bingo_data_json;
    
    // Si no hay datos del cartón, considerar que no se jugó
    if (!bingoData || typeof bingoData !== "object") {
      return false;
    }

    // Verificar si hay números marcados (negativos) en las columnas
    if (bingoData.columns && Array.isArray(bingoData.columns)) {
      for (const column of bingoData.columns) {
        if (column.numbers && Array.isArray(column.numbers)) {
          for (const number of column.numbers) {
            // Si hay algún número negativo (marcado), el cartón se jugó
            // El 0 es FREE y siempre está "marcado", pero no cuenta como jugado
            if (typeof number === "number" && number < 0) {
              return true;
            }
          }
        }
      }
    }

    // Si no se encontraron números marcados, el cartón no se jugó
    return false;
  } catch (error) {
    // Si hay error al analizar, considerar que no se jugó por seguridad
    console.error("Error al verificar si cartón se jugó:", error);
    return false;
  }
}

/**
 * Detecta bingos pendientes que ya expiraron (pasó la ventana de inicio)
 * Un bingo expiró si:
 * - is_started = false
 * - is_finished = false
 * - Ya pasó start_time + 5 minutos (ventana de inicio)
 */
export async function getExpiredPendingBingos(): Promise<
  Array<{ id: number; start_time: string | null }>
> {
  try {
    const now = moment().tz(BingoConfig.autoStart.timezone);
    const { scheduledTime } = await getScheduledStartTime();

    // Buscar bingos pendientes (incluir created_at para calcular fecha correcta)
    const pendingBingos = await prisma.bingo.findMany({
      where: {
        is_started: false,
        is_finished: false,
        deleted_at: null,
      },
      select: {
        id: true,
        start_time: true,
        created_at: true,
      },
    });

    const expiredBingos: Array<{ id: number; start_time: string | null }> = [];

    for (const bingo of pendingBingos) {
      // Usar start_time del bingo o el de los parámetros como fallback
      const bingoStartTime = bingo.start_time || scheduledTime;

      if (!bingoStartTime) {
        continue; // Si no hay hora configurada, saltar
      }

      // Parsear hora del bingo (formato HH:mm)
      const [hour, minute] = bingoStartTime.split(":");

      // Obtener fecha de creación del bingo en zona horaria de Venezuela
      const bingoCreatedAt = moment(bingo.created_at).tz(
        BingoConfig.autoStart.timezone
      );

      // Crear momento programado usando la fecha de creación del bingo
      // Si la hora programada es menor que la hora de creación, asumir que es para el día siguiente
      let scheduledTimeMoment = bingoCreatedAt
        .clone()
        .set({
          hour: parseInt(hour),
          minute: parseInt(minute),
          second: 0,
          millisecond: 0,
        });

      // Si la hora programada es anterior a la hora de creación, es para el día siguiente
      if (scheduledTimeMoment.isBefore(bingoCreatedAt)) {
        scheduledTimeMoment.add(1, "day");
      }

      // Calcular fin de ventana de inicio (5 minutos después)
      const windowEnd = scheduledTimeMoment
        .clone()
        .add(BingoConfig.autoStart.startWindowMinutes, "minutes");

      // Si ya pasó la ventana de inicio, el bingo expiró
      if (now.isAfter(windowEnd)) {
        expiredBingos.push({
          id: bingo.id,
          start_time: bingo.start_time,
        });
      }
    }

    return expiredBingos;
  } catch (error: any) {
    console.error(
      `❌ Error al detectar bingos expirados:`,
      error.message
    );
    return [];
  }
}

/**
 * Transfiere cartones no jugados de un bingo a otro
 * @param oldBingoId ID del bingo anterior
 * @param newBingoId ID del bingo nuevo
 * @returns Cantidad de cartones transferidos
 */
export async function transferUnplayedCardboards(
  oldBingoId: number,
  newBingoId: number
): Promise<number> {
  try {
    // Buscar todos los cartones del bingo anterior
    const cardboards = await prisma.bingoCardboards.findMany({
      where: {
        bingo_id: oldBingoId,
        deleted_at: null,
      },
      select: {
        id: true,
        is_winner: true,
        bingo_data_json: true,
      },
    });

    if (cardboards.length === 0) {
      return 0;
    }

    // Filtrar cartones no jugados
    const unplayedCardboards = cardboards.filter(
      (cardboard) => !isCardboardPlayed(cardboard)
    );

    if (unplayedCardboards.length === 0) {
      return 0;
    }

    // Transferir cartones al nuevo bingo
    const cardboardIds = unplayedCardboards.map((c) => c.id);

    await prisma.bingoCardboards.updateMany({
      where: {
        id: { in: cardboardIds },
      },
      data: {
        bingo_id: newBingoId,
        updated_at: new Date(),
      },
    });

    console.log(
      `📦 Transferidos ${unplayedCardboards.length} cartones no jugados del bingo ${oldBingoId} al bingo ${newBingoId}`
    );

    return unplayedCardboards.length;
  } catch (error: any) {
    console.error(
      `❌ Error al transferir cartones:`,
      error.message
    );
    return 0;
  }
}

/**
 * Procesa bingos expirados: los marca como finalizados, crea nuevo bingo si no existe,
 * y transfiere cartones no jugados
 */
export async function processExpiredBingos(): Promise<void> {
  try {
    const expiredBingos = await getExpiredPendingBingos();

    if (expiredBingos.length === 0) {
      return; // No hay bingos expirados
    }

    for (const expiredBingo of expiredBingos) {
      console.log(
        `\n${"=".repeat(60)}`
      );
      console.log(
        `⏰ BINGO EXPIRADO DETECTADO (ID: ${expiredBingo.id})`
      );
      console.log(
        `🕐 Hora programada: ${expiredBingo.start_time || "No configurada"}`
      );
      console.log(
        `❌ No se alcanzó el mínimo de participantes en la ventana de inicio`
      );

      // Marcar bingo como finalizado
      await prisma.bingo.update({
        where: { id: expiredBingo.id },
        data: { is_finished: true },
      });

      console.log(`✅ Bingo ${expiredBingo.id} marcado como finalizado`);

      // Verificar si existe un bingo pendiente (nuevo)
      let newBingoId: number | null = null;

      const existingPending = await prisma.bingo.findFirst({
        where: {
          is_started: false,
          is_finished: false,
          deleted_at: null,
        },
        select: { id: true },
      });

      if (existingPending) {
        newBingoId = existingPending.id;
        console.log(
          `ℹ️  Usando bingo pendiente existente (ID: ${newBingoId})`
        );
      } else {
        // Crear nuevo bingo con últimos parámetros
        newBingoId = await createBingoFromParameters();
        if (!newBingoId) {
          console.log(
            `⚠️  No se pudo crear nuevo bingo para transferir cartones`
          );
          console.log(`${"=".repeat(60)}\n`);
          continue;
        }
      }

      // Transferir cartones no jugados al nuevo bingo
      const transferredCount = await transferUnplayedCardboards(
        expiredBingo.id,
        newBingoId
      );

      console.log(
        `📊 Resumen: ${transferredCount} cartones transferidos al bingo ${newBingoId}`
      );
      console.log(`${"=".repeat(60)}\n`);
    }
  } catch (error: any) {
    console.error(
      `❌ Error al procesar bingos expirados:`,
      error.message
    );
  }
}
