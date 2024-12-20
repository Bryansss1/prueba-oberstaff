import { Handler } from "express";
import { deleteTaskServices } from "../../services";

export const deleteTaskController: Handler = async (req, res) => {
  const id = req.params.id;

  const deleteTask = await deleteTaskServices(req, id);

  res.status(deleteTask.status as number).json(deleteTask);
};
