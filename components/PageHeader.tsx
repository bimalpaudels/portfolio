"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { breadcrumbPuns, getRandomBreadcrumbPun } from "@/lib/breadcrumbPuns";
import { useEffect, useRef, useState } from "react";

interface PageHeaderProps {
  currentPage: string;
}

export default function PageHeader({ currentPage }: PageHeaderProps) {
  const [breadcrumbText, setBreadcrumbText] = useState<string>("");
  const [previousText, setPreviousText] = useState<string>("");

  const [isSlidingOut, setIsSlidingOut] = useState<boolean>(false);
  const [isDroppingIn, setIsDroppingIn] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pathname = usePathname();
  const breadcrumbRef = useRef<string>("");

  useEffect(() => {
    breadcrumbRef.current = breadcrumbText;
  }, [breadcrumbText]);

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
      // Rotate with explicit out (300ms) then in (300ms), with a 6s cycle
      let timeoutOutId: ReturnType<typeof setTimeout> | undefined;
      let timeoutInId: ReturnType<typeof setTimeout> | undefined;
      const intervalId = setInterval(() => {
        const current = breadcrumbRef.current;
        setPreviousText(current);
        setIsDroppingIn(false);
        setIsSlidingOut(true);

        // After slide-out completes, swap text and drop-in
        timeoutOutId = setTimeout(() => {
          // choose a different pun than current if possible
          let nextIndex = Math.floor(Math.random() * breadcrumbPuns.length);
          if (breadcrumbPuns.length > 1) {
            const currentIndex = breadcrumbPuns.indexOf(current);
            if (currentIndex === nextIndex) {
              nextIndex = (nextIndex + 1) % breadcrumbPuns.length;
            }
          }
          setBreadcrumbText(breadcrumbPuns[nextIndex]);
          setIsSlidingOut(false);
          setIsDroppingIn(true);

          // End drop-in flag after animation completes
          timeoutInId = setTimeout(() => setIsDroppingIn(false), 300);
        }, 300);
      }, 6000);

      return () => {
        clearInterval(intervalId);
        if (timeoutOutId) clearTimeout(timeoutOutId);
        if (timeoutInId) clearTimeout(timeoutInId);
      };
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
                {isSlidingOut && previousText && (
                  <span className="absolute left-0 top-0 inline-block motion-safe:animate-(--animate-breadcrumb-slide-out)">
                    {previousText}
                  </span>
                )}
                <span
                  className={`inline-block ${
                    isDroppingIn
                      ? "motion-safe:animate-(--animate-breadcrumb-drop-in)"
                      : ""
                  } ${isSlidingOut ? "invisible" : ""}`}
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
