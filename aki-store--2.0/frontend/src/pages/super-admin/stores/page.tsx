

import { useState, useEffect } from "react";
import { apiGetAllStores, apiUpdateStoreIntegrity } from "../../../services/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStore, faExclamationTriangle, faCheckCircle, faBan, faExternalLinkAlt, faTimes, faSync } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export default function StoresIntegrityPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStore, setSelectedStore] = useState<any>(null);
    const [isApproveOpen, setIsApproveOpen] = useState(false);
    const [isSuspendOpen, setIsSuspendOpen] = useState(false);
    const [stores, setStores] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchStores = async () => {
        try {
            const data = await apiGetAllStores();
            if (data) setStores(data);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStores();
    }, []);

    const handleStatusUpdate = async (storeId: string, status: string, riskScore?: string) => {
        try {
            await apiUpdateStoreIntegrity({ storeId, status, riskScore });
            fetchStores();
            setIsApproveOpen(false);
            setIsSuspendOpen(false);
        } catch (e) {
            console.error("Failed to update store");
        }
    };

    const filteredStores = stores.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.storeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'text-green-600 dark:text-green-500 border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/10';
            case 'Pending': return 'text-yellow-600 dark:text-yellow-500 border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-900/10';
            case 'Flagged': return 'text-orange-600 dark:text-orange-500 border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-900/10';
            case 'Suspended': return 'text-red-600 dark:text-red-500 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10';
            default: return 'text-gray-600 dark:text-gray-400 border-gray-200';
        }
    };

    return (
        <div className="max-w-7xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="font-cinzel text-3xl font-medium tracking-wider text-gray-900 dark:text-white uppercase mb-2">Stores Integrity</h1>
                    <p className="text-sm font-light tracking-wide text-gray-500">Audit, approve, or sanction store environments across the platform.</p>
                </div>
            </div>

            <div className="border border-gray-200 bg-transparent dark:border-white/10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-b border-gray-200 dark:border-white/10">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search by store name, ID, or owner email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-gray-300 bg-gray-50 px-4 py-3 pl-11 text-xs tracking-wide focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-white"
                        />
                        <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-3 h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex gap-2">
                        <button className="border border-gray-200 px-4 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-600 hover:border-gray-900 dark:border-white/10 dark:text-gray-400 dark:hover:border-white transition-colors">
                            Filter by Risk
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-gray-900/50">
                            <tr>
                                <th className="p-6 text-[10px] font-semibold uppercase tracking-widest text-gray-500">Store / Owner</th>
                                <th className="p-6 text-[10px] font-semibold uppercase tracking-widest text-gray-500">LTV Revenue</th>
                                <th className="p-6 text-[10px] font-semibold uppercase tracking-widest text-gray-500">Risk Profile</th>
                                <th className="p-6 text-[10px] font-semibold uppercase tracking-widest text-gray-500">Status</th>
                                <th className="p-6 text-right text-[10px] font-semibold uppercase tracking-widest text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-500 uppercase tracking-widest text-[10px]">
                                        <FontAwesomeIcon icon={faSync} className="h-4 w-4 mx-auto animate-spin mb-2" /> Loading records...
                                    </td>
                                </tr>
                            ) : filteredStores.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-500 uppercase tracking-widest text-[10px]">
                                        No stores found.
                                    </td>
                                </tr>
                            ) : filteredStores.map((store) => (
                                <tr key={store.storeId} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center border border-gray-200 dark:border-white/10 bg-white dark:bg-black">
                                                <FontAwesomeIcon icon={faStore} className="h-4 w-4 text-gray-500" />
                                            </div>
                                            <div>
                                                <p className="font-cinzel font-semibold tracking-wider text-gray-900 dark:text-white uppercase">{store.name}</p>
                                                <p className="text-[10px] text-gray-500 tracking-widest">{store.ownerName} • {store.storeId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 font-cinzel tracking-wider text-gray-900 dark:text-white">${store.revenue?.toLocaleString() || 0}</td>
                                    <td className="p-6">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${store.riskScore === 'Low' ? 'text-gray-500' : store.riskScore === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>
                                            {store.riskScore}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <span className={`inline-flex items-center border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${getStatusColor(store.status)}`}>
                                            {store.status}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            {store.status === 'Pending' && (
                                                <button
                                                    onClick={() => { setSelectedStore(store); setIsApproveOpen(true); }}
                                                    className="text-green-600 hover:text-green-800 transition-colors"
                                                    title="Approve Store"
                                                >
                                                    <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4" />
                                                </button>
                                            )}
                                            {store.status !== 'Suspended' && (
                                                <button
                                                    onClick={() => { setSelectedStore(store); setIsSuspendOpen(true); }}
                                                    className="text-red-600 hover:text-red-800 transition-colors"
                                                    title="Suspend Store"
                                                >
                                                    <FontAwesomeIcon icon={faBan} className="h-4 w-4" />
                                                </button>
                                            )}
                                            <Link to={`/${store.storeId}`} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" title="View Storefront">
                                                <FontAwesomeIcon icon={faExternalLinkAlt} className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Approve Modal */}
            {isApproveOpen && selectedStore && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <div className="w-full max-w-md bg-[#fcfcfc] dark:bg-[#050505] border border-gray-200 dark:border-white/10 p-8 relative">
                        <button onClick={() => setIsApproveOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                        </button>
                        <h2 className="font-cinzel text-2xl tracking-wider text-gray-900 dark:text-white uppercase mb-4">Approve Store</h2>
                        <p className="text-sm font-light text-gray-500 mb-8">
                            Are you sure you want to approve <span className="font-semibold text-gray-900 dark:text-white">{selectedStore.name}</span>? They will gain full access to the vendor platform and their storefront will become public.
                        </p>
                        <div className="flex gap-4">
                            <button onClick={() => setIsApproveOpen(false)} className="flex-1 border border-gray-200 py-3 text-xs font-semibold uppercase tracking-widest text-gray-600 hover:border-gray-900 dark:border-white/10 dark:text-gray-400 dark:hover:border-white transition-colors">
                                Cancel
                            </button>
                            <button onClick={() => handleStatusUpdate(selectedStore.storeId, "Active")} className="flex-1 border border-green-900 bg-green-900 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-green-900 dark:hover:text-green-500">
                                Confirm Approval
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Suspend Modal */}
            {isSuspendOpen && selectedStore && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <div className="w-full max-w-md bg-[#fcfcfc] dark:bg-[#050505] border border-gray-200 dark:border-white/10 p-8 relative">
                        <button onClick={() => setIsSuspendOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                        </button>
                        <h2 className="font-cinzel text-2xl tracking-wider text-red-600 dark:text-red-500 uppercase mb-4 flex items-center gap-3">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="h-6 w-6" /> Suspend Store
                        </h2>
                        <p className="text-sm font-light text-gray-500 mb-2">
                            You are about to suspend <span className="font-semibold text-gray-900 dark:text-white">{selectedStore.name}</span>.
                        </p>
                        <textarea
                            className="w-full border border-gray-200 dark:border-white/10 bg-transparent p-3 text-sm focus:border-red-900 focus:outline-none dark:text-white dark:focus:border-red-500 transition-colors mt-4 mb-8 resize-none font-light"
                            rows={3}
                            placeholder="Reason for suspension..."
                        />
                        <div className="flex gap-4">
                            <button onClick={() => setIsSuspendOpen(false)} className="flex-1 border border-gray-200 py-3 text-xs font-semibold uppercase tracking-widest text-gray-600 hover:border-gray-900 dark:border-white/10 dark:text-gray-400 dark:hover:border-white transition-colors">
                                Cancel
                            </button>
                            <button onClick={() => handleStatusUpdate(selectedStore.storeId, "Suspended", "Critical")} className="flex-1 border border-red-900 bg-red-900 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-red-900 dark:hover:text-red-500">
                                Enforce Ban
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
