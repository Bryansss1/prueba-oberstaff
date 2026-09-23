// Configuración de Socket.IO con autenticación JWT (legacy + Keycloak)
import http from "http";
import { Server } from "socket.io";
import { Config } from "../utils/config/env.config";
import { extractBearerToken } from "../auth/legacy-principal";
import { resolvePrincipal } from "../auth/principal";

export function createSocketServer(httpServer: http.Server): Server {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
    path: Config.SOCKET_PATH,
  });

  // Middleware de autenticación para Socket.IO
  io.use(async (socket, next) => {
    try {
      const handshakeToken = socket.handshake.auth?.token;
      const token =
        (typeof handshakeToken === "string" ? handshakeToken : null) ||
        extractBearerToken(socket.handshake.headers.authorization);

      if (!token) {
        return next(new Error("Authentication error: No token provided"));
      }

      // Acepta JWT legacy y tokens Keycloak. El token identifica al usuario;
      // los datos operativos (rol incluido) se refrescan desde la BD para que
      // cambios de rol o desactivaciones tengan efecto en la próxima conexión
      // sin esperar a que expire el token.
      socket.data.user = await resolvePrincipal(token);

      next();
    } catch {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  return io;
}
