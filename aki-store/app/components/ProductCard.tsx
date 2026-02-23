"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  slashedPrice?: number; 
  image: string;
  rating: number;
  reviewsCount: number;
  category: string;
}

export default function ProductCard({
  id,
  title,
  price,
  slashedPrice,
  image,
  rating,
  reviewsCount,
  category,
}: ProductCardProps) {
  
  // Pull the addItem action from our Zustand store
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="group flex flex-col gap-3 p-3 transition-all duration-300">
      
      {/* Image Container */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 aspect-[4/5]">
        
        {/* Floating Category Tag */}
        <div className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-900 shadow-sm backdrop-blur-sm dark:bg-gray-900/90 dark:text-gray-100">
          {category}
        </div>
        
        {/* Next.js Optimized Image */}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-col gap-1.5 px-1">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
          {title}
        </h3>
        
        {/* Rating & Pricing Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-700 dark:text-gray-300">{rating.toFixed(1)}</span>
            <span>({reviewsCount} Reviews)</span>
          </div>
          
          <div className="flex items-center gap-2">
            {slashedPrice && (
              <span className="text-xs text-gray-400 line-through">${slashedPrice.toFixed(2)}</span>
            )}
            <span className="font-black text-gray-900 dark:text-white">${price.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-1 flex w-full gap-2">
        <button 
          onClick={() => addItem({ id, title, price, image, quantity: 1 })}
          className="flex-1 rounded-full border-2 border-gray-200 bg-white py-2 text-xs font-bold text-gray-900 transition-colors hover:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:hover:border-white"
        >
          Add to Cart
        </button>
        <button className="flex-1 rounded-full bg-gray-900 py-2 text-xs font-bold text-white transition-colors hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
          Buy Now
        </button>
      </div>
    </div>
  );
}