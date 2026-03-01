"use client";

import { useState, useEffect } from "react";
import { MessageSquareWarning, ArrowRight, X, ShieldAlert, RefreshCcw } from "lucide-react";

export default function ComplaintsPage() {
    const [activeTab, setActiveTab] = useState("Open");
    const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [complaints, setComplaints] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchComplaints = async () => {
        try {
            const res = await fetch("/api/super-admin/complaints");
            const { data } = await res.json();
            if (data) setComplaints(data);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    const handleAction = async (complaintId: string, status: string) => {
        try {
            await fetch("/api/super-admin/complaints", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ complaintId, status })
            });
            fetchComplaints();
            setIsModalOpen(false);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="max-w-7xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="font-cinzel text-3xl font-medium tracking-wider text-gray-900 dark:text-white uppercase mb-2">Platform Complaints</h1>
                    <p className="text-sm font-light tracking-wide text-gray-500">Monitor and resolve disputes between buyers and store vendors.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-white/10">
                {['Open', 'Investigating', 'Resolved'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-8 py-4 text-[10px] font-semibold uppercase tracking-widest transition-colors ${activeTab === tab
                            ? "border-b-2 border-red-900 text-red-900 dark:border-red-500 dark:text-red-500"
                            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="border border-gray-200 bg-transparent dark:border-white/10">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-gray-900/50">
                            <tr>
                                <th className="p-6 text-[10px] font-semibold uppercase tracking-widest text-gray-500">Case ID</th>
                                <th className="p-6 text-[10px] font-semibold uppercase tracking-widest text-gray-500">Store / Customer</th>
                                <th className="p-6 text-[10px] font-semibold uppercase tracking-widest text-gray-500">Issue</th>
                                <th className="p-6 text-[10px] font-semibold uppercase tracking-widest text-gray-500">Severity</th>
                                <th className="p-6 text-right text-[10px] font-semibold uppercase tracking-widest text-gray-500">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-500 uppercase tracking-widest text-[10px]">
                                        <RefreshCcw className="h-4 w-4 mx-auto animate-spin mb-2" /> Loading records...
                                    </td>
                                </tr>
                            ) : complaints.filter(c => c.status === activeTab).length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center">
                                        <MessageSquareWarning className="h-8 w-8 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                                        <p className="font-cinzel tracking-widest text-gray-400 uppercase">No complaints found</p>
                                    </td>
                                </tr>
                            ) : complaints.filter(c => c.status === activeTab).map((complaint) => (
                                <tr key={complaint.complaintId} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="p-6 font-cinzel text-xs tracking-wider text-gray-900 dark:text-white">{complaint.complaintId}</td>
                                    <td className="p-6">
                                        <p className="font-cinzel font-semibold tracking-wider text-gray-900 dark:text-white uppercase">{complaint.storeId}</p>
                                        <p className="text-[10px] text-gray-500 tracking-widest">{complaint.customerEmail}</p>
                                    </td>
                                    <td className="p-6 text-sm text-gray-600 dark:text-gray-400">{complaint.issueType}</td>
                                    <td className="p-6">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${complaint.severity === 'Critical' ? 'text-red-600' : complaint.severity === 'High' ? 'text-orange-500' : 'text-gray-500'}`}>
                                            {complaint.severity}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right flex justify-end">
                                        <button
                                            onClick={() => { setSelectedComplaint(complaint); setIsModalOpen(true); }}
                                            className="flex items-center gap-2 border border-gray-200 px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-gray-900 hover:border-gray-900 dark:border-white/20 dark:text-white dark:hover:border-white transition-all"
                                        >
                                            Review <ArrowRight className="h-3 w-3" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Review Complaint Modal */}
            {isModalOpen && selectedComplaint && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <div className="w-full max-w-lg bg-[#fcfcfc] dark:bg-[#050505] border border-gray-200 dark:border-white/10 p-8 relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            <X className="h-5 w-5" strokeWidth={1} />
                        </button>
                        <h2 className="font-cinzel text-2xl tracking-wider text-gray-900 dark:text-white uppercase mb-6 flex items-center gap-3">
                            <ShieldAlert className="h-6 w-6 text-red-600 dark:text-red-500" /> Case {selectedComplaint.complaintId}
                        </h2>

                        <div className="space-y-4 mb-8 text-sm font-light tracking-wide text-gray-600 dark:text-gray-400">
                            <div className="flex justify-between border-b border-gray-200 dark:border-white/10 pb-4">
                                <span className="uppercase text-[10px] font-semibold tracking-widest text-gray-500">Store</span>
                                <span className="text-gray-900 dark:text-white">{selectedComplaint.storeId}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 dark:border-white/10 pb-4">
                                <span className="uppercase text-[10px] font-semibold tracking-widest text-gray-500">Customer</span>
                                <span className="text-gray-900 dark:text-white">{selectedComplaint.customerEmail}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 dark:border-white/10 pb-4">
                                <span className="uppercase text-[10px] font-semibold tracking-widest text-gray-500">Issue</span>
                                <span className="text-gray-900 dark:text-white font-medium">{selectedComplaint.issueType}</span>
                            </div>

                            <div className="pt-2">
                                <span className="uppercase text-[10px] font-semibold tracking-widest text-gray-500 block mb-2">Customer Remarks</span>
                                <div className="p-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 italic text-sm">
                                    "{selectedComplaint.description}"
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => setIsModalOpen(false)} className="flex-1 border border-gray-200 py-3 text-xs font-semibold uppercase tracking-widest text-gray-600 hover:border-gray-900 dark:border-white/10 dark:text-gray-400 dark:hover:border-white transition-colors">
                                Close Window
                            </button>
                            {selectedComplaint.status !== 'Resolved' && (
                                <button onClick={() => handleAction(selectedComplaint.complaintId, 'Investigating')} className="flex-1 border border-red-900 bg-red-900 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-red-900 dark:hover:text-red-500">
                                    Escalate to Vendor
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
