import { ShoppingBag, BarChart3, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Your Own Boutique Link",
    description: "Stop sending customers to a messy feed. Get a clean `aki.com/your-brand` link that showcases your products beautifully.",
    icon: ShoppingBag,
  },
  {
    title: "Effortless Inventory Control",
    description: "Never oversell again. Manage stock levels, variations, and pricing from one simple dashboard, accessible on your phone.",
    icon: BarChart3,
  },
  {
    title: "Build Verified Trust",
    description: "Collect legitimate reviews from real buyers. Displaying social proof on your store page increases sales conversions instantly.",
    icon: ShieldCheck,
  },
];

export default function FeaturesGrid() {
  return (
    <section className="bg-gray-50 py-24 dark:bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl">
             Everything you need to run a modern business.
           </h2>
           <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
             We handle the tech so you can focus on your products.
           </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}