import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIcons, faDollarSign, faBox, faShoppingCart, faArrowTrendUp, faFilter, faClock, faTruck, faCheckCircle, faExclamationTriangle, faSync, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { apiGetStoreAdminOverview, apiVerifyIdentity } from "../../services/api";
import Tooltip from "../../components/Tooltip";

export default function DashboardOverview() {
  const [statsData, setStatsData] = useState({
    storeName: "Your Store",
    slug: "",
    totalRevenue: 0,
    activeOrders: 0,
    totalProducts: 0,
    storeViews: 0,
    status: "Active",
    verificationStatus: "Pending",
    noticeBanner: "",
    nin: "" as string | undefined
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [verifForm, setVerifForm] = useState({ nin: '', verificationDocumentType: 'NIN', cacNumber: '' });
  const [verifError, setVerifError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    async function fetchOverview() {
      try {
        const data = await apiGetStoreAdminOverview();
        if (data) {
          setStatsData({
            storeName: data.storeName || "Your Store",
            slug: data.slug || "",
            totalRevenue: data.totalRevenue || 0,
            activeOrders: data.activeOrders || 0,
            totalProducts: data.totalProducts || 0,
            storeViews: data.storeViews || 0,
            status: data.status,
            verificationStatus: data.verificationStatus,
            noticeBanner: data.noticeBanner,
            nin: data.nin
          });
          setRecentOrders(data.recentOrders || []);
          if (!data.nin || data.nin.trim() === '') {
            setIsVerificationModalOpen(true);
          }
        }
      } catch (err) {
        console.error("Failed to load overview data", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOverview();
  }, []);

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifError('');

    if (verifForm.verificationDocumentType === 'NIN' && verifForm.nin.length !== 11) {
      return setVerifError('Invalid NIN. Must be exactly 11 digits.');
    }
    if (verifForm.verificationDocumentType === 'DriversLicense' && verifForm.nin.length < 5) {
      return setVerifError('Invalid Driver\'s License Number.');
    }

    setIsVerifying(true);
    try {
      await apiVerifyIdentity(verifForm);
      setIsVerificationModalOpen(false);
      setStatsData(prev => ({ ...prev, nin: verifForm.nin, verificationStatus: "Pending" }));
    } catch (err: any) {
      setVerifError(err.response?.data?.error || 'Verification submission failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const stats = [
    { name: "Total Revenue", value: `$${statsData.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, change: "+0.0%", icon: faDollarSign },
    { name: "Active Orders", value: statsData.activeOrders.toString(), change: "0%", icon: faShoppingCart },
    { name: "Total Products", value: statsData.totalProducts.toString(), change: "0%", icon: faBox },
    { name: "Store Views", value: statsData.storeViews.toLocaleString(), change: "0%", icon: faArrowTrendUp },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Synced System Notice from Super Admin */}
      {statsData.noticeBanner && (
        <div className="border-l-4 border-red-900 bg-red-50 p-6 dark:bg-red-900/10 mb-8 flex items-start gap-4 animate-in slide-in-from-top-4 duration-500">
          <FontAwesomeIcon icon={faExclamationTriangle} className="h-5 w-5 text-red-900 dark:text-red-500 mt-0.5 shrink-0" />
          <div className="flex-1">
            <h3 className="font-cinzel text-xs font-bold tracking-widest text-red-900 dark:text-red-500 uppercase flex items-center gap-3 mb-2">
              Platform Notice
              <span className="text-[9px] bg-red-200 dark:bg-red-900/50 px-2 py-0.5 rounded-none tracking-[0.2em]">Action Required</span>
            </h3>
            <p className="text-xs font-light tracking-wide text-red-800 dark:text-red-400 leading-relaxed max-w-2xl text-justify">
              {statsData.noticeBanner}
            </p>
          </div>
        </div>
      )}

      {/* Verification Status Banner */}
      {statsData.verificationStatus !== "Verified" && (
        <div className={`border p-4 mb-8 flex items-center justify-between gap-4 ${!statsData.nin
          ? 'border-red-200 bg-red-50/30 dark:border-red-900/20 dark:bg-red-950/10'
          : 'border-orange-200 bg-orange-50/30 dark:border-orange-900/20 dark:bg-orange-950/10'
          }`}>
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faClock} className={`h-4 w-4 ${!statsData.nin ? 'text-red-600' : 'text-orange-600'}`} />
            <p className={`text-[10px] font-semibold uppercase tracking-widest ${!statsData.nin ? 'text-red-700 dark:text-red-400' : 'text-orange-700 dark:text-orange-400'}`}>
              {!statsData.nin
                ? 'Identity Not Submitted — Products & Categories Locked'
                : 'Verification Pending • Super Admin Audit In Progress (Est. 24hrs)'}
            </p>
            <Tooltip
              text={!statsData.nin
                ? "Submit your NIN or Driver's License to unlock product & category creation. Click 'Verify Now' to complete."
                : "Your documents are under review. Once approved by the Super Admin within 24 hours, all platform features will be unlocked."}
              position="bottom"
            />
          </div>
          {!statsData.nin ? (
            <button
              onClick={() => setIsVerificationModalOpen(true)}
              className="text-[9px] font-bold uppercase tracking-widest text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700 px-3 py-1.5 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-colors whitespace-nowrap"
            >
              Verify Now
            </button>
          ) : (
            <Link to="/store-admin/settings" className="text-[9px] font-bold uppercase tracking-widest underline underline-offset-4 hover:opacity-70 text-orange-700 dark:text-orange-400 whitespace-nowrap">Review Profile</Link>
          )}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-cinzel text-4xl font-medium tracking-wider text-gray-900 dark:text-white uppercase mb-3 leading-none">
            Store Overview
          </h1>
          <p className="text-sm font-light tracking-wide text-gray-500">
            Summary for <span className="text-gray-900 dark:text-white font-medium">{statsData.storeName}</span>.
          </p>
        </div>
        <Link
          to={statsData.slug ? `/${statsData.slug}` : '/'}
          target="_blank"
          rel="noopener noreferrer"
          title="Visit your public storefront"
          className="border border-gray-900 bg-gray-900 px-8 py-3 text-[10px] font-bold tracking-[0.3em] uppercase text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
        >
          View My Store
        </Link>
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
      {/* Identity Verification Pop-up Modal */}
      {isVerificationModalOpen && (
        <>
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" />
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="w-full max-w-lg border border-gray-200 bg-[#fcfcfc] dark:border-white/10 dark:bg-[#050505] shadow-2xl animate-in fade-in slide-in-from-bottom-4 relative">
              <div className="border-b border-gray-200 dark:border-white/10 p-6">
                <h2 className="font-cinzel text-xl font-medium tracking-widest text-gray-900 dark:text-white uppercase mb-2">
                  Identity Verification Required
                </h2>
                <p className="text-xs font-light tracking-wide text-gray-500 leading-relaxed">
                  To assure platform integrity and unlock public cataloging, please finalize your identification suite.
                </p>
              </div>

              <div className="p-6">
                {verifError && (
                  <div className="mb-6 border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-xs font-light tracking-wide text-red-700 dark:text-red-400 animate-shake">
                    {verifError}
                  </div>
                )}

                <form onSubmit={handleVerificationSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mt-2">
                      Primary Documentation
                      <Tooltip text="Choose your identity document type. NIN is a unique 11-digit national identifier. Driver's License is a government-issued driving permit (must be issued within the last 3 years)." />
                    </span>
                    <div className="flex gap-4">
                      <select
                        value={verifForm.verificationDocumentType}
                        onChange={(e) => setVerifForm({ ...verifForm, verificationDocumentType: e.target.value })}
                        className="w-1/3 border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors"
                      >
                        <option value="NIN" className="bg-white dark:bg-black">NIN</option>
                        <option value="DriversLicense" className="bg-white dark:bg-black">Driver's License</option>
                      </select>
                      <div className="relative w-2/3">
                        <input type="text" required value={verifForm.nin} onChange={(e) => setVerifForm({ ...verifForm, nin: verifForm.verificationDocumentType === 'NIN' ? e.target.value.replace(/\D/g, '').slice(0, 11) : e.target.value })}
                          placeholder={verifForm.verificationDocumentType === 'NIN' ? "11-Digit Code" : "License Number"} autoComplete="off"
                          className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors tracking-wide font-light placeholder-gray-400" />
                      </div>
                    </div>
                    <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mt-4">
                      Corporate Documentation (Optional)
                      <Tooltip text="CAC stands for Corporate Affairs Commission. Enter your registered business number if you own a registered Nigerian business. This is optional." />
                    </span>
                    <input type="text" value={verifForm.cacNumber} onChange={(e) => setVerifForm({ ...verifForm, cacNumber: e.target.value })} placeholder="CAC Registration Number" autoComplete="off"
                      className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors tracking-wide font-light placeholder-gray-400" />
                  </div>

                  <div className="pt-4 space-y-4">
                    <div className="bg-gray-50 dark:bg-white/5 p-4 text-[10px] text-gray-500 leading-relaxed text-justify h-24 overflow-y-auto custom-scrollbar">
                      <strong>Terms of Data Collection:</strong> By submitting this information, you agree to AKI Platform's Global Data Use Act. Your sensitive identification metrics are processed via an encrypted layer, exclusively utilized for KYC (Know Your Customer) policies, and purged from local memory after Super Admin authorization over a 24-hr period. We operate under rigorous international surveillance acts.
                    </div>
                    <div className="flex gap-4">
                      <button type="submit" disabled={isVerifying} className="flex-1 border border-gray-900 bg-gray-900 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white disabled:opacity-50 flex justify-center items-center">
                        {isVerifying ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : "Verify Identity"}
                      </button>
                      <button type="button" onClick={() => setIsVerificationModalOpen(false)} className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:opacity-70 transition-opacity">
                        Maybe Later
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}