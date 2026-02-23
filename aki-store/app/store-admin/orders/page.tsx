"use client";

import { useState } from "react";
import { Search, Filter, Eye, Truck, CheckCircle, Clock } from "lucide-react";

// Dummy order data
const dummyOrders = [
  { id: "ORD-1042", customer: "Sarah Jenkins", email: "sarah@example.com", date: "Oct 24, 2025", total: 120.00, status: "Pending", items: 2 },
  { id: "ORD-1041", customer: "Michael Chen", email: "mike.c@example.com", date: "Oct 23, 2025", total: 85.00, status: "Shipped", items: 1 },
  { id: "ORD-1040", customer: "Amaka Okafor", email: "amaka@example.com", date: "Oct 21, 2025", total: 210.50, status: "Delivered", items: 3 },
  { id: "ORD-1039", customer: "David Smith", email: "david.s@example.com", date: "Oct 20, 2025", total: 45.00, status: "Pending", items: 1 },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Pending", "Shipped", "Delivered"];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Orders</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage fulfillment and track customer purchases.</p>
      </div>

      {/* Tabs & Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-900">
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

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:focus:border-white"
            />
          </div>
          <button className="flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2.5 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-400 dark:hover:bg-gray-900 transition-colors">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {dummyOrders.filter(o => activeTab === "All" || o.status === activeTab).map((order) => (
                <tr key={order.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{order.customer}</div>
                    <div className="text-xs text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold
                      ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500' : ''}
                      ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                    `}>
                      {order.status === 'Pending' && <Clock className="h-3 w-3" />}
                      {order.status === 'Shipped' && <Truck className="h-3 w-3" />}
                      {order.status === 'Delivered' && <CheckCircle className="h-3 w-3" />}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">${order.total.toFixed(2)} <span className="text-xs font-normal text-gray-500">({order.items} items)</span></td>
                  <td className="px-6 py-4 text-right">
                     <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
                        <Eye className="h-3 w-3" /> View
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}