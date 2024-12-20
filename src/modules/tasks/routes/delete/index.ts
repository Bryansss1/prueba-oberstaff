import { Router } from "express";
import { jwtMiddleware } from "../../../../middlewares/premiddlewares";

import { deleteTaskController } from "../../controllers/delete";

const tasksDeleteRoute = (route: Router, base: string) => {
  route.delete(base + "/delete/:id", jwtMiddleware, deleteTaskController);
};

export default tasksDeleteRoute;
