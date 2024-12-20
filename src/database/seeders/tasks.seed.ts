import { ProjectsModel } from "../schemas/project.schema";
import { TasksModel } from "../schemas/task.schema";
import { UsersModel } from "../schemas/user.schema";
export const TasksSeeders = async () => {
  const findProject = await ProjectsModel.findOne({
    name: "proyecto 1",
  });

  if (!findProject) return;

  const findUser = await UsersModel.findOne({
    username: "brysanabria1",
  });

  if (!findUser) return;

  const data = [
    {
      name: "tarea1",
      descript: "crear cosas",
      project_id: findProject.id,
      user_id: findUser.id,
    },
    {
      name: "tarea2",
      descript: "editar cosas",
      project_id: findProject.id,
      user_id: findUser.id,
    },
    {
      name: "tarea3",
      descript: "eliminar cosas",
      project_id: findProject.id,
      user_id: findUser.id,
    },
  ];

  const tasks = await TasksModel.create(data);

  console.log("tasks seeders finish");
};
