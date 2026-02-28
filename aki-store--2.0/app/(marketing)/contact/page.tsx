import { Mail, MessageSquare, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#050505] px-4 py-32 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">

                    {/* Left: Contact Info */}
                    <div className="flex flex-col justify-center">
                        <span className="mb-4 block text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase">
                            Concierge Services
                        </span>
                        <h1 className="text-5xl font-cinzel text-gray-900 dark:text-white sm:text-7xl font-medium tracking-wide mb-6">
                            Private <br /> Consultations.
                        </h1>
                        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 font-light tracking-wide max-w-md leading-relaxed">
                            Whether you represent an established brand or are launching a bespoke collection, our advisory board is at your absolute disposal.
                        </p>

                        <div className="mt-16 space-y-12">
                            <div className="flex items-start gap-6 group">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-gray-200 dark:border-white/10 bg-transparent transition-colors group-hover:bg-gray-900 dark:group-hover:bg-white text-gray-900 group-hover:text-white dark:text-white dark:group-hover:text-black">
                                    <Mail className="h-5 w-5" strokeWidth={1} />
                                </div>
                                <div className="pt-1">
                                    <h3 className="font-cinzel tracking-widest text-sm text-gray-900 dark:text-white uppercase mb-2">Direct Correspondence</h3>
                                    <p className="text-xs text-gray-500 font-light tracking-wide">contact@aki.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6 group">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-gray-200 dark:border-white/10 bg-transparent transition-colors group-hover:bg-gray-900 dark:group-hover:bg-white text-gray-900 group-hover:text-white dark:text-white dark:group-hover:text-black">
                                    <MessageSquare className="h-5 w-5" strokeWidth={1} />
                                </div>
                                <div className="pt-1">
                                    <h3 className="font-cinzel tracking-widest text-sm text-gray-900 dark:text-white uppercase mb-2">Private Chat</h3>
                                    <p className="text-xs text-gray-500 font-light tracking-wide">Available via your executive dashboard during market hours.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6 group">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-gray-200 dark:border-white/10 bg-transparent transition-colors group-hover:bg-gray-900 dark:group-hover:bg-white text-gray-900 group-hover:text-white dark:text-white dark:group-hover:text-black">
                                    <MapPin className="h-5 w-5" strokeWidth={1} />
                                </div>
                                <div className="pt-1">
                                    <h3 className="font-cinzel tracking-widest text-sm text-gray-900 dark:text-white uppercase mb-2">Atelier Address</h3>
                                    <p className="text-xs text-gray-500 font-light tracking-wide">The Penthouse, Victoria Island, <br />Lagos, Nigeria.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="border border-gray-200 bg-transparent p-8 dark:border-white/10 sm:p-12 relative overflow-hidden">
                        {/* Decorative background logo */}
                        <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none select-none">
                            <span className="font-cinzel text-[20rem] font-bold">A.</span>
                        </div>

                        <h2 className="text-2xl font-cinzel text-gray-900 dark:text-white font-medium tracking-wide mb-10 relative z-10">Request an Invitation</h2>

                        <form className="space-y-8 relative z-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div>
                                    <input type="text" className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400" placeholder="First Name" />
                                </div>
                                <div>
                                    <input type="text" className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400" placeholder="Family Name" />
                                </div>
                            </div>

                            <div>
                                <select className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light text-gray-500 appearance-none rounded-none">
                                    <option value="" disabled selected>Nature of Inquiry</option>
                                    <option className="text-gray-900">Boutique Application</option>
                                    <option className="text-gray-900">VIP Sourcing</option>
                                    <option className="text-gray-900">Press / Editorial</option>
                                    <option className="text-gray-900">Corporate Identity</option>
                                </select>
                            </div>

                            <div>
                                <textarea rows={4} className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400 resize-none" placeholder="Provide details of your collection or inquiry..."></textarea>
                            </div>

                            <button className="w-full border border-gray-900 bg-gray-900 px-10 py-4 text-xs font-semibold tracking-widest text-white uppercase transition-all duration-500 hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white mt-4">
                                Secure Transmission
                            </button>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    );
}
