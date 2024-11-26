import { Subscriptions, UsersSubscriptions } from "@prisma/client";

function getPaymentType(
  subscription: Subscriptions,
  activeSubscription: UsersSubscriptions | null,
) {
  if (
    subscription.type === "TICKET" ||
    (subscription.type === "SUBSCRIPTION" && !activeSubscription)
  ) {
    return "PURCHASE";
  }

  if (subscription.type === "SUBSCRIPTION" && activeSubscription) {
    if (
      activeSubscription.subscriptionId === subscription.id &&
      new Date(activeSubscription?.expiresAt).getTime() < new Date().getTime()
    )
      return "RENEW";

    if (
      activeSubscription.subscriptionId !== subscription.id &&
      new Date(activeSubscription?.expiresAt).getTime() <
        new Date().getTime() + Number(subscription.time)
    )
      return "UPGRADE";
  }

  return null;
}

function getPaymentPrice(
  subscription: Subscriptions,
  activeSubscription: UsersSubscriptions | null,
) {
  if (activeSubscription && subscription.type === "SUBSCRIPTION") {
    const remainingTime =
      new Date(activeSubscription.expiresAt).getTime() - new Date().getTime();

    if (remainingTime <= 0) return subscription.price;

    return Number(
      (
        (subscription.price * (Number(subscription.time) - remainingTime)) /
        Number(subscription.time)
      ).toFixed(2),
    );
  } else return subscription.price;
}

export { getPaymentType, getPaymentPrice };
