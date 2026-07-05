import Hero from "@/components/sections/Hero";
import Discover from "@/components/sections/Discover";
import TrustBadges from "@/components/sections/TrustBadges";
import PainChecklist from "@/components/sections/PainChecklist";
import ParentsKidsPain from "@/components/sections/ParentsKidsPain";
import EmpathyReframe from "@/components/sections/EmpathyReframe";
import MethodSteps from "@/components/sections/MethodSteps";
import BeforeAfter from "@/components/sections/BeforeAfter";
import BooksShowcase from "@/components/sections/BooksShowcase";
import ResultsTimeline from "@/components/sections/ResultsTimeline";
import StatsBand from "@/components/sections/StatsBand";
import HowToGet from "@/components/sections/HowToGet";
import LeadMagnet from "@/components/sections/LeadMagnet";
import AuthorStrip from "@/components/sections/AuthorStrip";
import FounderVideo from "@/components/sections/FounderVideo";
import Testimonials from "@/components/sections/Testimonials";
import WhatsAppCommunity from "@/components/sections/WhatsAppCommunity";
import Guarantee from "@/components/sections/Guarantee";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import StickyCTA from "@/components/StickyCTA";
import { HomeJsonLd } from "@/components/JsonLd";
import { CHECKOUT } from "@/data/content";
import { getProducts, getContent } from "@/lib/site-data";

export default async function Home() {
  const products = await getProducts();
  const c = await getContent();
  // Live bundle price from admin — never hard-coded, so price edits flow everywhere.
  const bundle =
    products.find((b) => b.slug.includes("toolkit") || b.slug.includes("complete")) ||
    products.find((b) => b.accent === "gold");
  const bundlePrice = bundle?.price ?? 799;
  return (
    <>
      <HomeJsonLd />
      <main>
        {/* 1. Hero (headline + subtitle + what you'll discover) */}
        <Hero h1={c.heroH1} subhead={c.heroSubhead} trust={c.heroTrust} image={c.heroImage} discoverHeading={c.discoverHeading} discover={c.discover} bundlePrice={bundlePrice} />
        {/* 1. CTA + trust bar */}
        <TrustBadges />
        {/* What you'll discover — icon grid */}
        <Discover heading={c.discoverHeading} items={c.discover} />
        {/* 2. Does this sound like your dinner table? */}
        <PainChecklist />
        {/* 3. Parents and kids pain points */}
        <ParentsKidsPain />
        {/* 4. You're not a bad parent */}
        <EmpathyReframe />
        {/* 5. 4C method */}
        <MethodSteps />
        {/* 6. Before and After */}
        <BeforeAfter />
        {/* 7. Show the products */}
        <BooksShowcase books={products} offer={{ line: c.offerLine, note: c.offerNote }} />
        {/* 8. What changes and how soon */}
        <ResultsTimeline />
        {/* 9. 5000+ families */}
        <StatsBand />
        {/* 10. Getting it is simple */}
        <HowToGet />
        {/* 11. Lead magnet + sample on email */}
        <LeadMagnet heading={c.lmHeading} sub={c.lmSub} cta={c.lmCta} />
        {/* 11. About the author */}
        <AuthorStrip />
        {/* Founder video */}
        <FounderVideo />
        {/* 12. Testimonials */}
        <Testimonials />
        {/* 13. WhatsApp community */}
        <WhatsAppCommunity />
        {/* 14. 28-day money back */}
        <Guarantee />
        {/* 14. FAQ */}
        <FAQ />
        {/* 15. Final CTA */}
        <FinalCTA />
        {/* 16. Footer is in layout */}
      </main>
      <StickyCTA
        price={bundlePrice}
        href={CHECKOUT.toolkit}
        contentId="the-eat-your-green-complete-toolkit"
        contentName={bundle?.title || "Green Explorer Bundle"}
        label="Get the Bundle"
        triggerId="hero"
        hideAtId="books"
      />
    </>
  );
}
