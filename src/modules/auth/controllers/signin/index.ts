import { Handler } from "express";
import HttpStatusCode from "http-status-codes";
import { generalErrorObject } from "../../../../utils/errors/general/general.error";
import { loginUserService } from "../../services/login";
import { SigninBody } from "./types";
import {
  signInUserServices,
  verifyIsEmailExistServices,
  verifyIsUsernameExistServices,
} from "../../services/signin";

export const signInController: Handler = async (req, res) => {
  const { email, username } = req.body as SigninBody;

  const verifyIfExistEmail = await verifyIsEmailExistServices(email);
  if (verifyIfExistEmail) {
    res.status(HttpStatusCode.CONFLICT).json(
      generalErrorObject({
        req,
        message: "There is already a user with this email",
        status: HttpStatusCode.CONFLICT,
      })
    );
    return;
  }

  const verifyIfExistUsername = await verifyIsUsernameExistServices(username);

  if (verifyIfExistUsername) {
    res.status(HttpStatusCode.CONFLICT).json(
      generalErrorObject({
        req,
        message: "There is already a user with this username",
        status: HttpStatusCode.CONFLICT,
      })
    );
    return;
  }

  const createUser = await signInUserServices(req, req.body as SigninBody);

  res.status(createUser.status as number).json(createUser);
};
