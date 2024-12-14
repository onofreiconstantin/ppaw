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
import { SubscriptionsType, UsersRole } from "@prisma/client";
import { create } from "@/actions/subscriptions";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PageContainer from "@/components/page-container/page-container";
import PageTitle from "@/components/page-title/page-title";

export const metadata = {
  title: "Dashboard | Subscriptions | Create",
};

export default async function Page() {
  const session = await auth();

  if (session?.user && session?.user.role === UsersRole.USER) redirect("/");

  const types = Object.values(SubscriptionsType);

  return (
    <PageContainer>
      <PageTitle>Create subscription</PageTitle>
      <form action={create} className="flex max-w-md flex-col gap-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="title">Title</Label>
          <Input name="title" defaultValue={""} />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea name="description" defaultValue={""} />
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="type">Type</Label>
          <Select name="type" defaultValue={undefined}>
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
            defaultValue={Number(0 / ONE_DAY_IN_MS).toFixed(1)}
            step="0.01"
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="price">Price</Label>
          <Input name="price" type="number" defaultValue={0} />
        </div>
        <Button variant="outline">Create</Button>
      </form>

      <Link href={`/dashboard/subscriptions`}>
        <Button variant="outline">Back to list</Button>
      </Link>
    </PageContainer>
  );
}
