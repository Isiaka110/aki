"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-[#fcfcfc] dark:bg-[#050505]">

      {/* Left Column: Splash Image (Hidden on small screens) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Aesthetic High-Fashion Image */}
          <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80')] bg-cover bg-center grayscale opacity-80 dark:opacity-60"></div>
        </div>
        <div className="absolute inset-0 z-10 bg-white/30 dark:bg-black/40"></div>

        <div className="relative z-20 flex flex-col justify-between p-16 w-full h-full">
          <div>
            <Link href="/" className="flex items-center group inline-block">
              <span className="font-cinzel text-3xl font-medium tracking-[0.2em] text-gray-900 dark:text-white uppercase transition-opacity hover:opacity-70">
                AKI.
              </span>
            </Link>
          </div>

          <div className="max-w-lg">
            <h1 className="font-cinzel text-6xl text-gray-900 dark:text-white tracking-wide mb-6 leading-[1.1]">
              The Atelier <br /> Awaits.
            </h1>
            <p className="text-sm font-light tracking-wide text-gray-800 dark:text-gray-300">
              Resume curation of your exquisite collection.
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-900 dark:text-gray-400 font-medium tracking-[0.2em] uppercase">
              Maison AKI / Authentication
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:px-24 bg-[#fcfcfc] dark:bg-[#050505] transition-colors relative">
        <div className="w-full max-w-sm mx-auto">

          <div className="mb-16 block lg:hidden text-center">
            <Link href="/" className="inline-block group">
              <span className="font-cinzel text-3xl font-medium tracking-[0.2em] text-gray-900 dark:text-white uppercase transition-opacity hover:opacity-70">
                AKI.
              </span>
            </Link>
          </div>

          <div className="mb-12">
            <h2 className="font-cinzel text-4xl text-gray-900 dark:text-white tracking-wide mb-3">Entrance</h2>
            <p className="text-sm text-gray-500 font-light tracking-wide">Provide your credentials to access the dashboard.</p>
          </div>

          <form className="space-y-8" action="/store-admin">
            <div className="space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                  className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded-none border border-gray-300 checked:bg-gray-900 checked:border-gray-900 dark:border-gray-600 dark:bg-transparent dark:checked:bg-white dark:checked:border-white transition-colors cursor-pointer appearance-none relative after:absolute after:inset-0 after:content-[''] after:hidden checked:after:block after:m-auto after:bg-white dark:after:bg-black after:clip-path-[polygon(14%_44%,0%_65%,50%_100%,100%_16%,80%_0%,43%_62%)] after:w-2.5 after:h-2.5"
                />
                <span className="text-xs font-light text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors tracking-wide">
                  Maintain Session
                </span>
              </label>

              <Link href="/auth/reset-password" className="text-xs font-light tracking-wide text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Recover Access
              </Link>
            </div>

            <button type="submit" className="w-full border border-gray-900 bg-gray-900 px-6 py-4 text-xs font-semibold tracking-widest text-white uppercase transition-all duration-500 hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white mt-8">
              Access Collection
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-xs font-light text-gray-500 tracking-wide">
              Do not maintain a presence? <Link href="/auth/signup" className="text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 font-medium ml-1 transition-colors">Establish a Boutique</Link>
            </p>
          </div>

          <div className="absolute top-8 right-8 z-20">
            <Link href="/" className="flex items-center gap-2 text-xs font-light tracking-widest text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors uppercase">
              <ArrowLeft className="h-3 w-3" /> Return
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}