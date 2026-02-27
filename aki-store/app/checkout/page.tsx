"use client";

import { useCartStore } from "../store/useCartStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ShoppingBag, CreditCard, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
    const { items, getTotal, clearCart, setLastOrder } = useCartStore();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const subtotal = getTotal();
    const shipping = subtotal > 50 ? 0 : 10;
    const tax = subtotal * 0.075;
    const total = subtotal + shipping + tax;

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();

        // Generate a mock order ID
        const orderId = "ORD-" + Math.floor(1000 + Math.random() * 9000);

        // Save the details for the success page
        setLastOrder({
            id: orderId,
            items: [...items],
            total: total
        });

        // Simulate order placement
        clearCart();
        router.push("/checkout/success");
    };

    if (items.length === 0) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#fcfcfc] p-4 dark:bg-[#050505]">
                <ShoppingBag className="mb-8 h-16 w-16 text-gray-300 dark:text-gray-700" strokeWidth={1} />
                <h1 className="text-3xl font-cinzel text-gray-900 dark:text-white mb-4 tracking-wide">Your collection is empty</h1>
                <p className="mt-2 text-sm font-light tracking-wide text-gray-500">Discover exclusive pieces to begin.</p>
                <Link href="/explore" className="mt-10 border border-gray-900 bg-gray-900 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white">
                    Enter the Directory
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#050505] pt-24 pb-16 transition-colors">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="mb-12 border-b border-gray-200 dark:border-white/10 pb-6">
                    <Link href="/" className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <ArrowLeft className="h-4 w-4" strokeWidth={1} /> Return to Store
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">

                    {/* Left Column: Form */}
                    <div className="lg:col-span-7">
                        <h1 className="text-5xl font-cinzel text-gray-900 dark:text-white mb-12 tracking-wider">Finalize.</h1>

                        <form onSubmit={handlePlaceOrder} className="space-y-16">
                            {/* Shipping Information */}
                            <section>
                                <div className="mb-8 flex items-center gap-4 border-b border-gray-200 dark:border-white/10 pb-4">
                                    <div className="font-cinzel text-lg text-gray-400">I.</div>
                                    <h2 className="text-xl font-cinzel tracking-widest uppercase text-gray-900 dark:text-white">Shipping Details</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                                    <div>
                                        <input type="email" required placeholder="Email Address" className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400" />
                                    </div>
                                    <div>
                                        <input type="tel" required placeholder="Phone Number" className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400" />
                                    </div>
                                    <div>
                                        <input type="text" required placeholder="First Name" className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400" />
                                    </div>
                                    <div>
                                        <input type="text" required placeholder="Last Name" className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <input type="text" required placeholder="Street Address" className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400" />
                                    </div>
                                    <div>
                                        <input type="text" required placeholder="City" className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400" />
                                    </div>
                                    <div>
                                        <input type="text" required placeholder="Postcode" className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400" />
                                    </div>
                                </div>
                            </section>

                            {/* Payment Information */}
                            <section>
                                <div className="mb-8 flex items-center gap-4 border-b border-gray-200 dark:border-white/10 pb-4">
                                    <div className="font-cinzel text-lg text-gray-400">II.</div>
                                    <h2 className="text-xl font-cinzel tracking-widest uppercase text-gray-900 dark:text-white">Payment Method</h2>
                                </div>

                                <div className="space-y-8">
                                    <div className="flex items-center justify-between border border-gray-900 p-4 bg-transparent dark:border-white">
                                        <div className="flex items-center gap-4">
                                            <CreditCard className="h-5 w-5 text-gray-900 dark:text-white" strokeWidth={1} />
                                            <span className="font-cinzel tracking-widest text-xs uppercase text-gray-900 dark:text-white">Credit / Debit Card</span>
                                        </div>
                                        <div className="h-3 w-3 bg-gray-900 rounded-none dark:bg-white"></div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                                        <div className="sm:col-span-2">
                                            <input type="text" placeholder="Card Number (0000 0000 0000 0000)" className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400" />
                                        </div>
                                        <div>
                                            <input type="text" placeholder="Expiry Date (MM / YY)" className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400" />
                                        </div>
                                        <div>
                                            <input type="text" placeholder="Security Code (CVC)" className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="pt-8">
                                <button type="submit" className="w-full border border-gray-900 bg-gray-900 py-5 text-sm font-semibold tracking-widest uppercase text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white">
                                    Confirm Order — ${total.toFixed(2)}
                                </button>

                                <div className="mt-8 flex items-center justify-center gap-8 border-t border-gray-200 dark:border-white/10 pt-6">
                                    <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-light text-gray-500">
                                        <ShieldCheck className="h-4 w-4" strokeWidth={1} /> Secured
                                    </div>
                                    <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-light text-gray-500">
                                        <Truck className="h-4 w-4" strokeWidth={1} /> Insured Logistics
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-12 space-y-12">
                            <div className="bg-transparent border border-gray-200 p-8 sm:p-12 dark:border-white/10">
                                <h2 className="text-2xl font-cinzel text-gray-900 dark:text-white mb-8 tracking-wider border-b border-gray-200 dark:border-white/10 pb-6">Summary</h2>

                                {/* Items List */}
                                <div className="space-y-6 mb-10 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-start gap-6">
                                            <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-900">
                                                <Image src={item.image} alt={item.title} fill className="object-cover" />
                                            </div>
                                            <div className="flex flex-1 flex-col justify-between py-1">
                                                <div>
                                                    <span className="text-sm font-cinzel text-gray-900 dark:text-white line-clamp-2 leading-relaxed tracking-wide">{item.title}</span>
                                                    <span className="text-xs font-light text-gray-500 tracking-widest mt-2 block uppercase">Qty: {item.quantity}</span>
                                                </div>
                                                <span className="font-medium text-gray-900 dark:text-white mt-4 tracking-widest">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Subtotals */}
                                <div className="space-y-4 border-t border-gray-200 pt-8 dark:border-white/10">
                                    <div className="flex justify-between text-sm text-gray-500 font-light tracking-wide">
                                        <span>Subtotal</span>
                                        <span className="text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 font-light tracking-wide">
                                        <span>Logistics</span>
                                        <span className="text-gray-900 dark:text-white">
                                            {shipping === 0 ? <span className="text-gray-900 dark:text-white italic">Complimentary</span> : `$${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 font-light tracking-wide">
                                        <span>Duties (7.5%)</span>
                                        <span className="text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mt-8 border-t border-gray-900 pt-6 dark:border-white">
                                        <span className="text-xl font-cinzel tracking-widest uppercase text-gray-900 dark:text-white">Total</span>
                                        <span className="text-2xl font-cinzel font-medium text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div>
                                <div className="flex gap-4 border-b border-gray-300 dark:border-gray-700 pb-2">
                                    <input type="text" placeholder="Privilege Code" className="flex-1 bg-transparent px-2 py-2 text-sm focus:outline-none dark:text-white font-light tracking-wider placeholder-gray-400" />
                                    <button className="font-cinzel text-xs font-semibold tracking-widest uppercase text-gray-900 transition-colors hover:text-gray-500 dark:text-white dark:hover:text-gray-400">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
