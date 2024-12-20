import { UsersModel } from "../../../../database/schemas/user.schema";
import { FilterOptionsUser, LoginBody } from "../../controllers/login/types";
import { generalErrorObject } from "../../../../utils/errors/general/general.error";
import HttpStatusCode from "http-status-codes";
import { Request } from "express";
import { compareSync } from "bcrypt";
import { generateJwt } from "./functions";
import { generalResponseObject } from "../../../../utils/response/general/general.response";

export const loginUserService = async (req: Request, data: LoginBody) => {
  const { password, email, username } = data;

  const options: FilterOptionsUser = {};

  email ? (options.email = email) : undefined;
  username ? (options.username = username) : undefined;

  const findUser = await UsersModel.findOne(options);

  if (!findUser) {
    return generalErrorObject({
      req,
      message: "User not found",
      status: HttpStatusCode.NOT_FOUND,
    });
  }

  const verifyPassword = compareSync(password, findUser.password);

  if (!verifyPassword) {
    return generalErrorObject({
      req,
      message: "Password Incorrect",
      status: HttpStatusCode.CONFLICT,
    });
  }

  const jwt = generateJwt({
    email: findUser.email,
    username: findUser.username,
    id: findUser.id,
  });

  return generalResponseObject({
    req,
    body: { token: jwt },
    status: HttpStatusCode.CREATED,
  });
};
