import { mongoDbConnection, mongoDbConnectionClose } from "../connection";
import { ProjectSeeders } from "./projects.seed";
import { TasksSeeders } from "./tasks.seed";
import { usersSeeders } from "./users.seed";

(async function InitSeed() {
  mongoDbConnection();

  await usersSeeders();
  await ProjectSeeders();
  await TasksSeeders();

  mongoDbConnectionClose();
})();
