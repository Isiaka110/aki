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
    fullDesc: "Your namespace is your digital estate. Select an identity that reflects the heritage and exclusive nature of your curations."
  },
  {
    id: 2,
    title: "Customize & Brand",
    desc: "Upload your logo, banner, and pick your signature brand colors.",
    icon: Layout,
    fullDesc: "Aesthetics distinguish the extraordinary from the mundane. Imbue your space with high-resolution imagery and a refined palette."
  },
  {
    id: 3,
    title: "Showcase the Craft",
    desc: "Add products with premium photos and clear, honest descriptions.",
    icon: ImageIcon,
    fullDesc: "Visuals are the language of luxury. Present your pieces with immaculate lighting, consistent composition, and poetic precision."
  },
  {
    id: 4,
    title: "Secure Logistics",
    desc: "Link your bank account to receive automatic, secure payouts.",
    icon: CreditCard,
    fullDesc: "Our industrial-grade financial gateways guarantee immediate and discreet settlement following every fulfilled acquisition."
  }
];

export default function OnboardingGuide() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#050505] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        <header className="text-center mb-24 lg:mb-32">
          <p className="font-cinzel text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase mb-6">
            Partner with AKI Commerce
          </p>
          <h1 className="font-cinzel text-5xl tracking-widest text-gray-900 dark:text-white sm:text-7xl mb-6 uppercase">
            Establish Your <br /> <span className="text-gray-400 font-light">Atelier</span>
          </h1>
          <p className="mt-8 text-sm font-light tracking-wide text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The definitive protocol for launching a world-class digital storefront. A synthesis of luxury, technology, and commerce.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left: Interactive Steps Overlay */}
          <div className="lg:col-span-12 mb-8 flex justify-between gap-6 overflow-x-auto pb-6 border-b border-gray-200 dark:border-white/10 custom-scrollbar">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex flex-col items-center min-w-[120px] transition-all duration-500 ${activeStep === step.id ? "opacity-100" : "opacity-30 hover:opacity-70"}`}
              >
                <div className={`mb-4 flex h-16 w-16 items-center justify-center border transition-all duration-500 ${activeStep === step.id ? 'border-gray-900 text-gray-900 dark:border-white dark:text-white' : 'border-gray-300 text-gray-400 dark:border-gray-800 dark:text-gray-600'}`}>
                  <step.icon className="h-6 w-6" strokeWidth={1} />
                </div>
                <span className="font-cinzel text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-900 dark:text-white">Phase {step.id}</span>
              </button>
            ))}
          </div>

          {/* Side by Side Content */}
          <div className="lg:col-span-7">
            <div className="bg-transparent p-4 sm:p-8 transition-all relative border-l border-gray-200 dark:border-white/10">
              <h3 className="font-cinzel text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 mb-8">Phase {activeStep}</h3>
              <h2 className="font-cinzel text-4xl text-gray-900 dark:text-white mb-8 tracking-wider uppercase">
                {steps.find(s => s.id === activeStep)?.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light tracking-wide mb-12 max-w-lg">
                {steps.find(s => s.id === activeStep)?.fullDesc}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => activeStep < 4 && setActiveStep(activeStep + 1)}
                  className="flex items-center gap-3 border border-gray-900 bg-gray-900 px-8 py-4 text-xs font-semibold tracking-widest uppercase text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
                >
                  {activeStep === 4 ? "Commence" : "Proceed"} <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
                {activeStep === 4 && (
                  <Link href="/auth/signup" className="flex items-center gap-3 border border-gray-900 bg-transparent px-8 py-4 text-xs font-semibold tracking-widest uppercase text-gray-900 transition-all hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
                    Register Atelier
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right: Feature Highlights */}
          <div className="lg:col-span-5 space-y-6 h-full mt-4 lg:mt-0">
            <div className="p-8 bg-gray-900 text-white dark:bg-white dark:text-black border border-transparent">
              <Rocket className="h-6 w-6 mb-6 font-light" strokeWidth={1} />
              <h4 className="font-cinzel text-lg tracking-widest uppercase mb-3 text-white dark:text-black">Resilient Infrastructure</h4>
              <p className="text-xs tracking-wide leading-relaxed font-light text-gray-400 dark:text-gray-600">Engineered to perform flawlessly across varying network conditions, ensuring an uninterrupted curation experience.</p>
            </div>
            <div className="p-8 bg-transparent border border-gray-200 dark:border-white/10">
              <CheckCircle2 className="h-6 w-6 mb-6 text-gray-400" strokeWidth={1} />
              <h4 className="font-cinzel text-lg tracking-widest uppercase mb-3 text-gray-900 dark:text-white">Curated Partners</h4>
              <p className="text-xs tracking-wide leading-relaxed font-light text-gray-500 dark:text-gray-400">Join an exclusive syndicate of validated creators. Rigorous vetting protects our standard of excellence.</p>
            </div>
            <div className="p-8 bg-transparent border border-gray-200 dark:border-white/10">
              <BarChart3 className="h-6 w-6 mb-6 text-gray-400" strokeWidth={1} />
              <h4 className="font-cinzel text-lg tracking-widest uppercase mb-3 text-gray-900 dark:text-white">Empirical Insights</h4>
              <p className="text-xs tracking-wide leading-relaxed font-light text-gray-500 dark:text-gray-400">Harness definitive analytics to monitor acquisition trends, regional traction, and collection performance.</p>
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-32 text-center p-16 sm:p-24 bg-transparent border-y border-gray-200 dark:border-white/10 relative group overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80')] bg-cover bg-center opacity-5 grayscale group-hover:scale-105 transition-transform duration-1000" />
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="font-cinzel text-4xl sm:text-6xl mb-8 tracking-widest uppercase text-gray-900 dark:text-white font-medium">
              Your Vision.<br />Our Protocol.
            </h2>
            <Link href="/auth/signup" className="inline-block border border-gray-900 bg-gray-900 px-12 py-5 text-xs font-semibold tracking-widest uppercase text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white">
              Initialize Storefront
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}