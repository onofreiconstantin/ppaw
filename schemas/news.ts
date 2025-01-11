import { z } from "zod";

const createSchema = z.object({
  userId: z.string(),
  title: z.string().min(1).max(50),
  content: z.string().min(1).max(500),
});

const editSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(50),
  content: z.string().min(1).max(500),
});

export { createSchema, editSchema };
