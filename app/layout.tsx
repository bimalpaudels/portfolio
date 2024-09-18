import "./globals.css";

import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "learn.bimals.net",
  description: "All my snippets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` ${open_sans.className} [scrollbar-gutter:stable]`}
    >
      <body className="antialiased tracking-tight">
        <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 bg-white text-gray-900">
          <main className="max-w-2xl mx-auto w-full space-y-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
