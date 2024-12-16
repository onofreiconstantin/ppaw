import { getSubscription } from "@/data/subscriptions";
import { getActiveSubscription } from "@/data/user-subscriptions";
import { getUser } from "@/data/users";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const event = stripe.webhooks.constructEvent(
      await request.text(),
      request.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );

    switch (event.type) {
      case "charge.succeeded":
        const { payment_intent, metadata, amount } = event.data.object;
        const { id, userId } = metadata;

        const [subscription, user, activeSubscription] = await Promise.all([
          getSubscription(id),
          getUser(userId),
          getActiveSubscription(userId),
        ]);

        if (!subscription || !user) {
          console.error(
            "No user or subscription has been found when trying to create the transaction and user subscription",
          );
          return new NextResponse("Bad request", { status: 400 });
        }

        await prisma.$transaction(async (tx) => {
          const transaction = await tx.transactions.create({
            data: { paymentId: payment_intent as string, price: amount / 100 },
          });

          if (activeSubscription && subscription.type === "SUBSCRIPTION")
            await tx.usersSubscriptions.update({
              where: { id: activeSubscription.id },
              data: { status: "INACTIVE" },
            });

          await tx.usersSubscriptions.create({
            data: {
              userId: user.id,
              subscriptionId: id,
              transactionId: transaction.id,
              expiresAt: new Date(
                new Date().getTime() + Number(subscription.time),
              ),
            },
          });
        });

        break;
      default:
        break;
    }

    return new NextResponse();
  } catch (error) {
    return new NextResponse(
      error instanceof Error
        ? error.message
        : "Something wrong happened when trying to create the transaction and the user subscription! This situation needs more debugging!",
      {
        status: 400,
      },
    );
  }
}
