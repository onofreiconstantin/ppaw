"use server";

import prisma from "@/lib/db";
import { notFound, redirect } from "next/navigation";

async function create(data: { id: string; userId: string }) {
  try {
    const { id, userId } = data;

    const subscription = await prisma.subscriptions.findUnique({
      where: { id },
    });

    if (!subscription) notFound();

    await prisma.$transaction(async (tx) => {
      const transaction = await tx.transactions.create({
        data: { price: subscription.price },
      });

      await tx.usersSubscriptions.create({
        data: {
          userId,
          subscriptionId: id,
          transactionId: transaction.id,
          qrCode: crypto.randomUUID(),
          expiresAt: new Date(new Date().getTime() + subscription.time),
        },
      });
    });

    redirect("/account/subscriptions");
  } catch (error) {
    throw error;
  }
}

export { create };
