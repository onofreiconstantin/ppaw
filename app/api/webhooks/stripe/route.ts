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
        const { payment_intent, metadata, billing_details, amount } =
          event.data.object;
        const { id, userId } = metadata;
        const { email } = billing_details;

        if (!email) return new NextResponse("Bad request", { status: 400 });

        const [subscription, user] = await Promise.all([
          prisma.subscriptions.findUnique({
            where: { id },
          }),
          prisma.users.findUnique({
            where: { id: userId },
          }),
        ]);

        if (!subscription || !user)
          return new NextResponse("Bad request", { status: 400 });

        await prisma.$transaction(async (tx) => {
          const transaction = await tx.transactions.create({
            data: { paymentId: payment_intent as string, price: amount / 100 },
          });

          await tx.usersSubscriptions.create({
            data: {
              userId: user.id,
              subscriptionId: id,
              transactionId: transaction.id,
              qrCode: crypto.randomUUID(),
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
      error instanceof Error ? error.message : "Bad request",
      {
        status: 400,
      },
    );
  }
}
