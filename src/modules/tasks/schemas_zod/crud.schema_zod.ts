import * as z from "zod";

export const createTaskSchemaObject = z.object({
  descript: z.string(),
  name: z.string(),
  project_id: z.string(),
  status: z.enum(["IN_PROGRESS", "COMPLETED", "PENDING"]).optional(),
  user_id: z.string().optional(),
});

export const updateTaskSchemaObject = z.object({
  descript: z.string().optional(),
  name: z.string().optional(),
  status: z.enum(["IN_PROGRESS", "COMPLETED", "PENDING"]).optional(),
  user_id: z.string().optional(),
});
