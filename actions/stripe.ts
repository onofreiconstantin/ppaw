"use server";

import { auth } from "@/auth";
import { getSubscription } from "@/data/subscriptions";
import { getActiveSubscription } from "@/data/user-subscriptions";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

async function checkout(id: string) {
  const session = await auth();

  if (!session?.user?.id)
    return { error: "You have no access to call this action!" };

  const [subscription, activeSubscription] = await Promise.all([
    getSubscription(id),
    getActiveSubscription(session.user.id),
  ]);

  if (!subscription || subscription.isDeleted)
    return { error: "The subscription no longer exists!" };

  const price =
    subscription.type === "SUBSCRIPTION" && activeSubscription
      ? (() => {
          const remainingTime =
            new Date(activeSubscription.expiresAt).getTime() -
            new Date().getTime();

          if (remainingTime <= 0) return subscription.price;

          return Number(
            (
              (subscription.price *
                (Number(subscription.time) - remainingTime)) /
              Number(subscription.time)
            ).toFixed(2),
          );
        })()
      : subscription.price;

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
          unit_amount: price * 100,
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
}

export { checkout };
