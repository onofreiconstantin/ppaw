import React from "react";
import Link from "next/link";
import SignOut from "@components/sing-out/sign-out";
import SignIn from "@components/sign-in/sign-in";
import { auth } from "@/auth";
import { UsersRole } from "@prisma/client";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between gap-8">
      <div className="flex items-center gap-8">
        <Link href={"/"}>Home</Link>
        <Link href={"/subscriptions"}>Subscriptions</Link>
        {session?.user && <Link href={"/purchase"}>Purchase subscription</Link>}
      </div>
      {session?.user ? (
        <div className="flex items-center gap-8">
          {session.user.role === UsersRole.ADMIN && (
            <Link href={"/dashboard"}>Dashboard</Link>
          )}
          <Link href={"/account"}>Account</Link>
          <SignOut />
        </div>
      ) : (
        <SignIn />
      )}
    </nav>
  );
}
