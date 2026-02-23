import { Mail, MessageSquare, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Left: Contact Info */}
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white sm:text-6xl text-pretty">
                            Let&apos;s talk about <br /> your <span className="text-gray-500">Business.</span>
                        </h1>
                        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-md">
                            Whether you are a vendor looking to scale or a shopper with a question, our team is here to help you navigate the AKI experience.
                        </p>

                        <div className="mt-12 space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-900">
                                    <Mail className="h-6 w-6 text-gray-900 dark:text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">Email Us</h3>
                                    <p className="text-gray-500">support@aki-market.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-900">
                                    <MessageSquare className="h-6 w-6 text-gray-900 dark:text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">Live Chat</h3>
                                    <p className="text-gray-500">Available Mon-Fri, 9am - 5pm. Check the bottom right of the dashboard.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-900">
                                    <MapPin className="h-6 w-6 text-gray-900 dark:text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">HQ Location</h3>
                                    <p className="text-gray-500">Innovation Hub, Level 4, <br />Victoria Island, Lagos.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="rounded-[3rem] bg-gray-50 p-8 dark:bg-gray-900 sm:p-12 shadow-2xl">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Send a Message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                                    <input type="text" className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-black focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                                    <input type="text" className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-black focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white" placeholder="Doe" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                                <select className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-black focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white">
                                    <option>Merchant Inquiry</option>
                                    <option>Shopping Help</option>
                                    <option>Bug Report</option>
                                    <option>Partnership</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                                <textarea rows={5} className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-black focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white" placeholder="How can we help you today?"></textarea>
                            </div>
                            <button className="w-full bg-black text-white dark:bg-white dark:text-black font-black py-4 rounded-full transition-transform hover:scale-105">
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    );
}
