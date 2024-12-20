import { Router } from "express";
import authLoginRoute from "./login";
import authSignInRoute from "./signin";

const baseUrl = "/auth";
const authRoutes = Router();

authLoginRoute(authRoutes, baseUrl);
authSignInRoute(authRoutes, baseUrl);

export default authRoutes;
