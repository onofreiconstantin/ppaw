import { auth } from "@/auth";
import { UsersRole } from "@prisma/client";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const session = await auth();

  if (session?.user.role === UsersRole.USER) redirect("/");

  return <div>Welcome to the dashboard</div>;
}
