import HeroSection from "@/components/hero/HeroSection";
import StatsSection from "@/components/hero/Statssection";

export default function Home() {
  return (
    <div className="relative ">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: "url('/images/globe.png')" }}
      />
      <div className="relative z-10">
        <HeroSection />
        <StatsSection />
      </div>
      <main></main>
    </div>
  );
}
