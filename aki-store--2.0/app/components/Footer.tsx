import Link from "next/link";

const footerLinks = {
  platform: [
    { name: 'About', href: '/about' },
    { name: 'Collections', href: '/explore' },
    { name: 'Careers', href: '/contact' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Start a Boutique', href: '/auth/signup' },
    { name: 'Client Login', href: '/auth/login' },
    { name: 'Vendor Portal', href: '/store-admin' },
    { name: 'System Admin', href: '/auth/super-login' },
  ],
  legal: [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/privacy' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#fcfcfc] dark:bg-[#050505] border-t border-gray-200 dark:border-white/10 pt-20 pb-10" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Platform Footer
      </h2>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row justify-between items-start border-b border-gray-200 dark:border-white/10 pb-16 gap-12">

          {/* Brand Column */}
          <div className="flex flex-col md:w-1/3">
            <Link href="/" className="inline-block group mb-6">
              <span className="font-cinzel text-3xl font-medium tracking-[0.2em] text-gray-900 dark:text-white uppercase transition-opacity hover:opacity-70">
                AKI.
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light max-w-xs leading-relaxed tracking-wide">
              The premier destination for highly curated, independent digital boutiques. Experience commerce elevated.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full md:w-2/3">
            <div>
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-900 dark:text-white mb-6">Platform</h3>
              <ul role="list" className="space-y-4">
                {footerLinks.platform.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-xs font-light tracking-wide text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-900 dark:text-white mb-6">Services</h3>
              <ul role="list" className="space-y-4">
                {footerLinks.services.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-xs font-light tracking-wide text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-900 dark:text-white mb-6">Legal</h3>
              <ul role="list" className="space-y-4">
                {footerLinks.legal.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-xs font-light tracking-wide text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-light tracking-[0.1em] text-gray-400 uppercase">
            &copy; {new Date().getFullYear()} AKI Commerce. All rights reserved.
          </p>
          <div className="flex gap-6 text-[10px] font-light tracking-[0.1em] text-gray-400 uppercase">
            <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}