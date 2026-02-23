"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, User, Moon, Sun, Menu } from "lucide-react"; // Imported Menu
import { useCartStore } from "../store/useCartStore";
import MobileMenu from "./MobileMenu"; // Imported our new component

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile drawer
  
  const { items, toggleCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80 transition-colors duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          
          {/* Left: Hamburger (Mobile) + Logo */}
          <div className="flex items-center gap-3">
            {/* Hamburger Icon - Hidden on md and up */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
                AKI.
              </span>
            </Link>
          </div>

          {/* Center: Search Bar (Hidden on mobile, visible on md and up) */}
          <div className="hidden flex-1 items-center justify-center px-8 md:flex">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search stores or products..."
                className="w-full rounded-full border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-white dark:focus:ring-white transition-colors"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
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

            {/* User Profile (Hidden on very small screens) */}
            <button className="hidden rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 sm:block transition-colors">
              <User className="h-5 w-5" />
            </button>

            {/* Cart Icon with Dynamic Badge */}
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