import { Hero } from "@/components/home/hero";
import {
  TrustStrip, ServicesGrid, PopularRoutes, HowItWorks, WhyHTG, FinalCTA,
} from "@/components/home/home-sections";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <PopularRoutes />
      <HowItWorks />
      <WhyHTG />
      <FinalCTA />
    </>
  );
}
