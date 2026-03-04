import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUsers, faDollarSign, faStore, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { apiGetSuperAdminOverview, apiUpdateSuperAdminSettings } from "../../services/api";

export default function SuperAdminDashboard() {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        activeStores: 0,
        pendingApprovals: 0,
        openComplaints: 0
    });

    const [isLoading, setIsLoading] = useState(true);
    if (isLoading) { } // Suppress unused var


    const [bannerText, setBannerText] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        async function fetchOverview() {
            try {
                const data = await apiGetSuperAdminOverview();
                if (data) {
                    setStats(data);
                    setBannerText(data.noticeBanner || "");
                }
            } catch (err) {
                console.error("Failed to fetch overview data", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchOverview();
    }, []);

    const handleUpdateBanner = async () => {
        setIsSaving(true);
        try {
            await apiUpdateSuperAdminSettings({ noticeBanner: bannerText });
            alert("Banner updated successfully.");
        } catch (e) {
            console.error(e);
            alert("Update failed.");
        } finally {
            setIsSaving(false);
        }
    };

    const metrics = [
        { name: "Total Revenue Volume", value: `$${stats.totalRevenue.toLocaleString()}`, change: "Live", isPositive: true, icon: faDollarSign },
        { name: "Active Stores", value: stats.activeStores.toLocaleString(), change: "Live", isPositive: true, icon: faStore },
        { name: "Pending Approvals", value: stats.pendingApprovals.toLocaleString(), change: "Live", isPositive: false, icon: faUsers },
        { name: "Open Complaints", value: stats.openComplaints.toLocaleString(), change: "Live", isPositive: false, icon: faExclamationTriangle },
    ];

    return (
        <div className="max-w-7xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="font-cinzel text-3xl font-medium tracking-wider text-gray-900 dark:text-white uppercase mb-2">Platform Overview</h1>
                    <p className="text-sm font-light tracking-wide text-gray-500">Live integrity and performance metrics across the entire AKI Commerce platform.</p>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric) => (
                    <div key={metric.name} className="border border-gray-200 bg-transparent p-6 dark:border-white/10 transition-colors">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center border border-gray-900 text-gray-900 dark:border-white dark:text-white">
                                <FontAwesomeIcon icon={metric.icon} className="h-4 w-4" />
                            </div>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">{metric.name}</span>
                        </div>
                        <div className="flex items-end justify-between">
                            <span className="font-cinzel text-2xl tracking-wider text-gray-900 dark:text-white">{metric.value}</span>
                            <span className={`text-xs font-medium tracking-widest ${metric.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {metric.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Global Notice Banner Section */}
                <div className="border border-gray-200 bg-transparent p-8 dark:border-white/10 flex flex-col">
                    <h3 className="font-cinzel text-lg tracking-widest uppercase text-gray-900 dark:text-white mb-6">Global Admin Notice</h3>
                    <p className="text-xs font-light text-gray-500 mb-6">This banner will be broadcasted to all store administrators on their dashboard.</p>
                    <textarea
                        value={bannerText}
                        onChange={(e) => setBannerText(e.target.value)}
                        className="w-full h-32 border border-gray-200 dark:border-white/10 bg-transparent p-4 text-xs focus:border-gray-900 focus:outline-none dark:text-white dark:focus:border-white transition-colors mb-6 resize-none font-light tracking-wide"
                        placeholder="Type system-wide notice here..."
                    />
                    <button
                        onClick={handleUpdateBanner}
                        disabled={isSaving}
                        className="self-end border border-gray-900 bg-gray-900 px-8 py-3 text-[10px] font-bold tracking-[0.3em] uppercase text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
                    >
                        {isSaving ? "Updating..." : "Broadcast Notice"}
                    </button>
                </div>

                {/* Urgent Alerts Chart Area */}
                <div className="border border-gray-200 bg-transparent p-8 dark:border-white/10 flex flex-col items-center justify-center min-h-[300px]">
                    <FontAwesomeIcon icon={faChartBar} className="mb-4 h-12 w-12 text-gray-200 dark:text-gray-800" />
                    <p className="font-cinzel text-lg tracking-widest uppercase text-gray-400 mb-2">Revenue Velocity</p>
                    <p className="text-xs font-light tracking-wide text-gray-500">Global chart visualization requires integration.</p>
                </div>
            </div>
        </div>
    );
}
