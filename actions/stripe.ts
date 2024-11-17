"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

async function checkout(id: string) {
  try {
    const session = await auth();

    if (!session?.user)
      return { error: "You have no access to call this action!" };

    const subscription = await prisma.subscriptions.findUnique({
      where: { id },
    });

    if (!subscription) notFound();

    const headersList = await headers();
    const origin = headersList.get("origin");

    const paymentSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "RON",
            product_data: {
              name: subscription.title,
            },
            unit_amount: subscription.price * 100,
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata: { id, userId: String(session.user.id) },
      },
      customer_email: String(session.user.email),
      mode: "payment",
      success_url: `${origin}/purchase/success`,
      cancel_url: `${origin}/purchase/cancel`,
    });

    if (!paymentSession.url) return { error: "No checkout page was provided!" };

    redirect(paymentSession.url);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Something went wrong!",
    };
  }
}

export { checkout };
