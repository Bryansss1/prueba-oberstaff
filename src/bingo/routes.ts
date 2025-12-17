// Endpoints REST API para gestión de bingos
import { Express } from "express";
import { Server } from "socket.io";
import { prisma } from "../config/prisma";
import { activeBingos, loadBingo, roomName } from "./state";
import { createNumberFeeder } from "./number-feeder";
import { jwtMiddleware } from "../middlewares/premiddlewares/jwt.middleware";
import { adminOnlyMiddleware } from "../middlewares/premiddlewares/admin.middleware";

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

  // POST /bingo/:id/start - Iniciar bingo (PROTEGIDO - Solo ADMIN)
  app.post("/bingo/:id/start", jwtMiddleware, adminOnlyMiddleware, async (req, res) => {
    try {
      const id = Number(req.params.id);
      await loadBingo(id);
      const st = activeBingos.get(id)!;

      if (!st.is_started) {
        await prisma.bingo.update({ where: { id }, data: { is_started: true } });
        st.is_started = true;
      }

      createNumberFeeder(id, io);
      res.json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: "Error al iniciar el bingo" });
    }
  });

  // POST /bingo/:id/stop - Detener bingo (PROTEGIDO - Solo ADMIN)
  app.post("/bingo/:id/stop", jwtMiddleware, adminOnlyMiddleware, async (req, res) => {
    try {
      const id = Number(req.params.id);
      await prisma.bingo.update({
        where: { id },
        data: {
          is_started: false,
          is_finished: true,
        },
      });

      const st = activeBingos.get(id);
      if (st) st.is_started = false;

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

