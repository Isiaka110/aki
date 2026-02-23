"use client";

import { useState } from "react";
import { 
  Search, Filter, Eye, Truck, CheckCircle, Clock, 
  Download, CheckSquare, MoreHorizontal, Printer,
  ChevronLeft, ChevronRight
} from "lucide-react";

// Richer dummy data for bulk operations
const dummyOrders = [
  { id: "ORD-1045", customer: "Chinedu Eze", email: "ceze@example.com", date: "Oct 25, 2025", total: 350.00, status: "Pending", items: 4 },
  { id: "ORD-1044", customer: "Aisha Bello", email: "aisha.b@example.com", date: "Oct 25, 2025", total: 120.00, status: "Pending", items: 2 },
  { id: "ORD-1043", customer: "Sarah Jenkins", email: "sarah@example.com", date: "Oct 24, 2025", total: 65.00, status: "Pending", items: 1 },
  { id: "ORD-1042", customer: "Michael Chen", email: "mike.c@example.com", date: "Oct 23, 2025", total: 85.00, status: "Shipped", items: 1 },
  { id: "ORD-1041", customer: "Amaka Okafor", email: "amaka@example.com", date: "Oct 21, 2025", total: 210.50, status: "Delivered", items: 3 },
  { id: "ORD-1040", customer: "David Smith", email: "david.s@example.com", date: "Oct 20, 2025", total: 45.00, status: "Delivered", items: 1 },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  
  const tabs = ["All", "Pending", "Shipped", "Delivered"];

  // Filter orders based on active tab
  const filteredOrders = dummyOrders.filter(o => activeTab === "All" || o.status === activeTab);

  // Bulk Selection Logic
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrders(filteredOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter(orderId => orderId !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

  const handleBulkAction = (action: string) => {
    // In a real app, this triggers an API call to update all selected IDs
    alert(`Bulk Action: ${action} applied to ${selectedOrders.length} orders.`);
    setSelectedOrders([]); // Clear selection after action
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Orders</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage fulfillment, print slips, and track shipments.</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      {/* Toolbar (Tabs & Filters) */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-900">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSelectedOrders([]); }} // Clear selection on tab change
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
              placeholder="Search by ID or Name..." 
              className="w-full min-w-[250px] rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:focus:border-white"
            />
          </div>
          <button className="flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2.5 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-400 dark:hover:bg-gray-900 transition-colors">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Dynamic Bulk Action Bar */}
      {selectedOrders.length > 0 && (
        <div className="flex items-center justify-between rounded-xl bg-gray-900 px-6 py-3 text-white shadow-lg animate-in fade-in slide-in-from-top-2 dark:bg-white dark:text-gray-900">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold dark:bg-black/10">
              {selectedOrders.length}
            </span>
            <span className="text-sm font-medium">Orders Selected</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-bold">
            <button onClick={() => handleBulkAction("Print Slips")} className="flex items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors dark:hover:bg-black/5">
               <Printer className="h-4 w-4" /> Print Packing Slips
            </button>
            <div className="h-4 w-px bg-gray-600 dark:bg-gray-300"></div>
            <button onClick={() => handleBulkAction("Mark as Shipped")} className="flex items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors dark:hover:bg-black/5">
               <Truck className="h-4 w-4" /> Mark as Shipped
            </button>
          </div>
        </div>
      )}

      {/* Heavy-Duty Orders Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">
                  <input 
                    type="checkbox" 
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black dark:border-gray-600 dark:bg-gray-800"
                  />
                </th>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${selectedOrders.includes(order.id) ? 'bg-gray-50 dark:bg-gray-800/50' : ''}`}
                >
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black dark:border-gray-600 dark:bg-gray-800"
                    />
                  </td>
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
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                    ${order.total.toFixed(2)} <span className="text-xs font-normal text-gray-500">({order.items} items)</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <div className="flex items-center justify-end gap-2">
                       <button className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
                          <Eye className="mr-1 h-3 w-3" /> View
                       </button>
                       <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                       </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
           <p className="text-sm text-gray-500 dark:text-gray-400">
             Showing <span className="font-bold text-gray-900 dark:text-white">1</span> to <span className="font-bold text-gray-900 dark:text-white">{filteredOrders.length}</span> of <span className="font-bold text-gray-900 dark:text-white">{filteredOrders.length}</span> results
           </p>
           <div className="flex items-center gap-2">
             <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-white" disabled>
               <ChevronLeft className="h-4 w-4" />
             </button>
             <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-white">
               <ChevronRight className="h-4 w-4" />
             </button>
           </div>
        </div>

      </div>
    </div>
  );
}