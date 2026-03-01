
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTachometerAlt, faBox, faShoppingBag, faStar, faCog, faTags, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useStoreSettings } from "../../store/useCartStore";

const navigation = [
    { name: "Overview", href: "/store-admin", icon: faTachometerAlt },
    { name: "Products", href: "/store-admin/products", icon: faBox },
    { name: "Categories", href: "/store-admin/categories", icon: faTags },
    { name: "Orders", href: "/store-admin/orders", icon: faShoppingBag },
    { name: "Reviews", href: "/store-admin/reviews", icon: faStar },
    { name: "Settings", href: "/store-admin/settings", icon: faCog },
];

interface AdminMobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminMobileMenu({ isOpen, onClose }: AdminMobileMenuProps) {
    const pathname = useLocation().pathname;
    const { storeName } = useStoreSettings();

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm md:hidden"
                onClick={onClose}
            />
            <div className="fixed inset-y-0 left-0 z-[110] w-[85%] max-w-sm bg-[#fcfcfc] dark:bg-[#050505] p-6 border-r border-gray-200 dark:border-white/10 md:hidden animate-in slide-in-from-left duration-500">
                <div className="flex items-center justify-between mb-12 pb-6 border-b border-gray-200 dark:border-white/10">
                    <span className="font-cinzel text-xl font-medium tracking-[0.2em] text-gray-900 dark:text-white uppercase truncate max-w-[200px]">{storeName || "Admin."}</span>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
                    </button>
                </div>
                <nav className="space-y-4">
                    {navigation.map((item) => {
                        const isActive = item.href === '/store-admin' ? pathname === '/store-admin' : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={onClose}
                                className={`flex items-center gap-4 border-l-2 px-4 py-3 text-xs font-semibold uppercase tracking-widest transition-all ${isActive
                                    ? "border-gray-900 bg-gray-50 text-gray-900 dark:border-white dark:bg-white/5 dark:text-white"
                                    : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:border-white/10 dark:hover:text-white"
                                    }`}
                            >
                                <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="mt-8 border-t border-gray-200 dark:border-white/10 pt-6">
                    <button onClick={() => { if (window.confirm('Are you certain you wish to sign out of the secure portal?')) { window.location.href = '/auth/login'; } }} className="flex w-full items-center gap-4 bg-transparent px-4 py-3 text-xs font-semibold uppercase tracking-widest text-red-600 transition-colors hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-950/20">
                        <FontAwesomeIcon icon={faSignOutAlt} className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </div>
        </>
    );
}
