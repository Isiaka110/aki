import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function NewsletterCta() {
  return (
    <section className="py-24 sm:py-32 bg-[#fcfcfc] dark:bg-[#050505] border-t border-gray-200 dark:border-white/10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">

        <span className="mb-4 block text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase">
          Exclusive Access
        </span>

        <h2 className="font-cinzel text-3xl sm:text-5xl text-gray-900 dark:text-white font-medium mb-6">
          The AKI Newsletter
        </h2>

        <p className="mx-auto max-w-xl text-sm sm:text-base text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-12">
          Subscribe to our newsletter for the latest product updates, ecommerce strategies, and exclusive growth tips.
        </p>

        <form className="flex flex-col sm:flex-row items-center justify-center gap-0 w-full max-w-2xl mx-auto border border-gray-900 dark:border-white p-1">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-transparent px-6 py-4 text-sm text-gray-900 placeholder-gray-500 focus:outline-none dark:text-white dark:placeholder-gray-600 rounded-none sm:w-auto flex-1 font-light tracking-wide"
            required
          />
          <button
            type="submit"
            className="group flex w-full sm:w-auto items-center justify-center gap-2 bg-gray-900 px-8 py-4 text-xs font-semibold tracking-widest text-white uppercase transition-all duration-500 hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 mt-2 sm:mt-0"
          >
            Subscribe
            <FontAwesomeIcon icon={faArrowRight}  className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <p className="mt-8 text-xs text-gray-400 font-light tracking-wide uppercase">
          Unsubscribe at any moment.
        </p>

      </div>
    </section>
  );
}