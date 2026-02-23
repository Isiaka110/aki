"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, User, Moon, Sun, Menu, UserPlus } from "lucide-react"; // Imported Menu and UserPlus
import { useCartStore } from "../store/useCartStore";
import MobileMenu from "./MobileMenu"; // Imported our new component

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { items, toggleCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => setMounted(true), []);

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80 transition-colors duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          {/* Left: Hamburger (Mobile) + Logo */}
          <div className="flex items-center gap-3">
            {/* Hamburger Icon - Hidden on md and up, and hidden on landing page as requested */}
            {!isLandingPage && (
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}

            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
                AKI.
              </span>
            </Link>
          </div>

          {/* Center: Search Bar (Hidden on mobile, visible on md and up) */}
          <div className={`${isLandingPage ? 'hidden' : 'hidden md:flex'} flex-1 items-center justify-center px-8`}>
            <form onSubmit={handleSearch} className="relative w-full max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stores or products..."
                className="w-full rounded-full border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-white dark:focus:ring-white transition-colors"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>
          </div>

          {/* Right: Icons & Actions */}
          <div className="flex items-center gap-2 sm:gap-6">

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}

            {isLandingPage ? (
              <Link
                href="/auth/signup"
                className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-bold text-white transition-all hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Join AKI</span>
              </Link>
            ) : (
              <Link
                href="/account"
                className="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                title="Your Account"
              >
                <User className="h-5 w-5" />
              </Link>
            )}

            {/* Cart Icon with Dynamic Badge - Hidden on landing page as requested */}
            {!isLandingPage && (
              <button
                onClick={toggleCart}
                className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white dark:bg-white dark:text-black">
                    {totalItems}
                  </span>
                )}
              </button>
            )}

          </div>
        </div>
      </nav>

      {/* Render the Mobile Menu Drawer outside the nav layout */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}