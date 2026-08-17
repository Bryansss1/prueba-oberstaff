import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "http-status-codes";
import { Role } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { generalErrorObject } from "../../utils/errors/general/general.error";

/** Autoriza los controles manuales del bingo a administradores y operadores vigentes. */
export async function bingoOperatorMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req.user?.id) {
    res.status(HttpStatusCode.UNAUTHORIZED).json(
      generalErrorObject({
        req,
        message: "Unauthorized",
        status: HttpStatusCode.UNAUTHORIZED,
      })
    );
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { role: true, deleted_at: true },
    });

    if (
      !user ||
      user.deleted_at ||
      (user.role !== Role.ADMIN && user.role !== Role.OPERADOR)
    ) {
      res.status(HttpStatusCode.FORBIDDEN).json(
        generalErrorObject({
          req,
          message: "Forbidden: operator access required",
          status: HttpStatusCode.FORBIDDEN,
        })
      );
      return;
    }

    next();
  } catch (error) {
    console.error("error bingo operator middleware:", error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(
      generalErrorObject({
        req,
        message: "Error verificando permisos",
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      })
    );
  }
}
