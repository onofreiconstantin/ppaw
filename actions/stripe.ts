"use server";

import { auth } from "@/auth";
import { getSubscription } from "@/data/subscriptions";
import { getActiveSubscription } from "@/data/user-subscriptions";
import { getUser } from "@/data/users";
import { logger } from "@/utils/logger";
import { getPaymentPrice, getPaymentType } from "@/utils/payments";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

async function checkout(
  prevState:
    | {
        error?: string | Record<string, string[] | undefined>;
        currentData?: Record<string, unknown> | undefined;
      }
    | undefined,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.id) {
    logger(
      "No user id has been provided when trying to access the checkout page!",
      session?.user,
    );
    return { error: "You have no access to call this action!" };
  }

  const id = formData.get("id") as string;
  if (!id) {
    logger(
      "No subscription id has been provided when trying to access the checkout page!",
      session.user,
    );
    return { error: "No id has been provided" };
  }

  const [user, subscription, activeSubscription] = await Promise.all([
    getUser(session.user.id),
    getSubscription(id),
    getActiveSubscription(session.user.id),
  ]);

  if (!user.isCompleted) {
    logger(
      "The user account hasn't been completed when trying to access the checkout page!",
      user,
    );
    return { error: "Complete account creation first!" };
  }

  if (!subscription || subscription.isDeleted) {
    logger(
      "The selected subscription no longer exists when trying to access the checkout page!",
      user,
    );
    return { error: "The subscription no longer exists!" };
  }

  const paymentType = getPaymentType(subscription, activeSubscription);

  if (!paymentType) return { error: "Something went wrong!" };

  const paymentPrice = getPaymentPrice(
    paymentType,
    subscription,
    activeSubscription,
  );

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
          unit_amount: paymentPrice * 100,
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      metadata: { id, userId: session.user.id as string },
    },
    customer_email: session.user.email as string,
    mode: "payment",
    success_url: `${origin}/purchase/success`,
    cancel_url: `${origin}/purchase/cancel`,
  });

  if (!paymentSession.url) {
    logger(
      "No checkout page was provided when trying to access the checkout page! This is probably related to the product data sent to stripe.",
      user,
    );
    return { error: "No checkout page was provided!" };
  }

  redirect(paymentSession.url);
}

export { checkout };
