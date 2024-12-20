import { Router } from "express";
import {
  jwtMiddleware,
  ZodMiddleware,
} from "../../../../middlewares/premiddlewares";
import { createProjectSchemaObject } from "../../schemas_zod/crud.schema_zod";
import { createProjectController } from "../../controllers/create";

const projectsCreateRoute = (route: Router, base: string) => {
  route.post(
    base + "/create/",
    jwtMiddleware,
    ZodMiddleware({
      body: createProjectSchemaObject,
    }),
    createProjectController
  );
};

export default projectsCreateRoute;
