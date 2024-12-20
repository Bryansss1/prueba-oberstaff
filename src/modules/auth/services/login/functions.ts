import { sign } from "jsonwebtoken";
import { Config } from "../../../../utils/config/env.config";

export type DataJwt = {
  id: string;
  email: string;
  username: string;
};

export const generateJwt = (data: DataJwt) => {
  const token = sign({ ...data }, Config.SECRET_KEY, {
    expiresIn: "1h",
    algorithm: "HS512",
  });
  return token;
};
