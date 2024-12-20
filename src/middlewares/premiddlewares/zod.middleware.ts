import { Handler } from "express";
import { ZodObject, ZodType, ZodTypeDef } from "zod";

type SchameType = {
  body?: ZodType<any, ZodTypeDef, any>;
  params?: ZodObject<any>;
  query?: ZodObject<any>;
};

export const ZodMiddleware = (schema: SchameType): Handler => {
  return (req, res, next) => {
    try {
      const { body, params, query } = schema;

      if (body) body.parse(req.body);

      if (params) params.parse(req.params);

      if (query) query.parse(req.query);

      return next();
    } catch (error: any) {
      return next(error.message);
    }
  };
};
