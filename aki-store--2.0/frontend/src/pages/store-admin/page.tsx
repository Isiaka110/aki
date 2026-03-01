import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIcons, faDollarSign, faBox, faShoppingCart, faArrowTrendUp, faFilter, faClock, faTruck, faCheckCircle, faExclamationTriangle, faSync, faTimes } from '@fortawesome/free-solid-svg-icons';
import { apiGetStoreAdminOverview } from "../../services/api";

export default function DashboardOverview() {
  const [statsData, setStatsData] = useState({
    storeName: "Your Store",
    totalRevenue: 0,
    activeOrders: 0,
    totalProducts: 0,
    storeViews: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  useEffect(() => {
    async function fetchOverview() {
      try {
        const data = await apiGetStoreAdminOverview();
        if (data) {
          setStatsData({
            storeName: data.storeName || "Your Store",
            totalRevenue: data.totalRevenue || 0,
            activeOrders: data.activeOrders || 0,
            totalProducts: data.totalProducts || 0,
            storeViews: data.storeViews || 0,
          });
          setRecentOrders(data.recentOrders || []);
        }
      } catch (err) {
        console.error("Failed to load overview data", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOverview();
  }, []);

  const stats = [
    { name: "Total Revenue", value: `$${statsData.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, change: "+0.0%", icon: faDollarSign },
    { name: "Active Orders", value: statsData.activeOrders.toString(), change: "0%", icon: faShoppingCart },
    { name: "Total Products", value: statsData.totalProducts.toString(), change: "0%", icon: faBox },
    { name: "Store Views", value: statsData.storeViews.toLocaleString(), change: "0%", icon: faArrowTrendUp },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Synced System Notice from Super Admin */}
      <div className="border-l-4 border-red-900 bg-red-50 p-4 dark:bg-red-900/10 mb-8 flex items-start gap-4">
        <FontAwesomeIcon icon={faExclamationTriangle} className="h-5 w-5 text-red-900 dark:text-red-500 mt-0.5 shrink-0" />
        <div>
          <h3 className="font-cinzel text-sm font-bold tracking-widest text-red-900 dark:text-red-500 uppercase flex items-center gap-2">System Notice <span className="text-[10px] bg-red-200 dark:bg-red-900/50 px-2 py-0.5 rounded-sm">From AKI Core</span></h3>
          <p className="mt-1 text-xs font-light tracking-wide text-red-800 dark:text-red-400">
            Mandatory API rotation scheduled for Oct 30, 2026. Please verify your payment routing configurations to avoid disruption in Stripe payouts.
          </p>
        </div>
      </div>

      {/* Header */}
      <div>
        <h1 className="font-cinzel text-3xl font-medium tracking-wider text-gray-900 dark:text-white uppercase mb-4">
          Atelier Overview
        </h1>
        <p className="text-sm font-light tracking-wide text-gray-500">
          Executive summary for {statsData.storeName}.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="flex flex-col border border-gray-200 bg-transparent p-8 transition-colors hover:border-gray-900 dark:border-white/10 dark:hover:border-white">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">{stat.name}</span>
              <div className="flex h-10 w-10 items-center justify-center border border-gray-100 dark:border-white/5">
                <FontAwesomeIcon icon={stat.icon} className="h-4 w-4 text-gray-900 dark:text-white" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="font-cinzel text-3xl text-gray-900 dark:text-white tracking-widest">{stat.value}</span>
              <span className={`text-[10px] font-bold tracking-widest ${stat.change.startsWith('+') ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="border border-gray-200 bg-transparent dark:border-white/10">
        <div className="flex items-center justify-between border-b border-gray-200 px-8 py-6 dark:border-white/10">
          <h2 className="font-cinzel text-lg tracking-widest uppercase text-gray-900 dark:text-white">Recent Acquisitions</h2>
          <Link to="/store-admin/orders" className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            View Register <FontAwesomeIcon icon={faIcons} className="h-3 w-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          {/* Desktop Table View */}
          <table className="hidden md:table w-full text-left">
            <thead className="border-b border-gray-100 bg-gray-50/50 dark:border-white/5 dark:bg-white/5">
              <tr>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">Order ID</th>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">Client</th>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">Time</th>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">Value</th>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-sm font-light tracking-wide">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500 uppercase tracking-widest text-[10px]">
                    <FontAwesomeIcon icon={faSync} className="h-4 w-4 mx-auto animate-spin mb-2" /> Loading records...
                  </td>
                </tr>
              ) : recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500 uppercase tracking-widest text-[10px]">
                    No recent orders found.
                  </td>
                </tr>
              ) : recentOrders.map((order) => (
                <tr key={order.id} onClick={() => setSelectedOrder(order)} className="transition-colors hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
                  <td className="px-8 py-5 font-cinzel text-gray-900 dark:text-white uppercase tracking-widest">{order.id}</td>
                  <td className="px-8 py-5 text-gray-600 dark:text-gray-300">{order.customerName}</td>
                  <td className="px-8 py-5 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-8 py-5 font-cinzel text-gray-900 dark:text-white tracking-widest">${order.totalAmount?.toLocaleString()}</td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-2 border px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em]
                      ${order.status === 'Active' ? 'border-indigo-200 text-indigo-600 dark:border-indigo-900/50 dark:text-indigo-400' : ''}
                      ${order.status === 'Pending' ? 'border-amber-200 text-amber-600 dark:border-amber-900/50 dark:text-amber-500' : ''}
                      ${order.status === 'Shipped' ? 'border-sky-200 text-sky-600 dark:border-sky-900/50 dark:text-sky-400' : ''}
                      ${order.status === 'Delivered' ? 'border-emerald-200 text-emerald-600 dark:border-emerald-900/50 dark:text-emerald-500' : ''}
                      ${!['Active', 'Pending', 'Shipped', 'Delivered'].includes(order.status) ? 'border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-400' : ''}
                    `}>
                      {order.status === 'Active' && <FontAwesomeIcon icon={faFilter} className="h-3 w-3" />}
                      {order.status === 'Pending' && <FontAwesomeIcon icon={faClock} className="h-3 w-3" />}
                      {order.status === 'Shipped' && <FontAwesomeIcon icon={faTruck} className="h-3 w-3" />}
                      {order.status === 'Delivered' && <FontAwesomeIcon icon={faCheckCircle} className="h-3 w-3" />}
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 md:hidden divide-y divide-gray-100 dark:divide-white/5">
            {isLoading ? (
              <div className="p-12 text-center text-gray-500 uppercase tracking-widest text-[10px]">
                <FontAwesomeIcon icon={faSync} className="h-4 w-4 mx-auto animate-spin mb-2" /> Loading records...
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="p-12 text-center text-gray-500 uppercase tracking-widest text-[10px]">
                No recent orders found.
              </div>
            ) : recentOrders.map((order) => (
              <div key={order.id} onClick={() => setSelectedOrder(order)} className="p-6 transition-colors hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-cinzel text-gray-900 dark:text-white uppercase tracking-widest text-lg">{order.id}</span>
                    <span className="block text-gray-600 dark:text-gray-300 text-sm mt-1">{order.customerName}</span>
                  </div>
                  <span className={`inline-flex items-center gap-2 border px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em]
                      ${order.status === 'Active' ? 'border-indigo-200 text-indigo-600 dark:border-indigo-900/50 dark:text-indigo-400' : ''}
                      ${order.status === 'Pending' ? 'border-amber-200 text-amber-600 dark:border-amber-900/50 dark:text-amber-500' : ''}
                      ${order.status === 'Shipped' ? 'border-sky-200 text-sky-600 dark:border-sky-900/50 dark:text-sky-400' : ''}
                      ${order.status === 'Delivered' ? 'border-emerald-200 text-emerald-600 dark:border-emerald-900/50 dark:text-emerald-500' : ''}
                      ${!['Active', 'Pending', 'Shipped', 'Delivered'].includes(order.status) ? 'border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-400' : ''}
                    `}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-end border-t border-gray-100 dark:border-white/5 pt-4">
                  <span className="text-gray-400 text-xs font-light">{new Date(order.createdAt).toLocaleDateString()}</span>
                  <span className="font-cinzel text-gray-900 dark:text-white tracking-widest">${order.totalAmount?.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-[#fcfcfc] dark:bg-[#050505] shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-gray-200 dark:border-white/10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 block mb-1">Order Summary</span>
                  <h3 className="font-cinzel text-2xl font-medium tracking-widest text-gray-900 dark:text-white uppercase">{selectedOrder.id}</h3>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 text-sm font-light">
                <div className="flex justify-between">
                  <span className="text-gray-500">Client</span>
                  <span className="text-gray-900 dark:text-white font-medium">{selectedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="text-gray-900 dark:text-white">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="text-gray-900 dark:text-white">{selectedOrder.status}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-white/10 mt-4">
                  <span className="text-gray-500 uppercase tracking-widest text-[10px] font-semibold self-center">Total Value</span>
                  <span className="font-cinzel text-xl text-gray-900 dark:text-white tracking-widest">${selectedOrder.totalAmount?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 p-8">
              <button onClick={() => setSelectedOrder(null)} className="w-full border border-gray-300 dark:border-gray-700 py-3 text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:border-gray-900 hover:text-gray-900 dark:hover:border-white dark:hover:text-white transition-colors">
                Close View
              </button>
              <Link to="/store-admin/orders" className="w-full border border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-black py-3 text-xs font-semibold uppercase tracking-widest hover:bg-transparent hover:text-gray-900 dark:hover:bg-transparent dark:hover:text-white transition-colors flex items-center justify-center">
                Manage Order
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}