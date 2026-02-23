import ProductCard from "../../components/ProductCard";
import StoreSidebar from "../../components/StoreSidebar"; // 1. Import the new sidebar

export default async function StorePage({
  params,
}: {
  params: Promise<{ storeSlug: string }>;
}) {
  const resolvedParams = await params;
  const storeSlug = resolvedParams.storeSlug;

  // Dummy products array remains the same here...
  const dummyProducts = [
    { id: "1", title: "Vintage Leather Jacket", price: 120.00, slashedPrice: 150.00, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80", rating: 4.8, reviewsCount: 12, category: "Outerwear" },
    { id: "2", title: "Minimalist Watch", price: 85.00, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80", rating: 5.0, reviewsCount: 34, category: "Accessories" },
    { id: "3", title: "Classic White Sneakers", price: 65.00, slashedPrice: 80.00, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80", rating: 4.6, reviewsCount: 8, category: "Shoes" },
    { id: "4", title: "Wireless Headphones", price: 199.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", rating: 4.9, reviewsCount: 128, category: "Tech" },
  ];

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
          {dummyProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
      </div>
    </div>
  );
}