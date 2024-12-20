import { Express } from "express";
import ExampleRouter from "./example/route";
import authRoutes from "./auth/routes";
import { Config } from "../utils/config/env.config";
import projectsRoutes from "./projects/routes";
import tasksRoutes from "./tasks/routes";

const apiVersion = Config.VERSION;

const moduleRoutes = (app: Express) => {
  app.use(`/api/${apiVersion}`, ExampleRouter);
  app.use(`/api/${apiVersion}`, authRoutes);
  app.use(`/api/${apiVersion}`, projectsRoutes);
  app.use(`/api/${apiVersion}`, tasksRoutes);
};

export default moduleRoutes;
