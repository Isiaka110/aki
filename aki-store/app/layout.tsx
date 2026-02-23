// app/layout.tsx
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "AKI - Discover Local Businesses",
  description: "The premier platform for small business owners.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
        <Providers>
          {/* Absolutely NO global UI here anymore. Just the children. */}
          {children}
        </Providers>
      </body>
    </html>
  );
}