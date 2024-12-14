import { auth } from "@/auth";
import PageContainer from "@/components/page-container/page-container";
import PageTitle from "@/components/page-title/page-title";
import { getUser } from "@/data/users";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Account",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) notFound();

  const user = await getUser(session?.user?.id);
  const { firstName, lastName, email, cnp } = user;

  return (
    <PageContainer>
      <PageTitle>Account</PageTitle>

      <div className="flex flex-col gap-2">
        <p>{`First name: ${firstName}`}</p>
        <p>{`Last name: ${lastName}`}</p>
        <p>{`Email: ${email}`}</p>
        <p>{`CNP: ${cnp ?? "Please complete your account registration!"}`}</p>
      </div>
    </PageContainer>
  );
}
