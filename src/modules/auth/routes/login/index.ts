import { Router } from "express";
import { loginController } from "../../controllers/login";
import { ZodMiddleware } from "../../../../middlewares/premiddlewares";
import { loginSchemaObject } from "../../schemas_zod/login.schema_zod";

const authLoginRoute = (route: Router, base: string) => {
  route.post(
    base + "/login/",
    ZodMiddleware({
      body: loginSchemaObject,
    }),
    loginController
  );
};

export default authLoginRoute;
