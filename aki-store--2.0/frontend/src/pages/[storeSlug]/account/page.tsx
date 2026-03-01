import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faIcons, faEnvelope, faBookOpen, faSpinner } from '@fortawesome/free-solid-svg-icons';

import { apiGetStoreBySlug } from "../../../services/api";
import ProductCard from "../../../components/ProductCard";

export default function StoreOwnerProfilePage() {
    const { storeSlug } = useParams();
    const [activeTab, setActiveTab] = useState("pieces");
    const [store, setStore] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStore = async () => {
            try {
                if (storeSlug) {
                    const data = await apiGetStoreBySlug(storeSlug);
                    setStore(data);
                }
            } catch (err) {
                console.error("Failed to fetch store:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStore();
    }, [storeSlug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] dark:bg-[#050505]">
                <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!store) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] dark:bg-[#050505]">
                <p className="font-cinzel text-gray-500 uppercase tracking-widest">Architect not found.</p>
            </div>
        );
    }

    const { ownerName, designation, manifesto, contactEmail, socialInstagram, socialTwitter, logo, products } = store;
    const curatedProducts = products?.slice(0, 4) || [];
    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#050505] px-4 py-24 sm:px-6 lg:px-8 transition-colors">
            <div className="mx-auto max-w-6xl">

                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16 pb-12 border-b border-gray-200 dark:border-white/10 transition-colors">
                    <div className="flex items-center gap-8">
                        <div className="relative h-28 w-28 overflow-hidden bg-gray-100 dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10">
                            <img src={logo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80"} alt={ownerName || "Owner"} className="object-cover w-full h-full" />
                        </div>
                        <div>
                            <h1 className="font-cinzel text-4xl tracking-widest text-gray-900 dark:text-white uppercase mb-2">{ownerName}</h1>
                            <p className="text-gray-500 font-light tracking-[0.2em] text-xs uppercase">Creative Director • {designation}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">

                    {/* Sidebar Nav */}
                    <aside className="lg:col-span-1 space-y-2">
                        {[
                            { id: "pieces", label: "Curated Pieces", icon: faBox },
                            { id: "story", label: "Manifesto", icon: faBookOpen },
                            { id: "connect", label: "Connect", icon: faEnvelope },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex w-full items-center gap-4 border-l-2 py-4 pl-4 text-xs font-semibold tracking-widest uppercase transition-all ${activeTab === tab.id ? "border-gray-900 text-gray-900 dark:border-white dark:text-white bg-gray-50 dark:bg-white/5" : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:border-white/10 dark:hover:text-white"}`}
                            >
                                <FontAwesomeIcon icon={tab.icon} className="h-4 w-4" />
                                {tab.label}
                            </button>
                        ))}
                    </aside>

                    {/* Main Content Area */}
                    <main className="lg:col-span-3">

                        {activeTab === "pieces" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <h2 className="font-cinzel text-2xl tracking-widest uppercase text-gray-900 dark:text-white mb-10">Curated Pieces by {ownerName}</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    {curatedProducts.map((product: any) => (
                                        <ProductCard key={product._id || product.id} {...product} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "story" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <h2 className="font-cinzel text-2xl tracking-widest uppercase text-gray-900 dark:text-white mb-10">Director&apos;s Manifesto</h2>

                                <div className="border border-gray-200 dark:border-white/10 p-8 sm:p-12 bg-transparent text-center shadow-lg">
                                    <h3 className="font-cinzel text-xl text-gray-900 dark:text-white mb-6 tracking-widest uppercase">The Vision</h3>
                                    <p className="text-gray-600 dark:text-gray-400 font-light tracking-wide leading-relaxed max-w-2xl mx-auto italic text-lg lg:text-xl">
                                        &quot;{manifesto}&quot;
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === "connect" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <h2 className="font-cinzel text-2xl tracking-widest uppercase text-gray-900 dark:text-white mb-10">Connect & Inquiry</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="border border-gray-200 dark:border-white/10 p-8 text-center bg-transparent group hover:border-gray-900 dark:hover:border-white transition-all">
                                        <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6 mx-auto mb-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                                        <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Direct Inquiries</span>
                                        <a href={`mailto:${contactEmail}`} className="font-cinzel text-lg tracking-widest text-gray-900 dark:text-white">{contactEmail || "contact@aki.com"}</a>
                                    </div>
                                    <div className="border border-gray-200 dark:border-white/10 p-8 text-center bg-transparent group hover:border-gray-900 dark:hover:border-white transition-all">
                                        <FontAwesomeIcon icon={faIcons} className="h-6 w-6 mx-auto mb-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                                        <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Visual Diary</span>
                                        <a href={`https://instagram.com/${socialInstagram?.replace('@', '')}`} target="_blank" rel="noreferrer" className="font-cinzel text-lg tracking-widest text-gray-900 dark:text-white">{socialInstagram || "@aki_commerce"}</a>
                                    </div>
                                    <div className="col-span-1 md:col-span-2 border border-gray-200 dark:border-white/10 p-8 text-center bg-transparent group hover:border-gray-900 dark:hover:border-white transition-all">
                                        <FontAwesomeIcon icon={faIcons} className="h-6 w-6 mx-auto mb-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                                        <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Thoughts & Updates</span>
                                        <a href={`https://twitter.com/${socialTwitter?.replace('@', '')}`} target="_blank" rel="noreferrer" className="font-cinzel text-lg tracking-widest text-gray-900 dark:text-white">{socialTwitter || "@aki_commerce"}</a>
                                    </div>
                                </div>
                            </div>
                        )}

                    </main>
                </div>

            </div>
        </div>
    );
}
