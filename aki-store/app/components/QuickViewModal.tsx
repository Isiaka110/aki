"use client";

import Image from "next/image";
import { X, ShoppingBag, Star, ShieldCheck, Truck } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

export default function QuickViewModal() {
    const { quickViewProduct, setQuickView, addItem } = useCartStore();

    if (!quickViewProduct) return null;

    const handleAddToCart = () => {
        addItem(quickViewProduct);
        setQuickView(null);
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md transition-opacity"
                onClick={() => setQuickView(null)}
            />

            {/* Modal Container */}
            <div className="fixed left-1/2 top-1/2 z-[70] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 p-4 sm:p-6 md:p-8 outline-none">
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-950 animate-in zoom-in-95 duration-300">

                    {/* Close Button */}
                    <button
                        onClick={() => setQuickView(null)}
                        className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-gray-500 hover:bg-white hover:text-black dark:bg-gray-900/80 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-all shadow-sm"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2">

                        {/* Left: Product Image */}
                        <div className="relative aspect-square w-full bg-gray-100 dark:bg-gray-900">
                            <Image
                                src={quickViewProduct.image}
                                alt={quickViewProduct.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute left-6 top-6 rounded-full bg-black/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black backdrop-blur-md dark:bg-white/10 dark:text-white">
                                Quick View
                            </div>
                        </div>

                        {/* Right: Info */}
                        <div className="flex flex-col p-8 sm:p-10">
                            <div className="mb-2 flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                <span className="font-bold text-gray-900 dark:text-white">4.9</span>
                                <span>• 128 Reviews</span>
                            </div>

                            <h2 className="text-3xl font-black tracking-tighter text-gray-900 dark:text-white sm:text-4xl">
                                {quickViewProduct.title}
                            </h2>

                            <div className="mt-4 flex items-center gap-3">
                                <span className="text-3xl font-black text-gray-900 dark:text-white">
                                    ${quickViewProduct.price.toFixed(2)}
                                </span>
                                <span className="text-lg text-gray-400 line-through">
                                    ${(quickViewProduct.price * 1.2).toFixed(2)}
                                </span>
                                <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-black text-red-600 dark:bg-red-900/30">
                                    -20% OFF
                                </span>
                            </div>

                            <p className="mt-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                Experience premium quality with our {quickViewProduct.title}. Crafted for durability and style, this item is a perfect addition to your collection. Limited stock available.
                            </p>

                            {/* Trust Badges */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-3 dark:bg-gray-900">
                                    <Truck className="h-5 w-5 text-gray-400" />
                                    <div className="text-[10px] leading-tight text-gray-600 dark:text-gray-400">
                                        <span className="block font-bold">Free Delivery</span>
                                        <span>On orders over $50</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-3 dark:bg-gray-900">
                                    <ShieldCheck className="h-5 w-5 text-gray-400" />
                                    <div className="text-[10px] leading-tight text-gray-600 dark:text-gray-400">
                                        <span className="block font-bold">Secure Payment</span>
                                        <span>100% Protection</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-auto pt-10 flex gap-3">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 rounded-full bg-black py-4 text-sm font-bold text-white transition-all hover:bg-gray-800 hover:shadow-lg dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <ShoppingBag className="h-4 w-4" />
                                        Add to Cart
                                    </div>
                                </button>
                                <button
                                    onClick={() => setQuickView(null)}
                                    className="rounded-full border-2 border-gray-200 px-8 py-4 text-sm font-bold text-gray-900 transition-colors hover:border-gray-900 dark:border-gray-800 dark:text-white dark:hover:border-white"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
