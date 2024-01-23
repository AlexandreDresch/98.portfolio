import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Alexandre Dresch's portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={titillium.className}>{children}</body>
    </html>
  );
}
