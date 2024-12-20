import { Handler } from "express";
import HttpStatusCode from "http-status-codes";
import { generalErrorObject } from "../../../../utils/errors/general/general.error";
import { UpdateProjectBody } from "./types";
import { updateProjectServices } from "../../services";

export const updateProjectController: Handler = async (req, res) => {
  const data = req.body as UpdateProjectBody;
  const id = req.params.id;
  const updateProject = await updateProjectServices(req, data, id);
  res.status(updateProject.status as number).json(updateProject);
};
