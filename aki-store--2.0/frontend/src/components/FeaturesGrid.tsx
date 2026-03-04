import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

export default function FeaturesGrid() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: "Signature URL",
      description: "Secure a bespoke aki.com/your-brand address. Establish immediate credibility without sharing space on crowded feeds.",
      icon: (
        <FontAwesomeIcon icon={faShoppingBag} className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" />
      ),
    },
    {
      title: "Precision Control",
      description: "Manage exclusive collections, limited drops, and pricing from an elegantly engineered dashboard designed for high volume.",
      icon: (
        <FontAwesomeIcon icon={faChartBar} className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" />
      ),
    },
    {
      title: "Verified Prestige",
      description: "Accumulate unparalleled social proof. Display verified reviews that convert passive admirers into loyal clientele.",
      icon: mounted ? (
        <i
          className={`${resolvedTheme === 'dark' ? 'fi fi-rr-badge-check' : 'fi fi-ss-badge-check'
            } text-2xl leading-none transition-transform duration-500 group-hover:scale-110`}
        />
      ) : (
        <i className="fi fi-ss-badge-check text-2xl leading-none" />
      ),
    },
  ];

  return (
    <section ref={sectionRef} className="bg-[#fcfcfc] py-24 sm:py-32 dark:bg-[#050505] relative border-b border-gray-200 dark:border-white/10">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-24 max-w-3xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="mb-4 block text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase">
            Platform Features
          </span>
          <h2 className="font-cinzel text-4xl sm:text-6xl text-gray-900 dark:text-white font-medium leading-[1.1] tracking-wide mb-6">
            Built for Scale
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-light max-w-xl mx-auto">
            We handle the infrastructure, hosting, and payments so you can focus entirely on scaling your business and delighting your customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative flex flex-col text-center items-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              style={{ transitionDelay: inView ? `${index * 150}ms` : '0ms' }}
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-none bg-transparent border border-gray-900 text-gray-900 transition-all duration-500 group-hover:bg-gray-900 group-hover:text-white dark:border-white dark:text-white dark:group-hover:bg-white dark:group-hover:text-black">
                {feature.icon}
              </div>

              <h3 className="mb-4 font-cinzel text-2xl text-gray-900 dark:text-white tracking-wide">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}