
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShieldAlt, faTruck } from '@fortawesome/free-solid-svg-icons';
import { useCartStore } from "../store/useCartStore";

export default function QuickViewModal() {
    const { quickViewProduct, setQuickView, addItem } = useCartStore();

    const [activeImageIdx, setActiveImageIdx] = useState(0);

    const images = quickViewProduct?.images || (quickViewProduct ? [quickViewProduct.image] : []);

    useEffect(() => {
        if (!images || images.length <= 1) return;

        const interval = setInterval(() => {
            setActiveImageIdx((prevIdx) => (prevIdx + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images]);

    if (!quickViewProduct) return null;

    const handleAddToCart = () => {
        addItem(quickViewProduct);
        setQuickView(null);
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={() => setQuickView(null)}
            />

            {/* Modal Container */}
            <div className="fixed left-1/2 top-1/2 z-[70] w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 p-4 sm:p-6 outline-none">
                <div className="relative overflow-hidden bg-[#fcfcfc] dark:bg-[#050505] shadow-2xl animate-in fade-in zoom-in-[0.98] duration-500 border border-gray-200 dark:border-white/10">

                    {/* Close Button */}
                    <button
                        onClick={() => setQuickView(null)}
                        className="absolute right-4 top-4 z-10 bg-transparent p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                        <FontAwesomeIcon icon={faTimes}  className="h-6 w-6"  />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2">

                        {/* Left: Product Image Gallery */}
                        <div className="relative flex flex-col w-full bg-gray-50 dark:bg-gray-900 border-b md:border-b-0 md:border-r border-gray-200 dark:border-white/10 overflow-hidden h-full aspect-[4/5] object-cover md:aspect-auto">

                            {/* Main Active Image */}
                            <div className="absolute inset-0 w-full h-full">
                                <div className="absolute left-6 top-6 z-10 border border-gray-900 bg-white/50 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-900 backdrop-blur-md dark:border-white dark:bg-black/50 dark:text-white">
                                    PREVIEW
                                </div>
                                <img
                                    src={images[activeImageIdx]}
                                    alt={`${quickViewProduct.title} primary view`}
                                    fill
                                    className="object-cover transition-opacity duration-500"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>

                            {/* Thumbnail Strip (Floating) */}
                            {images.length > 1 && (
                                <div className="absolute bottom-[25px] left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 p-2 bg-white/70 dark:bg-black/70 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg shrink-0">
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImageIdx(idx)}
                                            className={`relative h-14 w-10 sm:h-16 sm:w-12 shrink-0 overflow-hidden transition-all duration-300 ${activeImageIdx === idx
                                                    ? 'ring-1 ring-gray-900 dark:ring-white scale-100 opacity-100'
                                                    : 'opacity-50 hover:opacity-100 hover:scale-95'
                                                }`}
                                        >
                                            <img
                                                src={img}
                                                alt={`Thumbnail ${idx + 1}`}
                                                fill
                                                className="object-cover"
                                                sizes="80px"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right: Info */}
                        <div className="flex flex-col p-8 sm:p-12 lg:p-16 h-full border-l border-gray-200 dark:border-white/10 md:overflow-y-auto">

                            <div className="mb-4 flex items-center justify-between">
                                <span className="font-cinzel text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
                                    New Arrival
                                </span>
                            </div>

                            <h2 className="font-cinzel text-3xl sm:text-4xl text-gray-900 dark:text-white mb-6 uppercase tracking-wider leading-tight">
                                {quickViewProduct.title}
                            </h2>

                            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-white/10">
                                <span className="font-cinzel text-2xl tracking-wider text-gray-900 dark:text-white">
                                    ${quickViewProduct.price.toFixed(2)}
                                </span>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 line-through tracking-widest font-light">
                                        ${(quickViewProduct.price * 1.2).toFixed(2)}
                                    </span>
                                    <span className="text-[10px] font-semibold uppercase tracking-widest text-red-800 dark:text-red-400">
                                        Privilege Pricing
                                    </span>
                                </div>
                            </div>

                            <p className="text-sm font-light leading-relaxed tracking-wide text-gray-600 dark:text-gray-400">
                                Experience premium craftsmanship with this exclusive piece. Defined by meticulous attention to detail, it is a statement addition to any curated collection. Limited availability.
                            </p>

                            {/* Trust Badges */}
                            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex items-start gap-4 p-4 border border-gray-200 dark:border-white/10 bg-transparent">
                                    <FontAwesomeIcon icon={faTruck}  className="h-5 w-5 text-gray-900 dark:text-white mt-1"  />
                                    <div className="flex flex-col">
                                        <span className="font-cinzel text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-1">Logistics</span>
                                        <span className="text-[10px] font-light tracking-wide text-gray-500">Complimentary Global Delivery</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 border border-gray-200 dark:border-white/10 bg-transparent">
                                    <FontAwesomeIcon icon={faShieldAlt}  className="h-5 w-5 text-gray-900 dark:text-white mt-1"  />
                                    <div className="flex flex-col">
                                        <span className="font-cinzel text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-1">Guarantee</span>
                                        <span className="text-[10px] font-light tracking-wide text-gray-500">Authenticity Verified</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-auto pt-12 flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 border border-gray-900 bg-gray-900 py-4 text-xs font-semibold tracking-widest uppercase text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
                                >
                                    Acquire Piece
                                </button>
                                <button
                                    onClick={() => setQuickView(null)}
                                    className="flex-1 border border-gray-300 bg-transparent py-4 text-xs font-semibold tracking-widest uppercase text-gray-500 hover:border-gray-900 hover:text-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:border-white dark:hover:text-white transition-all"
                                >
                                    Return
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
