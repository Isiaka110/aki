
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faStar, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { apiGetFeaturedStores } from '../services/api';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


export default function FeaturedStores() {
    const [shops, setShops] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const data = await apiGetFeaturedStores();
                setShops(data);
            } catch (e) {
                console.error("Failed to load featured stores");
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    if (!loading && shops.length === 0) {
        return null; // Skip if no featured stores
    }

    return (
        <section className="py-24 sm:py-32 bg-[#fcfcfc] dark:bg-[#050505]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20 border-b border-gray-200 dark:border-white/10 pb-8">
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

                {/* Swiper Slider */}
                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="featured-swiper"
                    >
                        {shops.map((shop) => (
                            <SwiperSlide key={shop.id || shop._id}>
                                <Link to={`/${shop.slug}`} className="group flex flex-col h-full">
                                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                                        <img
                                            src={shop.logo || shop.image || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"}
                                            alt={shop.name}
                                            className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
                                        <div className="absolute top-4 left-4">
                                            <div className="bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white tracking-[0.2em] uppercase">
                                                {shop.storeId}
                                            </div>
                                        </div>
                                        <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                            <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white tracking-widest uppercase">
                                                <FontAwesomeIcon icon={faStar} className="h-3 w-3 fill-white text-white" />
                                                <span>{shop.rating || "5.0"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 pb-2">
                                        <span className="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase">
                                            {shop.category || "Designer wear"}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-cinzel text-2xl text-gray-900 dark:text-white font-medium tracking-wide transition-colors group-hover:text-gray-600 dark:group-hover:text-gray-300">
                                                {shop.name}
                                            </h3>
                                            {shop.verified !== false && (
                                                <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-emerald-500" title="AKI Verified Store" />
                                            )}
                                        </div>
                                        <p className="text-sm font-light text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm mt-2 line-clamp-2">
                                            {shop.description || "The definitive standard for quality everyday pieces."}
                                        </p>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
