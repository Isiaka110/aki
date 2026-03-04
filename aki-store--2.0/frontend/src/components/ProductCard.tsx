

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useCartStore } from "../store/useCartStore";
import { useCurrencyStore } from "../store/useCurrencyStore";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  slashedPrice?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  category: string;
  images?: string[];
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
  images,
}: ProductCardProps) {

  // Pull the actions from our Zustand store
  const { addItem, setQuickView } = useCartStore();
  const { formatPrice } = useCurrencyStore();

  const product = { id, title, price, image, images: images || [image], quantity: 1 };

  return (
    <div className="group flex flex-col gap-4 transition-all duration-300">

      {/* Image Container */}
      <div
        onClick={() => setQuickView(product)}
        className="relative w-full overflow-hidden bg-transparent aspect-[4/5] cursor-pointer"
      >

        {/* Floating Category Tag */}
        <div className="absolute left-3 top-3 z-10 px-2 py-1 bg-white/80 dark:bg-black/80 backdrop-blur-md border border-white dark:border-gray-800 text-[9px] font-semibold uppercase tracking-widest text-gray-900 dark:text-gray-100">
          {category}
        </div>

        {/* Next.js Optimized Image */}
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />

        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      {/* Details Section */}
      <div className="flex flex-col gap-1.5 px-1 relative">

        {/* Rating Row (Absolute positioned to top right) */}
        <div className="absolute top-0 right-1 flex flex-col items-end gap-0.5">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faStar} className="h-3 w-3 fill-gray-900 text-gray-900 dark:fill-white dark:text-white" />
            <span className="font-semibold text-xs tracking-wide text-gray-900 dark:text-white">{rating.toFixed(1)}</span>
          </div>
          <span className="text-[10px] text-gray-400 font-light tracking-wide">({reviewsCount})</span>
        </div>

        <h3
          onClick={() => setQuickView(product)}
          className="font-cinzel text-lg font-medium text-gray-900 dark:text-gray-100 line-clamp-1 cursor-pointer hover:opacity-70 transition-opacity pr-14"
        >
          {title}
        </h3>

        {/* Pricing */}
        <div className="flex items-center gap-3 mt-1">
          {slashedPrice && (
            <span className="text-sm font-light text-gray-400 line-through tracking-wide">{formatPrice(slashedPrice)}</span>
          )}
          <span className="text-sm font-semibold tracking-widest text-gray-900 dark:text-white">{formatPrice(price)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-2 flex w-full gap-2 px-1">
        <button
          onClick={() => addItem(product)}
          className="flex-1 border border-gray-900 bg-transparent py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
        >
          Add to Cart
        </button>
        <button
          onClick={() => setQuickView(product)}
          className="flex-1 border border-gray-900 bg-gray-900 py-3 text-[10px] font-semibold tracking-widest uppercase text-white transition-all duration-300 hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
        >
          Acquire
        </button>
      </div>
    </div>
  );
}
