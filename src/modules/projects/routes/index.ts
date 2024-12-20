import { Router } from "express";
import projectsCreateRoute from "./create";
import projectsDeleteRoute from "./delete";
import projectsUpdateRoute from "./update";
import projectsReadRoute from "./read";

const baseUrl = "/projects";
const projectsRoutes = Router();

projectsCreateRoute(projectsRoutes, baseUrl);
projectsDeleteRoute(projectsRoutes, baseUrl);
projectsUpdateRoute(projectsRoutes, baseUrl);
projectsReadRoute(projectsRoutes, baseUrl);

export default projectsRoutes;
