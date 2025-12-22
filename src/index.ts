// Punto de entrada principal del servidor de bingo
import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { createSocketServer } from "./config/socket-io";
import { registerBingoRoutes } from "./bingo/routes";
import { registerSocketHandlers } from "./bingo/socket-handlers";
import { startBingoScheduler } from "./bingo/bingo-scheduler";

// Configurar Express
const app = express();
app.use(cors());
app.use(express.json());

// Crear servidor HTTP
const server = http.createServer(app);

// Crear servidor Socket.IO
const io = createSocketServer(server);

// Registrar manejadores de Socket.IO
registerSocketHandlers(io);

// Iniciar scheduler de auto-start de bingos
startBingoScheduler(io);

// Registrar rutas REST API
registerBingoRoutes(app, io);

// Iniciar servidor
const PORT = process.env.PORT || 4000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
