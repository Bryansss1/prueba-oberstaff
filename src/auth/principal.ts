import { decodeProtectedHeader } from "jose";
import { prisma } from "../config/prisma";
import { Config } from "../utils/config/env.config";
import { resolveLegacyPrincipal } from "./legacy-principal";
import { isKeycloakEnabled, verifyKeycloakToken } from "./keycloak";

export type AuthType = "legacy" | "keycloak";

export type AppPrincipal = {
  id: number;
  email: string;
  role: string;
  names: string;
  last_names: string;
  authType: AuthType;
};

/**
 * Un token destinado a Keycloak siempre es RS256; el JWT legacy es HS256.
 * Detectarlo por el header evita intentar Keycloak con cada token legacy.
 */
function targetsKeycloak(token: string): boolean {
  try {
    return decodeProtectedHeader(token).alg === "RS256";
  } catch {
    return false;
  }
}

const userSelect = {
  id: true,
  email: true,
  role: true,
  names: true,
  last_names: true,
} as const;

/**
 * Resuelve el principal de la aplicación aceptando ambos emisores durante la
 * migración:
 *
 *   - Keycloak (RS256): valida el token y resuelve `sub -> users.keycloak_sub`.
 *   - Legacy (HS256): valida con SECRET_KEY y resuelve `id -> users.id`.
 *
 * En ambos casos los datos operativos (rol incluido) se leen de la BD, así una
 * desactivación o cambio de rol impacta en la próxima request/conexión sin
 * esperar a que expire el token.
 */
export async function resolvePrincipal(token: string): Promise<AppPrincipal> {
  if (isKeycloakEnabled() && targetsKeycloak(token)) {
    const payload = await verifyKeycloakToken(token);

    const user = await prisma.user.findFirst({
      where: { keycloak_sub: payload.sub, deleted_at: null },
      select: userSelect,
    });

    if (!user) {
      throw new Error("La cuenta no está vinculada a Keycloak");
    }

    return { ...user, authType: "keycloak" };
  }

  const legacy = resolveLegacyPrincipal(token, Config.SECRET_KEY);

  const user = await prisma.user.findFirst({
    where: { id: legacy.id, deleted_at: null },
    select: userSelect,
  });

  if (!user) {
    throw new Error("La cuenta no existe o está inactiva");
  }

  return { ...user, authType: "legacy" };
}
