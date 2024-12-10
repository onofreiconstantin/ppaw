import { z } from "zod";

const createSchema = z.object({
  userId: z.string(),
  title: z.string().max(50),
  content: z.string().max(500),
});

export { createSchema };
