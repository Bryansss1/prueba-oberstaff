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
  isBingoStartWindowExpired,
  isPastScheduledStartTime,
  createBingoFromParameters,
  transferUnplayedCardboards,
  isSystemPaused,
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

    // Defensa en profundidad: si está pausado ahora, no marcar como
    // started. El scheduler ya validó esto, pero entre su check y este
    // loadBingo el operador podría haber pausado.
    if (state.is_pause) {
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
        is_pause: true,
      },
    });

    // Si no hay bingo pendiente, no hacer nada
    if (!lastPendingBingo) {
      return;
    }

    // ⏸️ Si el bingo más reciente está pausado, no iniciar ni expirar.
    // El sistema queda "congelado" hasta que el operador despause.
    // PERO igual cargamos el estado en memoria para que was_paused quede
    // seteado=true (sticky) y el cron del próximo tick (cuando se despause)
    // pueda saber que estuvo pausado. Sin esto, was_paused se perdería
    // porque el estado nunca habría entrado a memoria.
    if (lastPendingBingo.is_pause) {
      console.log(
        `[BINGO ${lastPendingBingo.id}] ⏸️  Bingo pending pausado por operador — no se inicia (esperando despause)`
      );
      await loadBingo(lastPendingBingo.id);
      return;
    }

    // Cargar el bingo en memoria para tener was_paused actualizado.
    // Si el operador lo pausó antes y acaba de despausarlo, el feeder ya
    // seteó state.was_paused=true; aquí se refleja para la decisión de
    // "despausado tarde" abajo.
    await loadBingo(lastPendingBingo.id);
    const state = activeBingos.get(lastPendingBingo.id);
    if (!state) {
      // No debería pasar: loadBingo tira error si no encuentra. Defensa.
      return;
    }
    // Re-check defensivo: si el operador pausó entre la query inicial y
    // este loadBingo, abortar el inicio (race condition). Sin esto, el
    // bingo podría quedar "is_started=true" en DB pero pausado, y el feeder
    // quedaría inerte hasta el próximo despause.
    if (state.is_pause) {
      return;
    }
    const wasPausedBefore = state.was_paused;

    // Obtener hora del bingo (o fallback a parámetros)
    const bingoStartTime = lastPendingBingo.start_time;

    // Verificar si es hora de iniciar usando la hora del último bingo
    if (!(await isTimeToStart(bingoStartTime, lastPendingBingo.created_at))) {
      // Si no es hora de iniciar, verificar si la ventana YA expiró
      const { scheduledTime } = await getScheduledStartTime();
      if (
        isBingoStartWindowExpired(
          bingoStartTime,
          lastPendingBingo.created_at,
          scheduledTime
        )
      ) {
        // ⏸️ Si el bingo estuvo pausado durante la ventana, no expirarlo:
        // el operador ya decidió qué hacer al despausar. Solo esperar
        // que haya participantes suficientes.
        if (wasPausedBefore) {
          console.log(
            `\n[BINGO ${lastPendingBingo.id}] ⏸️ Despausado con ventana vencida — no se expira, esperando participantes para iniciar`
          );
          return;
        }
        // ⏰ La ventana se cerró sin alcanzar el mínimo → procesar expiración AHORA
        console.log(
          `\n[BINGO ${lastPendingBingo.id}] ⏰ Ventana de inicio cerrada — procesando expiración inmediata`
        );
        await processExpiredBingos();
      }
      return;
    }

    // Verificar si tiene suficientes participantes
    const participants = await getActiveParticipantsCount(lastPendingBingo.id);
    const minRequired = lastPendingBingo.min_number_of_participants || 0;

    if (participants >= minRequired) {
      await startBingoAutomatically(lastPendingBingo.id, io);
    } else {
      // No hay suficientes participantes — verificar si ya pasó la hora de inicio
      const { scheduledTime } = await getScheduledStartTime();
      if (
        isPastScheduledStartTime(
          bingoStartTime,
          lastPendingBingo.created_at,
          scheduledTime
        )
      ) {
        // ⏸️ Mismo caso: si el bingo estuvo pausado, no finalizar y crear
        // uno nuevo. Solo esperar participantes (la hora actual manda).
        if (wasPausedBefore) {
          console.log(
            `[BINGO ${lastPendingBingo.id}] ⏸️ Despausado con hora vencida — esperando participantes (${participants}/${minRequired})`
          );
          return;
        }
        // ☠️ Hora de inicio alcanzada sin mínimo → finalizar AHORA
        await prisma.bingo.update({
          where: { id: lastPendingBingo.id },
          data: { is_finished: true, is_pause: false },
        });

        // Notificar a los sockets conectados que el bingo terminó
        const { roomName } = await import("./state.js");
        io.to(roomName(lastPendingBingo.id)).emit("bingo_finished", {
          reason: "Hora de inicio alcanzada sin mínimo de participantes",
        });

        console.log(
          `\n[BINGO ${lastPendingBingo.id}] ☠️ Finalizado: hora de inicio (${bingoStartTime || scheduledTime}) alcanzada sin mínimo de participantes (${participants}/${minRequired})`
        );

        // Transferir cartones no jugados y crear nuevo bingo si no existe
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
          }
        }

        if (newBingoId) {
          const transferred = await transferUnplayedCardboards(
            lastPendingBingo.id,
            newBingoId
          );
          console.log(
            `📊 ${transferred} cartones transferidos al bingo ${newBingoId}\n`
          );
        }
      } else {
        console.log(
          `[BINGO ${lastPendingBingo.id}] ⏳ Esperando participantes: ${participants}/${minRequired} (Hora programada: ${bingoStartTime || "parámetros"})`
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

  // 🔄 Recovery: reanudar feeders de bingos en progreso (incluyendo pausados).
  // Sin esto, un server restart dejaría "stuck" cualquier bingo que ya
  // estaba iniciado: el feeder moriría con el proceso y nadie lo relanzaría
  // (los crons solo miran bingos pending). Los pausados también se recuperan
  // — su feeder arranca, ve is_pause=true en el primer tick, y queda inerte
  // hasta que el operador despause. Los números ya cantados se preservan
  // porque el feeder inicializa su `drawn` Set desde state.numbersPlayed.
  const inProgressBingos = await prisma.bingo.findMany({
    where: {
      is_started: true,
      is_finished: false,
      deleted_at: null,
    },
    select: { id: true, is_pause: true },
  });

  for (const b of inProgressBingos) {
    try {
      await loadBingo(b.id);
      const state = activeBingos.get(b.id);
      if (state && state.is_started) {
        createNumberFeeder(b.id, io);
        if (b.is_pause) {
          console.log(
            `[BINGO ${b.id}] 🔄 Feeder reanudado tras restart (⏸️ pausado, inerte hasta despausar)`
          );
        } else {
          console.log(`[BINGO ${b.id}] 🔄 Feeder reanudado tras restart`);
        }
      }
    } catch (error: any) {
      console.error(
        `[BINGO ${b.id}] ❌ Error en recovery del feeder:`,
        error.message
      );
    }
  }

  if (inProgressBingos.length > 0) {
    console.log(
      `🔄 Recovery completado: ${inProgressBingos.length} feeder(s) reanudado(s)\n`
    );
  }

  // Cron 1: Refrescar parámetros cada 2 minutos
  cron.schedule("*/2 * * * *", async () => {
    const hasChanged = await refreshParametersCache();
    // Si los parámetros cambiaron, actualizar bingos pendientes
    if (hasChanged) {
      // await updatePendingBingosFromParameters();
    }
  });

  // Cron 2: Verificar inicio de bingos cada minuto
  cron.schedule("* * * * *", async () => {
    await checkAndStartPendingBingos(io);
  });

  // Cron 3: Gestión de bingos (crear nuevo cuando termine uno, actualizar pendientes) cada 1 minuto
  cron.schedule("* * * * *", async () => {
    // Verificar y crear nuevo bingo si hay finalizados
    await checkAndCreateNewBingo();
    // Actualizar bingos pendientes con últimos parámetros (deshabilitado por bugs, el nuevo bingo toma los parámetros frescos)
    // await updatePendingBingosFromParameters();
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
  console.log("📋 Cron de gestión de bingos: cada 1 minuto");
  console.log("⏳ Cron de bingos expirados: cada 2 minutos");
  console.log(
    `⏰ Bingo auto-start: ${BingoConfig.autoStart.enabled ? "HABILITADO" : "DESHABILITADO"}`
  );
  console.log("📌 Comportamiento: Usa hora del último bingo pendiente creado");
  console.log(`${logMessage}\n`);
}
