import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

import SignOut from "@/components/sing-out/sign-out";
import SignIn from "@/components/sign-in/sign-in";
import { auth } from "@/auth";
import { UsersRole } from "@prisma/client";

export const metadata: Metadata = {
  title: {
    template: "%s | PPAW",
    default: "PPAW",
  },
  description: "PPAW APP",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="flex h-full min-h-svh flex-col gap-8">
        <header>
          <nav className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <Link href={"/"}>Home</Link>
              <Link href={"/subscriptions"}>Subscriptions</Link>
              {session?.user && (
                <Link href={"/purchase"}>Purchase subscription</Link>
              )}
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
        </header>
        <main className="flex-1">{children}</main>
        <footer>FOOTER</footer>
      </body>
    </html>
  );
}
