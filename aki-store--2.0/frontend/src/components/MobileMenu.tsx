
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faIcons, faArrowTrendUp, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  storeData?: any;
}

export default function MobileMenu({ isOpen, onClose, storeData }: MobileMenuProps) {
  const { storeSlug } = useParams();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const baseUrl = storeSlug ? `/${storeSlug}` : "/explore";

  useEffect(() => setMounted(true), []);

  if (!isOpen) return null;

  const categories = storeData?.categories || [];
  const totalProducts = storeData?.products?.length || 0;
  const storeName = storeData?.name || storeSlug || "AKI.";

  return (
    <>
      {/* Background Overlay - Only visible on mobile screens */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Drawer Panel */}
      <div className="fixed inset-y-0 left-0 z-50 flex w-[85%] max-w-sm flex-col overflow-y-auto bg-[#fcfcfc] shadow-2xl dark:bg-[#050505] md:hidden animate-in slide-in-from-left duration-500 border-r border-gray-200 dark:border-white/10">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-8 dark:border-white/10 shrink-0">
          <span className="font-cinzel text-xl font-medium tracking-[0.2em] text-gray-900 dark:text-white uppercase truncate pr-4">
            {storeName}
          </span>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex flex-col gap-10 p-8 pb-32">

          {/* Categories */}
          <div className="flex flex-col gap-6">
            <h2 className="font-cinzel text-lg tracking-widest uppercase text-gray-400">Directory</h2>
            <ul className="flex flex-col gap-2">
              <li>
                <Link to={baseUrl} onClick={onClose} className="flex items-center justify-between px-3 py-4 text-sm font-medium tracking-wide text-gray-900 border-l-2 border-gray-900 dark:border-white transition-colors bg-gray-50 dark:bg-white/5 dark:text-white group">
                  <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faIcons} className="h-4 w-4" />
                    <span className="font-cinzel tracking-widest text-xs uppercase">All Curations</span>
                  </div>
                  <span className="flex h-4 w-4 items-center justify-center border border-gray-900 dark:border-white text-[9px] text-gray-900 dark:text-white">
                    {totalProducts}
                  </span>
                </Link>
              </li>
              {categories.map((cat: any) => (
                <li key={cat.id || cat._id}>
                  <Link to={`${baseUrl}?category=${cat.name.toLowerCase()}`} onClick={onClose} className="flex items-center justify-between border-l-2 border-transparent px-3 py-4 text-sm font-light tracking-wide text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white transition-colors group">
                    <div className="flex items-center gap-4">
                      <FontAwesomeIcon icon={faIcons} className="h-4 w-4" />
                      <span className="font-cinzel tracking-widest text-xs uppercase">{cat.name}</span>
                    </div>
                    {cat.productCount !== undefined && (
                      <span className="text-[10px] text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                        {cat.productCount}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <hr className="border-gray-200 dark:border-white/10" />

          {/* Quick Filters */}
          <div className="flex flex-col gap-2">
            <h2 className="font-cinzel text-lg tracking-widest uppercase text-gray-400 mb-4">Highlights</h2>
            <Link to={`${baseUrl}?filter=new`} onClick={onClose} className="flex items-center justify-between border border-transparent px-3 py-3 text-sm font-light tracking-wide text-gray-500 hover:border-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:border-white/10 dark:hover:bg-white/5 dark:hover:text-white transition-all group">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faIcons} className="h-4 w-4" />
                <span className="font-cinzel tracking-widest text-xs uppercase">New Acquisitions</span>
              </div>
            </Link>
            <Link to={`${baseUrl}?filter=best`} onClick={onClose} className="flex items-center justify-between border border-transparent px-3 py-3 text-sm font-light tracking-wide text-gray-500 hover:border-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:border-white/10 dark:hover:bg-white/5 dark:hover:text-white transition-all group">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faArrowTrendUp} className="h-4 w-4" />
                <span className="font-cinzel tracking-widest text-xs uppercase">Most Coveted</span>
              </div>
            </Link>
          </div>

          <hr className="border-gray-200 dark:border-white/10" />

          {/* Appearance */}
          <div className="flex flex-col gap-6">
            <h2 className="font-cinzel text-lg tracking-widest uppercase text-gray-400">Appearance</h2>
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="flex items-center justify-between border border-gray-200 p-4 text-xs font-semibold tracking-widest uppercase text-gray-900 transition-all dark:border-white/10 dark:text-white hover:border-gray-900 dark:hover:border-white"
              >
                <div className="flex items-center gap-4">
                  {resolvedTheme === "dark" ? <FontAwesomeIcon icon={faSun} className="h-4 w-4" /> : <FontAwesomeIcon icon={faMoon} className="h-4 w-4" />}
                  <span>{resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
                </div>
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  );
}