// Scheduler para inicio automático de bingos
import cron from "node-cron";
import moment from "moment-timezone";
import { Server } from "socket.io";
import { prisma } from "../config/prisma";
import { BingoConfig, getScheduledStartTime } from "../config/bingo.config";
import { refreshParametersCache } from "../config/parameters";
import {
  checkAndCreateNewBingo,
  updatePendingBingosFromParameters,
  processExpiredBingos,
} from "./bingo-manager";
import { getActiveParticipantsCount, loadBingo, activeBingos } from "./state";
import { createNumberFeeder } from "./number-feeder";
//

/**
 * Verifica si es hora de iniciar bingos según la configuración
 * Si se proporciona bingoStartTime, usa esa hora (del último bingo)
 * Si no, usa parámetros de BD o fallback a ENV
 * IMPORTANTE: Todo se maneja en zona horaria de Venezuela (America/Caracas)
 * Cuando bingoCreatedAt se proporciona, se usa para determinar el día de inicio
 * (permite manejar correctamente start_time 00:00 / medianoche)
 * @param bingoStartTime Hora del bingo en formato HH:mm (opcional)
 * @param bingoCreatedAt Fecha de creación del bingo (opcional, para calcular día correcto)
 */
async function isTimeToStart(
  bingoStartTime?: string | null,
  bingoCreatedAt?: Date | null
): Promise<boolean> {
  let scheduledTime: string;
  let source: "BD" | "ENV" | "BINGO";

  // Si se proporciona hora del bingo, usar esa
  if (bingoStartTime && typeof bingoStartTime === "string") {
    // Validar formato HH:mm
    const timePattern = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    if (timePattern.test(bingoStartTime)) {
      scheduledTime = bingoStartTime;
      source = "BINGO";
    } else {
      // Si el formato es inválido, usar fallback a parámetros
      const params = await getScheduledStartTime();
      scheduledTime = params.scheduledTime;
      source = params.source;
    }
  } else {
    // Fallback a parámetros o ENV
    const params = await getScheduledStartTime();
    scheduledTime = params.scheduledTime;
    source = params.source;
  }

  // Obtener hora actual en zona horaria de Venezuela
  const now = moment().tz(BingoConfig.autoStart.timezone);
  const [hour, minute] = scheduledTime.split(":");

  let scheduledTimeMoment: moment.Moment;

  if (bingoCreatedAt) {
    // Usar fecha de creación para determinar el día (maneja correctamente 00:00)
    const bingoCreatedMoment = moment(bingoCreatedAt).tz(
      BingoConfig.autoStart.timezone
    );
    scheduledTimeMoment = bingoCreatedMoment.clone().set({
      hour: parseInt(hour),
      minute: parseInt(minute),
      second: 0,
      millisecond: 0,
    });
    // Si la hora programada es anterior a la de creación, es para el día siguiente
    if (scheduledTimeMoment.isBefore(bingoCreatedMoment)) {
      scheduledTimeMoment.add(1, "day");
    }
  } else {
    // Fallback: usar fecha actual (comportamiento anterior)
    scheduledTimeMoment = moment()
      .tz(BingoConfig.autoStart.timezone)
      .set({
        hour: parseInt(hour),
        minute: parseInt(minute),
        second: 0,
        millisecond: 0,
      });
  }

  // Ventana de tiempo para iniciar (5 minutos después de la hora programada)
  const windowEnd = scheduledTimeMoment
    .clone()
    .add(BingoConfig.autoStart.startWindowMinutes, "minutes");

  return now.isBetween(scheduledTimeMoment, windowEnd, null, "[)");
}

/**
 * Inicia un bingo automáticamente
 */
async function startBingoAutomatically(
  bingoId: number,
  io: Server
): Promise<void> {
  try {
    await loadBingo(bingoId);
    const state = activeBingos.get(bingoId);

    if (!state) {
      console.error(`[BINGO ${bingoId}] ❌ Error al cargar estado`);
      return;
    }

    // Marcar como iniciado en BD
    await prisma.bingo.update({
      where: { id: bingoId },
      data: { is_started: true },
    });

    state.is_started = true;

    const participants = await getActiveParticipantsCount(bingoId);
    const now = moment().tz(BingoConfig.autoStart.timezone);

    // Obtener información del bingo para logs
    const bingo = await prisma.bingo.findUnique({
      where: { id: bingoId },
      select: { start_time: true },
    });

    // Determinar fuente de la hora
    const bingoStartTime = bingo?.start_time;
    let scheduledTime: string;
    let source: "BD" | "ENV" | "BINGO";

    if (bingoStartTime) {
      scheduledTime = bingoStartTime;
      source = "BINGO";
    } else {
      const params = await getScheduledStartTime();
      scheduledTime = params.scheduledTime;
      source = params.source;
    }

    // 🤖 LOG: Inicio automático
    console.log(`\n${"=".repeat(60)}`);
    console.log(`[BINGO ${bingoId}] 🤖 INICIO AUTOMÁTICO`);
    console.log(
      `⏰ Hora programada: ${scheduledTime} (${BingoConfig.autoStart.timezone}) [Fuente: ${source === "BINGO" ? "Último bingo creado" : source}]`
    );
    console.log(`⏰ Hora real: ${now.format("HH:mm:ss")}`);
    console.log(
      `👥 Participantes: ${participants}/${state.min_number_of_participants || 0} (mínimo requerido)`
    );
    console.log(`🎁 Premios disponibles: ${state.prizes.length}`);
    console.log(`${"=".repeat(60)}\n`);

    // Iniciar el generador de números
    createNumberFeeder(bingoId, io);
  } catch (error: any) {
    console.error(
      `[BINGO ${bingoId}] ❌ Error en inicio automático:`,
      error.message
    );
  }
}

