import HeroSection from "../components/HeroSection";
import FeaturesGrid from "../components/FeaturesGrid";
import Testimonials from "../components/Testimonials";
import NewsletterCta from "../components/NewsletterCta";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesGrid />
      <Testimonials />
      {/* We will add a Featured Stores section here later once we have real data */}
      <NewsletterCta />
    </div>
  );
}