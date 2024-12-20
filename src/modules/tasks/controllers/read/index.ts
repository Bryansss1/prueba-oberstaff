import { Handler } from "express";
import { getAllTaskServices, updateTaskServices } from "../../services";
import { GetAllFilterQuerys } from "../../services/types";

export const getAllTaskController: Handler = async (req, res) => {
  const filter: GetAllFilterQuerys = {
    status: req.query.status as "IN_PROGRESS" | "COMPLETED" | "PENDING",
    user_id: req.query.user_id,
    project_id: req.query.project_id,
  };

  const getAllTask = await getAllTaskServices(req, filter);

  res.status(getAllTask.status as number).json(getAllTask);
};
