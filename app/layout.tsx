import type { Metadata } from "next";
import "./globals.css";
import { Inter, Poppins, Space_Grotesk, Playfair_Display, JetBrains_Mono } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-poppins" });
const spaceGrotesk = Space_Grotesk({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-space-grotesk" });
const playfair = Playfair_Display({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-playfair" });
const jetbrains = JetBrains_Mono({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Vibe Coder ? Design by Vibe",
  description: "Generate beautiful website sections from a simple vibe.",
  metadataBase: new URL("https://agentic-0ffcdf31.vercel.app")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} ${playfair.variable} ${jetbrains.variable}`}>
        {children}
      </body>
    </html>
  );
}

