// Middleware JWT mejorado que extrae información del usuario
import { Request, Response, NextFunction } from "express";
import { generalErrorObject } from "../../utils/errors/general/general.error";
import HttpStatusCode from "http-status-codes";
import { extractBearerToken } from "../../auth/legacy-principal";
import { resolvePrincipal } from "../../auth/principal";

// Extender Express Request para incluir user
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: number;
      email: string;
      role: string;
      names: string;
      last_names: string;
      [key: string]: unknown;
    };
  }
}

export const jwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const failedResponse = {
    req,
    message: "Unauthorized",
    status: HttpStatusCode.UNAUTHORIZED,
  };
  
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.split(" ")[1] ||
      !authHeader.startsWith("Bearer ")
    ) {
      res.status(failedResponse.status).json(generalErrorObject(failedResponse));
      return;
    }

    const token = extractBearerToken(authHeader);
    if (!token) {
      res.status(failedResponse.status).json(generalErrorObject(failedResponse));
      return;
    }
    
    // Acepta JWT legacy y tokens Keycloak. Los datos operativos (rol incluido)
    // se leen de la BD en cada request.
    req.user = await resolvePrincipal(token);

    next();
  } catch (error: unknown) {
    console.log(
      "error jwt middleware:",
      error instanceof Error ? error.message : String(error),
    );
    res.status(failedResponse.status).json(generalErrorObject(failedResponse));
  }
};
