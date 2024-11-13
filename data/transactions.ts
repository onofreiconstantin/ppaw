import prisma from "@/lib/db";
import { notFound } from "next/navigation";

const getTransaction = async (id: string) => {
  try {
    const transaction = await prisma.transactions.findUnique({
      where: {
        id,
      },
      include: {
        UserSubscription: {
          include: {
            Subscription: true,
            Transaction: true,
            User: true,
          },
        },
      },
    });

    if (!transaction) notFound();

    return transaction;
  } catch (error) {
    throw error;
  }
};

const getTransactions = async () => {
  try {
    const transactions = await prisma.transactions.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        UserSubscription: {
          include: {
            Subscription: true,
            Transaction: true,
            User: true,
          },
        },
      },
    });

    return transactions;
  } catch (error) {
    throw error;
  }
};

export { getTransaction, getTransactions };
