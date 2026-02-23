"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus, Edit, Trash2, X,
  Image as ImageIcon, UploadCloud,
  Info, Tag, Truck, Check
} from "lucide-react";

// Dummy data for the table
const initialProducts = [
  { id: "1", title: "Vintage Leather Jacket", category: "Outerwear", price: 120.00, stock: 14, status: "Active", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80" },
];

export default function ProductsPage() {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("info"); // Tabs: info, media, pricing, delivery
  const [products] = useState(initialProducts);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* --- PAGE HEADER & TABLE (Unchanged logic, simplified for brevity) --- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Products</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">The source of truth for your storefront.</p>
        </div>
        <button
          onClick={() => setIsBuilderOpen(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {products.map((product) => (
                <tr key={product.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                        <Image src={product.image} alt={product.title} fill className="object-cover" />
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">{product.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{product.category}</td>
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- THE NEW ADVANCED PRODUCT BUILDER --- */}
      {isBuilderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-950 animate-in zoom-in-95 duration-200">

            {/* Builder Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
              <h2 className="text-xl font-black text-gray-900 dark:text-white">Create New Product</h2>
              <button onClick={() => setIsBuilderOpen(false)} className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">

              {/* Left Sidebar: Tabs */}
              <div className="w-48 shrink-0 border-r border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/50">
                <nav className="flex flex-col gap-2">
                  <button onClick={() => setActiveTab("info")} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${activeTab === "info" ? "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white" : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-900"}`}>
                    <Info className="h-4 w-4" /> Basic Info
                  </button>
                  <button onClick={() => setActiveTab("media")} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${activeTab === "media" ? "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white" : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-900"}`}>
                    <ImageIcon className="h-4 w-4" /> Media (Slider)
                  </button>
                  <button onClick={() => setActiveTab("pricing")} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${activeTab === "pricing" ? "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white" : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-900"}`}>
                    <Tag className="h-4 w-4" /> Pricing & Sales
                  </button>
                  <button onClick={() => setActiveTab("delivery")} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${activeTab === "delivery" ? "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white" : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-900"}`}>
                    <Truck className="h-4 w-4" /> Delivery Rules
                  </button>
                </nav>
              </div>

              {/* Right Side: Tab Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <form className="mx-auto max-w-xl space-y-8">

                  {/* TAB 1: BASIC INFO */}
                  {activeTab === "info" && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div>
                        <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">Product Title</label>
                        <input type="text" placeholder="e.g. Classic White Sneakers" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-black focus:ring-1 focus:ring-black" />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">Category</label>
                        <select className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-black focus:ring-1 focus:ring-black">
                          <option>Shoes</option>
                          <option>Clothing</option>
                          <option>Accessories</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">Detailed Description</label>
                        <textarea rows={5} placeholder="Describe the material, fit, and styling tips. This helps shoppers make confident decisions..." className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-black focus:ring-1 focus:ring-black" />
                      </div>
                    </div>
                  )}

                  {/* TAB 2: MEDIA (2-4 Image Slider) */}
                  {activeTab === "media" && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-900/30 dark:bg-blue-900/20 dark:text-blue-400">
                        <strong>Pro Tip:</strong> Upload 2 to 4 images to create a swipeable gallery on your storefront. Shoppers love seeing different angles!
                      </div>

                      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 py-12 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 cursor-pointer">
                        <UploadCloud className="mb-3 h-10 w-10 text-gray-400" />
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Click to upload up to 4 images</p>
                        <p className="mt-1 text-xs text-gray-500">Must be square (1:1) or portrait (4:5) for best results.</p>
                      </div>

                      {/* Mockup of uploaded images */}
                      <div className="grid grid-cols-4 gap-4">
                        <div className="flex aspect-square items-center justify-center rounded-lg border-2 border-black bg-gray-100 text-xs font-bold dark:border-white dark:bg-gray-800">Thumbnail</div>
                        <div className="flex aspect-square items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-xs text-gray-400 dark:border-gray-800 dark:bg-gray-900">Image 2</div>
                        <div className="flex aspect-square items-center justify-center rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950/50"></div>
                        <div className="flex aspect-square items-center justify-center rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950/50"></div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: PRICING, DISCOUNTS & PROMO CODES */}
                  {activeTab === "pricing" && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">Base Price ($)</label>
                          <input type="number" placeholder="0.00" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-black focus:ring-1 focus:ring-black" />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">Stock Quantity</label>
                          <input type="number" placeholder="e.g. 50" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-black focus:ring-1 focus:ring-black" />
                        </div>
                      </div>

                      <hr className="border-gray-200 dark:border-gray-800" />

                      <div>
                        <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">Slashed Price (Sale Display)</label>
                        <p className="mb-2 text-xs text-gray-500">If filled, this displays the original price with a strikethrough next to your base price.</p>
                        <input type="number" placeholder="e.g. 150.00" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-black focus:ring-1 focus:ring-black" />
                      </div>

                      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
                        <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">Active Promo Code (Optional)</label>
                        <p className="mb-3 text-xs text-gray-500">Allow shoppers to apply a specific code at checkout for this item.</p>
                        <div className="flex gap-2">
                          <input type="text" placeholder="e.g. BLACKFRIDAY20" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm uppercase dark:border-gray-700 dark:bg-gray-950 dark:text-white focus:border-black focus:ring-1 focus:ring-black" />
                          <input type="number" placeholder="% Off" className="w-24 rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-white focus:border-black focus:ring-1 focus:ring-black" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: DELIVERY REQUIREMENTS */}
                  {activeTab === "delivery" && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div>
                        <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">Processing Time</label>
                        <select className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-black focus:ring-1 focus:ring-black">
                          <option>Ready to ship (1-2 business days)</option>
                          <option>Made to order (3-5 business days)</option>
                          <option>Pre-order (1-2 weeks)</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">Delivery Options</label>
                        <div className="mt-2 space-y-3">
                          <label className="flex items-start gap-3">
                            <input type="checkbox" defaultChecked className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black dark:border-gray-700 dark:bg-gray-900" />
                            <div>
                              <span className="block text-sm font-bold text-gray-900 dark:text-white">Nationwide Delivery</span>
                              <span className="block text-xs text-gray-500">Item can be shipped anywhere in the country.</span>
                            </div>
                          </label>
                          <label className="flex items-start gap-3">
                            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black dark:border-gray-700 dark:bg-gray-900" />
                            <div>
                              <span className="block text-sm font-bold text-gray-900 dark:text-white">Local Pickup Available</span>
                              <span className="block text-xs text-gray-500">Shopper can collect directly from your physical address.</span>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">Flat Rate Shipping Fee ($)</label>
                        <p className="mb-2 text-xs text-gray-500">Leave at 0.00 if shipping is free or calculated later.</p>
                        <input type="number" placeholder="0.00" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-black focus:ring-1 focus:ring-black" />
                      </div>
                    </div>
                  )}

                </form>
              </div>
            </div>

            {/* Builder Footer / Actions */}
            <div className="flex shrink-0 items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-950/50">
              <span className="text-sm font-medium text-gray-500">
                Step <span className="text-gray-900 dark:text-white">
                  {activeTab === 'info' ? '1' : activeTab === 'media' ? '2' : activeTab === 'pricing' ? '3' : '4'}
                </span> of 4
              </span>
              <div className="flex gap-3">
                <button onClick={() => setIsBuilderOpen(false)} className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
                  Discard
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-black px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  <Check className="h-4 w-4" /> Publish Product
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}