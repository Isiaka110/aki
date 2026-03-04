import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { apiGetStoreBySlug } from "../../../services/api";

export default function StorePrivacyPage() {
    const { storeSlug } = useParams();
    const [store, setStore] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!storeSlug) return;
        apiGetStoreBySlug(storeSlug)
            .then(setStore)
            .catch(() => setStore(null))
            .finally(() => setLoading(false));
    }, [storeSlug]);

    const storeName = store?.storeName || storeSlug || "This Store";
    const ownerName = store?.settings?.ownerName || "The Store Owner";

    return (
        <div className="bg-[#fcfcfc] dark:bg-[#050505] min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 transition-colors">
            <div className="mx-auto max-w-4xl">

                {loading ? (
                    <div className="flex justify-center py-32">
                        <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 animate-spin text-gray-400" />
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="text-center mb-16">
                            <span className="mb-4 block text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase">
                                {storeName}
                            </span>
                            <h1 className="mb-6 text-4xl sm:text-6xl font-cinzel text-gray-900 dark:text-white font-medium tracking-wide">
                                Privacy Policy
                            </h1>
                            <div className="flex items-center justify-center gap-2 text-gray-400">
                                <FontAwesomeIcon icon={faShieldHalved} className="h-4 w-4" />
                                <p className="text-xs font-light tracking-[0.2em] uppercase">
                                    Effective Date: February 2026 • {storeName} Store Policy
                                </p>
                            </div>
                        </div>

                        {/* Store-specific notice */}
                        <div className="border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 p-6 mb-16">
                            <p className="text-xs font-light tracking-wide text-gray-600 dark:text-gray-400 leading-relaxed">
                                This Privacy Policy applies specifically to the <strong className="font-semibold text-gray-900 dark:text-white">{storeName}</strong> boutique, operated by <strong className="font-semibold text-gray-900 dark:text-white">{ownerName}</strong>, hosted on the AKI Commerce platform. By visiting or making a purchase from this store, you agree to the collection and use of information as outlined below.
                            </p>
                        </div>

                        <div className="prose prose-gray max-w-none dark:prose-invert">
                            <div className="space-y-16">

                                <section>
                                    <h2 className="text-xl font-cinzel text-gray-900 dark:text-white tracking-widest uppercase mb-4">I. Information We Collect</h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm tracking-wide">
                                        When you interact with the <strong className="text-gray-800 dark:text-gray-200">{storeName}</strong> storefront, we may collect: your name, delivery address, email address, and payment method details (processed securely via Paystack). Browsing data and session identifiers may also be collected to improve your shopping experience.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-cinzel text-gray-900 dark:text-white tracking-widest uppercase mb-4">II. How We Use Your Information</h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm tracking-wide">
                                        Your information is used exclusively to process and fulfill your orders, send order confirmation and updates, and provide customer support. {ownerName} may contact you regarding your purchase, but will never share or sell your data to unaffiliated third parties.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-cinzel text-gray-900 dark:text-white tracking-widest uppercase mb-4">III. Payment Security</h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm tracking-wide">
                                        All payment processing is handled by Paystack, a PCI-DSS compliant payment gateway. {storeName} does not store raw payment card details on its servers. Transactions are encrypted end-to-end and comply with international payment security standards.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-cinzel text-gray-900 dark:text-white tracking-widest uppercase mb-4">IV. Cookies &amp; Tracking</h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm tracking-wide">
                                        We use session cookies to maintain your cart state and browsing preferences on the AKI platform. These are strictly functional and are not used for cross-site advertising or behavioral profiling.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-cinzel text-gray-900 dark:text-white tracking-widest uppercase mb-4">V. KYC &amp; Global Data Use</h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm tracking-wide">
                                        In compliance with Global Data Use Acts, the AKI Platform collects sensitive identification metrics such as National Identification Numbers (NIN) and corporate registration documents from store owners for KYC verification. This data is processed via an encrypted layer and purged after Super Admin authorization within a standard 24-hour window. Buyers are not subject to KYC requirements.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-cinzel text-gray-900 dark:text-white tracking-widest uppercase mb-4">VI. Your Rights</h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm tracking-wide">
                                        You have the right to request access to, correction of, or deletion of your personal data at any time. To exercise these rights, contact {storeName} directly at the store's listed email address, or submit a request through the AKI Platform support channel.
                                    </p>
                                </section>

                            </div>
                        </div>

                        {/* Footer note */}
                        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/10">
                            <p className="text-xs font-light text-gray-400 text-center tracking-widest uppercase">
                                This policy is provided by {storeName} and hosted on the AKI Commerce Platform. Platform-wide policies are available at <a href="/privacy" className="underline hover:text-gray-600 dark:hover:text-gray-200 transition-colors">aki.com/privacy</a>.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
