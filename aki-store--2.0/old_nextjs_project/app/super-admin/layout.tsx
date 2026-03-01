"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LayoutDashboard, Store, ShieldAlert, Settings, LogOut, Menu, Sun, Moon, ShieldCheck } from "lucide-react";
import SuperAdminMobileMenu from "./SuperAdminMobileMenu";
import { useTheme } from "next-themes";

const navigation = [
    { name: "Overview", href: "/super-admin", icon: LayoutDashboard },
    { name: "Stores Integrity", href: "/super-admin/stores", icon: Store },
    { name: "Complaints", href: "/super-admin/complaints", icon: ShieldAlert },
    { name: "Settings", href: "/super-admin/settings", icon: Settings },
];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <div className="flex h-screen bg-[#fcfcfc] dark:bg-[#050505] transition-colors overflow-hidden">
            <SuperAdminMobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            {/* Sidebar Navigation */}
            <aside className="hidden h-full w-64 flex-col border-r border-gray-200 bg-transparent dark:border-white/10 md:flex">
                <div className="flex h-20 items-center justify-between border-b border-gray-200 px-8 dark:border-white/10 shrink-0">
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="font-cinzel text-2xl font-medium tracking-[0.2em] text-gray-900 dark:text-white uppercase group-hover:opacity-70 transition-opacity">AKI.</span>
                        <span className="border border-red-900 dark:border-red-500 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-widest text-red-900 dark:text-red-500">Core</span>
                    </Link>
                </div>

                <nav className="flex-1 space-y-2 py-6 px-4 overflow-y-auto custom-scrollbar">
                    {navigation.map((item) => {
                        const isActive = item.href === '/super-admin' ? pathname === '/super-admin' : pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-4 border-l-2 px-4 py-3 text-xs font-semibold uppercase tracking-widest transition-all ${isActive
                                    ? "border-red-900 bg-red-50 text-red-900 dark:border-red-500 dark:bg-red-900/10 dark:text-red-500"
                                    : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:border-white/10 dark:hover:text-white"
                                    }`}
                            >
                                <item.icon className="h-4 w-4" strokeWidth={1.5} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-gray-200 p-6 dark:border-white/10 space-y-4 shrink-0">
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="flex w-full items-center gap-4 border border-gray-200 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-white/10 dark:text-gray-400 dark:hover:border-white dark:hover:text-white"
                        >
                            {theme === "dark" ? <Sun className="h-4 w-4" strokeWidth={1} /> : <Moon className="h-4 w-4" strokeWidth={1} />}
                            {theme === "dark" ? "Light Mode" : "Dark Mode"}
                        </button>
                    )}
                    <Link href="/auth/super-login" className="flex w-full items-center gap-4 bg-transparent px-4 py-3 text-xs font-semibold uppercase tracking-widest text-red-600 transition-colors hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-950/20">
                        <LogOut className="h-4 w-4" strokeWidth={1.5} />
                        Lock System
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 h-full overflow-y-auto custom-scrollbar">
                <header className="flex h-20 shrink-0 items-center justify-between border-b border-gray-200 bg-[#fcfcfc] px-6 dark:border-white/10 dark:bg-[#050505] md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 text-gray-900 hover:opacity-70 transition-opacity dark:text-white"
                    >
                        <Menu className="h-6 w-6" strokeWidth={1} />
                    </button>
                    <span className="font-cinzel text-xl font-medium tracking-[0.2em] text-red-900 dark:text-red-500 uppercase flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> System
                    </span>
                    <div className="flex items-center gap-4">
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 text-gray-600 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
                            >
                                {theme === "dark" ? <Sun className="h-5 w-5" strokeWidth={1} /> : <Moon className="h-5 w-5" strokeWidth={1} />}
                            </button>
                        )}
                    </div>
                </header>

                <div className="p-4 sm:p-8 lg:p-12 xl:p-16">
                    {children}
                </div>
            </main>
        </div>
    );
}
