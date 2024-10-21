import prisma from "@library/db";

const getUserSubscription = async (id: string) => {
  try {
    const userSubscription = await prisma.usersSubscriptions.findUnique({
      where: { id, isDeleted: false },
      include: { Subscription: true, Transaction: true },
    });

    return { data: { userSubscription }, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const getUserSubscriptions = async (userId: string) => {
  try {
    const userSubscriptions = await prisma.usersSubscriptions.findMany({
      where: { userId, isDeleted: false },
      include: { Subscription: true, Transaction: true },
    });

    return { data: { userSubscriptions }, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export { getUserSubscription, getUserSubscriptions };
