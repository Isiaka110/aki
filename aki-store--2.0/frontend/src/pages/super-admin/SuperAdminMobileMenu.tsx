import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTachometerAlt, faExclamationTriangle, faStore, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const navigation = [
    { name: "Overview", href: "/super-admin", icon: faTachometerAlt },
    { name: "Stores Integrity", href: "/super-admin/stores", icon: faStore },
    { name: "Complaints", href: "/super-admin/complaints", icon: faExclamationTriangle },
    { name: "Platform Settings", href: "/super-admin/settings", icon: faCog },
];

interface SuperAdminMobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SuperAdminMobileMenu({ isOpen, onClose }: SuperAdminMobileMenuProps) {
    const pathname = useLocation().pathname;

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm md:hidden"
                onClick={onClose}
            />
            <div className="fixed inset-y-0 left-0 z-[110] w-[85%] max-w-sm bg-[#fcfcfc] dark:bg-[#050505] p-6 border-r border-gray-200 dark:border-white/10 md:hidden animate-in slide-in-from-left duration-500">
                <div className="flex items-center justify-between mb-12 pb-6 border-b border-gray-200 dark:border-white/10">
                    <span className="font-cinzel text-xl font-medium tracking-[0.2em] text-red-900 dark:text-red-500 uppercase">System Core.</span>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-red-900 dark:hover:text-red-500 transition-colors">
                        <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
                    </button>
                </div>
                <nav className="space-y-4">
                    {navigation.map((item) => {
                        const isActive = item.href === '/super-admin' ? pathname === '/super-admin' : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={onClose}
                                className={`flex items-center gap-4 border-l-2 px-4 py-3 text-xs font-semibold uppercase tracking-widest transition-all ${isActive
                                    ? "border-red-900 bg-red-50 text-red-900 dark:border-red-500 dark:bg-red-900/10 dark:text-red-500"
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
                    <button onClick={() => { if (window.confirm('Are you certain you wish to lock the system core?')) { window.location.href = '/auth/super-login'; } }} className="flex w-full items-center gap-4 bg-transparent px-4 py-3 text-xs font-semibold uppercase tracking-widest text-red-600 transition-colors hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-950/20">
                        <FontAwesomeIcon icon={faSignOutAlt} className="h-4 w-4" />
                        Lock System
                    </button>
                </div>
            </div>
        </>
    );
}
