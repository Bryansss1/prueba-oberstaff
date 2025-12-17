// Middleware JWT mejorado que extrae información del usuario
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { generalErrorObject } from "../../utils/errors/general/general.error";
import HttpStatusCode from "http-status-codes";
import { Config } from "../../utils/config/env.config";

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

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, Config.SECRET_KEY as string) as any;
    
    // Adjuntar información del usuario al request
    req.user = {
      id: decoded.id || decoded.userId,
      email: decoded.email,
      role: decoded.role,
      names: decoded.names,
      last_names: decoded.last_names,
      ...decoded,
    };

    next();
  } catch (error: any) {
    console.log("error jwt middleware:", error.message);
    res.status(failedResponse.status).json(generalErrorObject(failedResponse));
  }
};
