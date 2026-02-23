import Link from "next/link";
import { Store, Instagram, Twitter, Mail } from "lucide-react";

export default function StoreFooter() {
    return (
        <footer className="bg-gray-50 dark:bg-gray-950 px-4 py-12 sm:px-6 lg:px-8 border-t border-gray-100 dark:border-gray-900 transition-colors">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                    <div className="flex items-center gap-2">
                        <Store className="h-6 w-6 text-gray-900 dark:text-white" />
                        <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">AKI Shopper</span>
                    </div>

                    <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                        {['Shop All', 'Categories', 'Track Order', 'Account', 'Support'].map((item) => (
                            <Link key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                                {item}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex gap-4">
                        <Link href="#" className="p-2 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <Instagram className="h-4 w-4" />
                        </Link>
                        <Link href="#" className="p-2 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <Twitter className="h-4 w-4" />
                        </Link>
                        <Link href="#" className="p-2 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <Mail className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} AKI Market Shopper Network. All security guaranteed.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white">Privacy</Link>
                        <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
