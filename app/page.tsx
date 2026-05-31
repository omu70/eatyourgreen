import Hero from "@/components/sections/Hero";
import Banner from "@/components/sections/Banner";
import TrustBadges from "@/components/sections/TrustBadges";
import BooksShowcase from "@/components/sections/BooksShowcase";
import HowToGet from "@/components/sections/HowToGet";
import MadeForIndia from "@/components/sections/MadeForIndia";
import PainChecklist from "@/components/sections/PainChecklist";
import EmpathyReframe from "@/components/sections/EmpathyReframe";
import MethodSteps from "@/components/sections/MethodSteps";
import BeforeAfter from "@/components/sections/BeforeAfter";
import HowItWorks from "@/components/sections/HowItWorks";
import ResultsTimeline from "@/components/sections/ResultsTimeline";
import LeadMagnet from "@/components/sections/LeadMagnet";
import SocialProof from "@/components/sections/SocialProof";
import WhatsAppCommunity from "@/components/sections/WhatsAppCommunity";
import Guarantee from "@/components/sections/Guarantee";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { HomeJsonLd } from "@/components/JsonLd";
import StickyCTA from "@/components/StickyCTA";
import { CHECKOUT } from "@/data/content";

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
        <BeforeAfter />
        <MadeForIndia />
        <HowItWorks />
        <Banner src="/images/banner-toolkit.jpg" alt="End food struggles without forcing — games, trackers and gentle routines parents actually use." />
        <ResultsTimeline />
        <LeadMagnet />
        <SocialProof />
        <WhatsAppCommunity />
        <Guarantee />
        <FAQ />
        <FinalCTA />
      </main>
      <StickyCTA
        price={399}
        href={CHECKOUT.guide}
        contentId="the-eat-your-green-guide"
        contentName="The Eat Your Green Guide"
        label="Get the Guide"
        triggerId="hero"
        hideAtId="books"
      />
    </>
  );
}
