"use client";

import { useState, useEffect } from "react";
import { Package, MapPin, Settings, LogOut, Heart, ChevronRight } from "lucide-react";
import Image from "next/image";

const orders = [
    {
        id: "ORD-9281",
        date: "Feb 12, 2026",
        status: "Delivered",
        total: 124.50,
        items: [
            { name: "Vintage Denim Jacket", image: "https://images.unsplash.com/photo-1576905355165-30c92f44ae61?w=200&q=80" },
            { name: "Silk Bandana", image: "https://images.unsplash.com/photo-1610413344654-e91029c799a4?w=200&q=80" }
        ]
    },
    {
        id: "ORD-8512",
        date: "Jan 28, 2026",
        status: "Shipped",
        total: 89.00,
        items: [
            { name: "Ceramic Coffee Mug", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200&q=80" }
        ]
    }
];

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState("orders");
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 pb-12 border-b border-gray-100 dark:border-gray-900 transition-colors">
                    <div className="flex items-center gap-6">
                        <div className="relative h-24 w-24 overflow-hidden rounded-[2rem] bg-gray-100 dark:bg-gray-900">
                            <Image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80" alt="John Doe" fill className="object-cover" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black tracking-tighter text-gray-900 dark:text-white sm:text-4xl">John Doe.</h1>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">Premium Member since 2025</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="rounded-full border border-gray-200 px-6 py-3 text-sm font-bold text-gray-900 transition-colors hover:border-black dark:border-gray-800 dark:text-white dark:hover:border-white">
                            Edit Profile
                        </button>
                        <button className="rounded-full bg-red-50 px-6 py-3 text-sm font-bold text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20">
                            <LogOut className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

                    {/* Sidebar Nav */}
                    <aside className="lg:col-span-1 space-y-2">
                        {[
                            { id: "orders", label: "Order History", icon: Package },
                            { id: "wishlist", label: "Wishlist", icon: Heart },
                            { id: "addresses", label: "Addresses", icon: MapPin },
                            { id: "settings", label: "Account Settings", icon: Settings },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-sm font-black transition-all ${activeTab === tab.id ? "bg-black text-white dark:bg-white dark:text-black shadow-lg" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900"}`}
                            >
                                <tab.icon className="h-5 w-5" />
                                {tab.label}
                            </button>
                        ))}
                    </aside>

                    {/* Main Content Area */}
                    <main className="lg:col-span-3">

                        {activeTab === "orders" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Recent Orders</h2>

                                {orders.map((order) => (
                                    <div key={order.id} className="group relative rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-black dark:border-gray-800 dark:bg-gray-900 dark:hover:border-white">
                                        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID</span>
                                                <h3 className="text-lg font-black text-gray-900 dark:text-white font-mono uppercase">{order.id}</h3>
                                            </div>
                                            <div className="space-y-1 text-right">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order Placed</span>
                                                <p className="font-bold text-gray-900 dark:text-white uppercase tracking-tighter">{order.date}</p>
                                            </div>
                                            <div className={`rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${order.status === "Delivered" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"}`}>
                                                {order.status}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {order.items.map((item, i) => (
                                                <div key={i} className="relative h-16 w-16 overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 ring-2 ring-transparent group-hover:ring-black dark:group-hover:ring-white transition-all">
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                </div>
                                            ))}
                                            {order.items.length > 3 && (
                                                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-50 text-xs font-bold dark:bg-gray-800">
                                                    +{order.items.length - 3}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-50 dark:border-gray-800">
                                            <span className="text-xl font-black text-gray-900 dark:text-white font-mono">${order.total.toFixed(2)}</span>
                                            <button className="flex items-center gap-2 text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">
                                                Track Order <ChevronRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "wishlist" && (
                            <div className="text-center py-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <Heart className="h-20 w-20 mx-auto mb-6 text-gray-100 dark:text-gray-900" />
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white">Your Wishlist is Empty</h2>
                                <p className="mt-2 text-gray-500">Save items you love to find them later.</p>
                            </div>
                        )}

                        {activeTab === "addresses" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Shipping Addresses</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="rounded-[2rem] border-2 border-black p-8 dark:border-white shadow-xl bg-white dark:bg-gray-900">
                                        <div className="flex justify-between mb-4">
                                            <span className="rounded-full bg-black px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white dark:bg-white dark:text-black">Primary</span>
                                        </div>
                                        <h3 className="font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tighter">Home Address</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">123 Luxury Avenue, Victoria Island Lagos, Nigeria</p>
                                    </div>
                                    <button className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-gray-200 p-8 hover:border-black dark:border-gray-800 dark:hover:border-white transition-all group">
                                        <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center mb-4 dark:bg-gray-900 group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors">
                                            <MapPin className="h-6 w-6" />
                                        </div>
                                        <span className="font-bold text-gray-400">Add New Address</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "settings" && (
                            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <section>
                                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Notification Settings</h2>
                                    <div className="space-y-4">
                                        {['Order Updates', 'New Product Drops', 'Price Alerts'].map((item) => (
                                            <div key={item} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-900">
                                                <span className="font-bold text-gray-700 dark:text-gray-300">{item}</span>
                                                <div className="h-6 w-12 rounded-full bg-green-500 relative cursor-pointer">
                                                    <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        )}

                    </main>
                </div>

            </div>
        </div>
    );
}
