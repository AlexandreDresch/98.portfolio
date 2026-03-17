import type { Metadata } from "next";
import { Titillium_Web, Inter, Jost } from "next/font/google";
import "./globals.css";

import ReduxProvider from "@/store/redux-provider";
import SoundManager from "@/components/shared/sound-manager";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
  style: "normal",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "98.portfolio",
  description: "Alexandre Dresch's portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${jost.variable} ${titillium.className}`}
        >
          <SoundManager />
          {children}
        </body>
      </html>
    </ReduxProvider>
  );
}
