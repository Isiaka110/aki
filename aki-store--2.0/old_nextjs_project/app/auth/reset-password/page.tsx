import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen bg-[#fcfcfc] dark:bg-[#050505] flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-8 left-8 lg:top-12 lg:left-12">
        <Link href="/" className="inline-block group">
          <span className="font-cinzel text-2xl font-medium tracking-[0.2em] text-gray-900 dark:text-white uppercase transition-opacity hover:opacity-70">
            AKI.
          </span>
        </Link>
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <h2 className="font-cinzel text-4xl text-gray-900 dark:text-white tracking-wide mb-3">Recovery</h2>
          <p className="text-sm text-gray-500 font-light tracking-wide">Enter your correspondence address to regain access.</p>
        </div>

        <form className="space-y-8" action="/dashboard">
          <div>
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link href="/auth/login" className="flex items-center gap-2 text-xs font-light tracking-widest text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors uppercase">
              <ArrowLeft className="h-3 w-3" /> Return to Login
            </Link>
          </div>

          <button type="submit" className="w-full border border-gray-900 bg-gray-900 px-6 py-4 text-xs font-semibold tracking-widest text-white uppercase transition-all duration-500 hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white mt-8">
            Send Instructions
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-xs font-light text-gray-500 tracking-wide">
            Do not maintain a presence? <Link href="/auth/signup" className="text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 font-medium ml-1 transition-colors">Establish a Boutique</Link>
          </p>
        </div>
      </div>
    </div>
  );
}