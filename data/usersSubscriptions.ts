import prisma from "@library/db";

const getUserSubscription = async (id: string) => {
  try {
    const userSubscription = await prisma.usersSubscriptions.findUnique({
      where: { id, isDeleted: false },
      include: { Subscription: true, Transaction: true },
    });

    return userSubscription;
  } catch (error) {
    throw error;
  }
};

const getUserSubscriptions = async (userId: string) => {
  try {
    const userSubscriptions = await prisma.usersSubscriptions.findMany({
      where: { userId, isDeleted: false },
      include: { Subscription: true, Transaction: true },
    });

    return userSubscriptions;
  } catch (error) {
    throw error;
  }
};

export { getUserSubscription, getUserSubscriptions };
