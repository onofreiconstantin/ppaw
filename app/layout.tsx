import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

import SignOut from "@/components/auth/sign-out";
import SignIn from "@/components/auth/sign-in";
import { auth } from "@/auth";

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
              {session?.user && (
                <>
                  <Link href={"/dashboard"}>Dashboard</Link>
                  <Link href={"/account"}>Account</Link>
                </>
              )}
            </div>
            {session?.user ? <SignOut /> : <SignIn />}
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer>FOOTER</footer>
      </body>
    </html>
  );
}
