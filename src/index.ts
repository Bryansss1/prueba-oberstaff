// Punto de entrada principal del servidor de bingo
import "dotenv/config";
import express from "express";
import { BingoConfig } from "./config/bingo.config";
import http from "http";
import cors from "cors";
import { createSocketServer } from "./config/socket-io";
import { registerBingoRoutes } from "./bingo/routes";
import { registerSocketHandlers } from "./bingo/socket-handlers";
import { setupSwagger } from "./config/swagger";
import { Config } from "./utils/config/env.config";
import { prisma } from "./config/prisma";
import {
  getBingoSchedulerStatus,
  markBingoSchedulerError,
  startBingoScheduler,
  stopBingoScheduler,
} from "./bingo/bingo-scheduler";
import {
  stopAllNumberFeeders,
  waitForNumberFeedersToDrain,
} from "./bingo/number-feeder";

// Configurar Express
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});

app.get("/ready", async (_request, response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    const schedulerStatus = getBingoSchedulerStatus();
    const schedulerReady = ["ready", "disabled"].includes(schedulerStatus);

    if (!schedulerReady) {
      response.status(503).json({ status: "not_ready", schedulerStatus });
      return;
    }

    response.status(200).json({ status: "ready", schedulerStatus });
  } catch (error) {
    console.error("❌ Readiness check falló:", error);
    response.status(503).json({ status: "not_ready" });
  }
});

// Crear servidor HTTP
const server = http.createServer(app);

// Crear servidor Socket.IO
const io = createSocketServer(server);

// Registrar manejadores de Socket.IO
registerSocketHandlers(io);

// Iniciar scheduler de auto-start de bingos (async)
startBingoScheduler(io).catch((error) => {
  markBingoSchedulerError();
  console.error("❌ Error al iniciar scheduler de bingos:", error);
});

// Registrar rutas REST API
registerBingoRoutes(app, io);

// Configurar Swagger UI
setupSwagger(app);
//
// Iniciar servidor
const PORT = Config.PORT;
const httpServer = server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(
    `🎮 Modo bingo: ${BingoConfig.gameMode} (BINGO_MODE=${process.env.BINGO_MODE || "no definido"})`
  );
  console.log(`📚 Swagger UI disponible en http://localhost:${PORT}/api-docs`);
  console.log(
    `📄 OpenAPI JSON disponible en http://localhost:${PORT}/api-docs.json`
  );
});

let shuttingDown = false;

const shutdown = async (signal: string) => {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`\n🛑 Recibido ${signal}; iniciando apagado controlado...`);

  stopBingoScheduler();
  stopAllNumberFeeders();
  await waitForNumberFeedersToDrain();
  io.close();

  await new Promise<void>((resolve) => {
    httpServer.close(() => resolve());
  });

  await prisma.$disconnect();
  console.log("✅ Servidor cerrado correctamente");
};

process.once("SIGTERM", () => {
  shutdown("SIGTERM").catch((error) => {
    console.error("❌ Error durante SIGTERM:", error);
    process.exitCode = 1;
  });
});

process.once("SIGINT", () => {
  shutdown("SIGINT").catch((error) => {
    console.error("❌ Error durante SIGINT:", error);
    process.exitCode = 1;
  });
});
