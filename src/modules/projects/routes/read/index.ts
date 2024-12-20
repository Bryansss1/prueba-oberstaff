import { Router } from "express";
import { jwtMiddleware } from "../../../../middlewares/premiddlewares";
import {
  getAllProjectController,
  getOneProjectController,
} from "../../controllers/read";

const projectsReadRoute = (route: Router, base: string) => {
  route.get(base + "/:id", jwtMiddleware, getOneProjectController);

  route.get(base + "/", jwtMiddleware, getAllProjectController);
};

export default projectsReadRoute;
