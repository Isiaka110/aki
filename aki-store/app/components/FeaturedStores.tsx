"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";

const featuredShops = [
    {
        id: "1",
        name: "L'Aura Vintage",
        slug: "laura-vintage",
        category: "Haute Couture",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        description: "Curated vintage pieces for the discerning modern soul."
    },
    {
        id: "2",
        name: "Maison d'Argent",
        slug: "maison-d-argent",
        category: "Fine Jewelry",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1550614000-4b95d4edc0c5?w=800&q=80",
        description: "Handcrafted accessories and timeless elegant jewelry."
    },
    {
        id: "3",
        name: "Noir Collection",
        slug: "noir-collection",
        category: "Leather Goods",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
        description: "Premium leather craftsmanship emphasizing minimalist design."
    }
];

export default function FeaturedStores() {
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
                            Discover Iconic <br /> Boutiques
                        </h2>
                    </div>

                    <Link
                        href="/explore"
                        className="group flex items-center justify-center gap-3 border border-gray-900 dark:border-white bg-transparent px-8 py-3 text-xs font-semibold tracking-widest text-gray-900 dark:text-white uppercase transition-all duration-500 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black mb-2"
                    >
                        View All Shops
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {featuredShops.map((shop) => (
                        <Link
                            key={shop.id}
                            href={`/${shop.slug}`}
                            className="group flex flex-col"
                        >
                            <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                                <Image
                                    src={shop.image}
                                    alt={shop.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

                                <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                    <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white tracking-widest uppercase">
                                        <Star className="h-3 w-3 fill-white text-white" />
                                        <span>{shop.rating}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 pb-2">
                                <span className="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase">
                                    {shop.category}
                                </span>
                                <h3 className="font-cinzel text-2xl text-gray-900 dark:text-white font-medium tracking-wide mb-2 transition-colors group-hover:text-gray-600 dark:group-hover:text-gray-300">
                                    {shop.name}
                                </h3>
                                <p className="text-sm font-light text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
                                    {shop.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
