import * as z from "zod";

export const loginSchemaObject = z.object({
  email: z.string().email().optional(),
  username: z.string().optional(),
  password: z.string(),
});
