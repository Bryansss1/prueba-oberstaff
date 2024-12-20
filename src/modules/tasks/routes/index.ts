import { Express, Router } from "express";
import tasksCreateRoute from "./create";
import tasksDeleteRoute from "./delete";
import tasksUpdateRoute from "./update";
import tasksReadRoute from "./read";

const baseUrl = "/tasks";
const tasksRoutes = Router();

tasksCreateRoute(tasksRoutes, baseUrl);
tasksReadRoute(tasksRoutes, baseUrl);
tasksDeleteRoute(tasksRoutes, baseUrl);
tasksUpdateRoute(tasksRoutes, baseUrl);

export default tasksRoutes;
