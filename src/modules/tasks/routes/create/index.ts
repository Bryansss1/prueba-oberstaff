import { Router } from "express";
import {
  jwtMiddleware,
  ZodMiddleware,
} from "../../../../middlewares/premiddlewares";
import { createTaskSchemaObject } from "../../schemas_zod/crud.schema_zod";
import { createTaskController } from "../../controllers/create";

const tasksCreateRoute = (route: Router, base: string) => {
  route.post(
    base + "/create/",
    jwtMiddleware,
    ZodMiddleware({
      body: createTaskSchemaObject,
    }),
    createTaskController
  );
};

export default tasksCreateRoute;
