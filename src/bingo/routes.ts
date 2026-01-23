// Endpoints REST API para gestión de bingos
import { Express } from "express";
import { Server } from "socket.io";
import { prisma } from "../config/prisma";
import { activeBingos, loadBingo, roomName } from "./state";
import { createNumberFeeder } from "./number-feeder";

/**
 * Registra las rutas REST API del bingo
 */
export function registerBingoRoutes(app: Express, io: Server): void {
  // GET /bingo/:id - Obtener estado del bingo (PÚBLICO)
  app.get("/bingo/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      await loadBingo(id);
      const state = activeBingos.get(id)!;

      res.json({
        bingoId: id,
        is_started: state.is_started,
        prizes: state.prizes,
        numbersPlayed: state.numbersPlayed,
      });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el bingo" });
    }
  });

  // POST /bingo/:id/start - Iniciar bingo (SIN AUTENTICACIÓN - Para pruebas)
  app.post("/bingo/:id/start", async (req, res) => {
    try {
      const id = Number(req.params.id);
      await loadBingo(id);
      const st = activeBingos.get(id)!;

      if (!st.is_started) {
        await prisma.bingo.update({ where: { id }, data: { is_started: true } });
        st.is_started = true;
        
        // Importar módulos necesarios para logging
        const { getActiveParticipantsCount } = await import("./state.js");
        const { BingoConfig } = await import("../config/bingo.config.js");
        const moment = (await import("moment-timezone")).default;
        
        const participants = await getActiveParticipantsCount(id);
        const minRequired = st.min_number_of_participants || 0;
        const now = moment().tz(BingoConfig.autoStart.timezone);
        
        // 👨‍💼 LOG: Inicio manual (sin autenticación para pruebas)
        console.log(`\n${'='.repeat(60)}`);
        console.log(`[BINGO ${id}] 👨‍💼 INICIO MANUAL (PRUEBA - Sin autenticación)`);
        console.log(`👤 Iniciado por: Usuario de prueba`);
        console.log(`👥 Participantes actuales: ${participants}${participants < minRequired ? ` (mínimo: ${minRequired}) ⚠️` : `/${minRequired}`}`);
        console.log(`⏰ Hora configurada: ${BingoConfig.autoStart.scheduledTime} | Hora actual: ${now.format('HH:mm')}`);
        console.log(`🎁 Premios disponibles: ${st.prizes.length}`);
        console.log(`⏰ Hora de inicio: ${new Date().toLocaleString()}`);
        console.log(`${'='.repeat(60)}\n`);
      }

      createNumberFeeder(id, io);
      res.json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: "Error al iniciar el bingo" });
    }
  });

  // POST /bingo/:id/stop - Detener bingo (SIN AUTENTICACIÓN - Para pruebas)
  app.post("/bingo/:id/stop", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const st = activeBingos.get(id);
      
      await prisma.bingo.update({
        where: { id },
        data: {
          is_started: false,
          is_finished: true,
        },
      });

      if (st) st.is_started = false;

      // 🛑 LOG: Fin del juego (manual - sin autenticación para pruebas)
      console.log(`\n${'='.repeat(60)}`);
      console.log(`[BINGO ${id}] 🛑 JUEGO DETENIDO MANUALMENTE (PRUEBA - Sin autenticación)`);
      console.log(`👤 Detenido por: Usuario de prueba`);
      console.log(`🎱 Números cantados: ${st?.numbersPlayed.sequence.length || 0}/75`);
      console.log(`🏆 Ganadores totales: ${st?.winners.length || 0}`);
      console.log(`⏰ Hora de finalización: ${new Date().toLocaleString()}`);
      console.log(`${'='.repeat(60)}\n`);

      // Notificar a todos los jugadores que el bingo terminó
      io.to(roomName(id)).emit("bingo_finished", {
        reason: "Bingo detenido manualmente por el administrador",
      });

      res.json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: "Error al detener el bingo" });
    }
  });
}

