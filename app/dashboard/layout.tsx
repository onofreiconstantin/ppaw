import Link from "next/link";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex gap-8">
      <nav className="flex flex-col gap-8">
        <Link href={"/dashboard/transactions"}>Transactions</Link>
        <Link href={"/dashboard/subscriptions"}>Subscriptions</Link>
        <Link href={"/dashboard/subscriptions/client-version"}>
          Subscriptions - Client version
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
