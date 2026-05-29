import Hero from "@/components/sections/Hero";
import Banner from "@/components/sections/Banner";
import TrustBadges from "@/components/sections/TrustBadges";
import BooksShowcase from "@/components/sections/BooksShowcase";
import HowToGet from "@/components/sections/HowToGet";
import MadeForIndia from "@/components/sections/MadeForIndia";
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
        <Banner src="/images/banner-no-pressure.jpg" alt="No pressure. No bribing. No food fights. Small changes for lasting habits." />
        <BooksShowcase />
        <HowToGet />
        <PainChecklist />
        <EmpathyReframe />
        <MethodSteps />
        <MadeForIndia />
        <HowItWorks />
        <Banner src="/images/banner-toolkit.jpg" alt="End food struggles without forcing — games, trackers and gentle routines parents actually use." />
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
