import { Handler } from "express";
import { getAllProjectsServices, getOneProjectsServices } from "../../services";

export const getAllProjectController: Handler = async (req, res) => {
  const getAllProjects = await getAllProjectsServices(req);

  res.status(getAllProjects.status as number).json(getAllProjects);
};

export const getOneProjectController: Handler = async (req, res) => {
  const id = req.params.id;

  const getOneProject = await getOneProjectsServices(req, id);

  res.status(getOneProject.status as number).json(getOneProject);
};
