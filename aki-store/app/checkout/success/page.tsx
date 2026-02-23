import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
        <Sparkles className="h-12 w-12" />
      </div>
      <h1 className="mb-4 text-4xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">
        Order Successful!
      </h1>
      <p className="mb-8 max-w-md text-gray-600 dark:text-gray-400">
        Thank you for supporting a small business on AKI. Your order has been placed successfully and your receipt is on its way.
      </p>
      <Link 
        href="/"
        className="rounded-full bg-black px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
      >
        Continue Shopping
      </Link>
    </div>
  );
}