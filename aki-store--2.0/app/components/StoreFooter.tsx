"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Instagram, Twitter, Mail } from "lucide-react";
import { useStoreSettings } from "../store/useCartStore";
import { useEffect, useState } from "react";

export default function StoreFooter() {
    const params = useParams();
    const storeSlug = params?.storeSlug as string;
    const { ownerName, contactEmail, socialInstagram, socialTwitter } = useStoreSettings();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const basePath = storeSlug ? `/${storeSlug}` : "/explore";

    const mainLinks = [
        { name: 'Catalogue', path: basePath },
        { name: 'Account', path: storeSlug ? `/${storeSlug}/account` : '/account' },
        { name: 'Concierge', path: `${basePath}/concierge` },
    ];

    return (
        <footer className="bg-[#fcfcfc] dark:bg-[#050505] px-4 py-16 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-white/10 transition-colors">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-12">
                    <div className="flex items-center gap-2">
                        <Link href={basePath}>
                            <span className="font-cinzel text-2xl font-medium tracking-[0.2em] text-gray-900 dark:text-white uppercase transition-opacity hover:opacity-70">
                                {storeSlug ? storeSlug : "AKI."}
                            </span>
                        </Link>
                    </div>

                    <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4">
                        {mainLinks.map((item) => (
                            <Link key={item.name} href={item.path} className="font-cinzel text-xs font-semibold tracking-widest text-gray-500 uppercase hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex gap-6">
                        {socialInstagram && (
                            <a href={`https://instagram.com/${socialInstagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="p-2 border border-transparent hover:border-gray-900 text-gray-400 hover:text-gray-900 dark:hover:border-white dark:hover:text-white transition-all duration-300">
                                <Instagram className="h-4 w-4" strokeWidth={1} />
                            </a>
                        )}
                        {socialTwitter && (
                            <a href={`https://twitter.com/${socialTwitter.replace('@', '')}`} target="_blank" rel="noreferrer" className="p-2 border border-transparent hover:border-gray-900 text-gray-400 hover:text-gray-900 dark:hover:border-white dark:hover:text-white transition-all duration-300">
                                <Twitter className="h-4 w-4" strokeWidth={1} />
                            </a>
                        )}
                        {contactEmail && (
                            <a href={`mailto:${contactEmail}`} className="p-2 border border-transparent hover:border-gray-900 text-gray-400 hover:text-gray-900 dark:hover:border-white dark:hover:text-white transition-all duration-300">
                                <Mail className="h-4 w-4" strokeWidth={1} />
                            </a>
                        )}
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-light text-gray-400 uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} {storeSlug ? ownerName : "AKI Maison"}. Integrity Assured.</p>
                    <div className="flex gap-8">
                        <Link href={`${basePath}/policy/privacy`} className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</Link>
                        <Link href={`${basePath}/policy/terms`} className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
