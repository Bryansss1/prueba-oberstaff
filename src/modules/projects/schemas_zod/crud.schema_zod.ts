import * as z from "zod";

export const createProjectSchemaObject = z.object({
  descript: z.string().optional(),
  name: z.string(),
  status: z.enum(["IN_PROGRESS", "COMPLETED", "PENDING"]).optional(),
  users: z.array(z.string()).optional(), //array de id de usuarios
});

export const updateProjectSchemaObject = z.object({
  descript: z.string().optional(),
  name: z.string().optional(),
  status: z.enum(["IN_PROGRESS", "COMPLETED", "PENDING"]).optional(),
  users: z.array(z.string()).optional(), //array de id de usuarios
});
