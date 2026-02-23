"use client";

import { useState } from "react";
import { Rocket, Store, BarChart3, ChevronRight, CheckCircle2, Layout, Image as ImageIcon, CreditCard } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    id: 1,
    title: "Claim your Boutique",
    desc: "Pick your unique store name and URL (e.g., aki.com/vintage-chic).",
    icon: Store,
    fullDesc: "Your URL is your digital storefront address. Choose something memorable that reflects your brand identity."
  },
  {
    id: 2,
    title: "Customize & Brand",
    desc: "Upload your logo, banner, and pick your signature brand colors.",
    icon: Layout,
    fullDesc: "AESTHETICS ARE EVERYTHING. Use high-resolution images and pick a color palette that makes your products pop."
  },
  {
    id: 3,
    title: "Upload your Craft",
    desc: "Add products with premium photos and clear, honest descriptions.",
    icon: ImageIcon,
    fullDesc: "The better your photos, the higher your sales. We recommend clear lighting and a consistent background style."
  },
  {
    id: 4,
    title: "Setup Payments",
    desc: "Link your bank account to receive automatic, secure payouts.",
    icon: CreditCard,
    fullDesc: "We use industrial-standard payment gateways to ensure you get paid instantly and securely after every successful order."
  }
];

export default function OnboardingGuide() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        <header className="text-center mb-20">
          <h1 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white sm:text-6xl">
            Launch Your <br /> <span className="text-gray-400">Empire</span> on AKI.
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Everything you need to know about setting up a world-class digital storefront in under 10 minutes.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left: Interactive Steps Overlay */}
          <div className="lg:col-span-12 mb-12 flex justify-between gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex flex-col items-center min-w-[120px] transition-all ${activeStep === step.id ? "scale-110 opacity-100" : "opacity-40 grayscale"}`}
              >
                <div className={`mb-3 flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-black text-white dark:bg-white dark:text-black`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white">Step {step.id}</span>
              </button>
            ))}
          </div>

          {/* Side by Side Content */}
          <div className="lg:col-span-7">
            <div className="rounded-[3rem] bg-gray-50 p-12 dark:bg-gray-900 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-800">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Phase {activeStep}</h3>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
                {steps.find(s => s.id === activeStep)?.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-8">
                {steps.find(s => s.id === activeStep)?.fullDesc}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => activeStep < 4 && setActiveStep(activeStep + 1)}
                  className="flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-bold text-white transition-all hover:gap-4 dark:bg-white dark:text-black"
                >
                  {activeStep === 4 ? "Ready to Launch" : "Next Step"} <ChevronRight className="h-4 w-4" />
                </button>
                {activeStep === 4 && (
                  <Link href="/auth/signup" className="rounded-full border-2 border-black px-8 py-4 text-sm font-bold text-gray-900 transition-colors dark:border-white dark:text-white">
                    Start Now
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right: Feature Highlights */}
          <div className="lg:col-span-5 space-y-8 h-full">
            <div className="p-8 rounded-[2rem] bg-gray-950 text-white dark:bg-white dark:text-black shadow-2xl">
              <Rocket className="h-8 w-8 mb-4 text-gray-400" />
              <h4 className="text-xl font-black uppercase tracking-tighter mb-2">Power Delivery</h4>
              <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">Our platform is optimized for the slowest networks, ensuring your customers can shop smoothly from anywhere.</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <CheckCircle2 className="h-8 w-8 mb-4 text-green-500" />
              <h4 className="text-xl font-black uppercase tracking-tighter mb-2">Verified Sellers</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Join a community of trusted local creators. Every AKI store undergoes a brief verification to build buyer confidence.</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <BarChart3 className="h-8 w-8 mb-4 text-blue-500" />
              <h4 className="text-xl font-black uppercase tracking-tighter mb-2">Smart Insights</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Track your best performing hours, popular regions, and top products to scale your business with data.</p>
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-32 text-center p-16 rounded-[4rem] bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white shadow-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80')] bg-cover bg-center opacity-10 group-hover:scale-105 transition-transform duration-700" />
          <div className="relative z-10">
            <h2 className="text-4xl font-black sm:text-6xl mb-6 tracking-tighter">Your Store. Your Story. <br /> Our Platform.</h2>
            <Link href="/auth/signup" className="inline-block rounded-full bg-white px-12 py-5 text-lg font-black text-black transition-transform hover:scale-110">
              Open Your Store for Free
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}