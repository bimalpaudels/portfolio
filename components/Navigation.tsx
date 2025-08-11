"use client";

import { useState, useEffect } from "react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Posts", href: "/posts" },
    { name: "About", href: "/about" },
    { name: "Stack", href: "/stack" },
  ];

  return (
    <>
      <button
        onClick={toggleMenu}
        className="fixed bottom-6 right-6 md:top-6 md:right-8 md:bottom-auto z-50 w-12 h-12 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
        aria-label="Toggle menu"
      >
        <Image
          src="/favicon.ico"
          alt="Logo"
          width={36}
          height={36}
          className="rounded-sm"
        />
      </button>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black/10" onClick={toggleMenu} />
          <nav className="fixed bottom-20 right-6 md:top-20 md:right-8 md:bottom-auto w-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-lg">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-lg ${
                    pathname === link.href
                      ? "text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-900/30"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
