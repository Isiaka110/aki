import ProductCard from "../../components/ProductCard";
import StoreSidebar from "../../components/StoreSidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faIcons, faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import ClientFeedbackForm from "./ClientFeedbackForm";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

export default function StorePage() {
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
        const response = await fetch('http://localhost:5000/api/super-admin/stores'); // Publicly accessible for now
        const data = await response.json();
        if (data.success) {
          const found = data.data.find((s: any) => s.storeName === storeSlug || s.adminId === storeSlug); // Simple heuristic
          setStore(found || null);
        }
      } catch (error) {
        console.error("Failed to fetch store:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, [storeSlug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center p-4 bg-[#fcfcfc] dark:bg-[#050505]">
      <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-gray-900 border-solid animate-spin dark:border-white"></div>
    </div>;
  }

  if (!store || store.status !== 'Active') {
    return (
      <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#050505] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
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

  const dummyProducts = [
    {
      id: "1",
      title: "Vintage Leather Jacket",
      price: 120.00,
      slashedPrice: 150.00,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
        "https://images.unsplash.com/photo-1520975954732-57dd22299614?w=800&q=80",
        "https://images.unsplash.com/photo-1552835848-6178a2e1d713?w=800&q=80"
      ],
      rating: 4.8,
      reviewsCount: 12,
      category: "Outerwear"
    },
    {
      id: "2",
      title: "Minimalist Watch",
      price: 85.00,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        "https://images.unsplash.com/photo-1542496658-e32689c19e59?w=800&q=80"
      ],
      rating: 5.0,
      reviewsCount: 34,
      category: "Accessories"
    },
    {
      id: "3",
      title: "Classic White Sneakers",
      price: 65.00,
      slashedPrice: 80.00,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80"
      ],
      rating: 4.6,
      reviewsCount: 8,
      category: "Shoes"
    },
    {
      id: "4",
      title: "Wireless Headphones",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
        "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&q=80"
      ],
      rating: 4.9,
      reviewsCount: 128,
      category: "Tech"
    },
  ];

  const filteredProducts = dummyProducts.filter((product) => {
    const matchesQuery = !query || product.title.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
    const matchesCategory = !category || product.category.toLowerCase() === category || (category === "home" && product.category === "Outerwear"); // Logic fallback for demo
    return matchesQuery && matchesCategory;
  });

  const storeReviews = [
    {
      id: "REV-01",
      customer: "Elena R.",
      product: "Vintage Leather Jacket",
      rating: 5,
      date: "Oct 24, 2025",
      comment: "Absolutely in love with this jacket! The quality is amazing and it arrived exactly as described. Will definitely be buying from this store again.",
    },
    {
      id: "REV-02",
      customer: "James T.",
      product: "Classic White Sneakers",
      rating: 4,
      date: "Oct 22, 2025",
      comment: "Great shoes, very comfortable. Shipping took a little longer than expected, but the seller was very communicative.",
    },
    {
      id: "REV-04",
      customer: "Fatima A.",
      product: "Vintage Leather Jacket",
      rating: 5,
      date: "Oct 19, 2025",
      comment: "The packaging was so cute and the jacket fits perfectly. Highly recommend to anyone looking for unique pieces!",
    },
  ];

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

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#050505] p-4 sm:p-8 pt-24 lg:pt-32">

      {/* Store Header Banner */}
      <div className="mb-20 text-center border-b border-gray-200 dark:border-white/10 pb-12 w-full max-w-7xl mx-auto">
        <span className="mb-4 block text-[10px] font-semibold tracking-[0.3em] text-gray-400 uppercase">
          Home
        </span>
        <h1 className="text-5xl sm:text-7xl font-cinzel text-gray-900 dark:text-white uppercase tracking-widest font-medium">
          {storeSlug}
        </h1>
        <p className="mt-4 text-sm font-light tracking-widest text-gray-500 dark:text-gray-400 uppercase">
          Curated Exclusively For You
        </p>
      </div>

      {/* Main Container */}
      <div className="mx-auto flex max-w-7xl items-start gap-12">

        {/* Left Column: Sidebar */}
        <StoreSidebar />

        {/* Right Column: Product Grid */}
        <div className="flex-1 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
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
          {storeReviews.map((review) => (
            <div key={review.id} className="border border-gray-200 dark:border-white/10 p-8 hover:border-gray-900 dark:hover:border-white transition-colors bg-transparent">
              {renderStars(review.rating)}
              <p className="font-cinzel text-sm leading-relaxed text-gray-900 dark:text-white mb-8 italic">
                &quot;{review.comment}&quot;
              </p>
              <div className="flex flex-col gap-1 border-t border-gray-100 dark:border-white/5 pt-6 mt-auto">
                <span className="text-xs font-semibold tracking-widest text-gray-900 dark:text-white uppercase">{review.customer}</span>
                <span className="text-[10px] font-light tracking-[0.2em] text-gray-400 uppercase">Acquired: {review.product}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leave Feedback Section */}
      <ClientFeedbackForm />

    </div>
  );
}