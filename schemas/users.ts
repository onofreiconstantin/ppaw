import { z } from "zod";

const editSchema = z.object({
  id: z.string(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  cnp: z.string().min(13),
  isCompleted: z.boolean(),
});

export { editSchema };
