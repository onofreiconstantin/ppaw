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
import { ONE_DAY_IN_MS } from "@/lib/constants";
import { Subscriptions, SubscriptionsType } from "@prisma/client";
import { FormEventHandler, useState } from "react";

export default function PurchaseForm({
  id,
  subscriptions,
}: {
  id: string | undefined;
  subscriptions: Subscriptions[];
}) {
  const types = Object.values(SubscriptionsType);

  const [selected, setSelected] = useState(id);
  const subscription = subscriptions.find(
    (subscription) => subscription.id === selected,
  );

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (subscription?.id) checkout(subscription.id);
  };

  return (
    <form className="flex max-w-md flex-col gap-2" onSubmit={handleOnSubmit}>
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
            {subscriptions.map((subscription) => (
              <SelectItem key={subscription.id} value={subscription.id}>
                {subscription.title}
              </SelectItem>
            ))}
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
        />
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="price">Price</Label>
        <Input
          disabled
          name="price"
          type="number"
          value={subscription?.price ?? ""}
        />
      </div>
      <Button disabled={!subscription?.id} variant="outline">
        Purchase
      </Button>
    </form>
  );
}
