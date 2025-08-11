import "./globals.css";

import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/react";
import { Navigation } from "@/components";

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
  title: {
    default: "Bimal Paudel - Developer & Learner",
    template: "%s | Bimal Paudel",
  },
  description:
    "Full-stack developer passionate about building modern web applications. Sharing insights on development, technology, and continuous learning.",
  keywords: [
    "Bimal Paudel",
    "Developer",
    "Full Stack",
    "Web Development",
    "Technology",
    "Programming",
    "Software Engineer",
  ],
  authors: [{ name: "Bimal Paudel", url: "https://bimals.net" }],
  creator: "Bimal Paudel",
  publisher: "Bimal Paudel",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        <head></head>
        <body className="antialiased tracking-tight bg-white dark:bg-darkmode font-body">
          <Navigation />
          <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 text-gray-900 dark:text-custom_dark">
            <main className="max-w-[70ch] mx-auto w-full space-y-8 page-transition px-6 md:px-8">
              {children}
            </main>

            <Analytics />
          </div>
        </body>
      </html>
    </ViewTransitions>
  );
}
