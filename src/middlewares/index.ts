import express, { Express } from "express";
import { corsMiddleware, Morgan } from "./premiddlewares";

export const onPreMiddlewares = (app: Express) => {
  app.use(Morgan, corsMiddleware, express.json());
};
