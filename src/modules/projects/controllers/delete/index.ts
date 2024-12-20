import { Handler } from "express";
import {
  deleteProjectServices,
  getAllProjectsServices,
  getOneProjectsServices,
} from "../../services";

export const deleteProjectController: Handler = async (req, res) => {
  const id = req.params.id;

  const deleteOneProject = await deleteProjectServices(req, id);

  res.status(deleteOneProject.status as number).json(deleteOneProject);
};
