import { Router } from "express";
import { ZodMiddleware } from "../../../../middlewares/premiddlewares";
import { signInSchemaObject } from "../../schemas_zod/signin.schema_zod";
import { signInController } from "../../controllers/signin";

const authSignInRoute = (route: Router, base: string) => {
  route.post(
    base + "/sign_in/",
    ZodMiddleware({
      body: signInSchemaObject,
    }),
    signInController
  );
};

export default authSignInRoute;
