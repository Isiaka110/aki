import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStore, faArrowRight, faStar, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import VerifiedBadge from "../../components/VerifiedBadge";
import { useEffect } from "react";

const featuredShops = [
    { id: "1", name: "HUDEEN", slug: "hudeen", category: "Designer Wear", rating: 5.0, reviews: 24, image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80", description: "Bespoke elegance crafted for the modern individual.", verified: true },
    {
        id: "2",
        name: "Official",
        slug: "official",
        category: "Essentials",
        rating: 4.8,
        reviews: 12,
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
        description: "The definitive standard for quality everyday pieces.",
        verified: true
    },
    {
        id: "3",
        name: "Noir Collection",
        slug: "noir-collection",
        category: "Leather Goods",
        rating: 5.0,
        reviews: 42,
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800&q=80",
        description: "Premium leather craftsmanship emphasizing minimalist design.",
        verified: false
    }
];

export default function ExplorePage() {
    useEffect(() => {
        document.title = "Explore The Directory | AKI";
    }, []);

    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#050505] px-4 py-32 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-24 text-center">
                    <span className="mb-4 block text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase">
                        The Directory
                    </span>
                    <h1 className="text-5xl font-cinzel text-gray-900 dark:text-white sm:text-7xl font-medium tracking-wide mb-6">
                        Discover <br /> The Ecommerce.
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-sm font-light tracking-wide text-gray-600 dark:text-gray-400 leading-relaxed">
                        Curated exceptional storefronts. Experience the pinnacle of local, independent curation.
                    </p>

                    {/* Search Bar in Explore */}
                    <div className="mt-12 flex justify-center">
                        <div className="relative w-full max-w-xl group">
                            <input
                                type="text"
                                placeholder="Search the directory..."
                                className="w-full border-b border-gray-300 bg-transparent px-2 py-4 text-sm text-center focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400"
                            />
                            <FontAwesomeIcon icon={faSearch} className="absolute left-2 top-4 h-5 w-5 text-gray-400 group-focus-within:text-gray-900 dark:group-focus-within:text-white transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Featured Section */}
                <div className="mb-32">
                    <div className="flex items-center justify-between mb-12 border-b border-gray-200 dark:border-white/10 pb-4">
                        <div className="flex items-center gap-3">
                            <FontAwesomeIcon icon={faArrowTrendUp} className="h-5 w-5 text-gray-900 dark:text-white" />
                            <h2 className="text-xl font-cinzel text-gray-900 dark:text-white tracking-widest uppercase">Select Curations</h2>
                        </div>
                        <Link to="#" className="font-cinzel text-xs font-semibold tracking-[0.2em] text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors uppercase">
                            View All
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                        {featuredShops.map((shop) => (
                            <Link key={shop.id} to={`/${shop.slug}`}
                                className="group flex flex-col"
                            >
                                {/* Shop Image */}
                                <div className="relative w-full aspect-[4/5] overflow-hidden mb-6">
                                    <img
                                        src={shop.image}
                                        alt={shop.name}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-white/90 dark:bg-black/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-widest text-gray-900 dark:text-white backdrop-blur-md border border-white/20 dark:border-gray-800">
                                            {shop.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Shop Content */}
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-2xl font-cinzel text-gray-900 dark:text-white tracking-wide">{shop.name}</h3>
                                        {shop.verified && (
                                            <VerifiedBadge size="sm" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <FontAwesomeIcon icon={faStar} className="h-3 w-3 fill-gray-900 text-gray-900 dark:fill-white dark:text-white" />
                                        <span className="text-xs font-semibold tracking-wide text-gray-900 dark:text-white">{shop.rating}</span>
                                        <span className="text-xs text-gray-400 font-light">({shop.reviews})</span>
                                    </div>

                                    <p className="text-sm text-gray-600 dark:text-gray-400 font-light tracking-wide leading-relaxed line-clamp-2 mb-6 border-l-2 border-gray-200 dark:border-white/10 pl-4">
                                        {shop.description}
                                    </p>

                                    <div className="inline-flex items-center gap-3 text-xs font-cinzel tracking-[0.2em] uppercase text-gray-900 dark:text-white group-hover:gap-5 transition-all border-b border-gray-900 dark:border-white pb-1 w-fit">
                                        Explore Store <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Categories Section */}
                <div className="border border-gray-200 dark:border-white/10 p-12 sm:p-24 text-center bg-transparent">
                    <span className="mb-4 block text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase">
                        Departments
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-cinzel text-gray-900 dark:text-white tracking-wide mb-16">
                        Curated Categories
                    </h2>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 border-t border-l border-gray-200 dark:border-white/10">
                        {['Fashion', 'Tech', 'Home', 'Art', 'Beauty', 'Food'].map((cat) => (
                            <Link key={cat} to={`/explore?category=${cat.toLowerCase()}`}
                                className="group flex flex-col items-center justify-center gap-4 border-r border-b border-gray-200 dark:border-white/10 p-10 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-colors aspect-square"
                            >
                                <div className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                    <FontAwesomeIcon icon={faStore} className="h-6 w-6" />
                                </div>
                                <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-gray-900 dark:text-white group-hover:tracking-[0.3em] transition-all text-center">{cat}</span>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
