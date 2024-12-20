import { Handler } from "express";
import { CreateProjectBody } from "./types";
import { createProjectServices } from "../../services";

export const createProjectController: Handler = async (req, res) => {
  const data = req.body as CreateProjectBody;

  const createProject = await createProjectServices(req, data);

  res.status(createProject.status as number).json(createProject);
};
