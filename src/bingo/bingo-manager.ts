// Gestión de creación y actualización de bingos desde parámetros
import { prisma } from "../config/prisma";
import { getCurrentParameters, refreshParametersCache } from "../config/parameters";
import moment from "moment-timezone";
import { BingoConfig, getScheduledStartTime } from "../config/bingo.config";
import { getActiveParticipantsCount } from "./state";

/**
 * Indica si el sistema está pausado a nivel global: el bingo más reciente
 * (cualquier estado, excepto soft-deleted) tiene `is_pause=true`.
 * El operador (vía endpoints externos) flaguea esta columna para detener
 * toda actividad del bingo más reciente: feeder, auto-start, expiración y
 * creación de nuevos bingos. Mientras esté en true, el sistema no avanza.
 */
export async function isSystemPaused(): Promise<boolean> {
  const mostRecent = await prisma.bingo.findFirst({
    where: { 
      deleted_at: null,
      is_finished: false, // Solo bingos activos o pendientes
    },
    orderBy: { id: "desc" },
    select: { is_pause: true },
  });
  return mostRecent?.is_pause ?? false;
}

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
  if (typeof a !== "object" || typeof b !== "object") {
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
    // Si el sistema está pausado (último bingo con is_pause=true), no crear.
    if (await isSystemPaused()) {
      console.log("⏸️  Sistema pausado: no se crea nuevo bingo");
      return null;
    }

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
        maximum_cardboard: parameters.maximum_cardboard,
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
      `🧮 Máximo de cartones: ${newBingo.maximum_cardboard ?? "Sin límite"}`
    );
    console.log(
      `⏰ Hora de inicio: ${newBingo.start_time || "No configurada"}`
    );
    console.log(
      `🎁 Premios: ${parameters.bingo_prizes ? "Configurados" : "Sin premios"}`
    );
    console.log(`${"=".repeat(60)}\n`);

    return newBingo.id;
  } catch (error: any) {
    console.error(`❌ Error al crear bingo desde parámetros:`, error.message);
    return null;
  }
}

/**
 * Actualiza bingos pendientes (no iniciados) con los últimos parámetros
 * IMPORTANTE: NO actualiza bingos en curso (is_started: true) para evitar cambios durante el juego
 */
export async function updatePendingBingosFromParameters(): Promise<void> {
  try {
    const parameters = await getCurrentParameters();

    if (!parameters) {
      return;
    }

    // Buscar SOLO bingos pendientes (no iniciados, no finalizados)
    // IMPORTANTE: is_started: false asegura que NO se actualicen bingos en curso
    const pendingBingos = await prisma.bingo.findMany({
      where: {
        is_started: false, // Solo bingos que NO han comenzado
        is_finished: false,
        deleted_at: null,
      },
    });

    if (pendingBingos.length === 0) {
      return;
    }

    // Actualizar cada bingo pendiente con los últimos parámetros
    // Verificación adicional de seguridad: asegurar que el bingo NO esté iniciado
    for (const bingo of pendingBingos) {
      // Verificación de seguridad: si por alguna razón el bingo está iniciado, saltarlo
      if (bingo.is_started) {
        console.log(
          `⚠️  Bingo ${bingo.id} está iniciado, no se actualizarán sus parámetros`
        );
        continue;
      }

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

      if (bingo.maximum_cardboard !== parameters.maximum_cardboard) {
        updateData.maximum_cardboard = parameters.maximum_cardboard;
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
    console.error(`❌ Error al actualizar bingos pendientes:`, error.message);
  }
}

/**
 * Verifica si hay bingos finalizados y crea uno nuevo si es necesario
 * IMPORTANTE: No crea un nuevo bingo si hay uno en curso (is_started: true)
 *              ni si el sistema está pausado (is_pause=true en el más reciente)
 */
export async function checkAndCreateNewBingo(): Promise<void> {
  try {
    // Si el sistema está pausado, no crear reemplazo.
    if (await isSystemPaused()) {
      console.log(
        "⏸️  Sistema pausado: no se crea bingo de reemplazo (checkAndCreateNewBingo)"
      );
      return;
    }

    // Verificar si hay un bingo en curso
    const activeBingo = await prisma.bingo.findFirst({
      where: {
        is_started: true,
        is_finished: false,
        deleted_at: null,
      },
    });

    if (activeBingo) {
      // Hay un bingo en curso, no crear uno nuevo
      return;
    }

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
    console.error(`❌ Error al verificar y crear nuevo bingo:`, error.message);
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
 * Verifica si la ventana de inicio de un bingo ya expiró.
 * Retorna true si ya pasó start_time + 5 minutos (startWindowMinutes).
 * @param bingoStartTime Hora del bingo en formato HH:mm (o null)
 * @param bingoCreatedAt Fecha de creación del bingo
 * @param fallbackScheduledTime Hora programada de fallback (desde parámetros/ENV)
 */
export function isBingoStartWindowExpired(
  bingoStartTime: string | null,
  bingoCreatedAt: Date,
  fallbackScheduledTime: string
): boolean {
  const effectiveTime = bingoStartTime || fallbackScheduledTime;
  if (!effectiveTime) return false;

  const now = moment().tz(BingoConfig.autoStart.timezone);
  const [hour, minute] = effectiveTime.split(":");

  const bingoCreatedMoment = moment(bingoCreatedAt).tz(
    BingoConfig.autoStart.timezone
  );

  let scheduledMoment = bingoCreatedMoment.clone().set({
    hour: parseInt(hour),
    minute: parseInt(minute),
    second: 0,
    millisecond: 0,
  });

  // Si la hora programada es anterior a la de creación, es para el día siguiente
  if (scheduledMoment.isBefore(bingoCreatedMoment)) {
    scheduledMoment.add(1, "day");
  }

  const windowEnd = scheduledMoment
    .clone()
    .add(BingoConfig.autoStart.startWindowMinutes, "minutes");

  return now.isSameOrAfter(windowEnd);
}

/**
 * Verifica si ya pasó la hora programada de inicio (sin ventana de tolerancia).
 * A diferencia de isBingoStartWindowExpired, NO suma los 5 minutos extra.
 * Útil para finalizar inmediatamente un bingo que no alcanzó el mínimo apenas llega la hora.
 */
export function isPastScheduledStartTime(
  bingoStartTime: string | null,
  bingoCreatedAt: Date,
  fallbackScheduledTime: string
): boolean {
  const effectiveTime = bingoStartTime || fallbackScheduledTime;
  if (!effectiveTime) return false;

  const now = moment().tz(BingoConfig.autoStart.timezone);
  const [hour, minute] = effectiveTime.split(":");

  const bingoCreatedMoment = moment(bingoCreatedAt).tz(
    BingoConfig.autoStart.timezone
  );

  let scheduledMoment = bingoCreatedMoment.clone().set({
    hour: parseInt(hour),
    minute: parseInt(minute),
    second: 0,
    millisecond: 0,
  });

  if (scheduledMoment.isBefore(bingoCreatedMoment)) {
    scheduledMoment.add(1, "day");
  }

  return now.isSameOrAfter(scheduledMoment);
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
      is_pause: true,
    },
  });

  const expiredBingos: Array<{ id: number; start_time: string | null }> = [];

  for (const bingo of pendingBingos) {
    // Bingos pausados no se procesan como expirados: la pausa es una señal
    // explícita del operador de "no toques este bingo". Cuando se despause,
    // el scheduler los evaluará con la nueva lógica (was_paused).
    if (bingo.is_pause) {
      console.log(
        `[BINGO ${bingo.id}] ⏸️  Bingo pending pausado — se omite de la lista de expirados (esperando despause)`
      );
      continue;
    }
    if (isBingoStartWindowExpired(bingo.start_time, bingo.created_at, scheduledTime)) {
      expiredBingos.push({
        id: bingo.id,
        start_time: bingo.start_time,
      });
    }
  }

    return expiredBingos;
  } catch (error: any) {
    console.error(`❌ Error al detectar bingos expirados:`, error.message);
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

    // Actualizar number_of_participants del bingo destino
    const participantCount = await getActiveParticipantsCount(newBingoId);
    await prisma.bingo.update({
      where: { id: newBingoId },
      data: { number_of_participants: participantCount },
    });

    console.log(
      `📦 Transferidos ${unplayedCardboards.length} cartones no jugados del bingo ${oldBingoId} al bingo ${newBingoId}`
    );

    return unplayedCardboards.length;
  } catch (error: any) {
    console.error(`❌ Error al transferir cartones:`, error.message);
    return 0;
  }
}

