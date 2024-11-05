import { z } from "zod";

const createSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  imageUrl: z.string(),
  email: z.string(),
});

const editSchema = z.object({
  id: z.string(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  cnp: z.string().min(13),
  isCompleted: z.boolean(),
});

export { createSchema, editSchema };
