import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PPAW",
  description: "PPAW APP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>NAVIGATION</nav>
        {children}
      </body>
    </html>
  );
}
