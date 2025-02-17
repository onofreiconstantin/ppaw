"use client";

import { checkout } from "@/actions/stripe";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ONE_DAY_IN_MS } from "@/utils/constants";
import { getPaymentPrice, getPaymentType } from "@/utils/payments";
import {
  Subscriptions,
  SubscriptionsType,
  Users,
  UsersSubscriptions,
} from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import Form from "@/components/form/form";
import FormButton from "../form-button/form-button";

export default function PurchaseForm({
  id,
  user,
  subscriptions,
  activeSubscription,
}: {
  id: string | undefined;
  user: Users;
  subscriptions: Subscriptions[];
  activeSubscription: UsersSubscriptions | null;
}) {
  const types = Object.values(SubscriptionsType);

  const [selected, setSelected] = useState(id);
  const subscription = subscriptions.find(
    (subscription) => subscription.id === selected,
  );

  const paymentType = subscription
    ? getPaymentType(subscription, activeSubscription)
    : null;

  const paymentPrice =
    paymentType && subscription
      ? getPaymentPrice(paymentType, subscription, activeSubscription)
      : "";

  return (
    <Form className="flex max-w-md flex-col gap-2" action={checkout}>
      <Input name="id" type="hidden" value={subscription?.id ?? ""} />

      <div className="flex items-center gap-2">
        <Label htmlFor="subscriptionId">Select subscription</Label>
        <Select
          name="subscriptionId"
          value={selected}
          onValueChange={setSelected}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {subscriptions.map((subscription) => {
              const paymentType = getPaymentType(
                subscription,
                activeSubscription,
              );

              return (
                <SelectItem
                  key={subscription.id}
                  value={subscription.id}
                  disabled={!paymentType}
                >
                  {subscription.title}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="title">Title</Label>
        <Input disabled name="title" value={subscription?.title ?? ""} />
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          disabled
          name="description"
          value={subscription?.description ?? ""}
        />
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="type">Type</Label>
        <Select disabled name="type" value={subscription?.type}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="time">Days</Label>
        <Input
          disabled
          name="time"
          type="number"
          value={
            Number(Number(subscription?.time) / ONE_DAY_IN_MS).toFixed(1) ?? ""
          }
          step="0.01"
        />
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="price">Price</Label>
        <Input disabled name="price" type="number" value={paymentPrice} />
      </div>
      {user.isCompleted ? (
        <FormButton disabled={!subscription?.id} variant="outline">
          Purchase
        </FormButton>
      ) : (
        <Link href={"account/edit"}>
          <Button type="button" variant="outline">
            Finalize account creation
          </Button>
        </Link>
      )}
    </Form>
  );
}