/**
 * Procesa bingos expirados: los marca como finalizados, crea uno nuevo si no existe,
 * y transfiere los cartones NO jugados (sin números marcados) al nuevo bingo.
 * Los cartones que alguien abrió y marcó números NO se transfieren.
 */
export async function processExpiredBingos(): Promise<void> {
  try {
    const expiredBingos = await getExpiredPendingBingos();

    if (expiredBingos.length === 0) {
      return; // No hay bingos expirados
    }

    for (const expiredBingo of expiredBingos) {
      console.log(`\n${"=".repeat(60)}`);
      console.log(`⏰ BINGO EXPIRADO DETECTADO (ID: ${expiredBingo.id})`);
      console.log(
        `🕐 Hora programada: ${expiredBingo.start_time || "No configurada"}`
      );
      console.log(
        `❌ No se alcanzó el mínimo de participantes en la ventana de inicio`
      );

      // Marcar bingo como finalizado
      await prisma.bingo.update({
        where: { id: expiredBingo.id },
        data: { is_finished: true, is_pause: false },
      });

      console.log(`✅ Bingo ${expiredBingo.id} marcado como finalizado`);

      // Determinar el bingo destino para transferir cartones
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
        console.log(`ℹ️  Usando bingo pendiente existente (ID: ${newBingoId})`);
      } else {
        // Refrescar cache antes de crear para usar parámetros actualizados
        await refreshParametersCache();
        newBingoId = await createBingoFromParameters();
        if (newBingoId) {
          console.log(`🆕 Nuevo bingo creado (ID: ${newBingoId})`);
        } else {
          console.log(`⚠️  No se pudo crear nuevo bingo`);
        }
      }

      // Transferir solo cartones NO jugados (sin números marcados)
      // isCardboardPlayed() filtra: si tiene números negativos → NO se transfiere
      if (newBingoId) {
        const transferredCount = await transferUnplayedCardboards(
          expiredBingo.id,
          newBingoId
        );
        console.log(
          `📊 ${transferredCount} cartones transferidos al bingo ${newBingoId} (solo los no jugados)`
        );
      }

      console.log(`${"=".repeat(60)}\n`);
    }
  } catch (error: any) {
    console.error(`❌ Error al procesar bingos expirados:`, error.message);
  }
}
