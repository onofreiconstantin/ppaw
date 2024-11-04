import { edit } from "@/actions/users";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUser } from "@/data/users";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Account | Profile",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) notFound();

  const user = await getUser(session?.user?.id);
  const { id, firstName, lastName, cnp } = user;

  return (
    <div className="flex flex-col gap-8">
      <h3>Edit profile</h3>
      <form action={edit} className="flex max-w-md flex-col gap-2">
        <Input type="hidden" name="id" defaultValue={id} />
        <Input type="hidden" name="isCompleted" defaultValue={"true"} />

        <div className="flex items-center gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input name="firstName" defaultValue={firstName} />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input name="lastName" defaultValue={lastName} />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="cnp">CNP</Label>
          <Input name="cnp" defaultValue={cnp ?? ""} />
        </div>

        <Button variant="outline">Update</Button>
      </form>
    </div>
  );
}
