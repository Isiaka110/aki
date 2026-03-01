"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function SuperAdminLogin() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#fcfcfc] dark:bg-[#050505] p-4 pt-20">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">

                <div className="mb-12 text-center">
                    <Link href="/" className="inline-block group mb-8">
                        <span className="font-cinzel text-3xl font-medium tracking-[0.2em] text-gray-900 dark:text-white uppercase transition-opacity hover:opacity-70">
                            AKI.
                        </span>
                    </Link>

                    <div>
                        <p className="text-xs text-red-700 dark:text-red-400 font-bold tracking-[0.2em] uppercase flex justify-center items-center gap-2">
                            <ShieldCheck className="w-4 h-4" /> System Core / Authentication
                        </p>
                    </div>
                </div>

                <div className="border border-gray-200 bg-transparent p-8 sm:p-12 dark:border-white/10 shadow-sm relative overflow-hidden">
                    <h1 className="font-cinzel text-2xl font-medium tracking-wide text-gray-900 dark:text-white mb-2 relative z-10">Director Access</h1>
                    <p className="text-sm font-light text-gray-500 mb-8 relative z-10">Enter root credentials to manage platform integrity.</p>

                    <form className="space-y-8 relative z-10">
                        <div>
                            <input
                                type="email"
                                placeholder="Root Email Address"
                                className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400"
                                defaultValue="admin@aki.com"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Secure Passphrase"
                                className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400"
                                defaultValue="••••••••"
                                required
                            />
                        </div>

                        <Link
                            href="/super-admin"
                            className="group flex w-full items-center justify-center gap-3 border border-red-900 bg-red-900 px-10 py-4 text-xs font-semibold tracking-widest text-white uppercase transition-all duration-500 hover:bg-transparent hover:text-red-900 dark:border-red-900 dark:bg-red-900 dark:text-white dark:hover:bg-transparent dark:hover:text-red-500 mt-4"
                        >
                            Authenticate
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </form>
                </div>

            </div>
        </div>
    );
}
