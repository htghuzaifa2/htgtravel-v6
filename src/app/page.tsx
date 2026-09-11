import { Hero } from "@/components/home/hero";
import {
  TrustStrip, BentoGrid, StatsSection, PopularRoutes, HowItWorks, WhyHTG, FinalCTA,
} from "@/components/home/home-sections";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <StatsSection />
      <BentoGrid />
      <PopularRoutes />
      <HowItWorks />
      <WhyHTG />
      <FinalCTA />
    </>
  );
}
