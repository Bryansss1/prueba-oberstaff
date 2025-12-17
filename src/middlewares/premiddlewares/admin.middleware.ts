// Middleware de autorización por roles
import { Request, Response, NextFunction } from "express";
import { generalErrorObject } from "../../utils/errors/general/general.error";
import HttpStatusCode from "http-status-codes";

/**
 * Middleware que verifica si el usuario tiene el rol de ADMIN
 * Debe usarse después del jwtMiddleware
 */
export const adminOnlyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const forbiddenResponse = {
    req,
    message: "Forbidden: Admin access required",
    status: HttpStatusCode.FORBIDDEN,
  };

  try {
    // Verificar que el usuario esté autenticado
    if (!req.user) {
      res.status(HttpStatusCode.UNAUTHORIZED).json(
        generalErrorObject({
          req,
          message: "Unauthorized",
          status: HttpStatusCode.UNAUTHORIZED,
        })
      );
      return;
    }

    // Verificar que tenga rol de ADMIN
    if (req.user.role !== "ADMIN") {
      res.status(forbiddenResponse.status).json(
        generalErrorObject(forbiddenResponse)
      );
      return;
    }

    next();
  } catch (error: any) {
    console.log("error admin middleware:", error.message);
    res.status(forbiddenResponse.status).json(
      generalErrorObject(forbiddenResponse)
    );
  }
};
