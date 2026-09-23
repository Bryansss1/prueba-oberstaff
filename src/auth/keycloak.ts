import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";

export type KeycloakTokenPayload = JWTPayload & {
  email?: string;
  email_verified?: boolean;
  azp?: string;
};

export type VerifiedKeycloakPayload = KeycloakTokenPayload & { sub: string };

type JwksResolver = ReturnType<typeof createRemoteJWKSet>;

let jwks: JwksResolver | null = null;
let jwksUri = "";

function getKeycloakConfig() {
  const enabled = process.env.KEYCLOAK_ENABLED === "true";
  const issuer = (process.env.KEYCLOAK_ISSUER || "").replace(/\/$/, "");
  const clientId = process.env.KEYCLOAK_CLIENT_ID || "bingo-app";
  const configuredJwksUri = (process.env.KEYCLOAK_JWKS_URI || "").replace(
    /\/$/,
    "",
  );
  const resolvedJwksUri =
    configuredJwksUri ||
    (issuer ? `${issuer}/protocol/openid-connect/certs` : "");

  return { enabled, issuer, clientId, jwksUri: resolvedJwksUri };
}

export function isKeycloakEnabled(): boolean {
  return getKeycloakConfig().enabled;
}

function getJwks(uri: string): JwksResolver {
  if (!jwks || jwksUri !== uri) {
    jwks = createRemoteJWKSet(new URL(uri));
    jwksUri = uri;
  }

  return jwks;
}

/**
 * Verifica un access token de Keycloak (RS256) contra el JWKS del realm.
 * jose cachea el JWKS remoto y lo vuelve a consultar cuando aparece un `kid`
 * desconocido, así que no hay round-trip por request.
 */
export async function verifyKeycloakToken(
  token: string,
): Promise<VerifiedKeycloakPayload> {
  const { enabled, issuer, clientId, jwksUri: resolvedJwksUri } =
    getKeycloakConfig();

  if (!enabled) {
    throw new Error("Keycloak está desactivado");
  }
  if (!issuer) {
    throw new Error("KEYCLOAK_ISSUER no está configurado");
  }

  const { payload } = await jwtVerify(token, getJwks(resolvedJwksUri), {
    issuer,
    algorithms: ["RS256"],
  });

  const keycloakPayload = payload as KeycloakTokenPayload;

  if (!keycloakPayload.sub) {
    throw new Error("El token no contiene sub");
  }
  if (keycloakPayload.azp !== clientId) {
    throw new Error("El token pertenece a otro cliente");
  }
  if (keycloakPayload.email_verified !== true) {
    throw new Error("El correo del token no está verificado");
  }

  return keycloakPayload as VerifiedKeycloakPayload;
}
