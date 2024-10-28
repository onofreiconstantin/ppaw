import { SubscriptionsType } from "@prisma/client";
import { z } from "zod";

const createSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  time: z.number(),
  type: z.enum(
    Object.values(SubscriptionsType) as [
      SubscriptionsType,
      ...SubscriptionsType[],
    ],
  ),
});

const editSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  time: z.number(),
  type: z.enum(
    Object.values(SubscriptionsType) as [
      SubscriptionsType,
      ...SubscriptionsType[],
    ],
  ),
});

export { createSchema, editSchema };
