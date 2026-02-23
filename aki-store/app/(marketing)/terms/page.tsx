export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-4xl font-black tracking-tight text-gray-900 dark:text-white">
        AKI Terms & Conditions
      </h1>
      <div className="prose prose-gray max-w-none dark:prose-invert">
        <p className="text-gray-600 dark:text-gray-400">Last updated: February 2026</p>
        
        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Your Store, Your Business</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              AKI provides the digital infrastructure (`aki.com/[store-name]`) to showcase your products, but you are solely responsible for your inventory, order fulfillment, and customer service. Any disputes regarding product quality or returns must be handled directly between you and your customers. AKI does not hold or ship physical inventory.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Content & Aesthetic Standards</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              To maintain the high-quality experience of the marketplace, all product images must clearly and accurately represent the item. You agree not to list prohibited, illegal, or counterfeit items. AKI reserves the right to remove products or suspend stores that violate safety guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Review Moderation & Honesty</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              You have the tools to moderate customer reviews. However, you agree to use this feature fairly. Artificially inflating ratings with fake reviews or excessively deleting legitimate critical feedback may result in a review audit or suspension.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}