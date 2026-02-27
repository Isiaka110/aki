import { Store, Globe, Users, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#050505] px-4 py-32 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">

                <header className="text-center mb-24">
                    <span className="mb-4 block text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase">
                        Our Heritage
                    </span>
                    <h1 className="text-5xl font-cinzel text-gray-900 dark:text-white sm:text-7xl font-medium tracking-wide mb-6">
                        The Story of AKI.
                    </h1>
                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 font-light tracking-wide max-w-xl mx-auto">
                        Beyond commerce. Elevating the local experience to global standards of luxury.
                    </p>
                </header>

                <div className="space-y-24">

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-cinzel text-gray-900 dark:text-white mb-6 font-medium tracking-wide">The Vision</h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm font-light tracking-wide">
                                AKI was born from a simple observation: visionaries create exceptional products, yet often lack the premium digital presence required to command attention. We built Maison AKI to bridge that gap, providing independent brands with standalone, high-end storefronts that rival the most prestigious global labels.
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-white/5 p-12 flex items-center justify-center border border-gray-200 dark:border-white/10 aspect-square">
                            <Store className="h-24 w-24 text-gray-300 dark:text-gray-600" strokeWidth={1} />
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
                        <div className="md:order-2">
                            <h2 className="text-3xl font-cinzel text-gray-900 dark:text-white mb-6 font-medium tracking-wide">The Artisans</h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm font-light tracking-wide">
                                We are a collective of designers, engineers, and former merchants who believe that the future of retail remains deeply personal. We focus relentlessly on aesthetics, speed, and simplicity, allowing you to focus entirely on your craft.
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-white/5 p-12 flex items-center justify-center border border-gray-200 dark:border-white/10 aspect-square md:order-1">
                            <Users className="h-24 w-24 text-gray-300 dark:text-gray-600" strokeWidth={1} />
                        </div>
                    </section>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 border-t border-gray-200 dark:border-white/10">
                        <div className="text-center p-8 bg-transparent border border-gray-200 dark:border-white/10">
                            <Globe className="h-6 w-6 mx-auto mb-6 text-gray-900 dark:text-white" strokeWidth={1} />
                            <h3 className="font-cinzel tracking-widest text-sm text-gray-900 dark:text-white uppercase mb-4">Global Reach</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed">Transcend borders with integrated, seamless distribution systems.</p>
                        </div>
                        <div className="text-center p-8 bg-transparent border border-gray-200 dark:border-white/10">
                            <Heart className="h-6 w-6 mx-auto mb-6 text-gray-900 dark:text-white" strokeWidth={1} />
                            <h3 className="font-cinzel tracking-widest text-sm text-gray-900 dark:text-white uppercase mb-4">Curator First</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed">Zero hidden fees. Uncompromising support. Your brand, elevated.</p>
                        </div>
                        <div className="text-center p-8 bg-transparent border border-gray-200 dark:border-white/10">
                            <Store className="h-6 w-6 mx-auto mb-6 text-gray-900 dark:text-white" strokeWidth={1} />
                            <h3 className="font-cinzel tracking-widest text-sm text-gray-900 dark:text-white uppercase mb-4">Maison Design</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed">Architectural digital spaces designed to captivate your clientele.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
