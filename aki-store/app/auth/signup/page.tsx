"use client";

import Link from "next/link";
import { Store, ShieldCheck, Zap, Globe, ArrowLeft } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen">

      {/* Left Column: Splash Info (Hidden on small screens) */}
      <div className="hidden lg:flex w-1/2 bg-black p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Subtle Gradient */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-gray-900 via-black to-black opacity-50"></div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 text-white">
            <Store className="h-8 w-8" />
            <span className="text-3xl font-black tracking-tighter">AKI.</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-6xl font-black text-white tracking-tighter mb-8 leading-none">
            The platform <br /> for the next <br /> <span className="text-gray-500">generation.</span>
          </h1>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white uppercase tracking-widest text-[10px] mb-1">Instant Setup</h4>
                <p className="text-gray-400 text-sm">Launch your store in under 10 minutes, no coding needed.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white uppercase tracking-widest text-[10px] mb-1">Secure Commerce</h4>
                <p className="text-gray-400 text-sm">Industrial grade data protection for you and your shoppers.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white uppercase tracking-widest text-[10px] mb-1">Global Reach</h4>
                <p className="text-gray-400 text-sm">optimized for local delivery and nationwide scaling.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">© 2026 AKI Market Group. All rights reserved.</p>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-white dark:bg-gray-950 transition-colors">
        <div className="w-full max-w-md">

          <div className="mb-10 block lg:hidden">
            <Link href="/" className="flex items-center gap-2 text-black dark:text-white">
              <Store className="h-6 w-6" />
              <span className="text-2xl font-black tracking-tighter">AKI.</span>
            </Link>
          </div>

          <h2 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white mb-2">Create Account.</h2>
          <p className="text-gray-500 mb-8 font-medium">Join thousands of vendors shaping local commerce.</p>

          <form className="space-y-6" action="/onboarding">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm focus:border-black focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-white transition-all shadow-sm"
                />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-400">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm focus:border-black focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-white transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                required
                className="h-5 w-5 rounded-lg border-2 border-gray-200 checked:bg-black transition-all cursor-pointer dark:border-gray-800 dark:bg-gray-900 dark:checked:bg-white"
              />
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400">
                I agree to the <Link href="/terms" className="text-black dark:text-white underline hover:no-underline">Terms & Conditions</Link>
              </label>
            </div>

            <button type="submit" className="w-full rounded-full bg-black py-4 text-sm font-black text-white hover:scale-[1.02] active:scale-95 transition-all shadow-xl dark:bg-white dark:text-black">
              Create My Store
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-gray-500">
              Already have an account? <Link href="/auth/login" className="font-black text-gray-900 hover:underline dark:text-white">Log in</Link>
            </p>
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-gray-100 pt-8 dark:border-gray-900 transition-colors">
            <Link href="/" className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Auth v2.1</span>
          </div>

        </div>
      </div>
    </div>
  );
}