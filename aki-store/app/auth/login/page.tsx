"use client";

import Link from "next/link";
import { Store, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">

      {/* Left Column: Splash Image (Hidden on small screens) */}
      <div className="hidden lg:flex w-1/2 bg-gray-100 p-12 flex-col justify-between relative overflow-hidden dark:bg-gray-900">
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80')] bg-cover bg-center grayscale opacity-50 dark:opacity-30"></div>
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/20 via-white/50 to-white dark:from-gray-950/20 dark:via-gray-950/50 dark:to-gray-950"></div>

        <div className="relative z-20">
          <Link href="/" className="flex items-center gap-2 text-black dark:text-white">
            <Store className="h-8 w-8" />
            <span className="text-3xl font-black tracking-tighter">AKI.</span>
          </Link>
        </div>

        <div className="relative z-20 max-w-lg">
          <h1 className="text-7xl font-black text-black tracking-tighter mb-4 leading-none dark:text-white">
            Welcome <br /> back.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">Continue growing your boutique empire.</p>
        </div>

        <div className="relative z-20">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Everything local, globally designed.</p>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-white dark:bg-gray-950 transition-colors">
        <div className="w-full max-w-md">

          <div className="mb-10 block lg:hidden">
            <Link href="/" className="flex items-center gap-2 text-black dark:text-white">
              <Store className="h-6 w-6" />
              <span className="text-2xl font-black tracking-tighter">AKI.</span>
            </Link>
          </div>

          <h2 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white mb-2">Sign In.</h2>
          <p className="text-gray-500 mb-8 font-medium italic">Your store is waiting for you.</p>

          <form className="space-y-6" action="/store-admin">
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
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Password</label>
                  <Link href="/auth/reset-password" className="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white hover:underline">Forgot?</Link>
                </div>
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
                id="remember"
                className="h-5 w-5 rounded-lg border-2 border-gray-200 checked:bg-black transition-all cursor-pointer dark:border-gray-800 dark:bg-gray-900 dark:checked:bg-white"
              />
              <label htmlFor="remember" className="text-xs font-bold text-gray-500 dark:text-gray-400">
                Keep me signed in for 30 days
              </label>
            </div>

            <button type="submit" className="w-full rounded-full bg-black py-4 text-sm font-black text-white hover:scale-[1.02] active:scale-95 transition-all shadow-xl dark:bg-white dark:text-black">
              Enter Dashboard
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-gray-500">
              New to AKI? <Link href="/auth/signup" className="font-black text-gray-900 hover:underline dark:text-white">Create your store</Link>
            </p>
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-gray-100 pt-8 dark:border-gray-900 transition-colors">
            <Link href="/" className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Identity v4</span>
          </div>

        </div>
      </div>
    </div>
  );
}