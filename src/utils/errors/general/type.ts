import { Request } from "express";

export type GeneralErrorParams = {
  req: Request;
  message?: string;
  status?: number | string;
};

export type GeneralErrorResponse = {
  message: string;
  status: number | string;
  descript: string;
  url: string;
};
