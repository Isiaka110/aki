// app/store-admin/layout.tsx
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBox, faShoppingBag, faStar, faCog, faSignOutAlt, faStore, faTags, faBars, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import AdminMobileMenu from "./AdminMobileMenu";
import { useTheme } from "next-themes";
import ConfirmModal from "../../components/ConfirmModal";
import { useAuthStore } from "../../store/useAuthStore";
import { useStoreSettings } from "../../store/useCartStore";
import { apiGetStoreAdminOverview, apiLogout } from "../../services/api";

const navigation = [
  { name: "Overview", href: "/store-admin", icon: faTachometerAlt },
  { name: "Products", href: "/store-admin/products", icon: faBox },
  { name: "Categories", href: "/store-admin/categories", icon: faTags },
  { name: "Orders", href: "/store-admin/orders", icon: faShoppingBag },
  { name: "Reviews", href: "/store-admin/reviews", icon: faStar },
  { name: "Settings", href: "/store-admin/settings", icon: faCog },
];

export default function StoreAdminLayout() {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { clearAuth, user } = useAuthStore();
  const { primaryColor, hydrateSettings, storeName, storeId } = useStoreSettings();

  // Use the verified storeId slug from settings hydration (from DB)
  // Fallback to name-based slug only if storeId isn't yet available
  const storefrontSlug = storeId || (user?.storeName ? user.storeName.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-') : '');

  useEffect(() => {
    setMounted(true);
    if (primaryColor) {
      document.documentElement.style.setProperty('--color-primary', primaryColor);
    }
  }, [primaryColor]);

  useEffect(() => {
    const syncDatabaseData = async () => {
      try {
        const data = await apiGetStoreAdminOverview();
        if (data) {
          hydrateSettings({
            storeName: data.storeName,
            storeId: data.storeId,
            ...data.settings
          });
        }
      } catch (e) {
        console.error("Failed to sync admin store data");
      }
    };
    syncDatabaseData();
  }, [hydrateSettings]);

  const handleLogoutConfirm = async () => {
    try { await apiLogout(); } catch (_) { /* ignore */ }
    clearAuth();
    setShowLogoutModal(false);
    navigate('/auth/login');
  };

  return (
    <div className="flex h-screen bg-[#fcfcfc] dark:bg-[#050505] transition-colors overflow-hidden">
      <AdminMobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <ConfirmModal
        isOpen={showLogoutModal}
        title="Sign Out?"
        message="Are you certain you wish to sign out of the secure store portal? Any unsaved changes will be lost."
        confirmLabel="Sign Out"
        cancelLabel="Stay Here"
        variant="danger"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutModal(false)}
      />

      {/* Sidebar Navigation */}
      <aside className="hidden h-full w-64 flex-col border-r border-gray-200 bg-transparent dark:border-white/10 md:flex">
        <div className="flex h-20 items-center justify-between border-b border-gray-200 px-8 dark:border-white/10 shrink-0">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-cinzel text-xl font-medium tracking-[0.2em] text-gray-900 dark:text-white uppercase group-hover:opacity-70 transition-opacity truncate max-w-[140px]">{storeName || "AKI."}</span>
            <span className="border border-gray-900 dark:border-white px-2 py-0.5 text-[8px] font-semibold uppercase tracking-widest text-gray-900 dark:text-white">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-2 py-6 px-4 overflow-y-auto custom-scrollbar">
          {navigation.map((item) => {
            const isActive = item.href === '/store-admin' ? pathname === '/store-admin' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
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

        <div className="border-t border-gray-200 p-6 dark:border-white/10 space-y-4 shrink-0">
          <Link
            to={`/${storefrontSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-4 border border-gray-900 bg-gray-900 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
          >
            <FontAwesomeIcon icon={faStore} className="h-4 w-4" />
            Visit Storefront
          </Link>
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex w-full items-center gap-4 border border-gray-200 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-white/10 dark:text-gray-400 dark:hover:border-white dark:hover:text-white"
            >
              {theme === "dark" ? <FontAwesomeIcon icon={faSun} className="h-4 w-4" /> : <FontAwesomeIcon icon={faMoon} className="h-4 w-4" />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          )}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex w-full items-center gap-4 bg-transparent px-4 py-3 text-xs font-semibold uppercase tracking-widest text-red-600 transition-colors hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-950/20"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto custom-scrollbar">
        <header className="sticky top-0 z-50 flex h-20 shrink-0 items-center justify-between border-b border-gray-200 bg-[#fcfcfc] px-6 dark:border-white/10 dark:bg-[#050505] md:hidden">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-gray-900 hover:opacity-70 transition-opacity dark:text-white">
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
          </button>
          <span className="font-cinzel text-xl font-medium tracking-[0.2em] text-gray-900 dark:text-white uppercase truncate max-w-[150px]">{storeName || "Admin."}</span>
          <div className="flex items-center gap-4">
            {mounted && (
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 text-gray-600 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">
                {theme === "dark" ? <FontAwesomeIcon icon={faSun} className="h-5 w-5" /> : <FontAwesomeIcon icon={faMoon} className="h-5 w-5" />}
              </button>
            )}
            <Link to={`/${storefrontSlug}`} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faStore} className="h-5 w-5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" />
            </Link>
          </div>
        </header>

        <div className="p-4 sm:p-8 lg:p-12 xl:p-16">
          <Outlet />
        </div>
      </main>
    </div>
  );
}