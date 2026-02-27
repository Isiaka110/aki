import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata = {
  title: "AKI - Discover Local Businesses",
  description: "The premier platform for small business owners.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} antialiased bg-[#fcfcfc] text-gray-900 dark:bg-[#050505] dark:text-gray-100 transition-colors duration-300 font-sans`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}