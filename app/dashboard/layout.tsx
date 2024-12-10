import { auth } from "@/auth";
import { UsersRole } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-8">
      <nav className="flex flex-col gap-8">
        <Link href={"/dashboard/subscriptions"}>Subscriptions</Link>
        <Link href={"/dashboard/subscriptions/client-version"}>
          Subscriptions - Client version
        </Link>
        <Link href={"/dashboard/transactions"}>Transactions</Link>
        <Link href={"/dashboard/news"}>News</Link>
      </nav>
      {children}
    </div>
  );
}
