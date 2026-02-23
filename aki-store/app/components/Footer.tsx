import Link from "next/link";

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Seller Policy', href: '/seller-policy' },
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Onboarding Guide', href: '/onboarding' },
    { name: 'Login', href: '/auth/login' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Column */}
          <div className="space-y-4 xl:col-span-1">
             <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
                AKI.
            </span>
            <p className="text-base text-gray-500 dark:text-gray-400 max-w-xs">
              Empowering local businesses with premium digital storefronts.
            </p>
          </div>
          
          {/* Links Grid */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold tracking-wider uppercase text-gray-900 dark:text-white">Company</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerLinks.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-bold tracking-wider uppercase text-gray-900 dark:text-white">Legal</h3>
                 <ul role="list" className="mt-4 space-y-3">
                  {footerLinks.legal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold tracking-wider uppercase text-gray-900 dark:text-white">Support</h3>
                 <ul role="list" className="mt-4 space-y-3">
                  {footerLinks.support.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} AKI Market. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}