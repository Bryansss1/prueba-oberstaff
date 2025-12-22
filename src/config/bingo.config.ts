// Configuración del sistema de auto-start para bingos
export const BingoConfig = {
  autoStart: {
    // Habilitar/deshabilitar inicio automático
    enabled: process.env.AUTO_START_ENABLED === 'true',
    
    // Hora de inicio en formato HH:mm (24 horas)
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
