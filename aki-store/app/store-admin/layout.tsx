// app/store-admin/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Star, Settings, LogOut, Store } from "lucide-react";

// 1. UPDATE THESE LINKS from '/dashboard' to '/store-admin'
const navigation = [
  { name: "Overview", href: "/store-admin", icon: LayoutDashboard },
  { name: "Products", href: "/store-admin/products", icon: Package },
  { name: "Orders", href: "/store-admin/orders", icon: ShoppingBag },
  { name: "Reviews", href: "/store-admin/reviews", icon: Star },
  { name: "Settings", href: "/store-admin/settings", icon: Settings },
];

export default function StoreAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      
      {/* Sidebar Navigation */}
      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 md:flex">
        <div className="flex h-16 items-center border-b border-gray-200 px-6 dark:border-gray-800">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">AKI.</span>
            <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-400">Owner</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
             // 2. Add an exact match check for the base /store-admin route
            const isActive = item.href === '/store-admin' ? pathname === '/store-admin' : pathname.startsWith(item.href);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900/50 dark:hover:text-white"
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? "text-gray-900 dark:text-white" : "text-gray-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 p-4 dark:border-gray-800">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 transition-colors">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-950 md:hidden">
           <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white">Store Admin</span>
            <button className="p-2 text-gray-500"><Store className="h-6 w-6" /></button>
        </header>

        <div className="p-4 sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}