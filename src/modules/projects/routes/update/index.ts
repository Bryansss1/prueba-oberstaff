import { Router } from "express";

import {
  jwtMiddleware,
  ZodMiddleware,
} from "../../../../middlewares/premiddlewares";
import { updateProjectSchemaObject } from "../../schemas_zod/crud.schema_zod";
import { updateProjectController } from "../../controllers/update";

const projectsUpdateRoute = (route: Router, base: string) => {
  route.patch(
    base + "/update/:id",
    jwtMiddleware,
    ZodMiddleware({
      body: updateProjectSchemaObject,
    }),
    updateProjectController
  );
};

export default projectsUpdateRoute;
