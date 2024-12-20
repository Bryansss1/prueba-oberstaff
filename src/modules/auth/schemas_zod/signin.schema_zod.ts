import * as z from "zod";

export const signInSchemaObject = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  phone_number: z.string().optional(),
});
