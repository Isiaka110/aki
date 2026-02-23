import Link from "next/link";
import { ArrowUpRight, DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";

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
  { id: "ORD-003", customer: "Amaka Okafor", date: "Yesterday, 1:12 PM", total: "$210.50", status: "Delivered" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
          Welcome back to ThriftElegance
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Here is what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800">
                <stat.icon className="h-5 w-5 text-gray-900 dark:text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-black text-gray-900 dark:text-white">{stat.value}</span>
              <span className={`text-sm font-bold ${stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className=" flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Orders</h2>
          <Link href="/store-admin/orders" className="flex items-center gap-1 text-sm font-bold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            View All <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {recentOrders.map((order) => (
                <tr key={order.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{order.id}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{order.date}</td>
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold
                      ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500' : ''}
                      ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                    `}>
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