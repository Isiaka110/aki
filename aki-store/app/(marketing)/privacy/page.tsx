export default function PrivacyPage() {
    return (
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="mb-8 text-4xl font-black tracking-tighter text-gray-900 dark:text-white">
                Privacy Policy
            </h1>
            <div className="prose prose-gray max-w-none dark:prose-invert">
                <p className="text-gray-600 dark:text-gray-400">Last updated: February 2026</p>

                <div className="mt-8 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Information We Collect</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            When you create an AKI store, we collect your business name, contact details, and banking information for payouts. When you shop on any store, we collect your shipping address and email for order fulfillment. We do NOT store your full credit card details on our servers; payments are processed securely via industry-standard partners.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. How We Use Your Data</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Your data is used to maintain your store, fulfill your orders, and notify you of important platform updates. We may also use anonymized sales data to provide better business insights into market trends on AKI.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Cookies & Tracking</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            We use functional cookies to keep you logged in and manage your shopping cart across different sessions. We also use analytics cookies to understand how our platform is used so we can improve the design and performance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Data Sharing</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Your shipping details are shared with the specific merchant you buy from so they can deliver your item. Merchants are strictly prohibited from using this data for anything other than fulfilling your order. We do not sell your personal information to third-party marketers.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
