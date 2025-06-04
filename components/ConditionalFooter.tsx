"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Don't show footer on home page
  if (pathname === "/") {
    return null;
  }

  // On other pages, only show footer on desktop (md and up)
  return (
    <div className="hidden md:block">
      <Footer />
    </div>
  );
}
