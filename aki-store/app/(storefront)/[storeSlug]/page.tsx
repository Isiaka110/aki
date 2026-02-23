import ProductCard from "../../components/ProductCard";
import StoreSidebar from "../../components/StoreSidebar"; // 1. Import the new sidebar

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

  const dummyProducts = [
    { id: "1", title: "Vintage Leather Jacket", price: 120.00, slashedPrice: 150.00, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80", rating: 4.8, reviewsCount: 12, category: "Outerwear" },
    { id: "2", title: "Minimalist Watch", price: 85.00, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80", rating: 5.0, reviewsCount: 34, category: "Accessories" },
    { id: "3", title: "Classic White Sneakers", price: 65.00, slashedPrice: 80.00, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80", rating: 4.6, reviewsCount: 8, category: "Shoes" },
    { id: "4", title: "Wireless Headphones", price: 199.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", rating: 4.9, reviewsCount: 128, category: "Tech" },
  ];

  const filteredProducts = dummyProducts.filter((product) => {
    const matchesQuery = !query || product.title.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
    const matchesCategory = !category || product.category.toLowerCase() === category || (category === "home" && product.category === "Outerwear"); // Logic fallback for demo
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-screen p-4 sm:p-8">

      {/* Store Header Banner */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">
          {storeSlug}
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Give All You Need
        </p>
      </div>

      {/* 2. Create a Flex container for the two-column layout */}
      <div className="mx-auto flex max-w-7xl items-start gap-8">

        {/* Left Column: Sidebar */}
        <StoreSidebar />

        {/* Right Column: Product Grid */}
        <div className="flex-1 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-lg text-gray-500">No products found for "{query || category}"</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}