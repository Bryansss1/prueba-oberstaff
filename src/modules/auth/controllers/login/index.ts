import { Handler } from "express";
import { LoginBody } from "./types";
import HttpStatusCode from "http-status-codes";
import { generalErrorObject } from "../../../../utils/errors/general/general.error";
import { loginUserService } from "../../services/login";

export const loginController: Handler = async (req, res) => {
  const { email, username } = req.body as LoginBody;

  if (!email && !username) {
    const errorResponse = generalErrorObject({
      req,
      message: "Error, At least one username or email is required to log in.",
      status: HttpStatusCode.BAD_REQUEST,
    });
    res.status(HttpStatusCode.BAD_REQUEST).json(errorResponse);
    return;
  }

  const loginUser = await loginUserService(req, req.body as LoginBody);

  res.status(loginUser.status as number).json(loginUser);
};
