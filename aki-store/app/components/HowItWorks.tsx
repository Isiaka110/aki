"use client";

import { CreditCard, Rocket, Smile, Store } from "lucide-react";

const steps = [
    {
        title: "Launch with Ease",
        desc: "Create your profile in minutes. No coding, no high fees, just your vision.",
        icon: Store,
        color: "bg-blue-500"
    },
    {
        title: "Premium Experience",
        desc: "Your customers get a beautiful, fast interface that feels like a top-tier brand.",
        icon: Rocket,
        color: "bg-purple-500"
    },
    {
        title: "Seamless Payments",
        desc: "Secure checkout and instant payouts so you can focus on growing.",
        icon: CreditCard,
        color: "bg-green-500"
    },
    {
        title: "Direct Trust",
        desc: "Build lasting relationships with your customers through an account system.",
        icon: Smile,
        color: "bg-orange-500"
    }
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-900/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">

                <div className="mb-20">
                    <h2 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white sm:text-6xl">
                        Beyond a Simple <br /> <span className="text-gray-400">Checkout Link.</span>
                    </h2>
                    <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
                        Everything we do is designed to make your local brand feel globally competitive.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
                    {steps.map((step, i) => (
                        <div key={i} className="group relative">
                            <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-[1.5rem] ${step.color} bg-opacity-10 dark:bg-opacity-20 transition-all group-hover:scale-110`}>
                                <step.icon className={`h-8 w-8 text-gray-900 dark:text-white`} />
                            </div>
                            <div className="absolute top-8 left-12 -z-10 text-[8rem] font-black leading-none text-gray-100 opacity-0 group-hover:opacity-50 transition-all dark:text-gray-800 pointer-events-none">
                                {i + 1}
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-3">{step.title}</h3>
                            <p className="text-gray-500 leading-relaxed font-medium">{step.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
