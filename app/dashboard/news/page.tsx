import { auth } from "@/auth";
import News from "@/components/news/news";

import { UsersRole } from "@prisma/client";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

export const metadata = {
  title: "Dashboard | News",
};

export default async function Page() {
  const session = await auth();

  if (session?.user && session?.user.role === UsersRole.USER) redirect("/");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <News />
    </Suspense>
  );
}
