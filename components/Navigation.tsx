"use client";

import { useState, useEffect } from "react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { Menu, X, Home, FileText, User, Code } from "lucide-react";

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
    { name: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Posts", href: "/posts", icon: <FileText className="w-4 h-4" /> },
    { name: "About", href: "/about", icon: <User className="w-4 h-4" /> },
    { name: "Stack", href: "/stack", icon: <Code className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={toggleMenu}
        className="fixed bottom-6 right-6 md:top-6 md:right-8 md:bottom-auto z-50 w-14 h-14 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md flex items-center justify-center border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105 cursor-pointer group"
        aria-label="Toggle menu"
      >
        <div className="relative w-6 h-6">
          <Menu
            className={`w-6 h-6 text-gray-700 dark:text-gray-300 transition-all duration-300 ${
              isMenuOpen
                ? "opacity-0 rotate-90 scale-75"
                : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <X
            className={`absolute inset-0 w-6 h-6 text-gray-700 dark:text-gray-300 transition-all duration-300 ${
              isMenuOpen
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-90 scale-75"
            }`}
          />
        </div>
      </button>

      {/* Backdrop - Always present but with smooth transitions */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ease-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      >
        <div className="fixed inset-0 bg-black/30 dark:bg-black/50" />
      </div>

      {/* Navigation Menu */}
      <nav
        className={`fixed bottom-24 right-6 md:top-24 md:right-8 md:bottom-auto z-50 w-48 bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out ${
          isMenuOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-95 pointer-events-none"
        }`}
      >
        <div className="p-4">
          {/* Header */}
          <div className="mb-4 pb-3 border-b border-white/20 dark:border-gray-600/30">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wide">
              bimals.net
            </h3>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 ease-out hover:gap-4 border border-transparent ${
                  pathname === link.href
                    ? "text-gray-900 dark:text-gray-100 bg-white/50 dark:bg-gray-800/50 border-white/40 dark:border-gray-600/40 shadow-sm backdrop-blur-sm"
                    : "text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-white/30 dark:hover:bg-gray-800/30 hover:border-white/20 dark:hover:border-gray-600/20 hover:shadow-sm hover:backdrop-blur-sm"
                }`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <span
                  className={`transition-transform duration-200 group-hover:scale-110 ${
                    pathname === link.href
                      ? "text-gray-700 dark:text-gray-300"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {link.icon}
                </span>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
