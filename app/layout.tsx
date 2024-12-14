import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/navigation/navigation";
import Footer from "@/components/footer/footer";
import Main from "@/components/main/main";
import Header from "@/components/header/header";

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
      <body className="flex h-full min-h-svh flex-col">
        <Header>
          <Navigation />
        </Header>
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  );
}
