import Link from "next/link";
import { ArrowRight, Store } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-950">
      {/* Background Pattern/Image Subtle Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
         <div 
           className="h-full w-full bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80')] bg-cover bg-center filter grayscale"
         />
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/80 via-white/50 to-white dark:from-gray-950/90 dark:via-gray-950/60 dark:to-gray-950"></div>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="flex flex-col items-center text-center">
          
          {/* Tagline Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-gray-200 bg-white/50 px-3 py-1 text-sm text-gray-600 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/50 dark:text-gray-400">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            The future of local commerce is here.
          </div>

          {/* Main Headline - Catchy Copywriting */}
          <h1 className="max-w-4xl text-5xl font-black tracking-tighter text-gray-900 dark:text-white sm:text-6xl md:text-7xl">
            Turn Your Passion Into A <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-400">
              Premium Online Store.
            </span>
          </h1>

          {/* Subheadline addressing pain points */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
            Forget complex websites and messy DMs. Get a stunning, standalone storefront link in minutes and give your customers the professional experience they deserve.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            {/* Primary CTA: Vendor Sign Up */}
            <Link 
              href="/auth/signup" // Placeholder link to future signup page
              className="flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-lg font-bold text-white transition-transform hover:scale-105 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              <Store className="h-5 w-5" />
              Start Selling for Free
            </Link>
            
            {/* Secondary CTA: Shopper Browse */}
            <Link 
              href="/explore" // Placeholder link to browse page
              className="flex items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-white px-8 py-4 text-lg font-bold text-gray-900 transition-colors hover:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:hover:border-white"
            >
              Explore Shops <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

           <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            No credit card required. Setup takes less than 5 minutes.
          </p>

        </div>
      </div>
    </section>
  );
}