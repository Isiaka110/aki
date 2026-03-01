

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShoppingBag, faCreditCard, faSync } from '@fortawesome/free-solid-svg-icons';
import { useCartStore } from "../store/useCartStore";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function CartDrawer() {
  const { storeSlug } = useParams();
  const { items, isOpen, toggleCart, removeItem, getTotal, clearCart } = useCartStore();

  const [isCheckout, setIsCheckout] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setIsCheckout(true);
  };

  const handlePaymentSuccess = async (reference: string) => {
    try {
      const payload = {
        storeId: storeSlug || 'global',
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        items: items.map(i => ({ productId: i.id, title: i.title, quantity: i.quantity, price: i.price, image: i.image })),
        totalAmount: getTotal(),
        paymentStatus: 'Completed',
        status: 'Pending',
        transactionRef: reference
      };

      const res = await fetch(`${API_BASE}/api/store/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        alert('Acquisition Complete! A confirmation receipt has been dispatched.');
        clearCart();
        setIsCheckout(false);
        toggleCart();
      } else {
        alert('Checkout failed: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during finalization.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const processPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (!formData.name || !formData.email || !formData.address) return alert("Please specify full client details details.");

    setIsSubmitting(true);
    try {
      // Fetch store configuration to lookup Paystack Key
      let pk = "pk_test_placeholder_key";
      const storesRes = await fetch(`${API_BASE}/api/super-admin/stores`);
      const storesData = await storesRes.json();
      if (storesData.success) {
        const foundStore = storesData.data.find((s: any) => s.storeId === storeSlug);
        if (foundStore && foundStore.paystackPublicKey) {
          pk = foundStore.paystackPublicKey;
        }
      }

      // Dynamically load Paystack
      const loadPaystack = () => {
        return new Promise((resolve, reject) => {
          if ((window as any).PaystackPop) return resolve(true);
          const script = document.createElement("script");
          script.src = "https://js.paystack.co/v1/inline.js";
          script.async = true;
          document.body.appendChild(script);
          script.onload = () => resolve(true);
          script.onerror = () => reject(new Error("Paystack Script failed to load."));
        });
      };

      await loadPaystack();

      const amountInKobo = Math.round(getTotal() * 100); // Amount to strictly kobo equivalent

      const paystackInstance = (window as any).PaystackPop.setup({
        key: pk,
        email: formData.email,
        amount: amountInKobo > 0 ? amountInKobo : 100, // Minimal test fallback
        currency: 'NGN',
        callback: function (response: any) {
          handlePaymentSuccess(response.reference);
        },
        onClose: function () {
          setIsSubmitting(false);
          alert("Transaction Window Closed");
        }
      });

      paystackInstance.openIframe();
    } catch (err) {
      console.error(err);
      alert('An error occurred resolving payment gateway.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => { toggleCart(); setIsCheckout(false); }}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col bg-[#fcfcfc] dark:bg-[#050505] shadow-2xl sm:w-[500px] animate-in slide-in-from-right duration-500 border-l border-gray-200 dark:border-white/10">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-8 dark:border-white/10">
          <h2 className="font-cinzel text-xl tracking-widest text-gray-900 dark:text-white uppercase flex items-center gap-4">
            {isCheckout ? "Secure Checkout" : "Curated Collection"}
          </h2>
          <button onClick={() => { toggleCart(); setIsCheckout(false); }} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items or Checkout Form */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {isCheckout ? (
            <form id="checkout-form" onSubmit={processPayment} className="space-y-6">
              <div>
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-4 border-b border-gray-100 dark:border-white/5 pb-2">Client Details</h3>
                <div className="space-y-4">
                  <input required type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-200 dark:border-white/10 bg-transparent px-4 py-3 text-sm focus:border-gray-900 focus:outline-none dark:text-white dark:focus:border-white" />
                  <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full border border-gray-200 dark:border-white/10 bg-transparent px-4 py-3 text-sm focus:border-gray-900 focus:outline-none dark:text-white dark:focus:border-white" />
                  <input type="tel" placeholder="Phone (Optional)" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full border border-gray-200 dark:border-white/10 bg-transparent px-4 py-3 text-sm focus:border-gray-900 focus:outline-none dark:text-white dark:focus:border-white" />
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-4 border-b border-gray-100 dark:border-white/5 pb-2">Shipping Log</h3>
                <textarea required placeholder="Full Delivery Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} rows={3} className="w-full border border-gray-200 dark:border-white/10 bg-transparent px-4 py-3 text-sm focus:border-gray-900 focus:outline-none dark:text-white dark:focus:border-white resize-none" />
              </div>

              <div className="bg-gray-50 dark:bg-white/5 p-4 border border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <FontAwesomeIcon icon={faCreditCard} className="text-gray-400" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-700 dark:text-gray-300">Payment Gateway</span>
                </div>
                <p className="text-[10px] text-gray-500 tracking-wide font-light">
                  Integrated Payment solution via Cards or Paystack handles this securely.
                </p>
              </div>
            </form>
          ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <FontAwesomeIcon icon={faShoppingBag} className="mb-6 h-12 w-12 text-gray-200 dark:text-gray-800" />
              <p className="font-cinzel text-lg tracking-widest uppercase text-gray-400 mb-2">No Acquisitions</p>
              <p className="text-xs font-light tracking-wide text-gray-500">Your collection awaits.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {items.map((item) => (
                <div key={item.id} className="group relative flex items-start gap-6 border-b border-gray-100 dark:border-white/5 pb-8 last:border-0 last:pb-0">
                  <div className="relative h-28 w-20 overflow-hidden bg-gray-50 dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10">
                    <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
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
            {isCheckout ? (
              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 border border-blue-600 bg-blue-600 py-5 text-xs font-semibold tracking-widest uppercase text-white transition-all hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? <FontAwesomeIcon icon={faSync} className="animate-spin" /> : <FontAwesomeIcon icon={faCreditCard} />} {isSubmitting ? "Processing..." : "Pay via Gateway"}
              </button>
            ) : (
              <button
                onClick={handleCheckout}
                className="w-full border border-gray-900 bg-gray-900 py-5 text-xs font-semibold tracking-widest uppercase text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
              >
                Finalize Acquisition
              </button>
            )}
            <p className="mt-6 text-center text-[9px] font-light tracking-[0.2em] text-gray-400 uppercase">
              {isCheckout ? "Payments processed securely" : "Shipping & taxes calculated at checkout."}
            </p>
          </div>
        )}
      </div>
    </>
  );
}