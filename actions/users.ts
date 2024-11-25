"use server";

import prisma from "@/lib/db";
import { editSchema } from "@/schemas/users";
import { redirect } from "next/navigation";

async function edit(formData: FormData) {
  const values = {
    id: formData.get("id"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    cnp: formData.get("cnp"),
    isCompleted: Boolean(formData.get("isCompleted")),
  };

  const { success, error, data } = editSchema.safeParse(values);

  if (!success) return { error: error.flatten().fieldErrors };

  const { id, ...rest } = data;

  await prisma.users.update({
    where: {
      id,
    },
    data: rest,
  });

  redirect("/account");
}

export { edit };
