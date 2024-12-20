import { Router } from "express";
import { jwtMiddleware } from "../../../../middlewares/premiddlewares";
import { deleteProjectController } from "../../controllers/delete";

const projectsDeleteRoute = (route: Router, base: string) => {
  route.delete(base + "/delete/:id", jwtMiddleware, deleteProjectController);
};

export default projectsDeleteRoute;
