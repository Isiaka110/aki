"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FolderTree,
  Home,
  Music,
  Smartphone,
  HardDrive,
  Sparkles,
  TrendingUp,
  Tag
} from "lucide-react";

export default function StoreSidebar() {
  const { storeSlug } = useParams();
  const baseUrl = storeSlug ? `/${storeSlug}` : "/explore";

  return (
    // The sticky utility keeps the sidebar visible while the user scrolls the product grid
    <aside className="sticky top-12 hidden w-64 shrink-0 flex-col gap-10 md:flex">

      {/* Category Section */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-cinzel tracking-widest uppercase text-gray-900 dark:text-white">Directory</h2>
        <ul className="flex flex-col gap-2">
          <li>
            <Link href={baseUrl} className="flex items-center justify-between px-3 py-3 text-sm font-medium tracking-wide text-gray-900 border-l-2 border-gray-900 dark:border-white transition-colors bg-gray-50 dark:bg-white/5 dark:text-white">
              <div className="flex items-center gap-4">
                <FolderTree className="h-4 w-4" strokeWidth={1.5} />
                <span className="font-cinzel tracking-widest text-xs uppercase">All Curations</span>
              </div>
              <span className="flex h-4 w-4 items-center justify-center border border-gray-900 dark:border-white text-[9px] text-gray-900 dark:text-white">
                32
              </span>
            </Link>
          </li>
          <li>
            <Link href={`${baseUrl}?category=home`} className="flex items-center gap-4 border-l-2 border-transparent px-3 py-3 text-sm font-light tracking-wide text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white transition-colors group">
              <Home className="h-4 w-4 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
              <span className="font-cinzel tracking-widest text-xs uppercase">Home Decor</span>
            </Link>
          </li>
          <li>
            <Link href={`${baseUrl}?category=music`} className="flex items-center gap-4 border-l-2 border-transparent px-3 py-3 text-sm font-light tracking-wide text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white transition-colors group">
              <Music className="h-4 w-4 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
              <span className="font-cinzel tracking-widest text-xs uppercase">Audio Fidelity</span>
            </Link>
          </li>
          <li>
            <Link href={`${baseUrl}?category=phone`} className="flex items-center gap-4 border-l-2 border-transparent px-3 py-3 text-sm font-light tracking-wide text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white transition-colors group">
              <Smartphone className="h-4 w-4 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
              <span className="font-cinzel tracking-widest text-xs uppercase">Communication</span>
            </Link>
          </li>
          <li>
            <Link href={`${baseUrl}?category=storage`} className="flex items-center gap-4 border-l-2 border-transparent px-3 py-3 text-sm font-light tracking-wide text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white transition-colors group">
              <HardDrive className="h-4 w-4 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
              <span className="font-cinzel tracking-widest text-xs uppercase">Data Storage</span>
            </Link>
          </li>
        </ul>
      </div>

      <hr className="border-gray-200 dark:border-white/10" />

      {/* Quick Filters Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-cinzel tracking-widest uppercase text-gray-900 dark:text-white mb-4">Highlights</h2>
        <Link href={`${baseUrl}?filter=new`} className="flex items-center justify-between border border-transparent px-3 py-3 text-sm font-light tracking-wide text-gray-500 hover:border-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:border-white/10 dark:hover:bg-white/5 dark:hover:text-white transition-all group">
          <div className="flex items-center gap-4">
            <Sparkles className="h-4 w-4 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
            <span className="font-cinzel tracking-widest text-xs uppercase">New Acquisitions</span>
          </div>
        </Link>
        <Link href={`${baseUrl}?filter=best`} className="flex items-center justify-between border border-transparent px-3 py-3 text-sm font-light tracking-wide text-gray-500 hover:border-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:border-white/10 dark:hover:bg-white/5 dark:hover:text-white transition-all group">
          <div className="flex items-center gap-4">
            <TrendingUp className="h-4 w-4 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
            <span className="font-cinzel tracking-widest text-xs uppercase">Most Coveted</span>
          </div>
        </Link>
        <Link href={`${baseUrl}?filter=discount`} className="flex items-center justify-between border border-transparent px-3 py-3 text-sm font-light tracking-wide text-gray-500 hover:border-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:border-white/10 dark:hover:bg-white/5 dark:hover:text-white transition-all group">
          <div className="flex items-center gap-4">
            <Tag className="h-4 w-4 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
            <span className="font-cinzel tracking-widest text-xs uppercase">Seasonal Reductions</span>
          </div>
        </Link>
      </div>

    </aside>
  );
}