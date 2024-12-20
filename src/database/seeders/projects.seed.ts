import { ProjectsModel } from "../schemas/project.schema";
import { ProjectsRelationUsersModel } from "../schemas/project_relation_users.schema";
import { UsersModel } from "../schemas/user.schema";

export const ProjectSeeders = async () => {
  const data = {
    descript: "descripcion del proyecto",
    name: "proyecto 1",
  };

  const project = await ProjectsModel.create(data);

  const users = await UsersModel.find();

  await ProjectsRelationUsersModel.create(
    users.map((user) => ({
      project_id: project.id,
      user_id: user.id,
    }))
  );

  console.log("project seeders finish");
};
