import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { faqs } from "@/data/faq";
import { books } from "@/data/books";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about the books, downloads, pricing, and the 14-day money-back guarantee.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const all = [...faqs, ...books.flatMap((b) => b.faqs)];
  // de-dupe by question
  const seen = new Set<string>();
  const merged = all.filter((f) => (seen.has(f.q) ? false : (seen.add(f.q), true)));
  return (
    <main>
      <PageHero title="Frequently asked questions" subtitle="Everything you might want to know before you start." />
      <FAQ items={merged} heading="" />
      <FinalCTA />
    </main>
  );
}
