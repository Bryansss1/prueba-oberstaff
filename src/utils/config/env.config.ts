import * as dotenv from "dotenv";
import { Express } from "express";

dotenv.config();

const createConfig = () => {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error("SECRET_KEY es obligatoria");
  }

  const envs = {
    SECRET_KEY: secretKey,
    DATABASE_URL: process.env.DATABASE_URL || "",
    PORT: Number(process.env.PORT) || 4000,
    VERSION: process.env.VERSION || "v1",
    URL: process.env.URL || "localhost:3000",
    SOCKET_PATH: process.env.SOCKET_PATH || "/socket.io/",
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
