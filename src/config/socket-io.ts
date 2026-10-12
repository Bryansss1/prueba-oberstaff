// Configuración de Socket.IO con autenticación JWT (legacy + Keycloak)
import http from "http";
import { Server } from "socket.io";
import { Config } from "../utils/config/env.config";
import { extractBearerToken } from "../auth/legacy-principal";
import { resolvePrincipal } from "../auth/principal";

/**
 * Error de autenticación con CÓDIGO estructurado. Socket.IO propaga `err.data`
 * al cliente, así puede distinguir "token vencido" (renovar) de "cuenta
 * inactiva" o de un fallo temporal. Antes TODO se reportaba igual
 * ("Invalid token"), lo que confundía expiración con otros problemas.
 */
function authError(code: string) {
  const err = new Error(`Authentication error: ${code}`) as Error & {
    data?: { code: string };
  };
  err.data = { code };
  return err;
}

function classifyAuthError(error: unknown): string {
  const code = (error as { code?: string } | null)?.code;
  if (code === "ERR_JWT_EXPIRED") return "TOKEN_EXPIRED";

  const message = error instanceof Error ? error.message : "";
  if (message.includes("vinculada a Keycloak")) return "ACCOUNT_NOT_LINKED";
  if (message.includes("no existe o está inactiva")) return "ACCOUNT_INACTIVE";
  if (message.includes("no está verificado")) return "ACCOUNT_EMAIL_UNVERIFIED";
  if (message.includes("otro cliente")) return "TOKEN_INVALID";
  if (message.includes("desactivado") || message.includes("no está configurado"))
    return "AUTH_UNAVAILABLE";

  return "TOKEN_INVALID";
}

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
        return next(authError("TOKEN_REQUIRED"));
      }

      // Acepta JWT legacy y tokens Keycloak. El token identifica al usuario;
      // los datos operativos (rol incluido) se refrescan desde la BD para que
      // cambios de rol o desactivaciones tengan efecto en la próxima conexión
      // sin esperar a que expire el token.
      socket.data.user = await resolvePrincipal(token);

      next();
    } catch (error) {
      next(authError(classifyAuthError(error)));
    }
  });

  return io;
}
