import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { generalErrorObject } from "../../utils/errors/general/general.error";
import HttpStatusCode from "http-status-codes";
import { Config } from "../../utils/config/env.config";

export const jwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const faileResponse = {
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
      res.status(faileResponse.status).json(generalErrorObject(faileResponse));
      return;
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, Config.SECRET_KEY as string);

    next();
  } catch (error: any) {
    console.log("error jwt middleware:", error.message);

    res.status(faileResponse.status).json(generalErrorObject(faileResponse));
  }
};
