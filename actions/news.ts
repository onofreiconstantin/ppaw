"use server";

import prisma from "@/lib/db";
import { revalidateTag } from "next/cache";
import { getNewsItem } from "@/data/news";
import { redirect } from "next/navigation";
import { createSchema, editSchema } from "@/schemas/news";

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
    userId: formData.get("userId"),
    title: formData.get("title"),
    content: formData.get("content"),
  };

  const { success, error, data } = createSchema.safeParse(values);

  if (!success)
    return { error: error.flatten().fieldErrors, currentData: values };

  await prisma.news.create({
    data,
  });

  revalidateTag("news");
  redirect("/dashboard/news");
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
    content: formData.get("content"),
  };

  const { success, error, data } = editSchema.safeParse(values);

  if (!success)
    return { error: error.flatten().fieldErrors, currentData: values };

  const { id, ...rest } = data;

  await prisma.news.update({
    where: {
      id,
    },
    data: rest,
  });

  revalidateTag("news");
  redirect("/dashboard/news");
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

  const news = await getNewsItem(id);
  if (!news) return { error: "There is no news with this id!" };

  await prisma.news.delete({
    where: { id },
  });

  revalidateTag("news");
}

export { create, edit, remove };
