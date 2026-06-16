import FeaturedJobsSection from "@/components/Home/FeaturedJobs";
import FeaturesSection from "@/components/Home/FeaturesSection";
import HeroBottom from "@/components/Home/HeroBottom";
import HeroSection from "@/components/Home/HeroSection";
import PricingSection from "@/components/Home/PricingSection";
import StatsSection from "@/components/Home/Statssection";


export default function Home() {
  return (
    <>
      <header
        className=" inset-0 z-0 bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: "url('/images/globe.png')" }}
      >
        <HeroSection />
        <StatsSection />
      </header>
      <main>
        <FeaturedJobsSection />
        <FeaturesSection />
        <PricingSection />
        <HeroBottom />
      </main>
    </>
  );
}
