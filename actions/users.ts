"use server";

import prisma from "@/lib/db";

async function create(data: {
  email: string;
  firstName: string;
  lastName: string;
  imageUrl?: string | null;
}) {
  try {
    await prisma.users.create({
      data,
    });
  } catch (error) {
    throw error;
  }
}

export { create };
