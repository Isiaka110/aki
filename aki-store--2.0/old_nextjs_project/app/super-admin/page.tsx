"use client";

import { Box, BarChart3, Users, DollarSign, Store, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";

export default function SuperAdminDashboard() {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        activeStores: 0,
        pendingApprovals: 0,
        openComplaints: 0
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchOverview() {
            try {
                const res = await fetch("/api/super-admin/overview");
                const { data } = await res.json();
                if (data) {
                    setStats(data);
                }
            } catch (err) {
                console.error("Failed to fetch overview data", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchOverview();
    }, []);

    const metrics = [
        { name: "Total Revenue Volume", value: `$${stats.totalRevenue.toLocaleString()}`, change: "Live", isPositive: true, icon: DollarSign },
        { name: "Active Stores", value: stats.activeStores.toLocaleString(), change: "Live", isPositive: true, icon: Store },
        { name: "Pending Approvals", value: stats.pendingApprovals.toLocaleString(), change: "Live", isPositive: false, icon: Users },
        { name: "Open Complaints", value: stats.openComplaints.toLocaleString(), change: "Live", isPositive: false, icon: ShieldAlert },
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
                                <metric.icon className="h-4 w-4" strokeWidth={1.5} />
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

            <div className="grid grid-cols-1 gap-12">
                {/* Urgent Alerts Chart Area */}
                <div className="border border-gray-200 bg-transparent p-8 dark:border-white/10 flex flex-col items-center justify-center min-h-[400px]">
                    <BarChart3 className="mb-4 h-12 w-12 text-gray-200 dark:text-gray-800" strokeWidth={1} />
                    <p className="font-cinzel text-lg tracking-widest uppercase text-gray-400 mb-2">Revenue Velocity</p>
                    <p className="text-xs font-light tracking-wide text-gray-500">Global chart visualization requires integration.</p>
                </div>
            </div>
        </div>
    );
}
