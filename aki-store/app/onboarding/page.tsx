"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [storeName, setStoreName] = useState("");

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);
  const handleComplete = () => router.push("/store-admin");

  // Auto-generate a slug from the store name (e.g., "My Store" -> "my-store")
  const storeSlug = storeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Complete your profile</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Complete these quick steps to setup your storefront.</p>
        </div>

        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 md:flex-row md:min-h-[500px]">
          
          {/* Left Sidebar: Stepper */}
          <div className="w-full border-b border-gray-200 p-8 dark:border-gray-800 md:w-1/3 md:border-b-0 md:border-r">
            <div className="relative flex flex-col gap-8">
              {/* Vertical connecting line (hidden on mobile) */}
              <div className="absolute left-[19px] top-10 hidden h-[calc(100%-80px)] w-[2px] bg-gray-200 dark:bg-gray-700 md:block"></div>

              {/* Step 1 Indicator */}
              <div className="relative flex items-start gap-4 z-10">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold transition-colors ${step >= 1 ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
                  {step > 1 ? <Check className="h-5 w-5" /> : "1"}
                </div>
                <div>
                  <h3 className={`font-bold ${step >= 1 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Basic Information</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Submit your Name and contact</p>
                </div>
              </div>

              {/* Step 2 Indicator */}
              <div className="relative flex items-start gap-4 z-10">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold transition-colors ${step === 2 ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
                  2
                </div>
                <div>
                  <h3 className={`font-bold ${step === 2 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Store Details</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Name your store and get your link</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form Area */}
          <div className="flex w-full flex-col justify-between p-8 md:w-2/3">
            
            {/* Form Content */}
            <div className="flex-1">
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Basic Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                        <input type="text" placeholder="e.g. John" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-white focus:border-black focus:ring-1 focus:ring-black dark:focus:border-white" />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                        <input type="text" placeholder="e.g. Doe" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-white focus:border-black focus:ring-1 focus:ring-black dark:focus:border-white" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                      <input type="tel" placeholder="+234 800 000 0000" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-white focus:border-black focus:ring-1 focus:ring-black dark:focus:border-white" />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Store Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Store Name</label>
                      <input 
                        type="text" 
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        placeholder="e.g. Thrift Elegance" 
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-white focus:border-black focus:ring-1 focus:ring-black dark:focus:border-white" 
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Your Standalone Link</label>
                      <div className="flex items-center rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-950">
                        <span className="text-gray-500">aki.com/</span>
                        <span className="font-bold text-gray-900 dark:text-white">{storeSlug || "your-store"}</span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">This is the link you will share with your customers.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Navigation Buttons */}
            <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
              {step === 1 ? (
                <button className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                  Cancel
                </button>
              ) : (
                <button onClick={handleBack} className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                  Back
                </button>
              )}

              {step === 1 ? (
                <button onClick={handleNext} className="rounded-lg bg-black px-8 py-2 text-sm font-bold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  Next
                </button>
              ) : (
                <button onClick={handleComplete} className="rounded-lg bg-black px-8 py-2 text-sm font-bold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  Complete Setup
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}