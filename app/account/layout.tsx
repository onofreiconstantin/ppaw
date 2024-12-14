import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Sidebar
      items={[
        { href: "/account/edit", label: "Edit profile" },
        { href: "/account/subscriptions", label: "Subscriptions" },
      ]}
    >
      {children}
    </Sidebar>
  );
};

export default Layout;
