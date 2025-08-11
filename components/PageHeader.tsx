"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { getRandomBreadcrumbPun } from "@/lib/breadcrumbPuns";
import { useEffect, useState } from "react";

interface PageHeaderProps {
  currentPage: string;
}

export default function PageHeader({ currentPage }: PageHeaderProps) {
  const [breadcrumbText, setBreadcrumbText] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    // Check if we're on a post detail page (posts/[slug])
    if (
      currentPage === "posts" &&
      pathname.startsWith("/posts/") &&
      pathname !== "/posts"
    ) {
      setBreadcrumbText(getRandomBreadcrumbPun());
    }
  }, [currentPage, pathname]);

  return (
    <div>
      <Link href="/" className="inline-block group hover:no-underline">
        <h2 className="mb-0 font-heading font-semibold text-xl pt-12 transition-all duration-300 ease-in-out transform group-hover:-translate-y-1 group-hover:rotate-2 text-gray-900 dark:text-gray-100">
          bimals.net
        </h2>
      </Link>
      <div className="mb-4">
        {currentPage === "posts" &&
        pathname.startsWith("/posts/") &&
        pathname !== "/posts" ? (
          <>
            <Link
              href="/posts"
              className="text-sm text-gray-600 dark:text-gray-400 font-semibold hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              /posts
            </Link>
            <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
              /{breadcrumbText}
            </span>
          </>
        ) : (
          <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
            /{currentPage}
          </span>
        )}
      </div>
    </div>
  );
}
