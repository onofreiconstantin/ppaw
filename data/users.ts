import prisma from "@/lib/db";
import { notFound } from "next/navigation";

const getUser = async (id: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id, isDeleted: false },
    });

    if (!user) notFound();

    return user;
  } catch (error) {
    throw error;
  }
};

const getUsers = async () => {
  try {
    const users = await prisma.users.findMany({
      where: { isDeleted: false },
    });

    return users;
  } catch (error) {
    throw error;
  }
};

export { getUser, getUsers };
