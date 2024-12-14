"use server";

import { ONE_DAY_IN_MS } from "@/utils/constants";
import prisma from "@/lib/db";
import { createSchema, editSchema } from "@/schemas/subscriptions";
import { redirect } from "next/navigation";
import { getSubscription } from "@/data/subscriptions";
import { revalidatePath } from "next/cache";

async function create(
  prevState:
    | {
        error?: string | Record<string, string[] | undefined>;
        currentData?: Record<string, unknown> | undefined;
      }
    | undefined,
  formData: FormData,
) {
  const values = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    time: BigInt(Number(formData.get("time")) * ONE_DAY_IN_MS),
    type: formData.get("type"),
  };

  const { success, error, data } = createSchema.safeParse(values);

  if (!success)
    return { error: error.flatten().fieldErrors, currentData: values };

  await prisma.subscriptions.create({
    data,
  });

  redirect("/dashboard/subscriptions");
}

async function edit(
  prevState:
    | {
        error?: string | Record<string, string[] | undefined>;
        currentData?: Record<string, unknown> | undefined;
      }
    | undefined,
  formData: FormData,
) {
  const values = {
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    time: BigInt(Number(formData.get("time")) * ONE_DAY_IN_MS),
    type: formData.get("type"),
  };

  const { success, error, data } = editSchema.safeParse(values);

  if (!success)
    return { error: error.flatten().fieldErrors, currentData: values };

  const { id, ...rest } = data;

  await prisma.subscriptions.update({
    where: {
      id,
    },
    data: rest,
  });

  redirect("/dashboard/subscriptions");
}

async function remove(
  prevState:
    | {
        error?: string | Record<string, string[] | undefined>;
        currentData?: Record<string, unknown> | undefined;
      }
    | undefined,
  formData: FormData,
) {
  const id = formData.get("id") as string;
  if (!id) return { error: "No id has been provided" };

  const subscription = await getSubscription(id);
  if (!subscription) return { error: "There is no subscription with this id!" };

  await prisma.subscriptions.update({
    where: { id },
    data: { isDeleted: true },
  });

  revalidatePath("/dashboard/subscriptions");
}

export { create, edit, remove };
