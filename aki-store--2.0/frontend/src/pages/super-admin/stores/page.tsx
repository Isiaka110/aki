

import { useState, useEffect } from "react";
import { apiGetAllStores, apiUpdateStoreIntegrity, apiGetSuperAdminStoreProducts, apiGetSuperAdminStoreCategories } from "../../../services/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStore, faExclamationTriangle, faCheckCircle, faBan, faExternalLinkAlt, faTimes, faSync, faBox, faFolder } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export default function StoresIntegrityPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStore, setSelectedStore] = useState<any>(null);
    const [isApproveOpen, setIsApproveOpen] = useState(false);
    const [isSuspendOpen, setIsSuspendOpen] = useState(false);
    const [stores, setStores] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isStoreDetailsOpen, setIsStoreDetailsOpen] = useState(false);
    const [storeProducts, setStoreProducts] = useState<any[]>([]);
    const [storeCategories, setStoreCategories] = useState<any[]>([]);
    const [isDetailsLoading, setIsDetailsLoading] = useState(false);
    const [suspendReason, setSuspendReason] = useState("");

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

    const handleStatusUpdate = async (storeId: string, status: string, riskScore?: string, reason?: string) => {
        try {
            await apiUpdateStoreIntegrity({ storeId, status, riskScore, reason });
            fetchStores();
            setIsApproveOpen(false);
            setIsSuspendOpen(false);
            setSuspendReason("");
            if (isStoreDetailsOpen && selectedStore?.storeId === storeId) {
                setSelectedStore((prev: any) => prev ? { ...prev, status } : null);
            }
        } catch (e) {
            console.error("Failed to update store");
            alert("Update failed. Please try again.");
        }
    };

    const handleViewStoreDetails = async (store: any) => {
        setSelectedStore(store);
        setIsStoreDetailsOpen(true);
        setIsDetailsLoading(true);
        try {
            const [productsRes, categoriesRes] = await Promise.all([
                apiGetSuperAdminStoreProducts(store.storeId),
                apiGetSuperAdminStoreCategories(store.storeId)
            ]);
            setStoreProducts(productsRes || []);
            setStoreCategories(categoriesRes || []);
        } catch (e) {
            console.error(e);
        } finally {
            setIsDetailsLoading(false);
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

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
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
                                <tr key={store.storeId} onClick={() => handleViewStoreDetails(store)} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer block border-b md:table-row md:border-none">
                                    <td className="p-6 pl-4 md:pl-6">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gray-200 dark:border-white/10 bg-white dark:bg-black">
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
                                        <div className="flex items-center justify-end gap-3" onClick={(e) => e.stopPropagation()}>
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
                                            <Link to={`/${store.storeId}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" title="View Storefront">
                                                <FontAwesomeIcon icon={faExternalLinkAlt} className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards View */}
                <div className="md:hidden flex flex-col divide-y divide-gray-100 dark:divide-white/5">
                    {isLoading ? (
                        <div className="p-12 text-center text-gray-500 uppercase tracking-widest text-[10px]">
                            <FontAwesomeIcon icon={faSync} className="h-4 w-4 mx-auto animate-spin mb-2 block" /> Loading records...
                        </div>
                    ) : filteredStores.length === 0 ? (
                        <div className="p-12 text-center text-gray-500 uppercase tracking-widest text-[10px]">
                            No stores found.
                        </div>
                    ) : filteredStores.map((store) => (
                        <div key={store.storeId} onClick={() => handleViewStoreDetails(store)} className="p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gray-200 dark:border-white/10 bg-white dark:bg-black">
                                        <FontAwesomeIcon icon={faStore} className="h-4 w-4 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="font-cinzel font-semibold tracking-wider text-gray-900 dark:text-white uppercase truncate max-w-[150px]">{store.name}</p>
                                        <span className={`inline-flex items-center border px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest mt-1 ${getStatusColor(store.status)}`}>
                                            {store.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-3 text-right" onClick={(e) => e.stopPropagation()}>
                                    {store.status === 'Pending' && (
                                        <button onClick={() => { setSelectedStore(store); setIsApproveOpen(true); }} className="text-green-600"><FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4" /></button>
                                    )}
                                    {store.status !== 'Suspended' && (
                                        <button onClick={() => { setSelectedStore(store); setIsSuspendOpen(true); }} className="text-red-600"><FontAwesomeIcon icon={faBan} className="h-4 w-4" /></button>
                                    )}
                                    <Link to={`/${store.storeId}`} target="_blank" rel="noopener noreferrer" className="text-gray-400"><FontAwesomeIcon icon={faExternalLinkAlt} className="h-4 w-4" /></Link>
                                </div>
                            </div>
                            <div className="flex justify-between items-center bg-gray-50 dark:bg-white/5 p-3 rounded-none">
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">LTV Revenue</span>
                                    <span className="font-cinzel tracking-wider text-gray-900 dark:text-white text-sm">${store.revenue?.toLocaleString() || 0}</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Risk Profile</span>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${store.riskScore === 'Low' ? 'text-gray-500' : store.riskScore === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>
                                        {store.riskScore}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
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
                            value={suspendReason}
                            onChange={(e) => setSuspendReason(e.target.value)}
                            className="w-full border border-gray-200 dark:border-white/10 bg-transparent p-3 text-sm focus:border-red-900 focus:outline-none dark:text-white dark:focus:border-red-500 transition-colors mt-4 mb-8 resize-none font-light"
                            rows={3}
                            placeholder="Reason for suspension (required)..."
                        />
                        <div className="flex gap-4">
                            <button onClick={() => setIsSuspendOpen(false)} className="flex-1 border border-gray-200 py-3 text-xs font-semibold uppercase tracking-widest text-gray-600 hover:border-gray-900 dark:border-white/10 dark:text-gray-400 dark:hover:border-white transition-colors">
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (!suspendReason.trim()) return alert("Please provide a suspension reason.");
                                    handleStatusUpdate(selectedStore.storeId, "Suspended", "Critical", suspendReason);
                                }}
                                className="flex-1 border border-red-900 bg-red-900 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-red-900 dark:hover:text-red-500"
                            >
                                Enforce Ban
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Store Details Modal / Drawer */}
            {isStoreDetailsOpen && selectedStore && (
                <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-300">
                    <div className="w-full sm:max-w-xl h-full sm:h-auto sm:max-h-full sm:rounded-none bg-[#fcfcfc] dark:bg-[#050505] border border-gray-200 dark:border-white/10 flex flex-col shadow-2xl slide-in-from-right-8 duration-300 relative overflow-hidden">

                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10 shrink-0">
                            <div>
                                <h2 className="font-cinzel text-xl tracking-wider text-gray-900 dark:text-white uppercase truncate flex items-center gap-3">
                                    <FontAwesomeIcon icon={faStore} className="text-gray-400" /> {selectedStore.name}
                                </h2>
                                <p className="text-[10px] text-gray-500 tracking-widest mt-1 uppercase">Store ID: {selectedStore.storeId}</p>
                            </div>
                            <button onClick={() => setIsStoreDetailsOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                            {isDetailsLoading ? (
                                <div className="p-12 text-center text-gray-500 uppercase tracking-widest text-[10px]">
                                    <FontAwesomeIcon icon={faSync} className="h-6 w-6 mx-auto animate-spin mb-4 block text-gray-300" />
                                    Fetching Store Integrity Data...
                                </div>
                            ) : (
                                <>
                                    {/* Corporate Dossier */}
                                    <section>
                                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                                            Corporate Dossier
                                        </h3>
                                        <div className="space-y-3 text-sm font-light text-gray-700 dark:text-gray-300">
                                            <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                                                <span className="text-gray-500">Platform Email</span>
                                                <span>{selectedStore.email}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                                                <span className="text-gray-500">Support Email</span>
                                                <span>{selectedStore.supportEmail || "N/A"}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                                                <span className="text-gray-500">WhatsApp / Phone</span>
                                                <span>{selectedStore.whatsappNumber ? `+${selectedStore.whatsappNumber}` : "N/A"}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                                                <span className="text-gray-500">Social Links</span>
                                                <span>{selectedStore.socialInstagram || selectedStore.socialTwitter || "N/A"}</span>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Categories Overview */}
                                    <section>
                                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faFolder} /> Store Categories ({storeCategories.length})
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {storeCategories.length > 0 ? storeCategories.map((cat, i) => (
                                                <span key={i} className="inline-flex items-center border border-gray-200 dark:border-white/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-white/5">
                                                    {cat.name}
                                                </span>
                                            )) : (
                                                <p className="text-xs text-gray-400 italic">No categories mapped.</p>
                                            )}
                                        </div>
                                    </section>

                                    {/* Products Overview */}
                                    <section>
                                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faBox} /> Curated Products ({storeProducts.length})
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {storeProducts.length > 0 ? storeProducts.map((prod) => (
                                                <div key={prod._id} className="border border-gray-200 dark:border-white/10 p-4 hover:border-gray-900 dark:hover:border-white/30 transition-colors flex flex-col group">
                                                    <div className="aspect-square w-full mb-3 bg-gray-100 dark:bg-zinc-900 overflow-hidden relative">
                                                        {prod.images && prod.images[0] ? (
                                                            <img src={prod.images[0]} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-300"><FontAwesomeIcon icon={faBox} size="2x" /></div>
                                                        )}
                                                    </div>
                                                    <p className="font-cinzel text-sm text-gray-900 dark:text-white tracking-widest uppercase truncate">{prod.title}</p>
                                                    <div className="flex justify-between items-center mt-2">
                                                        <p className="text-xs text-gray-500">${prod.price}</p>
                                                        <span className="text-[9px] uppercase tracking-widest text-gray-400 border border-gray-200 dark:border-white/10 px-1.5 py-0.5">{prod.category}</span>
                                                    </div>
                                                </div>
                                            )) : (
                                                <p className="text-xs text-gray-400 italic col-span-full">No products cataloged.</p>
                                            )}
                                        </div>
                                    </section>
                                </>
                            )}
                        </div>

                        <div className="p-6 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#050505] shrink-0">
                            {selectedStore.status === 'Active' ? (
                                <Link to={`/${selectedStore.storeId}`} target="_blank" rel="noopener noreferrer" className="block w-full text-center border border-gray-900 bg-gray-900 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white">
                                    View Active Store
                                </Link>
                            ) : (
                                <button disabled className="block w-full text-center border border-gray-300 bg-gray-200 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-gray-400 cursor-not-allowed dark:border-white/10 dark:bg-white/5 dark:text-gray-600">
                                    Storefront Offline
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
