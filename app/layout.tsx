import "./globals.css";

import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/react";
import { ConditionalFooter } from "@/components";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bimals.net"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Bimal Paudel",
    template: "%s | Bimal Paudel",
  },
  description: "Developer, Learner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${inter.variable} ${fraunces.variable} [scrollbar-gutter:stable]`}
      >
        <body className="antialiased tracking-tight bg-white dark:bg-darkmode font-body">
          <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 text-gray-900 dark:text-custom_dark">
            <main className="max-w-[65ch] mx-auto w-full space-y-6 page-transition">
              {children}
            </main>
            <ConditionalFooter />
            <Analytics />
          </div>
        </body>
      </html>
    </ViewTransitions>
  );
}
