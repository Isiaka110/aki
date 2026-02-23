"use client";

import { useCartStore } from "../store/useCartStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ShoppingBag, CreditCard, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
    const { items, getTotal, clearCart } = useCartStore();
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
        // Simulate order placement
        clearCart();
        router.push("/checkout/success");
    };

    if (items.length === 0) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 dark:bg-gray-950">
                <ShoppingBag className="mb-6 h-20 w-20 text-gray-200 dark:text-gray-800" />
                <h1 className="text-2xl font-black text-gray-900 dark:text-white">Your cart is empty</h1>
                <p className="mt-2 text-gray-500">Add some items before checking out.</p>
                <Link href="/explore" className="mt-8 rounded-full bg-black px-8 py-3 font-bold text-white dark:bg-white dark:text-black">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 dark:bg-gray-950 transition-colors">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to Store
                </Link>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

                    {/* Left Column: Form */}
                    <div className="lg:col-span-7">
                        <h1 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white mb-8">Checkout.</h1>

                        <form onSubmit={handlePlaceOrder} className="space-y-8">
                            {/* Shipping Information */}
                            <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <div className="mb-6 flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white dark:bg-white dark:text-black">01</div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Shipping Information</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <label className="mb-2 block text-xs font-black uppercase tracking-widest text-gray-400">Email Address</label>
                                        <input type="email" required placeholder="john@example.com" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm focus:border-black focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-xs font-black uppercase tracking-widest text-gray-400">First Name</label>
                                        <input type="text" required placeholder="John" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm focus:border-black focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-xs font-black uppercase tracking-widest text-gray-400">Last Name</label>
                                        <input type="text" required placeholder="Doe" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm focus:border-black focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="mb-2 block text-xs font-black uppercase tracking-widest text-gray-400">Street Address</label>
                                        <input type="text" required placeholder="123 Luxury Avenue" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm focus:border-black focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-xs font-black uppercase tracking-widest text-gray-400">City</label>
                                        <input type="text" required placeholder="Lagos" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm focus:border-black focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-xs font-black uppercase tracking-widest text-gray-400">Postcode</label>
                                        <input type="text" required placeholder="100001" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm focus:border-black focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white" />
                                    </div>
                                </div>
                            </section>

                            {/* Payment Information */}
                            <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <div className="mb-6 flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white dark:bg-white dark:text-black">02</div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payment Method</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between rounded-2xl border-2 border-black p-4 bg-gray-50 dark:border-white dark:bg-gray-800">
                                        <div className="flex items-center gap-4">
                                            <CreditCard className="h-6 w-6" />
                                            <span className="font-bold">Credit / Debit Card</span>
                                        </div>
                                        <div className="h-4 w-4 rounded-full border-4 border-black dark:border-white"></div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div className="sm:col-span-2">
                                            <label className="mb-2 block text-xs font-black uppercase tracking-widest text-gray-400">Card Number</label>
                                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm focus:border-black focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white" />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-xs font-black uppercase tracking-widest text-gray-400">Expiry Date</label>
                                            <input type="text" placeholder="MM / YY" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm focus:border-black focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white" />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-xs font-black uppercase tracking-widest text-gray-400">CVC</label>
                                            <input type="text" placeholder="123" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm focus:border-black focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <button type="submit" className="w-full rounded-full bg-black py-6 text-lg font-black text-white transition-all hover:scale-[1.02] hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                                Complete Purchase — ${total.toFixed(2)}
                            </button>

                            <div className="flex items-center justify-center gap-6 py-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                    <ShieldCheck className="h-4 w-4" /> Secure SSL
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                    <Truck className="h-4 w-4" /> Insured Delivery
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32 space-y-6">
                            <div className="rounded-[2.5rem] bg-white p-8 shadow-xl dark:bg-gray-900 border border-gray-100 dark:border-gray-800 transition-colors">
                                <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">Order Summary</h2>

                                {/* Items List */}
                                <div className="space-y-4 mb-8 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                                                <Image src={item.image} alt={item.title} fill className="object-cover" />
                                            </div>
                                            <div className="flex flex-1 flex-col">
                                                <span className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{item.title}</span>
                                                <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                                            </div>
                                            <span className="font-bold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Subtotals */}
                                <div className="space-y-3 border-t border-gray-100 pt-6 dark:border-gray-800">
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Subtotal</span>
                                        <span className="font-bold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Shipping</span>
                                        <span className="font-bold text-gray-900 dark:text-white">
                                            {shipping === 0 ? <span className="text-green-500 font-black">FREE</span> : `$${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Est. Taxes (7.5%)</span>
                                        <span className="font-bold text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                                        <span className="text-xl font-black text-gray-900 dark:text-white">Total</span>
                                        <span className="text-2xl font-black text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div className="rounded-3xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                                <label className="mb-2 block text-xs font-black uppercase tracking-widest text-gray-400">Do you have a promo code?</label>
                                <div className="flex gap-2">
                                    <input type="text" placeholder="AKI-FRESH-2026" className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-black focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white" />
                                    <button className="rounded-xl bg-gray-900 px-6 font-bold text-white transition-colors hover:bg-black dark:bg-white dark:text-black">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
