import { auth } from "@/auth";
import PageContainer from "@/components/page-container/page-container";
import PageTitle from "@/components/page-title/page-title";
import { UsersRole } from "@prisma/client";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const session = await auth();

  if (session?.user && session?.user.role === UsersRole.USER) redirect("/");

  return (
    <PageContainer>
      <PageTitle>Dashboard</PageTitle>
      <p className="text-orange-500">TO BE CONTINUED...</p>
    </PageContainer>
  );
}
