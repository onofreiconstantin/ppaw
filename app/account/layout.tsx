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
        <Link href={"/account/profile"}>Profile</Link>
        <Link href={"/account/subscriptions"}>Subscriptions</Link>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
