"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../../../store/useCartStore";
import { 
  Star, 
  Truck, 
  ShieldCheck, 
  Tag, 
  ArrowLeft,
  Minus,
  Plus
} from "lucide-react";

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
    <div className="min-h-screen bg-white pb-24 dark:bg-gray-950">
      
      {/* Top Navigation Bar Component (Breadcrumbs) */}
      <div className="border-b border-gray-100 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-950 sm:px-8">
        <Link href={`/${productData.storeName.toLowerCase().replace(/\s+/g, '-')}`} className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to {productData.storeName}
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12 xl:gap-x-16">
          
          {/* LEFT COLUMN: Image Gallery */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row lg:flex-col">
            
            {/* Thumbnails (Horizontal on desktop, vertical on tablet, horizontal on mobile) */}
            <div className="flex gap-3 sm:flex-col lg:flex-row lg:justify-start">
              {productData.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 ${activeImage === img ? 'ring-2 ring-black dark:ring-white' : 'ring-1 ring-gray-200 dark:ring-gray-800 opacity-70 hover:opacity-100 transition-opacity'}`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main Active Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 sm:aspect-square">
               <Image 
                 src={activeImage} 
                 alt={productData.title} 
                 fill 
                 className="object-cover transition-all duration-500" 
                 priority
               />
            </div>
          </div>

          {/* RIGHT COLUMN: Product Details (Sticky on Desktop) */}
          <div className="mt-10 px-4 sm:px-0 lg:sticky lg:top-24 lg:mt-0">
            
            {/* Title & Reviews */}
            <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {productData.title}
            </h1>
            
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(productData.rating) ? 'fill-current' : ''}`} />
                ))}
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {productData.rating} ({productData.reviewsCount} reviews)
              </p>
            </div>

            {/* Pricing Section */}
            <div className="mt-6 flex items-end gap-3">
              <p className="text-4xl font-black text-gray-900 dark:text-white">${productData.price.toFixed(2)}</p>
              {productData.slashedPrice && (
                <p className="text-xl font-bold text-gray-400 line-through">${productData.slashedPrice.toFixed(2)}</p>
              )}
            </div>

            {/* Promo Code Badge */}
            {productData.promoCode && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-bold text-green-700 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-400">
                <Tag className="h-4 w-4" /> Use code <span className="uppercase">{productData.promoCode.code}</span> for {productData.promoCode.discount}
              </div>
            )}

            {/* Description */}
            <div className="mt-8 space-y-6">
              <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                {productData.description}
              </p>
            </div>

            {/* Delivery Information (From Tab 4 in Vendor Dashboard) */}
            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/50">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                <Truck className="h-5 w-5 text-gray-500" /> Delivery Details
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex justify-between">
                  <span>Shipping Type:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{productData.delivery.type}</span>
                </li>
                <li className="flex justify-between">
                  <span>Processing Time:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{productData.delivery.time}</span>
                </li>
                <li className="flex justify-between">
                  <span>Standard Fee:</span>
                  <span className="font-bold text-gray-900 dark:text-white">${productData.delivery.fee.toFixed(2)}</span>
                </li>
              </ul>
            </div>

            {/* Checkout Actions */}
            <div className="mt-8 flex flex-col gap-4">
              
              {/* Quantity Selector */}
              <div className="flex items-center justify-between rounded-full border border-gray-200 p-2 dark:border-gray-800 sm:w-48">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-bold text-gray-900 dark:text-white">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(productData.stock, quantity + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button 
                  onClick={handleAddToCart}
                  className="flex flex-1 items-center justify-center rounded-full border-2 border-gray-200 bg-white py-4 text-base font-bold text-gray-900 transition-colors hover:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:hover:border-white"
                >
                  Add to Cart
                </button>
                <button className="flex flex-1 items-center justify-center rounded-full bg-gray-900 py-4 text-base font-bold text-white transition-colors hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
                  Buy it Now
                </button>
              </div>
              <p className="text-center text-xs text-gray-500 flex justify-center items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Secure checkout powered by AKI Market
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}