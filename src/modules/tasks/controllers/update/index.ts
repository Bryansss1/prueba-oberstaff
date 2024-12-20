import { Handler } from "express";
import { UpdateTaskBody } from "./types";
import { updateTaskServices } from "../../services";

export const updateTaskController: Handler = async (req, res) => {
  const data = req.body as UpdateTaskBody;
  const id = req.params.id;

  const updateTask = await updateTaskServices(req, data, id);

  res.status(updateTask.status as number).json(updateTask);
};
