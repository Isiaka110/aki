import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fcfcfc] dark:bg-[#050505]">
      {/* Background Image - High End Boutique/Fashion */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60 dark:opacity-80"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000')",
        }}
      >
        {/* Subtle overlay for text contrast depending on theme */}
        <div className="absolute inset-0 bg-white/50 dark:bg-black/40 transition-colors duration-300"></div>
        {/* Gradient fade at the bottom to transition smoothly */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#fcfcfc] dark:from-[#050505] to-transparent transition-colors duration-300"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center sm:px-8 mt-20">
        <span className="mb-6 block text-xs font-semibold tracking-[0.3em] text-gray-600 dark:text-white/80 uppercase">
          AKI COMMERCE
        </span>

        <h1 className="mb-8 font-cinzel text-5xl sm:text-7xl lg:text-8xl text-gray-900 dark:text-white font-medium leading-[1.1] tracking-wide drop-shadow-sm dark:drop-shadow-lg">
          Launch Your <br />
          <span className="text-gray-700 dark:text-white/90">Premium Storefront</span>
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-lg sm:text-xl font-light tracking-wide text-gray-800 dark:text-white/80 leading-relaxed drop-shadow-sm dark:drop-shadow-md">
          The all-in-one ecommerce platform to build, manage, and scale your brand globally without writing a single line of code.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/auth/signup"
            className="group flex w-full sm:w-auto items-center justify-center gap-3 border border-gray-900 bg-gray-900 px-10 py-4 text-sm font-semibold tracking-widest text-white uppercase transition-all duration-500 hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
          >
            Start For Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/explore"
            className="group flex w-full sm:w-auto items-center justify-center gap-3 border border-gray-900/50 bg-transparent px-10 py-4 text-sm font-semibold tracking-widest text-gray-900 uppercase backdrop-blur-sm transition-all duration-500 hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:border-white/50 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
          >
            View Examples
          </Link>
        </div>
      </div>
    </section>
  );
}