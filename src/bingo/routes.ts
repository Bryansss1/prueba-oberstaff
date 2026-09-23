// Endpoints REST API para gestión de bingos
import { Express } from "express";
import { Server } from "socket.io";
import { prisma } from "../config/prisma";
import { activeBingos, loadBingo, roomName } from "./state";
import { createNumberFeeder } from "./number-feeder";
import { BingoConfig } from "../config/bingo.config";
import {
  bingoOperatorMiddleware,
  jwtMiddleware,
} from "../middlewares/premiddlewares";

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
        game_mode: BingoConfig.gameMode,
      });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el bingo" });
    }
  });

  // POST /bingo/:id/start - Iniciar bingo (ADMIN u OPERADOR)
  app.post("/bingo/:id/start", jwtMiddleware, bingoOperatorMiddleware, async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "bingoId inválido" });
        return;
      }
      await loadBingo(id);
      const st = activeBingos.get(id);

      if (!st) {
        res.status(404).json({ error: "Bingo no encontrado" });
        return;
      }

      if (!st.is_started) {
        const result = await prisma.bingo.updateMany({
          where: {
            id,
            deleted_at: null,
            is_started: false,
            is_finished: { not: true },
            is_pause: { not: true },
          },
          data: { is_started: true },
        });

        if (result.count === 0) {
          res.status(409).json({
            error: "El bingo no está disponible para iniciar",
          });
          return;
        }
        st.is_started = true;

        // Importar módulos necesarios para logging
        const { getActiveParticipantsCount } = await import("./state.js");
        const { BingoConfig } = await import("../config/bingo.config.js");
        const moment = (await import("moment-timezone")).default;

        const participants = await getActiveParticipantsCount(id);
        const minRequired = st.min_number_of_participants || 0;
        const now = moment().tz(BingoConfig.autoStart.timezone);

        // 👨‍💼 LOG: Inicio manual autorizado
        console.log(`\n${"=".repeat(60)}`);
        console.log(
          `[BINGO ${id}] 👨‍💼 INICIO MANUAL AUTORIZADO`
        );
        console.log(`👤 Iniciado por: usuario ${req.user?.id}`);
        console.log(
          `👥 Participantes actuales: ${participants}${participants < minRequired ? ` (mínimo: ${minRequired}) ⚠️` : `/${minRequired}`}`
        );
        console.log(
          `⏰ Hora configurada: ${BingoConfig.autoStart.scheduledTime} | Hora actual: ${now.format("HH:mm")}`
        );
        console.log(`🎁 Premios disponibles: ${st.prizes.length}`);
        console.log(`⏰ Hora de inicio: ${new Date().toLocaleString()}`);
        console.log(`${"=".repeat(60)}\n`);
      }

      createNumberFeeder(id, io);
      res.json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: "Error al iniciar el bingo" });
    }
  });

  // POST /bingo/:id/stop - Detener bingo (ADMIN u OPERADOR)
  app.post("/bingo/:id/stop", jwtMiddleware, bingoOperatorMiddleware, async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "bingoId inválido" });
        return;
      }
      const st = activeBingos.get(id);

      // updateMany con guardas: `update` tiraba P2025 (500) si el bingo no
      // existía, y no respetaba soft-delete ni el estado del juego.
      const result = await prisma.bingo.updateMany({
        where: {
          id,
          deleted_at: null,
          is_finished: { not: true },
        },
        data: {
          is_started: false,
          is_finished: true,
          is_pause: false,
        },
      });

      if (result.count === 0) {
        res.status(409).json({ error: "El bingo no está activo o no existe" });
        return;
      }

      if (st) {
        st.is_started = false;
        if (st.feederInterval) {
          clearInterval(st.feederInterval);
          st.feederInterval = undefined;
        }
      }

        // 🛑 LOG: Fin del juego manual autorizado
      console.log(`\n${"=".repeat(60)}`);
      console.log(
          `[BINGO ${id}] 🛑 JUEGO DETENIDO MANUALMENTE (AUTORIZADO)`
      );
        console.log(`👤 Detenido por: usuario ${req.user?.id}`);
      console.log(
        `🎱 Números cantados: ${st?.numbersPlayed.sequence.length || 0}/75`
      );
      console.log(`🏆 Ganadores totales: ${st?.winners.length || 0}`);
      console.log(`⏰ Hora de finalización: ${new Date().toLocaleString()}`);
      console.log(`${"=".repeat(60)}\n`);

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
