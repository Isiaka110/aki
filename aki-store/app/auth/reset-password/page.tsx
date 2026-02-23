import Link from "next/link";
import { Store } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="text-center">
          <Store className="mx-auto h-10 w-10 text-gray-900 dark:text-white" />
          <h2 className="mt-6 text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Reset your password
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="/dashboard">
          <div className="space-y-4 rounded-md shadow-sm">
            <input id="email" name="email" type="email" required placeholder="Email address"
              className="relative block w-full rounded-lg border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-white dark:focus:ring-white sm:text-sm transition-colors"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/auth/login" className="font-bold text-gray-900 hover:underline dark:text-white">Back to login</Link>
            </div>
          </div>
          <button type="submit" className="flex w-full justify-center rounded-full bg-black px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Reset Password
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account? <Link href="/auth/signup" className="font-bold text-gray-900 hover:underline dark:text-white">Sign up</Link>
        </p>
      </div>
    </div>
  );
}