import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UsersRole } from "@prisma/client";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { create } from "@/actions/news";

export const metadata = {
  title: "Dashboard | News | Create",
};

export default async function Page() {
  const session = await auth();
  if (session?.user && session?.user.role === UsersRole.USER) redirect("/");

  return (
    <div className="flex flex-col gap-8">
      <h3>Add news</h3>
      <form action={create} className="flex max-w-md flex-col gap-2">
        <Input name="userId" type="hidden" defaultValue={session?.user.id} />
        <div className="flex items-center gap-2">
          <Label htmlFor="title">Title</Label>
          <Input name="title" defaultValue={""} />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="content">Description</Label>
          <Textarea name="content" defaultValue={""} />
        </div>
        <Button variant="outline">Add</Button>
      </form>

      <Link href={`/dashboard/news`}>
        <Button variant="outline">Back to list</Button>
      </Link>
    </div>
  );
}
