import Hero from "@/components/sections/Hero";
import TrustBadges from "@/components/sections/TrustBadges";
import BooksShowcase from "@/components/sections/BooksShowcase";
import PainChecklist from "@/components/sections/PainChecklist";
import EmpathyReframe from "@/components/sections/EmpathyReframe";
import MethodSteps from "@/components/sections/MethodSteps";
import HowItWorks from "@/components/sections/HowItWorks";
import ResultsTimeline from "@/components/sections/ResultsTimeline";
import BeforeAfter from "@/components/sections/BeforeAfter";
import SocialProof from "@/components/sections/SocialProof";
import Guarantee from "@/components/sections/Guarantee";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { HomeJsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <main>
        <Hero />
        <TrustBadges />
        <BooksShowcase />
        <PainChecklist />
        <EmpathyReframe />
        <MethodSteps />
        <HowItWorks />
        <ResultsTimeline />
        <BeforeAfter />
        <SocialProof />
        <Guarantee />
        <FAQ />
        <FinalCTA />
      </main>
    </>
  );
}
