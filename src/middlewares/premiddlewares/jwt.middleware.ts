// Middleware JWT mejorado que extrae información del usuario
import { Request, Response, NextFunction } from "express";
import { generalErrorObject } from "../../utils/errors/general/general.error";
import HttpStatusCode from "http-status-codes";
import { Config } from "../../utils/config/env.config";
import {
  extractBearerToken,
  resolveLegacyPrincipal,
  type LegacyPrincipal,
} from "../../auth/legacy-principal";

// Extender Express Request para incluir user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: string;
        names: string;
        last_names: string;
        [key: string]: any;
      };
    }
  }
}

export const jwtMiddleware = (
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
    
    const principal: LegacyPrincipal = resolveLegacyPrincipal(
      token,
      Config.SECRET_KEY
    );
    req.user = principal;

    next();
  } catch (error: any) {
    console.log("error jwt middleware:", error.message);
    res.status(failedResponse.status).json(generalErrorObject(failedResponse));
  }
};
