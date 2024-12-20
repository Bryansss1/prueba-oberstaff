import { Request } from "express";
import { ProjectsModel } from "../../../database/schemas/project.schema";
import { CreateProjectBody } from "../controllers/create/types";
import HttpStatusCode from "http-status-codes";
import { generalResponseObject } from "../../../utils/response/general/general.response";
import { UpdateProjectBody } from "../controllers/update/types";
import { generalErrorObject } from "../../../utils/errors/general/general.error";
import { ProjectsRelationUsersModel } from "../../../database/schemas/project_relation_users.schema";
import { UsersModel } from "../../../database/schemas/user.schema";
import { TasksModel } from "../../../database/schemas/task.schema";

export const createProjectServices = async (
  req: Request,
  data: CreateProjectBody
) => {
  const { users, ...restData } = data;

  const project = await ProjectsModel.create({
    ...restData,
  });

  if (users) {
    await ProjectsRelationUsersModel.create(
      users.map((user) => ({
        project_id: project.id,
        user_id: user,
      }))
    );
  }

  return generalResponseObject({
    req,
    body: project,
    status: HttpStatusCode.CREATED,
  });
};

export const updateProjectServices = async (
  req: Request,
  data: UpdateProjectBody,
  id: string
) => {
  const { users, ...restData } = data;

  const updateProject = await ProjectsModel.findOneAndUpdate(
    { _id: id },
    { ...restData },
    {
      returnOriginal: false,
    }
  );

  if (!updateProject) {
    return generalErrorObject({
      req,
      message: "Project not found",
      status: HttpStatusCode.NOT_FOUND,
    });
  }

  if (users) {
    await ProjectsRelationUsersModel.deleteMany({
      project_id: id,
    });

    await ProjectsRelationUsersModel.create(
      users.map((user) => ({
        project_id: id,
        user_id: user,
      }))
    );
  }

  return generalResponseObject({
    req,
    body: updateProject,
    status: HttpStatusCode.OK,
  });
};

export const getAllProjectsServices = async (req: Request) => {
  const getAllProjects = await ProjectsModel.find();

  return generalResponseObject({
    req,
    body: getAllProjects,
    status: HttpStatusCode.OK,
  });
};

export const getOneProjectsServices = async (req: Request, id: string) => {
  const getOneProject = await ProjectsModel.findById({
    _id: id,
  });

  if (!getOneProject) {
    return generalErrorObject({
      req,
      message: "Project not found",
      status: HttpStatusCode.NOT_FOUND,
    });
  }

  const usersRelatedWithProject = await ProjectsRelationUsersModel.find({
    project_id: id,
  });

  const users: any[] = [];

  if (usersRelatedWithProject.length > 0) {
    await Promise.all(
      usersRelatedWithProject.map(async (u) => {
        const user = await UsersModel.findOne(
          {
            _id: u.user_id,
          },
          { password: 0 }
        );
        if (user) {
          users.push(user);
        }
      })
    );
  }

  const dataFormat = { project: getOneProject, users };

  return generalResponseObject({
    req,
    body: dataFormat,
    status: HttpStatusCode.OK,
  });
};

export const deleteProjectServices = async (req: Request, id: string) => {
  await TasksModel.deleteMany({
    project_id: id,
  });

  await ProjectsRelationUsersModel.deleteMany({
    project_id: id,
  });

  await ProjectsModel.deleteOne({
    _id: id,
  });

  return generalResponseObject({
    req,
    body: { message: "project deleted successfully" },
    status: HttpStatusCode.OK,
  });
};
