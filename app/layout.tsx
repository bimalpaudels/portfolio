import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bimals.net"),
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
        className={`${inter.className} [scrollbar-gutter:stable]`}
      >
        <body className="antialiased tracking-tight">
          <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 bg-white text-gray-900">
            <main className="max-w-[60ch] mx-auto w-full space-y-4">
              {children}
            </main>

            <Analytics />
          </div>
        </body>
      </html>
    </ViewTransitions>
  );
}
