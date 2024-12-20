import { Router } from "express";
import HttpStatusCode from "http-status-codes";

const ExampleRouter = Router();

ExampleRouter.get("/hi", (req, res) => {
  res.status(HttpStatusCode.OK).json({ message: "hello user!!" });
});

export default ExampleRouter;
