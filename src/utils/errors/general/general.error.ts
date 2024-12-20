import { getReasonPhrase } from "http-status-codes";
import { GeneralErrorParams, GeneralErrorResponse } from "./type";
import HttpStatusCode from "http-status-codes";

export const generalErrorObject = (
  information: GeneralErrorParams
): GeneralErrorResponse => {
  const { message, status, req } = information;
  return {
    message: message ? message : "Error",
    status: status ? status : HttpStatusCode.INTERNAL_SERVER_ERROR,
    descript: getReasonPhrase(
      status ? status : HttpStatusCode.INTERNAL_SERVER_ERROR
    ),
    url: req.originalUrl,
  };
};
