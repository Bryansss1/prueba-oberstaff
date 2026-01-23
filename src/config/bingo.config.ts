// Configuración del sistema de auto-start para bingos
import { getCurrentParameters } from "./parameters";

export const BingoConfig = {
  autoStart: {
    // Habilitar/deshabilitar inicio automático
    enabled: process.env.AUTO_START_ENABLED === 'true',
    
    // Hora de inicio en formato HH:mm (24 horas) - fallback desde ENV
    scheduledTime: process.env.BINGO_START_TIME || '09:00',
    
    // Zona horaria (América/Caracas para Venezuela)
    timezone: process.env.BINGO_TIMEZONE || 'America/Caracas',
    
    // Intervalo del scheduler en minutos
    checkIntervalMinutes: parseInt(process.env.SCHEDULER_INTERVAL || '1'),
    
    // Ventana de tiempo en minutos para iniciar después de la hora programada
    // (para no perder el inicio si el scheduler se atrasa un minuto)
    startWindowMinutes: 5,
  },
};

/**
 * Obtiene la hora de inicio configurada desde los parámetros de BD o fallback a ENV
 * IMPORTANTE: La hora se interpreta en zona horaria de Venezuela (America/Caracas)
 * @returns Objeto con la hora en formato HH:mm y la fuente (BD o ENV)
 */
export async function getScheduledStartTime(): Promise<{
  scheduledTime: string;
  source: "BD" | "ENV";
}> {
  const parameters = await getCurrentParameters();

  // Si hay parámetros y start_time está definido, usar BD
  // start_time es un string en formato HH:mm (hora militar en zona Venezuela):
  // - "08:00" = 8:00 AM hora Venezuela
  // - "14:00" = 2:00 PM hora Venezuela
  if (parameters?.start_time && typeof parameters.start_time === "string") {
    // Validar formato HH:mm
    const timePattern = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    if (timePattern.test(parameters.start_time)) {
      return { scheduledTime: parameters.start_time, source: "BD" };
    } else {
      console.warn(
        `⚠️  Formato de start_time inválido: "${parameters.start_time}". Usando fallback ENV.`
      );
    }
  }

  // Fallback a variables de entorno
  return {
    scheduledTime: BingoConfig.autoStart.scheduledTime,
    source: "ENV",
  };
}
