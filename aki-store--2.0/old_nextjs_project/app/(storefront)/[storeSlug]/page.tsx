import ProductCard from "../../components/ProductCard";
import StoreSidebar from "../../components/StoreSidebar";
import { Star, Send, ArrowLeft, Plus } from "lucide-react";
import ClientFeedbackForm from "./ClientFeedbackForm";
import Link from "next/link";
import { getStoreById } from "../../../services/store.service";

export default async function StorePage({
  params,
  searchParams,
}: {
  params: Promise<{ storeSlug: string }>;
  searchParams: Promise<{ q?: string; category?: string; filter?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const storeSlug = resolvedParams.storeSlug;
  const query = resolvedSearchParams.q?.toLowerCase();
  const category = resolvedSearchParams.category?.toLowerCase();

  const store = await getStoreById(storeSlug);

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
              href="/auth/signup"
              className="flex items-center justify-center gap-2 border border-gray-900 bg-gray-900 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
            >
              <Plus className="h-4 w-4" /> Start Your Own Store
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 border border-gray-200 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-gray-900 hover:border-gray-900 dark:border-white/20 dark:text-white dark:hover:border-white transition-all"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Platform
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
          <Star
            key={i}
            className={`h-3 w-3 ${i < rating ? "fill-gray-900 text-gray-900 dark:fill-white dark:text-white" : "fill-transparent text-gray-300 dark:text-gray-700"}`}
            strokeWidth={1}
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