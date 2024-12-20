import * as dotenv from "dotenv";
import { Express } from "express";

dotenv.config();

const createConfig = () => {
  const envs = {
    SECRET_KEY: process.env.SECRET_KEY || "palabra_secreta",
    DATABASE_URL: process.env.DATABASE_URL || "",
    PORT: Number(process.env.PORT) || 3000,
    VERSION: process.env.VERSION || "v1",
    URL: process.env.URL || "localhost:3000",
  };

  const onAppEnv = (app: Express) => {
    const envEntrys = Object.entries(envs);

    for (const [key, value] of envEntrys) {
      app.set(key, value);
    }
  };

  return { ...envs, onAppEnv };
};

export const Config = createConfig();
