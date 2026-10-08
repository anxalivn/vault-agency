import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import StatsBand from "@/components/sections/StatsBand";
import Proofs from "@/components/sections/Proofs";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <StatsBand />
      <Proofs />
      <Process />
      <About />
      <CTA />
    </>
  );
}
