import FeaturedJobsSection from "@/components/Home/FeaturedJobs";
import HeroSection from "@/components/Home/HeroSection";
import StatsSection from "@/components/Home/Statssection";

export default function Home() {
  return (
    <div className="relative ">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: "url('/images/globe.png')" }}
      />
      <div className="relative z-0">
        <HeroSection />
        <StatsSection />
        <FeaturedJobsSection />
      </div>
      <main></main>
    </div>
  );
}
