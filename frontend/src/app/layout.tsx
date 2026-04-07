import type { Metadata } from "next";
import Header from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "crafta.cc",
  description: "A journal by crafta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="mx-auto w-full flex-1 px-6 py-8" style={{ maxWidth: "var(--content-max-width)", marginTop: "60px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
