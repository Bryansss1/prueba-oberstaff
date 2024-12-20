import { Router } from "express";
import { jwtMiddleware } from "../../../../middlewares/premiddlewares";
import { updateTaskController } from "../../controllers/update";

const tasksUpdateRoute = (route: Router, base: string) => {
  route.patch(base + "/update/:id", jwtMiddleware, updateTaskController);
};

export default tasksUpdateRoute;
