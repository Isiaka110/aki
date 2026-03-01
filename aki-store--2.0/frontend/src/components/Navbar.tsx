
import { Link } from 'react-router-dom';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingBag, faUser, faMoon, faSun, faBars } from '@fortawesome/free-solid-svg-icons';
import { useCartStore } from "../store/useCartStore";
import MobileMenu from "./MobileMenu";
import ConfirmModal from "./ConfirmModal";
import { apiGetStoreBySlug } from "../services/api";

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

  // Extract store slug from params to know if we are in a personalized store
  const params = useParams();
  const storeSlug = params?.storeSlug as string;

  const { items, toggleCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router(`/explore?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

            <Link to="/" onClick={handleLogoClick} className="flex items-center group">
              <span className={`font-cinzel text-xl sm:text-2xl font-medium tracking-[0.2em] uppercase transition-opacity hover:opacity-70 ${!scrolled && isLandingPage ? "text-gray-900 dark:text-white" : "text-gray-900 dark:text-white"}`}>
                AKI.
              </span>
            </Link>
          </div>

          {/* Center: Search Bar & Nav Links */}
          <div className={`${isLandingPage ? 'hidden' : 'hidden lg:flex'} flex-1 items-center justify-center gap-12 px-8`}>
            {storeSlug && (
              <div className="flex items-center gap-8">
                <Link to={`/${storeSlug}`} className="font-cinzel text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Catalogue</Link>
                <Link to={`/${storeSlug}/account`} className="font-cinzel text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Architect</Link>
              </div>
            )}
            <form onSubmit={handleSearch} className="relative w-full max-w-sm group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collections..."
                className="w-full rounded-none border-b border-gray-300 bg-transparent px-2 py-2 pl-8 text-sm text-gray-900 focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-gray-100 dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400"
              />
              <FontAwesomeIcon icon={faSearch} className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors" />
            </form>
          </div>

          {/* Right: Icons & Actions */}
          <div className="flex items-center gap-4 sm:gap-6">

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
              <Link to={storeSlug ? `/${storeSlug}/account` : "/explore"}
                className="text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-gray-400 transition-colors"
                title="Store Owner Profile"
              >
                <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
              </Link>
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
      <ConfirmModal
        isOpen={showExitWarning}
        title="Leave Storefront?"
        message="You are about to exit this personalized store and return to the main platform directory. Are you sure you wish to proceed?"
        confirmLabel="Exit Store"
        cancelLabel="Stay Here"
        variant="warning"
        onConfirm={() => { setShowExitWarning(false); router('/'); }}
        onCancel={() => setShowExitWarning(false)}
      />
    </>
  );
}