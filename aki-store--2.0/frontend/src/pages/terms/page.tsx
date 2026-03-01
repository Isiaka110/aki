export default function TermsPage() {
  return (
    <div className="bg-[#fcfcfc] dark:bg-[#050505] min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <span className="mb-4 block text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase text-center">
          AKI Commerce
        </span>
        <h1 className="mb-16 text-4xl sm:text-6xl font-cinzel text-gray-900 dark:text-white font-medium tracking-wide text-center">
          Terms & Conditions
        </h1>

        <div className="prose prose-gray max-w-none dark:prose-invert">
          <p className="text-gray-500 font-light tracking-wide text-sm text-center mb-16 uppercase">
            Effective Date: February 2026
          </p>

          <div className="space-y-16">
            <section>
              <h2 className="text-xl font-cinzel text-gray-900 dark:text-white tracking-widest uppercase mb-4">I. Sovereign Boutiques</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm tracking-wide">
                AKI architects the digital infrastructure required to present your collections to the world. However, your boutique remains entirely your sovereign enterprise. You retain absolute control over and responsibility for inventory management, meticulous fulfillment, and direct client correspondence. AKI does not hold, manage, or dispatch physical assets on your behalf.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-cinzel text-gray-900 dark:text-white tracking-widest uppercase mb-4">II. Standards of Elegance</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm tracking-wide">
                To preserve the exclusivity and high-end atmosphere of our network, we demand absolute authenticity and elegance. Digital representations must faithfully capture the true nature of the physical piece. The cataloging of illicit, unverified, or counterfeit goods is strictly forbidden. We reserve the absolute right to suspend access for any entity that compromised the prestige of the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-cinzel text-gray-900 dark:text-white tracking-widest uppercase mb-4">III. Client Testimonials</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm tracking-wide">
                We grant you the executive tools necessary to curate public reception and testimonials. This privilege must be exercised with absolute integrity. Fabricating praise or systematically erasing verified client critiques constitutes a critical breach of trust, resulting in comprehensive review audits and potential severance from the network.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}