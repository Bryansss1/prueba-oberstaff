import moongose from "mongoose";
import { Config } from "../utils/config/env.config";

export const mongoDbConnection = async () => {
  try {
    const connection = await moongose.connect(Config.DATABASE_URL);
    console.log("Base de datos de mongodb en linea!!!");
    return connection;
  } catch (error: any) {
    console.log(
      `Base de datos de mongodb no esta linea (error:${error.message})!!!`
    );
    return null;
  }
};

export const mongoDbConnectionClose = async () => {
  try {
    await moongose.connection.close();
    console.log("Mongoose disconnected on app termination");
  } catch (error: any) {
    console.log(`Base de datos de mongodb (error:${error.message})!!!`);
    return null;
  }
};
