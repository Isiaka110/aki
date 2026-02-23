import { Mail } from "lucide-react";

export default function NewsletterCta() {
  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-gray-900 px-6 py-16 dark:bg-white md:px-12 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Mail className="mx-auto h-12 w-12 text-white dark:text-gray-900 mb-6" />
          <h2 className="text-3xl font-black tracking-tight text-white dark:text-gray-900 sm:text-4xl">
            Be the first to know.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-300 dark:text-gray-600">
            Join our newsletter to receive platform updates, seller tips, and exclusive launch promotions.
          </p>
          
          <form className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full max-w-md rounded-full border-0 bg-white/10 px-6 py-4 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 dark:bg-gray-100 dark:text-gray-900 dark:placeholder-gray-500 dark:focus:ring-gray-900/20 sm:w-80"
              required
            />
            <button
              type="submit"
              className="w-full rounded-full bg-white px-8 py-4 text-base font-bold text-gray-900 transition-transform hover:scale-105 dark:bg-gray-900 dark:text-white sm:w-auto"
            >
              Subscribe Now
            </button>
          </form>
          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            We care about your data in our privacy policy. No spam.
          </p>
        </div>
      </div>
    </section>
  );
}