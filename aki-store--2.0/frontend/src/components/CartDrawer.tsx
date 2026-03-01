

import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useCartStore } from "../store/useCartStore";

export default function CartDrawer() {
  const router = useNavigate();
  const { items, isOpen, toggleCart, removeItem, getTotal } = useCartStore();

  if (!isOpen) return null;

  const handleCheckout = () => {
    toggleCart(); // Close drawer
    router.push("/checkout"); // Route to true checkout page
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={toggleCart}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col bg-[#fcfcfc] dark:bg-[#050505] shadow-2xl sm:w-[500px] animate-in slide-in-from-right duration-500 border-l border-gray-200 dark:border-white/10">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-8 dark:border-white/10">
          <h2 className="font-cinzel text-xl tracking-widest text-gray-900 dark:text-white uppercase flex items-center gap-4">
            Curated Collection
          </h2>
          <button onClick={toggleCart} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <FontAwesomeIcon icon={faTimes}  className="h-5 w-5"  />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <FontAwesomeIcon icon={faShoppingBag}  className="mb-6 h-12 w-12 text-gray-200 dark:text-gray-800"  />
              <p className="font-cinzel text-lg tracking-widest uppercase text-gray-400 mb-2">No Acquisitions</p>
              <p className="text-xs font-light tracking-wide text-gray-500">Your collection awaits.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {items.map((item) => (
                <div key={item.id} className="group relative flex items-start gap-6 border-b border-gray-100 dark:border-white/5 pb-8 last:border-0 last:pb-0">
                  <div className="relative h-28 w-20 overflow-hidden bg-gray-50 dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10">
                    <img src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between min-h-[7rem]">
                    <div className="pr-4">
                      <h3 className="font-cinzel text-sm leading-relaxed tracking-wider text-gray-900 dark:text-white line-clamp-2 uppercase">
                        {item.title}
                      </h3>
                      <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mt-2">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <p className="font-cinzel text-sm tracking-wider text-gray-900 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-8 dark:border-white/10">
            <div className="mb-8 flex items-end justify-between">
              <span className="font-cinzel text-xs font-semibold tracking-widest text-gray-500 uppercase">Subtotal</span>
              <span className="font-cinzel text-2xl tracking-wider text-gray-900 dark:text-white">${getTotal().toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full border border-gray-900 bg-gray-900 py-5 text-xs font-semibold tracking-widest uppercase text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
            >
              Finalize Acquisition
            </button>
            <p className="mt-6 text-center text-[9px] font-light tracking-[0.2em] text-gray-400 uppercase">
              Shipping & taxes calculated at checkout.
            </p>
          </div>
        )}
      </div>
    </>
  );
}