import HeroSection from "../components/HeroSection";
import FeaturesGrid from "../components/FeaturesGrid";
import Testimonials from "../components/Testimonials";
import NewsletterCta from "../components/NewsletterCta";
import FeaturedStores from "../components/FeaturedStores";
import HowItWorks from "../components/HowItWorks";

export default function Home() {
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