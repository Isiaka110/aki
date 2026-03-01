
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faIcons, faTruck, faCheckCircle, faClock, faTimes, faChevronRight, faSync } from '@fortawesome/free-solid-svg-icons';
import { apiGetStoreOrders, apiUpdateOrderStatusAdmin } from "../../../services/api";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  total: number;
  status: string;
  items: number;
  itemsList: OrderItem[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [viewedOrder, setViewedOrder] = useState<Order | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const tabs = ["All", "Active", "Pending", "Shipped", "Delivered"];

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await apiGetStoreOrders();
        // Map backend to local structure
        const mappedOrders = data.map((o: any) => ({
          id: o._id,
          customer: o.customerName,
          email: o.customerEmail,
          phone: o.customerPhone || "N/A",
          address: o.customerAddress,
          date: new Date(o.createdAt).toLocaleDateString(),
          total: o.totalAmount,
          status: o.status,
          items: o.items.reduce((acc: number, item: any) => acc + item.quantity, 0),
          itemsList: o.items.map((item: any) => ({ name: item.title, quantity: item.quantity, price: item.price }))
        }));
        setOrders(mappedOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrders();
  }, []);

  // Filter orders based on active tab
  const filteredOrders = orders.filter(o => activeTab === "All" || o.status === activeTab);

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

  const handleBulkAction = async (action: string) => {
    if (action === "Print Slips") {
      window.print();
      setSelectedOrders([]);
      return;
    }

    if (action === "Mark as Shipped") {
      try {
        for (const id of selectedOrders) {
          await apiUpdateOrderStatusAdmin(id, "Shipped");
        }
        // Update local state
        setOrders(orders.map(o => selectedOrders.includes(o.id) ? { ...o, status: "Shipped" } : o));
        setSelectedOrders([]);
      } catch (err) {
        console.error("Failed to update status in bulk");
      }
    }
  };

  const handleChangeStatus = async (orderId: string, newStatus: string) => {
    try {
      await apiUpdateOrderStatusAdmin(orderId, newStatus);
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error("Failed to update status");
    } finally {
      setOpenDropdownId(null);
    }
  };

  const handleExportCSV = () => {
    if (orders.length === 0) return;

    const headers = ["Order ID", "Client Name", "Email", "Phone", "Date", "Status", "Items Count", "Total Value"];
    const csvContent = [
      headers.join(","),
      ...filteredOrders.map(o => `"${o.id}","${o.customer}","${o.email}","${o.phone}","${o.date}","${o.status}",${o.items},${o.total}`)
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Acquisitions_Ledger_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-cinzel text-3xl font-medium tracking-wider text-gray-900 dark:text-white uppercase mb-2">Acquisitions Register</h1>
          <p className="text-sm font-light tracking-wide text-gray-500">Manage fulfillment, client details, and dispatches.</p>
        </div>
        <button onClick={handleExportCSV} className="flex items-center justify-center gap-2 border border-gray-300 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-widest text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-white/20 dark:text-gray-300 dark:hover:border-white dark:hover:text-white">
          <FontAwesomeIcon icon={faIcons} className="h-4 w-4" /> Export Ledger
        </button>
      </div>

      {/* Toolbar (Tabs & Filters) */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSelectedOrders([]); }}
              className={`border px-6 py-2.5 text-[10px] font-semibold uppercase tracking-widest transition-all ${activeTab === tab
                ? "border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-black"
                : "border-gray-200 bg-transparent text-gray-500 hover:border-gray-400 dark:border-white/10 dark:text-gray-400 dark:hover:border-white/40"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID or Name..."
              className="w-full min-w-[250px] border-b border-gray-300 bg-transparent py-2.5 pl-12 pr-4 text-sm font-light tracking-wide focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white"
            />
          </div>
          <button className="flex items-center justify-center border border-gray-300 bg-transparent p-3 text-gray-500 hover:border-gray-900 hover:text-gray-900 dark:border-white/20 dark:text-gray-400 dark:hover:border-white dark:hover:text-white transition-all">
            <FontAwesomeIcon icon={faFilter} className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Dynamic Bulk Action Bar */}
      {selectedOrders.length > 0 && (
        <div className="flex items-center justify-between border border-gray-900 bg-gray-900 px-8 py-4 text-white shadow-lg animate-in fade-in slide-in-from-top-2 dark:border-white dark:bg-white dark:text-gray-900">
          <div className="flex items-center gap-4">
            <span className="font-cinzel text-lg tracking-widest">
              {selectedOrders.length}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Selected</span>
          </div>
          <div className="flex items-center gap-6 text-[10px] font-semibold uppercase tracking-[0.2em]">
            <button onClick={() => handleBulkAction("Print Slips")} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <FontAwesomeIcon icon={faIcons} className="h-4 w-4" /> Print Manifests
            </button>
            <div className="h-4 w-px bg-gray-600 dark:bg-gray-300"></div>
            <button onClick={() => handleBulkAction("Mark as Shipped")} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <FontAwesomeIcon icon={faTruck} className="h-4 w-4" /> Mark Dispatched
            </button>
          </div>
        </div>
      )}

      {/* Heavy-Duty Orders Table */}
      <div className="border border-gray-200 bg-transparent dark:border-white/10 relative">
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-gray-50/50 dark:border-white/5 dark:bg-white/5">
              <tr>
                <th className="px-8 py-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 appearance-none border border-gray-300 checked:bg-gray-900 checked:border-gray-900 dark:border-gray-600 dark:checked:bg-white dark:checked:border-white transition-colors cursor-pointer rounded-none relative
                    before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27white%27%20stroke-width=%273%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3e%3cpolyline%20points=%2720%206%209%2017%204%2012%27/%3e%3c/svg%3e')] before:bg-no-repeat before:bg-center before:bg-[length:12px] opacity-100 checked:before:opacity-100 dark:before:stroke-black"
                  />
                </th>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">Order ID</th>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500 hidden sm:table-cell">Client</th>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500 hidden md:table-cell">Date</th>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">Status</th>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500 hidden sm:table-cell">Total</th>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500 text-right hidden lg:table-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5 font-light tracking-wide text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-gray-500 uppercase tracking-widest text-[10px]">
                    <FontAwesomeIcon icon={faSync} className="h-4 w-4 mx-auto animate-spin mb-2" /> Loading records...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-gray-500 uppercase tracking-widest text-[10px]">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => setViewedOrder(order)}
                    className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer ${selectedOrders.includes(order.id) ? 'bg-gray-50 dark:bg-white/5' : ''}`}
                  >
                    <td className="px-8 py-6 w-12 text-center">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => handleSelectOrder(order.id)}
                        className="h-4 w-4 appearance-none border border-gray-300 checked:bg-gray-900 checked:border-gray-900 dark:border-gray-600 dark:checked:bg-white dark:checked:border-white transition-colors cursor-pointer rounded-none relative
                      before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27white%27%20stroke-width=%273%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3e%3cpolyline%20points=%2720%206%209%2017%204%2012%27/%3e%3c/svg%3e')] before:bg-no-repeat before:bg-center before:bg-[length:12px] opacity-100 checked:before:opacity-100 dark:before:stroke-black"
                      />
                    </td>
                    <td className="px-8 py-6 font-cinzel text-gray-900 dark:text-white uppercase tracking-widest">{order.id}</td>
                    <td className="px-8 py-6 hidden sm:table-cell">
                      <div className="font-medium tracking-wide text-gray-900 dark:text-white">{order.customer}</div>
                      <div className="text-xs text-gray-500 font-light mt-1">{order.email}</div>
                    </td>
                    <td className="px-8 py-6 text-gray-600 dark:text-gray-400 hidden md:table-cell">{order.date}</td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-2 border px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em]
                      ${order.status === 'Active' ? 'border-indigo-200 text-indigo-600 dark:border-indigo-900/50 dark:text-indigo-400' : ''}
                      ${order.status === 'Pending' ? 'border-amber-200 text-amber-600 dark:border-amber-900/50 dark:text-amber-500' : ''}
                      ${order.status === 'Shipped' ? 'border-sky-200 text-sky-600 dark:border-sky-900/50 dark:text-sky-400' : ''}
                      ${order.status === 'Delivered' ? 'border-emerald-200 text-emerald-600 dark:border-emerald-900/50 dark:text-emerald-500' : ''}
                    `}>
                        {order.status === 'Active' && <FontAwesomeIcon icon={faFilter} className="h-3 w-3" />}
                        {order.status === 'Pending' && <FontAwesomeIcon icon={faClock} className="h-3 w-3" />}
                        {order.status === 'Shipped' && <FontAwesomeIcon icon={faTruck} className="h-3 w-3" />}
                        {order.status === 'Delivered' && <FontAwesomeIcon icon={faCheckCircle} className="h-3 w-3" />}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 hidden sm:table-cell">
                      <span className="font-cinzel text-gray-900 dark:text-white tracking-widest">${order.total.toFixed(2)}</span>
                      <span className="text-xs font-light text-gray-500 ml-2">({order.items} pieces)</span>
                    </td>
                    <td className="px-8 py-6 text-right relative hidden lg:table-cell">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={(e) => { e.stopPropagation(); setViewedOrder(order); }}
                          className="inline-flex items-center justify-center border border-gray-300 bg-transparent px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-700 hover:border-gray-900 hover:text-gray-900 dark:border-white/20 dark:text-gray-300 dark:hover:border-white dark:hover:text-white transition-colors"
                        >
                          <FontAwesomeIcon icon={faIcons} className="mr-2 h-3 w-3" /> View
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setOpenDropdownId(openDropdownId === order.id ? null : order.id); }}
                          className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          <FontAwesomeIcon icon={faIcons} className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Status Change Dropdown */}
                      {openDropdownId === order.id && (
                        <div className="absolute right-8 top-16 z-10 w-48 border border-gray-200 bg-[#fcfcfc] dark:border-white/10 dark:bg-[#050505] shadow-xl animate-in fade-in slide-in-from-top-2">
                          <div className="border-b border-gray-100 dark:border-white/5 py-2 px-4 text-left">
                            <span className="text-[9px] font-semibold uppercase tracking-widest text-gray-400">Update Status</span>
                          </div>
                          <div className="py-2 flex flex-col">
                            {["Active", "Pending", "Shipped", "Delivered"].map(statusOption => (
                              <button
                                key={statusOption}
                                onClick={(e) => { e.stopPropagation(); handleChangeStatus(order.id, statusOption); }}
                                disabled={order.status === statusOption}
                                className={`px-4 py-3 text-left text-xs tracking-wide transition-colors ${order.status === statusOption ? "text-gray-300 dark:text-gray-700 cursor-not-allowed" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"}`}
                              >
                                Mark as {statusOption}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                )))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Cards */}
        <div className="lg:hidden flex flex-col divide-y divide-gray-100 dark:divide-white/5">
          {isLoading ? (
            <div className="p-12 text-center text-gray-500 uppercase tracking-widest text-[10px]">
              <FontAwesomeIcon icon={faSync} className="h-4 w-4 mx-auto animate-spin mb-2 block" /> Loading records...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-12 text-center text-gray-500 uppercase tracking-widest text-[10px]">
              No orders found.
            </div>
          ) : filteredOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => setViewedOrder(order)}
              className={`p-6 transition-colors hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer flex flex-col gap-4 ${selectedOrders.includes(order.id) ? 'bg-gray-50 dark:bg-white/5' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => handleSelectOrder(order.id)}
                    className="h-4 w-4 appearance-none border border-gray-300 checked:bg-gray-900 checked:border-gray-900 dark:border-gray-600 dark:checked:bg-white dark:checked:border-white transition-colors cursor-pointer rounded-none relative
                    before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27white%27%20stroke-width=%273%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3e%3cpolyline%20points=%2720%206%209%2017%204%2012%27/%3e%3c/svg%3e')] before:bg-no-repeat before:bg-center before:bg-[length:12px] opacity-100 checked:before:opacity-100 dark:before:stroke-black"
                  />
                  <div>
                    <h3 className="font-cinzel text-gray-900 dark:text-white uppercase tracking-widest">{order.id}</h3>
                    <p className="text-[10px] text-gray-500">{order.date}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 border px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.2em]
                  ${order.status === 'Active' ? 'border-indigo-200 text-indigo-600 dark:border-indigo-900/50 dark:text-indigo-400' : ''}
                  ${order.status === 'Pending' ? 'border-amber-200 text-amber-600 dark:border-amber-900/50 dark:text-amber-500' : ''}
                  ${order.status === 'Shipped' ? 'border-sky-200 text-sky-600 dark:border-sky-900/50 dark:text-sky-400' : ''}
                  ${order.status === 'Delivered' ? 'border-emerald-200 text-emerald-600 dark:border-emerald-900/50 dark:text-emerald-500' : ''}
                `}>
                  {order.status}
                </span>
              </div>

              <div className="flex flex-col gap-1 border-t border-gray-100 dark:border-white/5 pt-4">
                <span className="font-medium tracking-wide text-gray-900 dark:text-white">{order.customer}</span>
                <span className="text-xs text-gray-500 max-w-[250px] truncate">{order.email}</span>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-4">
                <div className="flex flex-col">
                  <span className="font-cinzel text-gray-900 dark:text-white tracking-widest">${order.total.toFixed(2)}</span>
                  <span className="text-[10px] text-gray-500">{order.items} pieces</span>
                </div>
                <div className="flex justify-end gap-2 relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); setViewedOrder(order); }}
                    className="inline-flex items-center justify-center border border-gray-300 bg-transparent px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-700 hover:border-gray-900 hover:text-gray-900 dark:border-white/20 dark:text-gray-300 dark:hover:border-white dark:hover:text-white transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setOpenDropdownId(openDropdownId === order.id ? null : order.id); }}
                    className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors border border-transparent"
                  >
                    <FontAwesomeIcon icon={faIcons} className="h-4 w-4" />
                  </button>
                  {openDropdownId === order.id && (
                    <div className="absolute right-0 top-10 z-[80] w-48 border border-gray-200 bg-[#fcfcfc] dark:border-white/10 dark:bg-[#050505] shadow-xl animate-in fade-in slide-in-from-top-2 cursor-auto" onClick={(e) => e.stopPropagation()}>
                      <div className="border-b border-gray-100 dark:border-white/5 py-2 px-4 text-left">
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-gray-400">Update Status</span>
                      </div>
                      <div className="py-2 flex flex-col">
                        {["Active", "Pending", "Shipped", "Delivered"].map(statusOption => (
                          <button
                            key={statusOption}
                            onClick={(e) => { e.stopPropagation(); handleChangeStatus(order.id, statusOption); }}
                            disabled={order.status === statusOption}
                            className={`px-4 py-3 text-left text-xs tracking-wide transition-colors ${order.status === statusOption ? "text-gray-300 dark:text-gray-700 cursor-not-allowed" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"}`}
                          >
                            Mark as {statusOption}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-transparent px-8 py-6 dark:border-white/10">
          <p className="text-xs font-light tracking-wide text-gray-500">
            Showing <span className="font-cinzel tracking-widest text-gray-900 dark:text-white">1</span> to <span className="font-cinzel tracking-widest text-gray-900 dark:text-white">{filteredOrders.length}</span> of <span className="font-cinzel tracking-widest text-gray-900 dark:text-white">{filteredOrders.length}</span> records
          </p>
          <div className="flex items-center gap-4">
            <button className="flex h-10 w-10 items-center justify-center border border-gray-300 text-gray-400 hover:border-gray-900 hover:text-gray-900 disabled:opacity-30 dark:border-gray-700 dark:hover:border-white dark:hover:text-white transition-colors" disabled>
              <FontAwesomeIcon icon={faIcons} className="h-4 w-4" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center border border-gray-300 text-gray-400 hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:hover:border-white dark:hover:text-white transition-colors">
              <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Order Details Drawer */}
      <>
        {/* Backdrop */}
        {viewedOrder && (
          <div
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => setViewedOrder(null)}
          />
        )}

        {/* Sliding Panel */}
        <div
          className={`fixed inset-y-0 right-0 z-[70] w-full sm:w-[500px] border-l border-gray-200 bg-[#fcfcfc] dark:border-white/10 dark:bg-[#050505] shadow-2xl transition-transform duration-500 ease-in-out flex flex-col ${viewedOrder ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {viewedOrder && (
            <>
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 p-6 sm:p-8 shrink-0">
                <div>
                  <h2 className="font-cinzel text-xl font-medium tracking-widest text-gray-900 dark:text-white uppercase mb-1">
                    Order Details
                  </h2>
                  <p className="text-xs font-light tracking-wide text-gray-500">
                    {viewedOrder.id} • {viewedOrder.date}
                  </p>
                </div>
                <button
                  onClick={() => setViewedOrder(null)}
                  className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 space-y-10">
                <div>
                  <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 mb-4 border-b border-gray-200 dark:border-white/10 pb-2">Client Information</h3>
                  <div className="space-y-4 font-light tracking-wide text-sm text-gray-700 dark:text-gray-300">
                    <div>
                      <span className="block text-gray-400 text-xs mb-1">Name</span>
                      {viewedOrder.customer}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="block text-gray-400 text-xs mb-1">Email</span>
                        <div className="truncate" title={viewedOrder.email}>{viewedOrder.email}</div>
                      </div>
                      <div>
                        <span className="block text-gray-400 text-xs mb-1">Phone</span>
                        <div className="truncate" title={viewedOrder.phone}>{viewedOrder.phone}</div>
                      </div>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-xs mb-1">Shipping Destination</span>
                      <div className="leading-relaxed">{viewedOrder.address}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 mb-4 border-b border-gray-200 dark:border-white/10 pb-2">Acquisition Summary</h3>
                  <div className="space-y-4 font-light tracking-wide text-sm text-gray-700 dark:text-gray-300">
                    <div>
                      <span className="block text-gray-400 text-xs mb-1">Status</span>
                      <span className="uppercase tracking-widest font-semibold">{viewedOrder.status}</span>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-xs mb-1">Total Valuation</span>
                      <span className="font-cinzel text-xl text-gray-900 dark:text-white tracking-widest">${viewedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 mb-4 border-b border-gray-200 dark:border-white/10 pb-2">Pieces</h3>
                  <div className="space-y-4">
                    {viewedOrder.itemsList.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between font-light tracking-wide text-sm border-b border-gray-100 dark:border-white/5 pb-4 last:border-0 last:pb-0">
                        <div className="flex flex-col">
                          <span className="text-gray-900 dark:text-white">{item.name}</span>
                          <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                        </div>
                        <span className="font-cinzel tracking-widest text-gray-900 dark:text-white">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="border-t border-gray-200 dark:border-white/10 p-6 sm:p-8 shrink-0">
                <button
                  onClick={() => window.print()}
                  className="w-full flex justify-center items-center gap-3 border border-gray-900 bg-gray-900 py-4 text-xs font-semibold uppercase tracking-widest text-white hover:bg-transparent hover:text-gray-900 transition-colors dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
                >
                  <FontAwesomeIcon icon={faIcons} className="h-4 w-4" /> Download Manifest
                </button>
              </div>
            </>
          )}
        </div>
      </>
    </div>
  );
}