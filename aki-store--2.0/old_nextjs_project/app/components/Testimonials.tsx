import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    content: "Building my online store with AKI gave my brand the scalable infrastructure and conversions I needed. It's an incredible platform.",
    author: "Amara K.",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&sat=-100",
  },
  {
    content: "Fast, reliable, and exceptionally scalable. Our growing business finally has an ecommerce platform that can handle our order volume.",
    author: "David O.",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&sat=-100",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-[#fcfcfc] dark:bg-[#050505] border-t border-gray-200 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <span className="mb-4 block text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase">
            Clientele
          </span>
          <h2 className="font-cinzel text-4xl sm:text-6xl text-gray-900 dark:text-white font-medium leading-[1.1] tracking-wide">
            Voices of <br /> Distinction
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24 lg:px-12">
          {testimonials.map((item, index) => (
            <div key={index} className="flex flex-col group items-center text-center">
              <div className="flex gap-2 mb-8 text-gray-900 dark:text-white">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current transition-transform duration-700 group-hover:rotate-180" />
                ))}
              </div>
              <p className="text-xl sm:text-2xl font-light text-gray-800 dark:text-gray-200 leading-relaxed tracking-wide mb-10 decoration-gray-200 dark:decoration-gray-800">
                &quot;{item.content}&quot;
              </p>

              <div className="flex flex-col items-center mt-auto">
                <div className="relative h-20 w-20 overflow-hidden rounded-full mb-6 border border-gray-200 dark:border-white/20 p-1">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image src={item.image} alt={item.author} fill className="object-cover grayscale transition-transform duration-1000 group-hover:scale-110" />
                  </div>
                </div>
                <h4 className="font-cinzel text-lg text-gray-900 dark:text-white tracking-widest uppercase">{item.author}</h4>
                <p className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase mt-2">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}