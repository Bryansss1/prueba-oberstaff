// Scheduler para inicio automático de bingos
import cron from "node-cron";
import moment from "moment-timezone";
import { Server } from "socket.io";
import { prisma } from "../config/prisma";
import { BingoConfig, getScheduledStartTime } from "../config/bingo.config";
import { refreshParametersCache } from "../config/parameters";
import { getActiveParticipantsCount, loadBingo, activeBingos } from "./state";
import { createNumberFeeder } from "./number-feeder";

/**
 * Verifica si es hora de iniciar bingos según la configuración
 * Obtiene la hora desde parámetros de BD o fallback a ENV
 * IMPORTANTE: Todo se maneja en zona horaria de Venezuela (America/Caracas)
 */
async function isTimeToStart(): Promise<boolean> {
  const { scheduledTime, source } = await getScheduledStartTime();
  // Obtener hora actual en zona horaria de Venezuela
  const now = moment().tz(BingoConfig.autoStart.timezone);
  const [hour, minute] = scheduledTime.split(":");

  // Crear momento programado en zona horaria de Venezuela
  // start_time viene como string HH:mm (ej: "08:00" = 8am, "14:00" = 2pm) en hora Venezuela
  const scheduledTimeMoment = moment()
    .tz(BingoConfig.autoStart.timezone)
    .set({
      hour: parseInt(hour),
      minute: parseInt(minute),
      second: 0,
      millisecond: 0,
    });

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
    const { scheduledTime, source } = await getScheduledStartTime();

    // 🤖 LOG: Inicio automático
    console.log(`\n${"=".repeat(60)}`);
    console.log(`[BINGO ${bingoId}] 🤖 INICIO AUTOMÁTICO`);
    console.log(
      `⏰ Hora configurada: ${scheduledTime} (${BingoConfig.autoStart.timezone}) [Fuente: ${source}]`
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
 * Verifica y inicia bingos pendientes que cumplen las condiciones
 */
async function checkAndStartPendingBingos(io: Server): Promise<void> {
  if (!(await isTimeToStart())) return;

  try {
    // Buscar bingos pendientes (no iniciados, no finalizados)
    const pendingBingos = await prisma.bingo.findMany({
      where: {
        is_started: false,
        is_finished: false,
      },
    });

    if (pendingBingos.length === 0) return;

    for (const bingo of pendingBingos) {
      const participants = await getActiveParticipantsCount(bingo.id);
      const minRequired = bingo.min_number_of_participants || 0;

      if (participants >= minRequired) {
        await startBingoAutomatically(bingo.id, io);
      } else {
        console.log(
          `[BINGO ${bingo.id}] ⏳ Esperando participantes: ${participants}/${minRequired}`
        );
      }
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
    await refreshParametersCache();
  });

  // Cron 2: Verificar inicio de bingos cada minuto
  cron.schedule("* * * * *", async () => {
    await checkAndStartPendingBingos(io);
  });

  // Obtener hora configurada para logs iniciales
  const { scheduledTime, source } = await getScheduledStartTime();

  console.log("\n✅ Scheduler de bingos iniciado");
  console.log("🔄 Cron de parámetros: cada 2 minutos");
  console.log("⏰ Cron de bingos: cada 1 minuto");
  console.log(
    `⏰ Bingo auto-start: ${BingoConfig.autoStart.enabled ? "HABILITADO" : "DESHABILITADO"}`
  );
  console.log(
    `🕐 Hora programada: ${scheduledTime} (${BingoConfig.autoStart.timezone}) [Fuente: ${source}]\n`
  );
}
