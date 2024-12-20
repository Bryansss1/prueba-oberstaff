import { Request } from "express";

export type GeneralResponseParams = {
  req: Request;
  body?: any;
  status?: number | string;
};

export type GeneralResponse = {
  body?: any;
  status: number | string;
  url: string;
};
