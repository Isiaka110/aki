import Link from "next/link";
import { Store } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="text-center">
          <Store className="mx-auto h-10 w-10 text-gray-900 dark:text-white" />
          <h2 className="mt-6 text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Create your AKI account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Start selling in minutes. Completely free.
          </p>
        </div>
        <form className="mt-8 space-y-6" action="/onboarding">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input id="email" name="email" type="email" required placeholder="Email address"
                className="relative block w-full rounded-lg border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-white dark:focus:ring-white sm:text-sm transition-colors"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" required placeholder="Password"
                className="relative block w-full rounded-lg border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-white dark:focus:ring-white sm:text-sm transition-colors"
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black dark:border-gray-700 dark:bg-gray-900 dark:checked:bg-white" />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              I agree to the <Link href="/terms" className="font-bold underline hover:text-gray-600 dark:hover:text-gray-400">Terms & Conditions</Link>
            </label>
          </div>

          <button type="submit" className="flex w-full justify-center rounded-full bg-black px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account? <Link href="/auth/login" className="font-bold text-gray-900 hover:underline dark:text-white">Log in</Link>
        </p>
      </div>
    </div>
  );
}