"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { breadcrumbPuns, getRandomBreadcrumbPun } from "@/lib/breadcrumbPuns";
import { useEffect, useState } from "react";

interface PageHeaderProps {
  currentPage: string;
}

export default function PageHeader({ currentPage }: PageHeaderProps) {
  const [breadcrumbText, setBreadcrumbText] = useState<string>("");
  const [previousText, setPreviousText] = useState<string>("");

  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    // Check if we're on a post detail page (posts/[slug])
    if (
      currentPage === "posts" &&
      pathname.startsWith("/posts/") &&
      pathname !== "/posts"
    ) {
      // Initialize with a random pun
      const initialPun = getRandomBreadcrumbPun();
      setBreadcrumbText(initialPun);
      // Rotate with explicit out/in to simulate top-down replacement
      let timeoutId: ReturnType<typeof setTimeout> | undefined;
      const intervalId = setInterval(() => {
        // Trigger out animation on current, then swap and drop in
        setIsAnimating(true);
        timeoutId = setTimeout(() => {
          setPreviousText(breadcrumbText);
          const nextIndex = Math.floor(Math.random() * breadcrumbPuns.length);
          setBreadcrumbText(breadcrumbPuns[nextIndex]);
          // End animation flag shortly after to clean up
          setTimeout(() => setIsAnimating(false), 300);
        }, 0);
      }, 4000);

      return () => {
        clearInterval(intervalId);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [currentPage, pathname, breadcrumbText]);

  return (
    <div>
      <Link href="/" className="inline-block group hover:no-underline">
        <h2 className="mb-0 font-heading font-semibold text-xl pt-12 transition-all duration-300 ease-in-out transform group-hover:-translate-y-1 group-hover:rotate-2 text-gray-900 dark:text-gray-100">
          bimals.net
        </h2>
      </Link>
      <div className="mb-4">
        {isMounted &&
        currentPage === "posts" &&
        pathname.startsWith("/posts/") &&
        pathname !== "/posts" ? (
          <>
            <Link
              href="/posts"
              className="text-sm text-gray-700 dark:text-gray-300 font-semibold underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              title="View all posts"
            >
              /posts
            </Link>
            <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold ml-0.5 inline-flex overflow-hidden align-baseline leading-[1.2] h-[1.2em]">
              /
              <span className="relative inline-block">
                {isAnimating && previousText && (
                  <span className="absolute left-0 top-0 inline-block motion-safe:animate-(--animate-breadcrumb-slide-out)">
                    {previousText}
                  </span>
                )}
                <span
                  className={`inline-block ${
                    isAnimating
                      ? "motion-safe:animate-(--animate-breadcrumb-drop-in)"
                      : ""
                  }`}
                >
                  {breadcrumbText}
                </span>
              </span>
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
