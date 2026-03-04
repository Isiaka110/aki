
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { apiGetFeaturedStores } from '../services/api';
import { useState, useEffect, useRef } from 'react';
import VerifiedBadge from './VerifiedBadge';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Deterministic non-human avatar fallback keyed to store slug
function getDefaultStoreAvatar(slug: string): string {
    return `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(slug)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}

// Fallback store cover image
function getDefaultCoverImage(slug: string): string {
    return `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(slug)}&backgroundColor=f3f4f6,e5e7eb&size=512`;
}

export default function FeaturedStores() {
    const [shops, setShops] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [inView, setInView] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const data = await apiGetFeaturedStores();
                setShops(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error("Failed to load featured stores:", e);
                setShops([]);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    // Intersection observer for entrance animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    if (!loading && shops.length === 0) return null;

    return (
        <section
            ref={sectionRef}
            className="py-24 sm:py-32 bg-[#fcfcfc] dark:bg-[#050505] overflow-hidden"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div
                    className={`flex flex-col md:flex-row items-end justify-between gap-8 mb-20 border-b border-gray-200 dark:border-white/10 pb-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <div className="max-w-2xl">
                        <span className="mb-4 block text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase">
                            Curated Selection
                        </span>
                        <h2 className="font-cinzel text-4xl sm:text-6xl text-gray-900 dark:text-white font-medium leading-[1.1] tracking-wide">
                            Discover Iconic <br /> Storefronts
                        </h2>
                    </div>

                    <Link to="/explore"
                        className="group flex items-center justify-center gap-3 border border-gray-900 dark:border-white bg-transparent px-8 py-3 text-xs font-semibold tracking-widest text-gray-900 dark:text-white uppercase transition-all duration-500 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black mb-2"
                    >
                        View All Shops
                        <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Loading Skeleton */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="aspect-[3/4] w-full bg-gray-200 dark:bg-white/10 mb-4" />
                                <div className="h-3 w-1/3 bg-gray-200 dark:bg-white/10 mb-3 rounded" />
                                <div className="h-6 w-2/3 bg-gray-200 dark:bg-white/10 mb-2 rounded" />
                                <div className="h-3 w-full bg-gray-200 dark:bg-white/10 rounded" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Swiper Slider */}
                {!loading && shops.length > 0 && (
                    <div
                        className={`relative transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    >
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            spaceBetween={30}
                            slidesPerView={1}
                            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="featured-swiper pb-12"
                        >
                            {shops.map((shop, idx) => {
                                // Use the correct backend fields: name, slug, logo, ownerName, verificationStatus, manifesto
                                const storeName = shop.name || shop.storeName || shop.storeId || "Unnamed Store";
                                const storeSlug = shop.slug;
                                const isVerified = shop.verificationStatus === "Verified";
                                const avatar = shop.logo || getDefaultStoreAvatar(storeSlug || shop.storeId || String(idx));
                                const cover = shop.bannerUrl || shop.logo || getDefaultCoverImage(storeSlug || String(idx));
                                const tagline = shop.designation || shop.manifesto || "Premium curated collection.";

                                return (
                                    <SwiperSlide key={shop._id || shop.storeId || idx}>
                                        <Link
                                            to={storeSlug ? `/${storeSlug}` : '/explore'}
                                            className="group flex flex-col h-full"
                                            style={{ animationDelay: `${idx * 100}ms` }}
                                        >
                                            {/* Cover Image */}
                                            <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                                                <img
                                                    src={cover}
                                                    alt={storeName}
                                                    className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = getDefaultCoverImage(storeSlug || String(idx));
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-500" />
                                                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

                                                {/* Store badge top-left */}
                                                <div className="absolute top-4 left-4">
                                                    <div className="bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white tracking-[0.2em] uppercase">
                                                        {shop.storeId || storeSlug}
                                                    </div>
                                                </div>

                                                {/* Rating top-right on hover */}
                                                <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                                    <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white tracking-widest uppercase">
                                                        <FontAwesomeIcon icon={faStar} className="h-3 w-3 fill-white text-white" />
                                                        <span>{shop.rating || "5.0"}</span>
                                                    </div>
                                                </div>

                                                {/* Avatar overlay bottom-left */}
                                                <div className="absolute bottom-4 left-4 flex items-center gap-3 opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                                                    <div className="h-10 w-10 overflow-hidden border-2 border-white bg-gray-100">
                                                        <img src={avatar} alt={storeName} className="h-full w-full object-cover" />
                                                    </div>
                                                    <span className="text-[10px] font-semibold text-white tracking-widest uppercase">{shop.ownerName}</span>
                                                </div>
                                            </div>

                                            {/* Store info below image */}
                                            <div className="pt-6 pb-2">
                                                <span className="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase">
                                                    {shop.designation || "Designer Collection"}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-cinzel text-2xl text-gray-900 dark:text-white font-medium tracking-wide transition-colors group-hover:text-gray-600 dark:group-hover:text-gray-300">
                                                        {storeName}
                                                    </h3>
                                                    {isVerified && (
                                                        <VerifiedBadge size="sm" className="flex-shrink-0" />
                                                    )}
                                                </div>
                                                <p className="text-sm font-light text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm mt-2 line-clamp-2">
                                                    {tagline}
                                                </p>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                )}
            </div>

            {/* Swiper dot styles */}
            <style>{`
        .featured-swiper .swiper-pagination-bullet {
          background: #9ca3af;
          opacity: 1;
          width: 6px;
          height: 6px;
          border-radius: 0;
          transition: all 0.3s ease;
        }
        .featured-swiper .swiper-pagination-bullet-active {
          background: #111827;
          width: 24px;
        }
        .dark .featured-swiper .swiper-pagination-bullet-active {
          background: #fff;
        }
      `}</style>
        </section>
    );
}
