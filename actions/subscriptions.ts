"use server";

import { ONE_DAY_IN_MS } from "@/lib/constants";
import prisma from "@/lib/db";
import { createSchema, editSchema } from "@/schemas/subscriptions";
import { redirect } from "next/navigation";

async function create(formData: FormData) {
  try {
    const values = {
      title: formData.get("title"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      time: BigInt(Number(formData.get("time")) * ONE_DAY_IN_MS),
      type: formData.get("type"),
    };

    const { success, error, data } = createSchema.safeParse(values);

    if (!success) return { error: error.flatten().fieldErrors };

    await prisma.subscriptions.create({
      data,
    });

    redirect("/dashboard/subscriptions");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Something went wrong!",
    };
  }
}

async function edit(formData: FormData) {
  try {
    const values = {
      id: formData.get("id"),
      title: formData.get("title"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      time: BigInt(Number(formData.get("time")) * ONE_DAY_IN_MS),
      type: formData.get("type"),
    };

    const { success, error, data } = editSchema.safeParse(values);

    if (!success) return { error: error.flatten().fieldErrors };

    const { id, ...rest } = data;

    await prisma.subscriptions.update({
      where: {
        id,
      },
      data: rest,
    });

    redirect("/dashboard/subscriptions");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Something went wrong!",
    };
  }
}

export { create, edit };
