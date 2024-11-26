import { Subscriptions, UsersSubscriptions } from "@prisma/client";

enum PaymentType {
  PURCHASE = "PURCHASE",
  RENEW = "RENEW",
  UPGRADE = "UPGRADE",
}

function getPaymentType(
  subscription: Subscriptions,
  activeSubscription: UsersSubscriptions | null,
) {
  if (subscription.type === "TICKET" || !activeSubscription)
    return PaymentType.PURCHASE;

  if (
    activeSubscription.subscriptionId === subscription.id &&
    new Date(activeSubscription.expiresAt).getTime() < new Date().getTime()
  )
    return PaymentType.RENEW;

  if (
    activeSubscription.subscriptionId !== subscription.id &&
    new Date(activeSubscription.expiresAt).getTime() <
      new Date().getTime() + Number(subscription.time)
  )
    return PaymentType.UPGRADE;

  return null;
}

function getPaymentPrice(
  paymentType: keyof typeof PaymentType,
  subscription: Subscriptions,
  activeSubscription: UsersSubscriptions | null,
) {
  if (paymentType === "PURCHASE") return subscription.price;
  else {
    const remainingTime =
      new Date(activeSubscription!.expiresAt).getTime() - new Date().getTime();

    if (remainingTime <= 0) return subscription.price;

    return Number(
      (
        (subscription.price * (Number(subscription.time) - remainingTime)) /
        Number(subscription.time)
      ).toFixed(2),
    );
  }
}

export { getPaymentType, getPaymentPrice };
