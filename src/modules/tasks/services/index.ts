import { Request } from "express";
import { TasksModel } from "../../../database/schemas/task.schema";
import { generalResponseObject } from "../../../utils/response/general/general.response";
import { CreateTaskBody } from "../controllers/create/types";
import HttpStatusCode from "http-status-codes";
import { UpdateTaskBody } from "../controllers/update/types";
import { generalErrorObject } from "../../../utils/errors/general/general.error";
import { GetAllFilterQuerys, GetTaskByNameOrDescript } from "./types";

export const createTaskServices = async (
  req: Request,
  data: CreateTaskBody
) => {
  const createTask = await TasksModel.create({ ...data });

  return generalResponseObject({
    req,
    body: createTask,
    status: HttpStatusCode.CREATED,
  });
};

export const updateTaskServices = async (
  req: Request,
  data: UpdateTaskBody,
  id: string
) => {
  const updateTask = await TasksModel.findOneAndUpdate(
    { _id: id },
    { ...data },
    { returnOriginal: false }
  );

  if (!updateTask) {
    return generalErrorObject({
      req,
      message: "Task not found",
      status: HttpStatusCode.NOT_FOUND,
    });
  }

  return generalResponseObject({
    req,
    body: updateTask,
    status: HttpStatusCode.OK,
  });
};

export const deleteTaskServices = async (req: Request, id: string) => {
  const deleteTask = await TasksModel.findOneAndDelete({ _id: id });

  if (!deleteTask) {
    return generalErrorObject({
      req,
      message: "Task not found",
      status: HttpStatusCode.NOT_FOUND,
    });
  }

  return generalResponseObject({
    req,
    body: { message: "task deleted successfully" },
    status: HttpStatusCode.CREATED,
  });
};

export const getAllTaskServices = async (
  req: Request,
  filters: GetAllFilterQuerys
) => {
  const options: GetAllFilterQuerys = {};
  filters.status ? (options.status = filters.status) : null;
  filters.user_id ? (options.user_id = filters.user_id) : null;
  filters.project_id ? (options.project_id = filters.project_id) : null;

  const getAllTasks = await TasksModel.find({
    ...options,
  });

  return generalResponseObject({
    req,
    body: getAllTasks,
    status: HttpStatusCode.OK,
  });
};
