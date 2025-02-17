import { edit } from "@/actions/users";
import { auth } from "@/auth";
import FormButton from "@/components/form-button/form-button";
import Form from "@/components/form/form";
import PageContainer from "@/components/page-container/page-container";
import PageTitle from "@/components/page-title/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUser } from "@/data/users";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Account | Edit profile",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) notFound();

  const user = await getUser(session?.user?.id);
  const { id, firstName, lastName, cnp } = user;

  return (
    <PageContainer>
      <PageTitle>Edit profile</PageTitle>
      <Form action={edit} className="flex max-w-md flex-col gap-2">
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
        <FormButton variant="outline">Edit</FormButton>
      </Form>
    </PageContainer>
  );
}
