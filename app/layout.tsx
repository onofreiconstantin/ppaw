import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s | PPAW",
    default: "PPAW",
  },
  description: "PPAW APP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-full min-h-svh flex-col gap-8">
        <header>
          <nav className="flex gap-8">
            <Link href={"/"}>Home</Link>
            <Link href={"/dashboard/subscriptions"}>Subscriptions</Link>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer>FOOTER</footer>
      </body>
    </html>
  );
}
