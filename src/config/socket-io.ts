// Configuración de Socket.IO con autenticación JWT
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { Config } from "../utils/config/env.config";

export function createSocketServer(httpServer: http.Server): Server {
  const io = new Server(httpServer, {
    cors: { origin: "*" },
    path: Config.SOCKET_PATH,
  });

  // Middleware de autenticación JWT para Socket.IO
  io.use((socket, next) => {
    try {
      const token =
        socket.handshake.auth.token ||
        socket.handshake.headers.authorization?.split(" ")[1] ||
        (socket.handshake.query?.token as string);

      if (!token) {
        return next(new Error("Authentication error: No token provided"));
      }

      const decoded = jwt.verify(token, Config.SECRET_KEY as string) as any;
      const rawUserId = decoded.id ?? decoded.userId ?? decoded.user_id ?? decoded.sub;
      const userId = Number(rawUserId);

      if (!rawUserId || isNaN(userId)) {
        return next(new Error("Authentication error: User ID missing in token"));
      }

      // Adjuntar información del usuario al socket
      socket.data.user = {
        id: userId,
        email: decoded.email,
        ...decoded,
      };

      next();
    } catch (error) {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  return io;
}
