import { Router } from "express";
import { jwtMiddleware } from "../../../../middlewares/premiddlewares";
import { getAllTaskController } from "../../controllers/read";

const tasksReadRoute = (route: Router, base: string) => {
  route.get(base + "/", jwtMiddleware, getAllTaskController);
};

export default tasksReadRoute;
