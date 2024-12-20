import { Request } from "express";
import { UsersModel } from "../../../../database/schemas/user.schema";
import { SigninBody } from "../../controllers/signin/types";
import { generateJwt } from "../login/functions";
import HttpStatusCode from "http-status-codes";
import { generalResponseObject } from "../../../../utils/response/general/general.response";
import { genSaltSync, hashSync } from "bcrypt";

export const verifyIsEmailExistServices = async (email: string) => {
  const isExist = await UsersModel.findOne({
    email,
  });

  if (isExist) {
    return true;
  }
  return false;
};

export const verifyIsUsernameExistServices = async (username: string) => {
  const isExist = await UsersModel.findOne({
    username,
  });

  if (isExist) {
    return true;
  }
  return false;
};

export const signInUserServices = async (req: Request, data: SigninBody) => {
  const salt = genSaltSync(10);

  const createUser = await UsersModel.create({
    ...data,
    password: hashSync(data.password, salt),
  });

  const jwt = generateJwt({
    email: createUser.email,
    username: createUser.username,
    id: createUser.id,
  });

  return generalResponseObject({
    req,
    body: { token: jwt },
    status: HttpStatusCode.CREATED,
  });
};
