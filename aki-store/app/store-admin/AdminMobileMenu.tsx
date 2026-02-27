"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LayoutDashboard, Package, ShoppingBag, Star, Settings, Tags } from "lucide-react";

const navigation = [
    { name: "Overview", href: "/store-admin", icon: LayoutDashboard },
    { name: "Products", href: "/store-admin/products", icon: Package },
    { name: "Categories", href: "/store-admin/categories", icon: Tags },
    { name: "Orders", href: "/store-admin/orders", icon: ShoppingBag },
    { name: "Reviews", href: "/store-admin/reviews", icon: Star },
    { name: "Settings", href: "/store-admin/settings", icon: Settings },
];

interface AdminMobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminMobileMenu({ isOpen, onClose }: AdminMobileMenuProps) {
    const pathname = usePathname();

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm md:hidden"
                onClick={onClose}
            />
            <div className="fixed inset-y-0 left-0 z-[110] w-[85%] max-w-sm bg-[#fcfcfc] dark:bg-[#050505] p-6 border-r border-gray-200 dark:border-white/10 md:hidden animate-in slide-in-from-left duration-500">
                <div className="flex items-center justify-between mb-12 pb-6 border-b border-gray-200 dark:border-white/10">
                    <span className="font-cinzel text-xl font-medium tracking-[0.2em] text-gray-900 dark:text-white uppercase">Admin.</span>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <X className="h-6 w-6" strokeWidth={1} />
                    </button>
                </div>
                <nav className="space-y-4">
                    {navigation.map((item) => {
                        const isActive = item.href === '/store-admin' ? pathname === '/store-admin' : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={onClose}
                                className={`flex items-center gap-4 border-l-2 px-4 py-3 text-xs font-semibold uppercase tracking-widest transition-all ${isActive
                                    ? "border-gray-900 bg-gray-50 text-gray-900 dark:border-white dark:bg-white/5 dark:text-white"
                                    : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:border-white/10 dark:hover:text-white"
                                    }`}
                            >
                                <item.icon className="h-4 w-4" strokeWidth={1.5} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}
