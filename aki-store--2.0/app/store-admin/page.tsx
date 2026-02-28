import Link from "next/link";
import { ArrowUpRight, DollarSign, Package, ShoppingCart, TrendingUp, Filter, Clock, Truck, CheckCircle, ShieldAlert } from "lucide-react";

// Dummy data for the initial layout
const stats = [
  { name: "Total Revenue", value: "$4,209.00", change: "+12.5%", icon: DollarSign },
  { name: "Active Orders", value: "12", change: "+4.1%", icon: ShoppingCart },
  { name: "Total Products", value: "48", change: "0%", icon: Package },
  { name: "Store Views", value: "1,204", change: "+24.3%", icon: TrendingUp },
];

const recentOrders = [
  { id: "ORD-001", customer: "Sarah Jenkins", date: "Today, 10:24 AM", total: "$120.00", status: "Pending" },
  { id: "ORD-002", customer: "Michael Chen", date: "Yesterday, 3:45 PM", total: "$85.00", status: "Shipped" },
  { id: "ORD-004", customer: "Chinedu Eze", date: "Yesterday, 1:15 PM", total: "$350.00", status: "Active" },
  { id: "ORD-003", customer: "Amaka Okafor", date: "Yesterday, 1:12 PM", total: "$210.50", status: "Delivered" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Synced System Notice from Super Admin */}
      <div className="border-l-4 border-red-900 bg-red-50 p-4 dark:bg-red-900/10 mb-8 flex items-start gap-4">
        <ShieldAlert className="h-5 w-5 text-red-900 dark:text-red-500 mt-0.5 shrink-0" strokeWidth={1.5} />
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
          Executive summary for ThriftElegance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="flex flex-col border border-gray-200 bg-transparent p-8 transition-colors hover:border-gray-900 dark:border-white/10 dark:hover:border-white">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">{stat.name}</span>
              <div className="flex h-10 w-10 items-center justify-center border border-gray-100 dark:border-white/5">
                <stat.icon className="h-4 w-4 text-gray-900 dark:text-white" strokeWidth={1.5} />
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
          <Link href="/store-admin/orders" className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            View Register <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
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
              {recentOrders.map((order) => (
                <tr key={order.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="px-8 py-5 font-cinzel text-gray-900 dark:text-white uppercase tracking-widest">{order.id}</td>
                  <td className="px-8 py-5 text-gray-600 dark:text-gray-300">{order.customer}</td>
                  <td className="px-8 py-5 text-gray-400">{order.date}</td>
                  <td className="px-8 py-5 font-cinzel text-gray-900 dark:text-white tracking-widest">{order.total}</td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-2 border px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em]
                      ${order.status === 'Active' ? 'border-indigo-200 text-indigo-600 dark:border-indigo-900/50 dark:text-indigo-400' : ''}
                      ${order.status === 'Pending' ? 'border-amber-200 text-amber-600 dark:border-amber-900/50 dark:text-amber-500' : ''}
                      ${order.status === 'Shipped' ? 'border-sky-200 text-sky-600 dark:border-sky-900/50 dark:text-sky-400' : ''}
                      ${order.status === 'Delivered' ? 'border-emerald-200 text-emerald-600 dark:border-emerald-900/50 dark:text-emerald-500' : ''}
                    `}>
                      {order.status === 'Active' && <Filter className="h-3 w-3" strokeWidth={1.5} />}
                      {order.status === 'Pending' && <Clock className="h-3 w-3" strokeWidth={1.5} />}
                      {order.status === 'Shipped' && <Truck className="h-3 w-3" strokeWidth={1.5} />}
                      {order.status === 'Delivered' && <CheckCircle className="h-3 w-3" strokeWidth={1.5} />}
                      {order.status}
                    </span>
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