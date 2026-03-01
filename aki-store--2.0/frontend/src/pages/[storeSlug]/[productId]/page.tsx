
import { useState } from "react";

import { Link } from "react-router-dom";
import { useCartStore } from "../../../store/useCartStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTruck, faShieldAlt, faIcons, faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';

// Dummy data reflecting exactly what the vendor inputted in the dashboard
const productData = {
  id: "PROD-001",
  title: "Classic White Minimalist Sneakers",
  storeName: "Thrift Elegance",
  price: 65.00,
  slashedPrice: 85.00,
  promoCode: { code: "FRESH20", discount: "20% Off" },
  description: "Crafted for everyday comfort and a timeless aesthetic. These classic white sneakers feature a breathable canvas upper, durable rubber outsoles, and orthotic-friendly insoles. Perfect for pairing with jeans, shorts, or a casual dress.",
  delivery: {
    type: "Nationwide Delivery",
    time: "Ready to ship (1-2 business days)",
    fee: 5.00,
  },
  images: [
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
    "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"
  ],
  rating: 4.8,
  reviewsCount: 24,
  stock: 12,
};

export default function ProductDetailsPage() {
  const [activeImage, setActiveImage] = useState(productData.images[0]);
  const [quantity, setQuantity] = useState(1);

  // Pull the addItem action from our global Zustand cart store
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: productData.id,
      title: productData.title,
      price: productData.price,
      image: productData.images[0],
      quantity: quantity,
    });
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#050505] pb-24 font-light">

      {/* Top Navigation Bar Component (Breadcrumbs) */}
      <div className="border-b border-gray-200 bg-transparent px-4 py-6 dark:border-white/10 sm:px-8 mt-16 sm:mt-20">
        <Link to={`/${productData.storeName.toLowerCase().replace(/\s+/g, '-')}`} className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
          <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" /> Return to {productData.storeName}
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-16 xl:gap-x-24">

          {/* LEFT COLUMN: Image Gallery */}
          <div className="flex flex-col-reverse gap-6 sm:flex-row lg:flex-col">

            {/* Thumbnails */}
            <div className="flex gap-4 sm:flex-col lg:flex-row lg:justify-start">
              {productData.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative flex h-24 w-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-900 transition-all ${activeImage === img ? 'opacity-100 ring-1 ring-gray-900 dark:ring-white' : 'opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>

            {/* Main Active Image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
              <img
                src={activeImage}
                alt={productData.title}
                className="object-cover w-full h-full transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            </div>
          </div>

          {/* RIGHT COLUMN: Product Details (Sticky on Desktop) */}
          <div className="mt-12 px-2 sm:px-0 lg:sticky lg:top-32 lg:mt-0">

            {/* Store Tag */}
            <p className="font-cinzel text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">
              {productData.storeName}
            </p>

            {/* Title & Reviews */}
            <h1 className="font-cinzel text-4xl tracking-wide text-gray-900 dark:text-white sm:text-5xl mb-6">
              {productData.title}
            </h1>

            <div className="flex items-center gap-4 border-b border-gray-200 dark:border-white/10 pb-6 mb-6">
              <div className="flex items-center gap-1 text-gray-900 dark:text-white">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon icon={faStar} key={i} className={`h-4 w-4 ${i < Math.floor(productData.rating) ? 'fill-current' : ''}`} />
                ))}
              </div>
              <p className="text-xs font-light tracking-wide text-gray-500 dark:text-gray-400">
                {productData.rating} — {productData.reviewsCount} Reviews
              </p>
            </div>

            {/* Pricing Section */}
            <div className="flex items-end gap-4 mb-8">
              <p className="font-cinzel text-3xl font-medium tracking-wider text-gray-900 dark:text-white">${productData.price.toFixed(2)}</p>
              {productData.slashedPrice && (
                <p className="text-lg font-light text-gray-400 line-through tracking-wider pb-1">${productData.slashedPrice.toFixed(2)}</p>
              )}
            </div>

            {/* Promo Code Badge */}
            {productData.promoCode && (
              <div className="mb-8 inline-flex items-center gap-3 border border-gray-900 dark:border-white bg-transparent px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 dark:text-white uppercase uppercase">
                <FontAwesomeIcon icon={faIcons} className="h-4 w-4" /> {productData.promoCode.code} — {productData.promoCode.discount}
              </div>
            )}

            {/* Description */}
            <div className="mb-10 text-sm leading-relaxed tracking-wide text-gray-600 dark:text-gray-400">
              <p>
                {productData.description}
              </p>
            </div>

            {/* Delivery Information */}
            <div className="mb-10 border-t border-b border-gray-200 py-6 dark:border-white/10">
              <h3 className="flex items-center gap-3 font-cinzel text-xs font-semibold uppercase tracking-widest text-gray-900 dark:text-white mb-6">
                <FontAwesomeIcon icon={faTruck} className="h-5 w-5" /> Logistics details
              </h3>
              <ul className="space-y-4 text-xs tracking-wide text-gray-500 dark:text-gray-400">
                <li className="flex justify-between items-center">
                  <span className="uppercase">Shipping Type</span>
                  <span className="text-gray-900 dark:text-white">{productData.delivery.type}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="uppercase">Processing Time</span>
                  <span className="text-gray-900 dark:text-white">{productData.delivery.time}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="uppercase">Standard Fee</span>
                  <span className="text-gray-900 dark:text-white">${productData.delivery.fee.toFixed(2)}</span>
                </li>
              </ul>
            </div>

            {/* Checkout Actions */}
            <div className="flex flex-col gap-6">

              <div className="flex items-center gap-6">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 w-32 pb-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                  >
                    <FontAwesomeIcon icon={faIcons} className="h-4 w-4" />
                  </button>
                  <span className="font-semibold text-gray-900 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(productData.stock, quantity + 1))}
                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                  >
                    <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-xs font-light text-gray-400 tracking-wide">In Stock: {productData.stock}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row mt-4">
                <button
                  onClick={handleAddToCart}
                  className="flex flex-1 items-center justify-center border border-gray-900 bg-transparent py-4 text-xs font-semibold tracking-widest uppercase text-gray-900 transition-all hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  Add to Cart
                </button>
                <button className="flex flex-1 items-center justify-center border border-gray-900 bg-gray-900 py-4 text-xs font-semibold tracking-widest uppercase text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white">
                  Acquire Now
                </button>
              </div>

              <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-gray-400 flex justify-center items-center gap-2">
                <FontAwesomeIcon icon={faShieldAlt} className="h-4 w-4" /> Secure Transactions via AKI Commerce
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}