import Link from "next/link";
import { Search, Store, ArrowRight, Star, TrendingUp } from "lucide-react";
import Image from "next/image";

const featuredShops = [
    {
        id: "1",
        name: "ThriftElegance",
        slug: "thriftelegance",
        category: "Vintage Fashion",
        rating: 4.9,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
        description: "Curated vintage pieces for the modern soul."
    },
    {
        id: "2",
        name: "TechHaven",
        slug: "techhaven",
        category: "Gadgets",
        rating: 4.7,
        reviews: 85,
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
        description: "The latest gadgets and tech accessories."
    },
    {
        id: "3",
        name: "HomeSpun",
        slug: "homespun",
        category: "Home Decor",
        rating: 5.0,
        reviews: 42,
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800&q=80",
        description: "Handmade comfort for your living space."
    }
];

export default function ExplorePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white sm:text-6xl">
                        Explore <span className="text-gray-500">AKI</span> Shops
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                        Discover uniquely curated storefronts from independent sellers across the country.
                    </p>

                    {/* Search Bar in Explore */}
                    <div className="mt-8 flex justify-center">
                        <div className="relative w-full max-w-xl">
                            <input
                                type="text"
                                placeholder="Search shops by name, category, or location..."
                                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-6 py-4 pl-14 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-white dark:focus:ring-white transition-all shadow-sm"
                            />
                            <Search className="absolute left-5 top-4 h-6 w-6 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Featured Section */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-6 w-6 text-gray-900 dark:text-white" />
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Trending Stores</h2>
                        </div>
                        <Link href="#" className="text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                            View All
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {featuredShops.map((shop) => (
                            <Link
                                key={shop.id}
                                href={`/${shop.slug}`}
                                className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-2 transition-all hover:border-gray-900 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-white"
                            >
                                {/* Shop Image */}
                                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                                    <Image
                                        src={shop.image}
                                        alt={shop.name}
                                        fill
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                    <div className="absolute bottom-4 left-4">
                                        <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black backdrop-blur-sm">
                                            {shop.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Shop Content */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white">{shop.name}</h3>
                                            <div className="mt-1 flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-bold text-gray-900 dark:text-white">{shop.rating}</span>
                                                <span className="text-sm text-gray-500">({shop.reviews} reviews)</span>
                                            </div>
                                        </div>
                                        <div className="rounded-full bg-gray-50 p-3 dark:bg-gray-800">
                                            <Store className="h-5 w-5 text-gray-900 dark:text-white" />
                                        </div>
                                    </div>
                                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                        {shop.description}
                                    </p>

                                    <div className="mt-6 flex items-center gap-2 text-sm font-black text-gray-900 dark:text-white group-hover:gap-4 transition-all uppercase tracking-tighter">
                                        Visit Shop <ArrowRight className="h-4 w-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Categories Section */}
                <div className="rounded-[3rem] bg-gray-950 p-12 text-center text-white dark:bg-white dark:text-gray-950">
                    <h2 className="text-3xl font-black sm:text-5xl">Shop by Category</h2>
                    <p className="mt-4 text-gray-400 dark:text-gray-500">Find exactly what you are looking for.</p>

                    <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                        {['Fashion', 'Tech', 'Home', 'Art', 'Beauty', 'Food'].map((cat) => (
                            <Link
                                key={cat}
                                href={`/explore?category=${cat.toLowerCase()}`}
                                className="flex flex-col items-center gap-3 rounded-2xl border border-gray-800 p-6 transition-all hover:bg-white hover:text-black dark:border-gray-200 dark:hover:bg-gray-900 dark:hover:text-white"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 dark:bg-gray-100">
                                    <Store className="h-6 w-6" />
                                </div>
                                <span className="text-sm font-bold uppercase tracking-widest">{cat}</span>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
