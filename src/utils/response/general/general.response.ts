import { GeneralResponseParams, GeneralResponse } from "./type";

export const generalResponseObject = (
  information: GeneralResponseParams
): GeneralResponse => {
  const { body, status, req } = information;
  return {
    body: body ? body : { data: null },
    status: status ? status : 200,
    url: req.originalUrl,
  };
};
