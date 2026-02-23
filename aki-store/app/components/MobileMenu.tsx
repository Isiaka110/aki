"use client";

import Link from "next/link";
import { 
  X, 
  Search, 
  FolderTree, 
  Home, 
  Music, 
  Smartphone, 
  HardDrive, 
  Sparkles, 
  TrendingUp, 
  Tag 
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay - Only visible on mobile screens */}
      <div 
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Drawer Panel */}
      <div className="fixed inset-y-0 left-0 z-50 flex w-[85%] max-w-sm flex-col overflow-y-auto bg-white shadow-2xl dark:bg-gray-950 md:hidden animate-in slide-in-from-left duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
          <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
            AKI. Menu
          </span>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex flex-col gap-8 p-6 pb-20">
          
          {/* Mobile Search Bar */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search stores or products..."
              className="w-full rounded-full border border-gray-300 bg-gray-50 px-4 py-3 pl-11 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-white dark:focus:ring-white transition-colors"
            />
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-black text-gray-900 dark:text-white">Category</h2>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="#" onClick={onClose} className="flex items-center justify-between rounded-lg bg-gray-100 px-4 py-3 text-sm font-bold text-gray-900 transition-colors dark:bg-gray-800 dark:text-white">
                  <div className="flex items-center gap-3">
                    <FolderTree className="h-5 w-5" />
                    <span>All Product</span>
                  </div>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    32
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#" onClick={onClose} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white transition-colors">
                  <Home className="h-5 w-5" />
                  <span>For Home</span>
                </Link>
              </li>
              <li>
                <Link href="#" onClick={onClose} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white transition-colors">
                  <Music className="h-5 w-5" />
                  <span>For Music</span>
                </Link>
              </li>
              <li>
                <Link href="#" onClick={onClose} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white transition-colors">
                  <Smartphone className="h-5 w-5" />
                  <span>For Phone</span>
                </Link>
              </li>
              <li>
                <Link href="#" onClick={onClose} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white transition-colors">
                  <HardDrive className="h-5 w-5" />
                  <span>For Storage</span>
                </Link>
              </li>
            </ul>
          </div>

          <hr className="border-gray-200 dark:border-gray-800" />

          {/* Quick Filters */}
          <div className="flex flex-col gap-2">
            <Link href="#" onClick={onClose} className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white transition-colors">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5" />
                <span>New Arrival</span>
              </div>
            </Link>
            <Link href="#" onClick={onClose} className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white transition-colors">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5" />
                <span>Best Seller</span>
              </div>
            </Link>
            <Link href="#" onClick={onClose} className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white transition-colors">
              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5" />
                <span>On Discount</span>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}