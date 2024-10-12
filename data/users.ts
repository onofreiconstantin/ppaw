import prisma from "@library/db";

const getUser = async (id: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id, isDeleted: false },
    });

    return { data: { user }, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const getUsers = async () => {
  try {
    const users = await prisma.users.findMany({
      where: { isDeleted: false },
    });

    return { data: { users }, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export { getUser, getUsers };
