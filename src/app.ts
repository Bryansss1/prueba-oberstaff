import express from "express";
import cors from "cors";
import { Config } from "./utils/config/env.config";
import { onPreMiddlewares } from "./middlewares";
import modulesRoutes from "./modules/";
import { OpenApiBuilder } from "openapi3-ts/oas31";

export function App() {
  const app = express();

  app.use(cors());

  Config.onAppEnv(app);

  // Pre middleware
  onPreMiddlewares(app);

  //
  modulesRoutes(app);

  // Swagger init
  const OpenApi = OpenApiBuilder.create();

  OpenApi.addInfo({
    title: "PRUEBA TECNICA OBERSTAFF",
    description: "Prueba tecnica de oberstaff sobre una api rest",
    contact: {
      name: "API Support",
    },
    license: {
      name: "MIT",
    },
    version: "1.0.0",
  });

  // OpenApiModules(OpenApi, app);

  return app;
}
