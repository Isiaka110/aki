import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStore, faArrowRight, faStar, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef } from "react";
import VerifiedBadge from "../../components/VerifiedBadge";

// ─── Static curated stores (connect to API when available) ────────────────────
const featuredShops = [
    {
        id: "1",
        name: "HUDEEN",
        slug: "hudeen",
        category: "Designer Wear",
        designation: "Bespoke Collection",
        rating: 5.0,
        reviews: 24,
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
        avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=hudeen&backgroundColor=b6e3f4,c0aede`,
        ownerName: "Hudeen Studios",
        description: "Bespoke elegance crafted for the modern individual.",
        verified: true,
    },
    {
        id: "2",
        name: "Official",
        slug: "official",
        category: "Essentials",
        designation: "Everyday Edit",
        rating: 4.8,
        reviews: 12,
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
        avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=official&backgroundColor=d1d4f9,ffd5dc`,
        ownerName: "Official House",
        description: "The definitive standard for quality everyday pieces.",
        verified: true,
    },
    {
        id: "3",
        name: "Noir Collection",
        slug: "noir-collection",
        category: "Leather Goods",
        designation: "Luxury Leather",
        rating: 5.0,
        reviews: 42,
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800&q=80",
        avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=noir-collection&backgroundColor=ffdfbf,c0aede`,
        ownerName: "Noir Atelier",
        description: "Premium leather craftsmanship emphasising minimalist design.",
        verified: false,
    },
];

export default function ExplorePage() {
    const [inView, setInView] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.title = "Explore The Directory | AKI";
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
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
                        Discover <br /> The Stores.
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-sm font-light tracking-wide text-gray-600 dark:text-gray-400 leading-relaxed">
                        Browse outstanding storefronts from independent creators and verified sellers.
                    </p>

                    {/* Search Bar */}
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

                {/* Featured ("Select Curations") Section */}
                <div className="mb-32" ref={sectionRef}>
                    <div className="flex items-center justify-between mb-12 border-b border-gray-200 dark:border-white/10 pb-4">
                        <div className="flex items-center gap-3">
                            <FontAwesomeIcon icon={faArrowTrendUp} className="h-5 w-5 text-gray-900 dark:text-white" />
                            <h2 className="text-xl font-cinzel text-gray-900 dark:text-white tracking-widest uppercase">Select Curations</h2>
                        </div>
                        <Link to="#" className="font-cinzel text-xs font-semibold tracking-[0.2em] text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors uppercase">
                            View All
                        </Link>
                    </div>

                    {/* ── Cards — same style as FeaturedStores ── */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {featuredShops.map((shop, idx) => (
                            <Link
                                key={shop.id}
                                to={`/${shop.slug}`}
                                className={`group flex flex-col transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                                style={{ transitionDelay: inView ? `${idx * 120}ms` : '0ms' }}
                            >
                                {/* Cover Image */}
                                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 dark:bg-gray-900 mb-0">
                                    <img
                                        src={shop.image}
                                        alt={shop.name}
                                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500" />
                                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

                                    {/* Designation label top-left */}
                                    <div className="absolute top-4 left-4">
                                        <div className="bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white tracking-[0.2em] uppercase">
                                            {shop.designation}
                                        </div>
                                    </div>

                                    {/* Rating top-right on hover */}
                                    <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                        <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white tracking-widest uppercase">
                                            <FontAwesomeIcon icon={faStar} className="h-3 w-3 fill-white text-white" />
                                            {shop.rating} ({shop.reviews})
                                        </div>
                                    </div>

                                    {/* Owner reveal on hover — bottom of image */}
                                    <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-4 pb-4 opacity-0 transition-all duration-500 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                                        <img
                                            src={shop.avatar}
                                            alt={shop.ownerName}
                                            className="h-8 w-8 rounded-none object-cover border border-white/30 bg-white/10"
                                        />
                                        <span className="text-[10px] font-semibold text-white tracking-widest uppercase">{shop.ownerName}</span>
                                    </div>
                                </div>

                                {/* Store Info */}
                                <div className="pt-5 pb-2 border-b border-gray-200 dark:border-white/10">
                                    <span className="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase">
                                        {shop.category}
                                    </span>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-cinzel text-2xl text-gray-900 dark:text-white font-medium tracking-wide transition-colors group-hover:text-gray-600 dark:group-hover:text-gray-300">
                                            {shop.name}
                                        </h3>
                                        {shop.verified && <VerifiedBadge size="sm" className="flex-shrink-0" />}
                                    </div>
                                    <p className="text-sm font-light text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm line-clamp-2 mb-4">
                                        {shop.description}
                                    </p>
                                    <div className="inline-flex items-center gap-3 text-xs font-cinzel tracking-[0.2em] uppercase text-gray-900 dark:text-white group-hover:gap-5 transition-all">
                                        Shop Now <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Categories Section */}
                <div className="border border-gray-200 dark:border-white/10 p-12 sm:p-24 text-center bg-transparent">
                    <span className="mb-4 block text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase">
                        Browse by Type
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-cinzel text-gray-900 dark:text-white tracking-wide mb-16">
                        Shop by Category
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
