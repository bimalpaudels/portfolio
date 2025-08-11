"use client";

import { usePathname } from "next/navigation";
import PageHeader from "./PageHeader";

export default function ConditionalPageHeader() {
  const pathname = usePathname();
  
  // Don't show header on home page
  if (pathname === "/") {
    return null;
  }

  // Extract page name from pathname
  const pageName = pathname.split("/")[1] || "page";
  
  return <PageHeader currentPage={pageName} />;
}