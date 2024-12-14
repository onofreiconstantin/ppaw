import Sidebar from "@/components/sidebar/sidebar";
import Link from "next/link";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Sidebar
      items={[
        { href: "/dashboard/subscriptions", label: "Subscriptions" },
        {
          href: "/dashboard/subscriptions/client-version",
          label: "Subscriptions - Client version",
        },
        {
          href: "/dashboard/news",
          label: "News",
        },
        {
          href: "/dashboard/transactions",
          label: "Transactions",
        },
      ]}
    >
      {children}
    </Sidebar>
  );
}
