// Configuración de Swagger/OpenAPI
import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { getSwaggerSpec } from "./swagger-spec";

/**
 * Configuración de Swagger UI
 */
export function setupSwagger(app: Express): void {
  const swaggerSpec = getSwaggerSpec();

  // Servir la especificación OpenAPI en JSON
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  // Configurar Swagger UI
  const swaggerUiOptions = {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Bingo API Documentation",
  };

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiOptions)
  );
}
