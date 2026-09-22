// Configuración de Socket.IO con autenticación JWT
import http from "http";
import { Server } from "socket.io";
import { prisma } from "./prisma";
import { Config } from "../utils/config/env.config";
import {
  extractBearerToken,
  resolveLegacyPrincipal,
} from "../auth/legacy-principal";

export function createSocketServer(httpServer: http.Server): Server {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
    path: Config.SOCKET_PATH,
  });

  // Middleware de autenticación JWT para Socket.IO
  io.use(async (socket, next) => {
    try {
      const handshakeToken = socket.handshake.auth?.token;
      const token =
        (typeof handshakeToken === "string" ? handshakeToken : null) ||
        extractBearerToken(socket.handshake.headers.authorization);

      if (!token) {
        return next(new Error("Authentication error: No token provided"));
      }

      const principal = resolveLegacyPrincipal(token, Config.SECRET_KEY);
      const user = await prisma.user.findUnique({
        where: { id: principal.id },
        select: {
          id: true,
          email: true,
          role: true,
          names: true,
          last_names: true,
        },
      });

      if (!user) {
        return next(new Error("Authentication error: Account inactive"));
      }

      // El JWT identifica al usuario; los datos operativos se refrescan desde
      // la BD para que cambios de rol o desactivaciones tengan efecto en la
      // próxima conexión sin esperar a que expire el token.
      socket.data.user = {
        ...principal,
        ...user,
      };

      next();
    } catch {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  return io;
}
