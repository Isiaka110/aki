import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faFileContract } from "@fortawesome/free-solid-svg-icons";
import { apiGetStoreBySlug } from "../../../services/api";

export default function StoreTermsPage() {
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
                                Terms &amp; Conditions
                            </h1>
                            <div className="flex items-center justify-center gap-2 text-gray-400">
                                <FontAwesomeIcon icon={faFileContract} className="h-4 w-4" />
                                <p className="text-xs font-light tracking-[0.2em] uppercase">
                                    Effective Date: February 2026 • {storeName} Seller Agreement
                                </p>
                            </div>
                        </div>

                        {/* Store-specific notice */}
                        <div className="border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 p-6 mb-16">
                            <p className="text-xs font-light tracking-wide text-gray-600 dark:text-gray-400 leading-relaxed">
                                These Terms & Conditions govern your use of the <strong className="font-semibold text-gray-900 dark:text-white">{storeName}</strong> boutique, operated by <strong className="font-semibold text-gray-900 dark:text-white">{ownerName}</strong> via the AKI Commerce platform. By placing an order or using this store, you agree to these terms in their entirety.
                            </p>
                        </div>

                        <div className="prose prose-gray max-w-none dark:prose-invert">
                            <div className="space-y-16">

                                <section>
                                    <h2 className="text-xl font-cinzel text-gray-900 dark:text-white tracking-widest uppercase mb-4">I. Store Ownership &amp; Responsibility</h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm tracking-wide">
                                        <strong className="text-gray-800 dark:text-gray-200">{storeName}</strong> is an independently operated boutique within the AKI Commerce ecosystem. {ownerName} holds full responsibility for inventory accuracy, product quality, fulfillment timelines, and all buyer communications. AKI Commerce provides the digital infrastructure but does not hold, manage, or dispatch physical inventory on behalf of this store.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-cinzel text-gray-900 dark:text-white tracking-widest uppercase mb-4">II. Orders &amp; Fulfillment</h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm tracking-wide">
                                        By completing a purchase, you enter a direct agreement with {storeName}. All orders are subject to stock availability. {ownerName} will make every effort to fulfill orders promptly. In the case of cancellation or unavailability, buyers will be notified and refunded within a reasonable timeframe as communicated by the store.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-cinzel text-gray-900 dark:text-white tracking-widest uppercase mb-4">III. Returns &amp; Exchanges</h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm tracking-wide">
                                        Return and exchange policies are determined by {storeName} independently. Please contact the store directly before placing an order if you have specific concerns about return eligibility or conditions. Disputes not resolved directly with the store may be escalated through the AKI Platform Integrity team.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-cinzel text-gray-900 dark:text-white tracking-widest uppercase mb-4">IV. Product Authenticity</h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm tracking-wide">
                                        All products listed by {storeName} are warranted by the seller to be genuine, accurately described, and lawfully offered for sale. AKI Commerce prohibits the listing of counterfeit, stolen, or misrepresented merchandise. Verified violations result in immediate account removal and potential legal referral.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-cinzel text-gray-900 dark:text-white tracking-widest uppercase mb-4">V. KYC &amp; Global Data Use Act</h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm tracking-wide">
                                        Account creation and boutique registration requires agreement to AKI Platform's Global Data Use Act. Store owners consent to submission of identity documents for KYC verification (NIN, Driver's License, or CAC registration). This data is encrypted, temporarily stored under international data protection guidelines, and purged upon Super Admin authorization (typically within 24 hours). Continued platform usage implies continuous consent.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-cinzel text-gray-900 dark:text-white tracking-widest uppercase mb-4">VI. Limitation of Liability</h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm tracking-wide">
                                        AKI Commerce acts solely as the hosting and payment intermediary. Neither AKI Commerce nor {storeName} shall be liable for losses arising from delayed delivery due to force majeure events, third-party logistics failures, or buyer-provided inaccurate delivery information. Maximum liability in any case is limited to the value of the specific transaction in dispute.
                                    </p>
                                </section>

                            </div>
                        </div>

                        {/* Footer note */}
                        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/10">
                            <p className="text-xs font-light text-gray-400 text-center tracking-widest uppercase">
                                These terms are issued by {storeName} and hosted on the AKI Commerce Platform. Platform-wide terms are available at <a href="/terms" className="underline hover:text-gray-600 dark:hover:text-gray-200 transition-colors">aki.com/terms</a>.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
