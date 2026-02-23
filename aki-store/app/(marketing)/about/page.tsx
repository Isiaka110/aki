import { Store, Globe, Users, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">

                <header className="text-center mb-16">
                    <h1 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white sm:text-6xl">
                        The Story of <span className="text-gray-500">AKI.</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Beyond commerce. Elevating the local experience.
                    </p>
                </header>

                <div className="prose prose-gray max-w-none dark:prose-invert space-y-12">

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Our Mission</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                AKI was born from a simple observation: local businesses have the best products but often lack the premium digital presence they deserve. We built AKI to bridge that gap, giving small vendors a standalone, high-end storefront that rivals global brands.
                            </p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-[2rem] flex items-center justify-center">
                            <Store className="h-32 w-32 text-gray-900 dark:text-white opacity-20" />
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                        <div className="md:order-2">
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Who We Are</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                We are a team of designers, engineers, and former merchants who believe that the future of retail is personal. We focus on aesthetics, speed, and simplicity, so you can focus on your craft.
                            </p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-[2rem] flex items-center justify-center md:order-1">
                            <Users className="h-32 w-32 text-gray-900 dark:text-white opacity-20" />
                        </div>
                    </section>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12">
                        <div className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-900">
                            <Globe className="h-8 w-8 mx-auto mb-4 text-gray-400" />
                            <h3 className="font-bold">Nationwide Reach</h3>
                            <p className="text-sm text-gray-500 mt-2">Sell to anyone, anywhere, with our integrated logistics tools.</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-900">
                            <Heart className="h-8 w-8 mx-auto mb-4 text-gray-400" />
                            <h3 className="font-bold">Merchant First</h3>
                            <p className="text-sm text-gray-500 mt-2">No hidden fees. No complex jargon. Just your business, elevated.</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-900">
                            <Store className="h-8 w-8 mx-auto mb-4 text-gray-400" />
                            <h3 className="font-bold">Premium Design</h3>
                            <p className="text-sm text-gray-500 mt-2">Every AKI store is designed to WOW your customers from the first click.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
