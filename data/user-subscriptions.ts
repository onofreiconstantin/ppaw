import prisma from "@/lib/db";
import { notFound } from "next/navigation";

const getUserSubscription = async (id: string) => {
  try {
    const userSubscription = await prisma.usersSubscriptions.findUnique({
      where: { id },
      include: { Subscription: true, Transaction: true },
    });

    if (!userSubscription) notFound();

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

const getActiveSubscription = async (userId: string) => {
  try {
    const userSubscription = await prisma.usersSubscriptions.findFirst({
      where: {
        userId,
        status: "ACTIVE",
        Subscription: { type: "SUBSCRIPTION" },
      },
      include: { Subscription: true, Transaction: true },
    });

    return userSubscription;
  } catch (error) {
    throw error;
  }
};

export { getUserSubscription, getUserSubscriptions, getActiveSubscription };
