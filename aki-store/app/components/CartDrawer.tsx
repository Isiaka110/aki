"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

export default function CartDrawer() {
  const router = useRouter();
  const { items, isOpen, toggleCart, removeItem, getTotal, clearCart } = useCartStore();

  if (!isOpen) return null;

  const handleCheckout = () => {
    toggleCart(); // Close drawer
    router.push("/checkout"); // Route to true checkout page
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={toggleCart}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl dark:bg-gray-950 sm:w-[400px] animate-in slide-in-from-right duration-300">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-800">
          <h2 className="flex items-center gap-2 text-xl font-black text-gray-900 dark:text-white">
            <ShoppingBag className="h-6 w-6" /> Your Cart
          </h2>
          <button onClick={toggleCart} className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <ShoppingBag className="mb-4 h-12 w-12 opacity-20" />
              <p>Your cart is currently empty.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-20 w-16 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                    <p className="font-black text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:text-red-700 transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 dark:border-gray-800">
            <div className="mb-4 flex items-center justify-between text-lg font-black text-gray-900 dark:text-white">
              <span>Total</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full rounded-full bg-black py-4 text-sm font-bold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}