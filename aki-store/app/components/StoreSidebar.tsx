import Link from "next/link";
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
  return (
    // The sticky utility keeps the sidebar visible while the user scrolls the product grid
    <aside className="sticky top-24 hidden w-60 shrink-0 flex-col gap-8 md:flex">
      
      {/* Category Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-black text-gray-900 dark:text-white">Category</h2>
        <ul className="flex flex-col gap-2">
          <li>
            <Link href="#" className="flex items-center justify-between rounded-lg bg-gray-100 px-3 py-2 text-sm font-bold text-gray-900 transition-colors dark:bg-gray-800 dark:text-white">
              <div className="flex items-center gap-3">
                <FolderTree className="h-4 w-4" />
                <span>All Product</span>
              </div>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                32
              </span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white transition-colors">
              <Home className="h-4 w-4" />
              <span>For Home</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white transition-colors">
              <Music className="h-4 w-4" />
              <span>For Music</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white transition-colors">
              <Smartphone className="h-4 w-4" />
              <span>For Phone</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white transition-colors">
              <HardDrive className="h-4 w-4" />
              <span>For Storage</span>
            </Link>
          </li>
        </ul>
      </div>

      <hr className="border-gray-200 dark:border-gray-800" />

      {/* Quick Filters Section */}
      <div className="flex flex-col gap-2">
        <Link href="#" className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white transition-colors">
          <div className="flex items-center gap-3">
            <Sparkles className="h-4 w-4" />
            <span>New Arrival</span>
          </div>
        </Link>
        <Link href="#" className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white transition-colors">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-4 w-4" />
            <span>Best Seller</span>
          </div>
        </Link>
        <Link href="#" className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white transition-colors">
          <div className="flex items-center gap-3">
            <Tag className="h-4 w-4" />
            <span>On Discount</span>
          </div>
        </Link>
      </div>

    </aside>
  );
}