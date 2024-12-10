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
import { getSubscription } from "@/data/subscriptions";
import { ONE_DAY_IN_MS } from "@/utils/constants";
import { SubscriptionsType, UsersRole } from "@prisma/client";
import { edit } from "@/actions/subscriptions";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const subscription = await getSubscription(id);
  const { title, description } = subscription;

  return {
    title: `Dashboard | Subscriptions | ${title} | Edit`,
    description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [session, { id }] = await Promise.all([auth(), params]);
  if (session?.user && session?.user.role === UsersRole.USER) redirect("/");

  const subscription = await getSubscription(id);
  const { title, type, description, time, price } = subscription;
  const types = Object.values(SubscriptionsType);

  return (
    <div className="flex flex-col gap-8">
      <h3>Edit subscription</h3>
      <form action={edit} className="flex max-w-md flex-col gap-2">
        <Input name="id" defaultValue={id} type="hidden" />
        <div className="flex items-center gap-2">
          <Label htmlFor="title">Title</Label>
          <Input name="title" defaultValue={title} />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea name="description" defaultValue={description} />
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="type">Type</Label>
          <Select name="type" defaultValue={type}>
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
            name="time"
            type="number"
            defaultValue={Number(Number(time) / ONE_DAY_IN_MS).toFixed(1)}
            step="0.01"
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="price">Price</Label>
          <Input name="price" type="number" defaultValue={price} />
        </div>
        <Button variant="outline">Save</Button>
      </form>

      <Link href={`/dashboard/subscriptions`}>
        <Button variant="outline">Back to list</Button>
      </Link>
    </div>
  );
}
