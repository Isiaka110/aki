
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { useCartStore, useStoreSettings } from "../../../store/useCartStore";

export default function CheckoutSuccessPage() {
  const { lastOrder } = useCartStore();
  const { whatsappNumber, designation } = useStoreSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate WhatsApp Message
  const storePhone = whatsappNumber || "1234567890";
  let whatsappUrl = `https://wa.me/${storePhone}`;

  if (lastOrder) {
    let message = `Hello AKI Team, I have just placed an order (ID: ${lastOrder.id}).\n\n`;
    message += `I require a follow-up regarding my acquisition of the following pieces:\n`;

    lastOrder.items.forEach((item: any) => {
      message += `- ${item.quantity}x ${item.title} ($${(item.price * item.quantity).toFixed(2)})\n`;
    });

    message += `\nTotal Value: $${lastOrder.total.toFixed(2)}`;

    whatsappUrl = `https://wa.me/${storePhone}?text=${encodeURIComponent(message)}`;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center bg-[#fcfcfc] dark:bg-[#050505] pt-20">
      <div className="mb-8 flex h-24 w-24 items-center justify-center border border-gray-900 dark:border-white text-gray-900 dark:text-white">
        <FontAwesomeIcon icon={faCheck} className="h-10 w-10" />
      </div>
      <h1 className="mb-6 font-cinzel text-4xl sm:text-5xl tracking-widest text-gray-900 dark:text-white uppercase font-medium">
        Acquisition
        <br /> Complete
      </h1>
      <p className="mb-10 max-w-lg text-sm font-light tracking-wide leading-relaxed text-gray-600 dark:text-gray-400">
        Your selection has been successfully processed.
        A formal receipt and shipping details will be curated and sent to your email shortly.
        Thank you for choosing AKI Commerce.
      </p>

      {lastOrder && (
        <div className="mb-10 flex flex-col items-center gap-2 border border-gray-200 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5">
          <span className="font-cinzel tracking-widest text-lg text-gray-900 dark:text-white">Order {lastOrder.id}</span>
          <span className="text-xs font-light text-gray-500 tracking-widest uppercase">Total: ${lastOrder.total.toFixed(2)}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md justify-center">
        <Link to={`/${designation.toLowerCase() || 'explore'}`}
          className="flex-1 border border-gray-900 bg-transparent py-4 text-xs font-semibold tracking-widest uppercase text-gray-900 hover:bg-gray-900 hover:text-white transition-all dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
        >
          Return to Directory
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 border border-[#25D366] bg-[#25D366] text-white py-4 text-xs font-semibold tracking-widest uppercase hover:bg-transparent hover:text-[#25D366] transition-all"
        >
          <FontAwesomeIcon icon={faCommentDots} className="h-4 w-4" /> WhatsApp Follow Up
        </a>
      </div>
    </div>
  );
}