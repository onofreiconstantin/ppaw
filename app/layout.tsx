import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/navigation/navigation";
import { Suspense } from "react";

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
          <Suspense fallback={<div>Loading...</div>}>
            <Navigation />
          </Suspense>
        </header>
        <main className="flex-1">{children}</main>
        <footer>FOOTER</footer>
      </body>
    </html>
  );
}
