import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    content: "Before AKI, I was managing orders in my DMs and constantly mixing up inventory. Now I have a professional link, and my sales have doubled because customers trust my store more.",
    author: "Amara K.",
    role: "Owner, ThriftElegance",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=200&q=80",
  },
  {
    content: "The setup was unbelievably fast. I'm not technical at all, but I had my store looking beautiful in about 10 minutes. The dark mode support looks so premium for my tech products.",
    author: "David O.",
    role: "Founder, GadgetHaven",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Trusted by local business owners.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((item, index) => (
            <div key={index} className="flex flex-col justify-between rounded-2xl bg-gray-50 p-8 dark:bg-gray-900">
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg font-medium italic text-gray-700 dark:text-gray-300 leading-relaxed">&quot;{item.content}&quot;</p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src={item.image} alt={item.author} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{item.author}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}