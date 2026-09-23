import jwt, { type JwtPayload } from "jsonwebtoken";

export type LegacyPrincipal = JwtPayload & {
  id: number;
  email: string;
  role: string;
  names: string;
  last_names: string;
};

function readTokenId(payload: JwtPayload): number {
  const rawUserId = payload.id ?? payload.userId ?? payload.user_id ?? payload.sub;
  const userId = Number(rawUserId);

  if (!rawUserId || !Number.isSafeInteger(userId) || userId <= 0) {
    throw new Error("JWT principal id is missing or invalid");
  }

  return userId;
}

export function extractBearerToken(header?: string): string | null {
  if (!header) return null;

  const match = /^Bearer\s+(.+)$/i.exec(header.trim());
  return match?.[1] ?? null;
}

export function resolveLegacyPrincipal(
  token: string,
  secret: string
): LegacyPrincipal {
  // Algoritmo explícito: nunca aceptar `none` ni confusión HS/RS.
  const decoded = jwt.verify(token, secret, { algorithms: ["HS256"] });

  if (!decoded || typeof decoded !== "object") {
    throw new Error("JWT payload is invalid");
  }

  const payload = decoded as JwtPayload;

  return {
    ...payload,
    id: readTokenId(payload),
    email: typeof payload.email === "string" ? payload.email : "",
    role: typeof payload.role === "string" ? payload.role : "",
    names: typeof payload.names === "string" ? payload.names : "",
    last_names:
      typeof payload.last_names === "string" ? payload.last_names : "",
  };
}
