"use client";

import { CreditCard, Rocket, Smile, Store } from "lucide-react";

const steps = [
    {
        title: "Launch with Ease",
        desc: "Create your profile in minutes. No coding, no high fees, just your vision coming to life.",
        icon: Store
    },
    {
        title: "Premium Experience",
        desc: "Your customers get a beautiful, fast interface that feels like a top-tier luxury brand.",
        icon: Rocket
    },
    {
        title: "Seamless Payments",
        desc: "Secure checkout and instant payouts so you can focus on growing your empire.",
        icon: CreditCard
    },
    {
        title: "Direct Trust",
        desc: "Build lasting relationships with your customers through an intuitive account system.",
        icon: Smile
    }
];

export default function HowItWorks() {
    return (
        <section className="py-24 sm:py-32 bg-[#fcfcfc] dark:bg-[#050505] border-t border-gray-200 dark:border-white/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">

                <div className="mb-24">
                    <span className="mb-4 block text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase">
                        Elevated Engineering
                    </span>
                    <h2 className="font-cinzel text-4xl sm:text-6xl text-gray-900 dark:text-white font-medium leading-[1.1] tracking-wide">
                        Beyond a Simple <br />
                        <span className="text-gray-400 dark:text-gray-600">Checkout Link.</span>
                    </h2>
                    <p className="mt-8 text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Everything we do is meticulously designed to make your local brand feel globally competitive and exceptionally premium.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 text-left relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden lg:block absolute top-[28px] left-[12%] right-[12%] h-px bg-gray-200 dark:bg-white/10 z-0" />

                    {steps.map((step, i) => (
                        <div key={i} className="group relative z-10 flex flex-col items-start bg-[#fcfcfc] dark:bg-[#050505] pt-0">

                            <div className="relative flex h-14 w-14 items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-black transition-transform duration-500 group-hover:scale-110 mb-8 border border-gray-900 dark:border-white">
                                <step.icon className="h-6 w-6" strokeWidth={1.5} />
                            </div>

                            <div className="mb-4 text-sm font-bold tracking-[0.2em] text-gray-300 dark:text-gray-700 transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-300 select-none pointer-events-none">
                                0{i + 1}
                            </div>

                            <h3 className="font-cinzel text-xl text-gray-900 dark:text-white font-medium tracking-wide mb-3">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm font-light">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
