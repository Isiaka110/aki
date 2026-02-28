"use client";

import { Save, ShieldCheck, Mail, Globe } from "lucide-react";

export default function SuperAdminSettings() {
    return (
        <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="font-cinzel text-3xl font-medium tracking-wider text-gray-900 dark:text-white uppercase mb-2">Platform Variables</h1>
                <p className="text-sm font-light tracking-wide text-gray-500">Configure global rules, routing, and access control for AKI Commerce.</p>
            </div>

            <div className="space-y-8">
                {/* Global Info */}
                <div className="border border-gray-200 bg-transparent p-8 dark:border-white/10">
                    <h2 className="mb-8 font-cinzel text-lg font-medium tracking-widest text-gray-900 dark:text-white uppercase flex items-center gap-3">
                        <Globe className="h-4 w-4" /> Global Parameters
                    </h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-gray-500">Platform Name</label>
                            <input
                                type="text"
                                defaultValue="AKI Commerce"
                                className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-gray-500">Global Contact Support</label>
                            <input
                                type="email"
                                defaultValue="contact@aki.com"
                                className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Security Setup */}
                <div className="border border-gray-200 bg-transparent p-8 dark:border-white/10">
                    <h2 className="mb-8 font-cinzel text-lg font-medium tracking-widest text-gray-900 dark:text-white uppercase flex items-center gap-3">
                        <ShieldCheck className="h-4 w-4" /> Super Admin Access
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-gray-500">Current Root Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full max-w-md border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-gray-500">New Root Password</label>
                            <input
                                type="password"
                                placeholder="Enter strong alphanumeric password"
                                className="w-full max-w-md border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button className="group flex items-center gap-3 border border-red-900 bg-red-900 px-8 py-4 text-xs font-semibold tracking-widest text-white uppercase transition-all hover:bg-transparent hover:text-red-900 dark:border-red-900 dark:bg-red-900 dark:text-white dark:hover:bg-transparent dark:hover:text-red-500">
                        Commit Changes
                        <Save className="h-4 w-4 transition-transform group-hover:scale-110" strokeWidth={1.5} />
                    </button>
                </div>
            </div>
        </div>
    );
}
