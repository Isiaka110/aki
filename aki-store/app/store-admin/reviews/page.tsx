"use client";

import { useState } from "react";
import { Star, CheckCircle, XCircle, Clock, MessageSquare } from "lucide-react";

// Dummy review data
const dummyReviews = [
  { 
    id: "REV-01", 
    customer: "Elena R.", 
    product: "Vintage Leather Jacket", 
    rating: 5, 
    date: "Oct 24, 2025", 
    comment: "Absolutely in love with this jacket! The quality is amazing and it arrived exactly as described. Will definitely be buying from this store again.", 
    status: "Pending" 
  },
  { 
    id: "REV-02", 
    customer: "James T.", 
    product: "Classic White Sneakers", 
    rating: 4, 
    date: "Oct 22, 2025", 
    comment: "Great shoes, very comfortable. Shipping took a little longer than expected, but the seller was very communicative.", 
    status: "Approved" 
  },
  { 
    id: "REV-03", 
    customer: "Anonymous", 
    product: "Minimalist Watch", 
    rating: 1, 
    date: "Oct 20, 2025", 
    comment: "Terrible. Do not buy.", 
    status: "Rejected" 
  },
  { 
    id: "REV-04", 
    customer: "Fatima A.", 
    product: "Vintage Leather Jacket", 
    rating: 5, 
    date: "Oct 19, 2025", 
    comment: "The packaging was so cute and the jacket fits perfectly. Highly recommend ThriftElegance to anyone looking for unique pieces!", 
    status: "Pending" 
  },
];

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Pending", "Approved", "Rejected"];

  // Render stars helper
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200 dark:fill-gray-800 dark:text-gray-800"}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Header & Stats Summary */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Store Reviews</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Moderate customer feedback before it appears on your storefront.</p>
        </div>
        
        {/* Quick Stats */}
        <div className="flex gap-4">
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
              <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">Avg Rating</p>
              <p className="text-lg font-black text-gray-900 dark:text-white">4.8 <span className="text-sm font-normal text-gray-500">/ 5.0</span></p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">Pending</p>
              <p className="text-lg font-black text-gray-900 dark:text-white">2 <span className="text-sm font-normal text-gray-500">Reviews</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-900 inline-block">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="flex flex-col gap-4">
        {dummyReviews.filter(r => activeTab === "All" || r.status === activeTab).map((review) => (
          <div key={review.id} className="flex flex-col justify-between gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-start">
            
            {/* Review Content */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between sm:justify-start sm:gap-4">
                {renderStars(review.rating)}
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider
                  ${review.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500' : ''}
                  ${review.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                  ${review.status === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : ''}
                `}>
                  {review.status === 'Pending' && <Clock className="h-3 w-3" />}
                  {review.status}
                </span>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300">
                "{review.comment}"
              </p>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-bold text-gray-900 dark:text-white">{review.customer}</span>
                <span>•</span>
                <span>{review.date}</span>
                <span>•</span>
                <span>Product: <span className="font-medium text-gray-700 dark:text-gray-300">{review.product}</span></span>
              </div>
            </div>

            {/* Moderation Actions (Only show for Pending) */}
            {review.status === "Pending" && (
              <div className="flex w-full shrink-0 flex-row gap-2 sm:w-auto sm:flex-col">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-bold text-green-700 transition-colors hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40">
                  <CheckCircle className="h-4 w-4" /> Approve
                </button>
                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-bold text-red-700 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40">
                  <XCircle className="h-4 w-4" /> Reject
                </button>
              </div>
            )}
            
            {/* Info for already moderated reviews */}
            {review.status !== "Pending" && (
              <div className="flex shrink-0 items-center sm:h-full">
                 <p className="text-xs text-gray-400">Moderated on {review.date}</p>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}