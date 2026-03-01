"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Instagram, Twitter, Mail, ShieldAlert, X } from "lucide-react";
import { useStoreSettings } from "../store/useCartStore";
import { useEffect, useState } from "react";

export default function StoreFooter() {
    const params = useParams();
    const storeSlug = params?.storeSlug as string;
    const { ownerName, contactEmail, socialInstagram, socialTwitter } = useStoreSettings();
    const [mounted, setMounted] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);

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
                    <p>© {new Date().getFullYear()} {storeSlug ? ownerName : "AKI Commerce"}. Integrity Assured.</p>
                    <div className="flex gap-8 items-center">
                        <Link href={`${basePath}/policy/privacy`} className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</Link>
                        <Link href={`${basePath}/policy/terms`} className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</Link>
                        {storeSlug && (
                            <button onClick={() => setIsReportOpen(true)} className="flex items-center gap-1.5 hover:text-red-900 dark:hover:text-red-500 transition-colors">
                                <ShieldAlert className="h-3 w-3" /> Report Store
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Report Store Modal */}
            {isReportOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <div className="w-full max-w-md bg-[#fcfcfc] dark:bg-[#050505] border border-gray-200 dark:border-white/10 p-8 relative">
                        <button onClick={() => setIsReportOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            <X className="h-5 w-5" strokeWidth={1} />
                        </button>
                        <h2 className="font-cinzel text-2xl tracking-wider text-red-600 dark:text-red-500 uppercase mb-4 flex items-center gap-3">
                            <ShieldAlert className="h-6 w-6" /> Report {ownerName}
                        </h2>
                        <p className="text-sm font-light text-gray-500 mb-6">
                            If you believe this store is violating platform policies or you are experiencing dispute resolution issues, submit a secure report directly to the AKI Commerce core integrity team.
                        </p>

                        <form className="space-y-6">
                            <div>
                                <select className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-red-900 focus:outline-none dark:border-white/10 dark:text-white dark:focus:border-red-500 transition-colors tracking-wide font-light text-gray-500 appearance-none rounded-none">
                                    <option value="" disabled selected>Nature of violation</option>
                                    <option className="text-gray-900">Non-delivery of goods</option>
                                    <option className="text-gray-900">Counterfeit merchandise</option>
                                    <option className="text-gray-900">Unresponsive vendor</option>
                                    <option className="text-gray-900">Offensive material</option>
                                </select>
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Your Email Identity"
                                    className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-red-900 focus:outline-none dark:border-white/10 dark:text-white dark:focus:border-red-500 transition-colors tracking-wide font-light placeholder-gray-400"
                                    required
                                />
                            </div>
                            <div>
                                <textarea
                                    className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-red-900 focus:outline-none dark:border-white/10 dark:text-white dark:focus:border-red-500 transition-colors tracking-wide font-light placeholder-gray-400 resize-none"
                                    rows={4}
                                    placeholder="Provide detailed evidence..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsReportOpen(false)}
                                className="w-full mt-4 flex justify-center border border-red-900 bg-red-900 py-4 text-xs font-semibold tracking-widest uppercase text-white transition-colors hover:bg-transparent hover:text-red-900 dark:hover:text-red-500"
                            >
                                Dispatch Secure Report
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </footer>
    );
}
