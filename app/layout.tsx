import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fact-Checker — Independent · Nonpartisan · Evidence-based",
  description:
    "Submit any claim and receive a structured, evidence-based verdict within seconds. Every check is public, anonymous, and permanently recorded.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
