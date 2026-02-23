"use client";

import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import Image from "next/image";

const featuredShops = [
    {
        id: "1",
        name: "ThriftElegance",
        slug: "thriftelegance",
        category: "Vintage Fashion",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
        description: "Curated vintage pieces for the modern soul."
    },
    {
        id: "2",
        name: "TechHaven",
        slug: "techhaven",
        category: "Gadgets",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
        description: "The latest gadgets and tech accessories."
    },
    {
        id: "3",
        name: "HomeSpun",
        slug: "homespun",
        category: "Home Decor",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800&q=80",
        description: "Handmade comfort for your living space."
    }
];

export default function FeaturedStores() {
    return (
        <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white sm:text-6xl text-pretty">
                            Discover <span className="text-gray-400">Iconic</span> <br /> Local Stores.
                        </h2>
                        <p className="mt-4 text-lg text-gray-500">Handpicked independent businesses bringing quality to your doorstep.</p>
                    </div>
                    <Link href="/explore" className="group flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-bold text-white transition-all hover:gap-4 dark:bg-white dark:text-black">
                        View All Shops <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {featuredShops.map((shop) => (
                        <Link
                            key={shop.id}
                            href={`/${shop.slug}`}
                            className="group relative flex flex-col overflow-hidden rounded-[3rem] border border-gray-100 bg-white p-3 transition-all hover:border-black hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-white"
                        >
                            <div className="relative aspect-square overflow-hidden rounded-[2.5rem]">
                                <Image
                                    src={shop.image}
                                    alt={shop.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-black uppercase tracking-widest text-white backdrop-blur-md">
                                        Join the movement
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{shop.category}</span>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs font-bold text-gray-900 dark:text-white">{shop.rating}</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">{shop.name}</h3>
                                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{shop.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
