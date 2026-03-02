import HeroSection from "../components/HeroSection";
import FeaturesGrid from "../components/FeaturesGrid";
import Testimonials from "../components/Testimonials";
import NewsletterCta from "../components/NewsletterCta";
import FeaturedStores from "../components/FeaturedStores";
import HowItWorks from "../components/HowItWorks";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "AKI | Luxury Ecommerce Platform";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedStores />
      <HowItWorks />
      <FeaturesGrid />
      <Testimonials />
      <NewsletterCta />
    </div>
  );
}