/**
 * Verifica y inicia el último bingo pendiente si cumple las condiciones
 * Usa la hora (start_time) del último bingo creado para verificar si es momento de iniciar
 */
async function checkAndStartPendingBingos(io: Server): Promise<void> {
  try {
    // Buscar el ÚLTIMO bingo pendiente (ordenado por id DESC)
    const lastPendingBingo = await prisma.bingo.findFirst({
      where: {
        is_started: false,
        is_finished: false,
        deleted_at: null,
      },
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
        start_time: true,
        min_number_of_participants: true,
        created_at: true,
      },
    });

    // Si no hay bingo pendiente, no hacer nada
    if (!lastPendingBingo) {
      return;
    }

    // Obtener hora del bingo (o fallback a parámetros)
    const bingoStartTime = lastPendingBingo.start_time;

    // Verificar si es hora de iniciar usando la hora del último bingo
    if (!(await isTimeToStart(bingoStartTime, lastPendingBingo.created_at))) {
      return; // No es hora aún
    }

    // Verificar si tiene suficientes participantes
    const participants = await getActiveParticipantsCount(lastPendingBingo.id);
    const minRequired = lastPendingBingo.min_number_of_participants || 0;

    if (participants >= minRequired) {
      await startBingoAutomatically(lastPendingBingo.id, io);
    } else {
      console.log(
        `[BINGO ${lastPendingBingo.id}] ⏳ Esperando participantes: ${participants}/${minRequired} (Hora programada: ${bingoStartTime || "parámetros"})`
      );
    }
  } catch (error: any) {
    console.error("❌ Error en scheduler de bingos:", error.message);
  }
}

/**
 * Inicia el scheduler de bingos automáticos
 */
export async function startBingoScheduler(io: Server): Promise<void> {
  if (!BingoConfig.autoStart.enabled) {
    console.log("⚠️  Auto-start de bingos DESHABILITADO en configuración");
    return;
  }

  // Refresh inicial de parámetros
  await refreshParametersCache();

  // Cron 1: Refrescar parámetros cada 2 minutos
  cron.schedule("*/2 * * * *", async () => {
    const hasChanged = await refreshParametersCache();
    // Si los parámetros cambiaron, actualizar bingos pendientes
    if (hasChanged) {
      await updatePendingBingosFromParameters();
    }
  });

  // Cron 2: Verificar inicio de bingos cada minuto
  cron.schedule("* * * * *", async () => {
    await checkAndStartPendingBingos(io);
  });

  // Cron 3: Gestión de bingos (crear nuevo cuando termine uno, actualizar pendientes) cada 3 minutos
  cron.schedule("*/3 * * * *", async () => {
    // Verificar y crear nuevo bingo si hay finalizados
    await checkAndCreateNewBingo();
    // Actualizar bingos pendientes con últimos parámetros
    await updatePendingBingosFromParameters();
  });

  // Cron 4: Procesar bingos expirados (que no alcanzaron mínimo de participantes) cada 2 minutos
  cron.schedule("*/2 * * * *", async () => {
    await processExpiredBingos();
  });

  // Obtener información del último bingo pendiente para logs iniciales
  const lastPendingBingo = await prisma.bingo.findFirst({
    where: {
      is_started: false,
      is_finished: false,
      deleted_at: null,
    },
    orderBy: { id: "desc" },
    select: { id: true, start_time: true },
  });

  let scheduledTime: string;
  let source: "BD" | "ENV" | "BINGO";
  let logMessage: string;

  if (lastPendingBingo?.start_time) {
    scheduledTime = lastPendingBingo.start_time;
    source = "BINGO";
    logMessage = `🕐 Hora programada: ${scheduledTime} (${BingoConfig.autoStart.timezone}) [Fuente: Último bingo creado (ID: ${lastPendingBingo.id})]`;
  } else {
    const params = await getScheduledStartTime();
    scheduledTime = params.scheduledTime;
    source = params.source;
    logMessage = `🕐 Hora programada: ${scheduledTime} (${BingoConfig.autoStart.timezone}) [Fuente: ${source}]`;
    if (lastPendingBingo) {
      logMessage += ` (Bingo ${lastPendingBingo.id} sin start_time, usando parámetros)`;
    } else {
      logMessage += ` (No hay bingos pendientes)`;
    }
  }

  console.log("\n✅ Scheduler de bingos iniciado");
  console.log("🔄 Cron de parámetros: cada 2 minutos");
  console.log("⏰ Cron de bingos: cada 1 minuto");
  console.log("📋 Cron de gestión de bingos: cada 3 minutos");
  console.log("⏳ Cron de bingos expirados: cada 2 minutos");
  console.log(
    `⏰ Bingo auto-start: ${BingoConfig.autoStart.enabled ? "HABILITADO" : "DESHABILITADO"}`
  );
  console.log("📌 Comportamiento: Usa hora del último bingo pendiente creado");
  console.log(`${logMessage}\n`);
}
