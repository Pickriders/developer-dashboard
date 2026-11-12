import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { Urbanist } from "next/font/google";

import { Providers } from "@/providers";
import "./globals.css";

/** Urbanist, the Pickriders storefront's typeface; Geist Mono stays for code and ids. */
const urbanist = Urbanist({ subsets: ["latin"], display: "swap", variable: "--font-urbanist" });

export const metadata: Metadata = {
  title: { default: "Pickriders Developers", template: "%s · Pickriders Developers" },
  description: "Build deliveries into your product with the Pickriders API.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1211" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${urbanist.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
