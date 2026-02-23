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
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                onClick={onClose}
            />
            <div className="fixed inset-y-0 left-0 z-50 w-[80%] max-w-sm bg-white p-6 dark:bg-gray-950 md:hidden animate-in slide-in-from-left duration-300">
                <div className="flex items-center justify-between mb-8">
                    <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">Admin.</span>
                    <button onClick={onClose} className="p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <nav className="space-y-2">
                    {navigation.map((item) => {
                        const isActive = item.href === '/store-admin' ? pathname === '/store-admin' : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={onClose}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${isActive
                                        ? "bg-black text-white dark:bg-white dark:text-black shadow-lg"
                                        : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900"
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}
