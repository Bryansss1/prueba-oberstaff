import { Handler } from "express";
import { CreateTaskBody } from "./types";
import { createTaskServices } from "../../services";

export const createTaskController: Handler = async (req, res) => {
  const data = req.body as CreateTaskBody;

  const createTask = await createTaskServices(req, data);

  res.status(createTask.status as number).json(createTask);
};
