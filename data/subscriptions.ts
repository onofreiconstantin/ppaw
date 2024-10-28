import prisma from "@/lib/db";
import { notFound } from "next/navigation";

const getSubscription = async (id: string) => {
  try {
    const subscription = await prisma.subscriptions.findUnique({
      where: {
        id,
      },
    });

    if (!subscription) notFound();

    return subscription;
  } catch (error) {
    throw error;
  }
};

const getSubscriptions = async () => {
  try {
    const subscriptions = await prisma.subscriptions.findMany({
      where: {
        isDeleted: false,
      },
    });

    return subscriptions;
  } catch (error) {
    throw error;
  }
};

export { getSubscription, getSubscriptions };
