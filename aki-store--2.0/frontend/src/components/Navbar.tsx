
import { Link } from 'react-router-dom';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingBag, faUser, faMoon, faSun, faBars, faChevronDown, faSignOutAlt, faCog, faStore } from '@fortawesome/free-solid-svg-icons';
import { useCartStore } from "../store/useCartStore";
import { useCurrencyStore, CURRENCIES } from "../store/useCurrencyStore";
import { useAuthStore } from "../store/useAuthStore";
import MobileMenu from "./MobileMenu";
import ConfirmationModal from "./ConfirmationModal";
import { apiGetStoreBySlug } from "../services/api";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useNavigate();
  const pathname = useLocation().pathname;
  const isLandingPage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [storeData, setStoreData] = useState<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Extract store slug from params to know if we are in a personalized store
  const params = useParams();
  const storeSlug = params?.storeSlug as string;

  const { items, toggleCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const { currency, setCurrency, isFetchingRates } = useCurrencyStore();

  // Personalized search: route to store's own explore page when in a storefront
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (storeSlug) {
        router(`/${storeSlug}/explore?q=${encodeURIComponent(searchQuery)}`);
      } else {
        router(`/explore?q=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  // Check if a JWT session exists (stored by the auth flow)
  // isLoggedIn used for potential future gating

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (storeSlug) {
      const fetchStore = async () => {
        try {
          const data = await apiGetStoreBySlug(storeSlug);
          setStoreData(data);
        } catch (err) {
          console.error("Navbar failed to fetch store details", err);
          setStoreData(null);
        }
      };
      fetchStore();
    } else {
      setStoreData(null);
    }
  }, [storeSlug]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (storeSlug) {
      e.preventDefault();
      setShowExitWarning(true);
    }
  };

  const { clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    document.cookie = 'token=; Max-Age=0; path=/;';
    localStorage.removeItem('aki_session');
    setProfileOpen(false);
    router('/auth/login');
  };

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#fcfcfc]/80 backdrop-blur-md border-b border-gray-200 dark:bg-[#050505]/80 dark:border-white/10" : "bg-transparent border-transparent"}`}>
        <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8 ${!scrolled && isLandingPage ? "text-gray-900 dark:text-white" : "text-gray-900 dark:text-white"}`}>

          {/* Left: Hamburger (Mobile) + Logo */}
          <div className="flex items-center gap-4">
            {!isLandingPage && (
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2 transition-colors md:hidden ${!scrolled && isLandingPage ? "hover:text-gray-600 dark:hover:text-gray-300" : "hover:text-black dark:hover:text-white"}`}
              >
                <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
              </button>
            )}

            <Link to="/" onClick={handleLogoClick} className="flex items-center group gap-3">
              <img
                src={logo}
                alt=""
                className={`h-8 w-auto transition-all duration-300 group-hover:opacity-80 dark:invert`}
              />
              <span className={`font-cinzel text-xl sm:text-2xl font-medium tracking-[0.2em] uppercase transition-opacity hover:opacity-70 ${!scrolled && isLandingPage ? "text-gray-900 dark:text-white" : "text-gray-900 dark:text-white"}`}>
                AKI
              </span>
            </Link>
          </div>

          {/* Center: Search Bar & Nav Links */}
          <div className={`${isLandingPage ? 'hidden' : 'hidden lg:flex'} flex-1 items-center justify-center gap-12 px-8`}>
            {storeSlug && (
              <div className="flex items-center gap-8">
                <Link to={`/${storeSlug}`} className="font-cinzel text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Catalogue</Link>
              </div>
            )}
            <form onSubmit={handleSearch} className="relative w-full max-w-sm group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={storeSlug ? `Search ${storeData?.storeName || 'this store'}...` : "Search collections..."}
                className="w-full rounded-none border-b border-gray-300 bg-transparent px-2 py-2 pl-8 text-sm text-gray-900 focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-gray-100 dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400"
              />
              <FontAwesomeIcon icon={faSearch} className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors" />
            </form>
          </div>

          {/* Right: Icons & Actions */}
          <div className="flex items-center gap-4 sm:gap-6">

            {/* Global Currency Selector — visible on storefronts */}
            {!isLandingPage && (
              <div className="hidden sm:flex items-center border border-gray-200 dark:border-white/10 px-2 py-1.5 gap-1.5 hover:border-gray-900 dark:hover:border-white transition-colors" title="Change display currency">
                {isFetchingRates && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" title="Fetching live rates..." />
                )}
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-transparent text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 focus:outline-none cursor-pointer appearance-none pr-1"
                  aria-label="Currency"
                >
                  {Object.entries(CURRENCIES).map(([code, { symbol, label }]) => (
                    <option key={code} value={code}>{symbol} {label}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-gray-400 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {resolvedTheme === "dark" ? <FontAwesomeIcon icon={faSun} className="h-4 w-4" /> : <FontAwesomeIcon icon={faMoon} className="h-4 w-4" />}
              </button>
            )}

            {isLandingPage ? (
              <Link to="/auth/signup"
                className="border border-gray-900 bg-transparent px-6 py-2.5 text-[10px] sm:text-xs font-semibold tracking-widest text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black uppercase"
              >
                Start Shop
              </Link>
            ) : (
              /* Session-aware Profile Card */
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(prev => !prev)}
                  className="flex items-center gap-2 border border-gray-300 dark:border-white/20 px-3 py-2 text-gray-900 dark:text-white hover:border-gray-900 dark:hover:border-white transition-colors"
                  aria-label="Account Menu"
                >
                  <FontAwesomeIcon icon={faUser} className="h-3.5 w-3.5" />
                  <FontAwesomeIcon icon={faChevronDown} className={`h-2.5 w-2.5 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Panel */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 border border-gray-200 bg-[#fcfcfc] dark:border-white/10 dark:bg-[#0a0a0a] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-[200]">
                    <div className="border-b border-gray-100 dark:border-white/10 px-5 py-4">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-1">Active Session</p>
                      {storeData ? (
                        <p className="font-cinzel text-sm font-medium text-gray-900 dark:text-white tracking-wide truncate">{storeData.storeName}</p>
                      ) : (
                        <p className="text-xs font-light text-gray-500">AKI Platform</p>
                      )}
                    </div>
                    <div className="py-2">
                      <Link
                        to="/store-admin"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                      >
                        <FontAwesomeIcon icon={faStore} className="h-3 w-3" /> Dashboard
                      </Link>
                      <Link
                        to="/store-admin/settings"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                      >
                        <FontAwesomeIcon icon={faCog} className="h-3 w-3" /> Settings
                      </Link>
                      <div className="mx-4 my-1 border-t border-gray-100 dark:border-white/10" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="h-3 w-3" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cart Icon */}
            {!isLandingPage && (
              <button
                onClick={toggleCart}
                className="relative text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-gray-400 transition-colors"
              >
                <FontAwesomeIcon icon={faShoppingBag} className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-[9px] font-bold text-white dark:bg-white dark:text-black">
                    {totalItems}
                  </span>
                )}
              </button>
            )}

          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from jumping under fixed navbar */}
      <div className="h-[73px]" />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        storeData={storeData}
      />

      {/* Exit Store Warning Modal */}
      <ConfirmationModal
        isOpen={showExitWarning}
        title="Leave Storefront?"
        message="You are about to exit this personalized boutique and return to the AKI platform directory. Are you sure you wish to proceed?"
        confirmLabel="Exit Store"
        cancelLabel="Stay Here"
        type="warning"
        onConfirm={() => { setShowExitWarning(false); router('/'); }}
        onClose={() => setShowExitWarning(false)}
      />
    </>
  );
}