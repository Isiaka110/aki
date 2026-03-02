import ProductCard from "../../components/ProductCard";
import StoreSidebar from "../../components/StoreSidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeft, faPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import ClientFeedbackForm from "./ClientFeedbackForm";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function StorePage() {
  const { user } = useAuthStore();
  const { storeSlug } = useParams<{ storeSlug: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q')?.toLowerCase();
  const category = searchParams.get('category')?.toLowerCase();

  const [store, setStore] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/store/${storeSlug}`);
        const data = await response.json();
        if (data.success) {
          setStore(data.data);
          document.title = `${data.data.name || storeSlug} | AKI Boutique`;
          if (data.data.primaryColor) {
            document.documentElement.style.setProperty('--color-primary', data.data.primaryColor);
          }
        } else {
          setStore(null);
          document.title = "Store Not Found | AKI";
        }
      } catch (error) {
        console.error("Failed to fetch store:", error);
        setStore(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, [storeSlug]);

  // Clean up theme or other globals when component unmounts
  useEffect(() => {
    return () => {
      document.documentElement.style.removeProperty('--color-primary');
    };
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center p-4 bg-[#fcfcfc] dark:bg-[#050505]">
      <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-gray-900 border-solid animate-spin dark:border-white"></div>
    </div>;
  }

  // Security/Status Check: Allow if Active, or if current user is the owner (Preview mode)
  const isOwner = user && store && (user.storeId === store._id || user.id === store.adminId);
  const canView = store && (store.status === 'Active' || isOwner);

  if (!canView) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#050505] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8">
          <h1 className="text-6xl font-cinzel text-gray-900 dark:text-white uppercase tracking-widest font-medium">404</h1>
          <div className="space-y-4">
            <h2 className="text-xl font-cinzel tracking-wider text-gray-700 dark:text-gray-300 uppercase">Vendor Unreachable</h2>
            <p className="text-xs font-light tracking-wide text-gray-500">
              The storefront you are trying to access ({storeSlug}) does not exist or has been suspended by the platform.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-12 w-full max-w-xs mx-auto">
            <Link
              to="/auth/signup"
              className="flex items-center justify-center gap-2 border border-gray-900 bg-gray-900 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
              style={{ borderColor: 'var(--color-primary, #000)', backgroundColor: 'var(--color-primary, #000)' }}
            >
              <FontAwesomeIcon icon={faPlus} className="h-4 w-4" /> Start Your Own Store
            </Link>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 border border-gray-200 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-gray-900 hover:border-gray-900 dark:border-white/20 dark:text-white dark:hover:border-white transition-all"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" /> Back to Platform
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const products = store?.products || [];

  const filteredProducts = products.filter((product: any) => {
    const matchesQuery = !query || product.title.toLowerCase().includes(query) || (product.category && product.category.toLowerCase().includes(query));
    const matchesCategory = !category || (product.category && product.category.toLowerCase() === category);
    return matchesQuery && matchesCategory && product.status !== 'Archived';
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <FontAwesomeIcon icon={faStar}
            key={i}
            className={`h-3 w-3 ${i < rating ? "text-gray-900 dark:text-white" : "text-gray-300 dark:text-gray-700"}`}

          />
        ))}
      </div>
    );
  };

  const storeReviews = store?.reviews || [];

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#050505] pb-24 transition-colors">

      {/* Hero Banner / Header - Full Width Eye-Catching */}
      <div className={`relative w-full overflow-hidden border-b border-gray-200 dark:border-white/10 ${store?.bannerUrl ? 'min-h-[60vh] flex items-center justify-center' : 'pt-32 pb-20 text-center'}`}>
        {store?.bannerUrl ? (
          <div className="absolute inset-0 z-0">
            <img src={store.bannerUrl} alt="Store Banner" className="h-full w-full object-cover opacity-70 dark:opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#fcfcfc] dark:to-[#050505]" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-cinzel text-[20vw] font-black uppercase tracking-tighter select-none">{storeSlug}</span>
            </div>
          </div>
        )}

        <div className="relative z-10 space-y-8 flex flex-col items-center px-6 text-center max-w-4xl mx-auto">
          {store?.logo ? (
            <div className="mb-2 h-28 w-28 overflow-hidden border-2 border-gray-900 bg-white dark:border-white p-1 shadow-2xl">
              <img src={store.logo} alt="Store Logo" className="h-full w-full object-contain" />
            </div>
          ) : (
            <div className="mb-2 border border-gray-900 dark:border-white px-4 py-1">
              <span className="text-[10px] font-bold tracking-[0.4em] text-gray-900 dark:text-white uppercase">
                {store?.designation || 'EST. 2026'}
              </span>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              <h1 className="text-5xl sm:text-8xl font-cinzel text-gray-900 dark:text-white uppercase tracking-[0.15em] font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 leading-tight">
                {store?.name || storeSlug}
              </h1>
              {store?.status === 'Active' && (
                <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 text-2xl mt-4 animate-in fade-in zoom-in duration-1000 delay-500" title="AKI Verified Boutique" />
              )}
            </div>
            <div className="h-0.5 w-24 bg-gray-900 dark:bg-white mx-auto" />
          </div>

          {isOwner && store?.status !== 'Active' && (
            <span className="inline-block bg-amber-500 text-white px-4 py-1 text-[10px] font-bold tracking-[0.3em] uppercase">
              Preview Mode • {store?.status}
            </span>
          )}

          <p className="mt-6 max-w-2xl text-base sm:text-lg font-light tracking-wide text-gray-700 dark:text-gray-300 italic leading-relaxed animate-in fade-in duration-1000 delay-300">
            &quot;{store?.manifesto || 'Crafting the future of curated digital commerce experiences.'}&quot;
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="mx-auto flex max-w-7xl items-start gap-12 mt-20">

        {/* Left Column: Sidebar */}
        <StoreSidebar categories={store?.categories} totalProducts={store?.products?.length} />

        {/* Right Column: Product Grid */}
        <div className="flex-1 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: any) => (
              <ProductCard
                key={product.productId}
                id={product.productId}
                title={product.title}
                price={product.price}
                slashedPrice={product.slashedPrice}
                image={product.images?.[0] || 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'}
                rating={product.rating || 5.0} // Defaults for now
                reviewsCount={product.reviewsCount || 0} // Defaults for now
                category={product.category}
                images={product.images}
              />
            ))
          ) : (
            <div className="col-span-full py-32 text-center border-t border-gray-200 dark:border-white/10">
              <p className="font-cinzel text-xl text-gray-500 tracking-widest uppercase">No Acquistions Found for &quot;{query || category}&quot;</p>
            </div>
          )}
        </div>

      </div>

      {/* Testimonials Section */}
      <div className="mx-auto max-w-7xl mt-32 border-t border-gray-200 dark:border-white/10 pt-20">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="mb-2 block text-[10px] font-semibold tracking-[0.3em] text-gray-400 border border-gray-200 dark:border-white/10 px-3 py-1 uppercase">
            Client Feedback
          </span>
          <h2 className="font-cinzel text-3xl font-medium tracking-widest text-gray-900 dark:text-white uppercase mt-6">
            Evaluations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {storeReviews.map((review: any) => (
            <div key={review._id || review.id} className="border border-gray-200 dark:border-white/10 p-8 hover:border-gray-900 dark:hover:border-white transition-colors bg-transparent">
              {renderStars(review.rating)}
              <p className="font-cinzel text-sm leading-relaxed text-gray-900 dark:text-white mb-8 italic">
                &quot;{review.comment}&quot;
              </p>
              <div className="flex flex-col gap-1 border-t border-gray-100 dark:border-white/5 pt-6 mt-auto">
                <span className="text-xs font-semibold tracking-widest text-gray-900 dark:text-white uppercase">{review.customerName}</span>
                <span className="text-[10px] font-light tracking-[0.2em] text-gray-400 uppercase">Acquired: {review.productName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leave Feedback Section */}
      <ClientFeedbackForm storeId={store?._id} />

    </div>
  );
}