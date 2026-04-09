import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import { companyData } from "@/data/companyData";
import { FloatingVintageAssets } from "@/components/ui/FloatingVintageAssets";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: companyData.siteName,
  description: companyData.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} min-h-screen bg-[var(--slate-light)] text-[var(--navy-deep)] antialiased`}>
        <FloatingVintageAssets />
        {children}
      </body>
    </html>
  );
}
