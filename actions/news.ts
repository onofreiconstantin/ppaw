"use server";

import prisma from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { getNewsItem } from "@/data/news";
import { redirect } from "next/navigation";
import { createSchema } from "@/schemas/news";

async function create(formData: FormData) {
  const values = {
    userId: formData.get("userId"),
    title: formData.get("title"),
    content: formData.get("content"),
  };

  const { success, error, data } = createSchema.safeParse(values);

  if (!success) return { error: error.flatten().fieldErrors };

  await prisma.news.create({
    data,
  });

  revalidateTag("news");
  redirect("/dashboard/news");
}

async function remove(id: string) {
  const news = await getNewsItem(id);
  if (!news) return { error: "There is no news with this id!" };

  await prisma.news.delete({
    where: { id },
  });

  revalidateTag("news");
}

export { create, remove };
