import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FinalCTA from "@/components/sections/FinalCTA";
import { about } from "@/data/content";

export const metadata: Metadata = {
  title: "About",
  description: "Why Eat Your Green exists — the gentle, pressure-free approach behind the books.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <PageHero title={about.heading} />
      <section className="section pt-4 bg-cream">
        <div className="container-page max-w-3xl">
          <Reveal>
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-white rounded-card border border-mist shadow-card p-6 md:p-8">
              <div className="relative h-28 w-28 md:h-36 md:w-36 shrink-0 rounded-full overflow-hidden border-2 border-leaf">
                {/* TODO: real author photo */}
                <Image src="/images/author.png" alt="Author portrait" fill sizes="144px" className="object-cover" />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-heading font-semibold text-brand">{about.authorName}</p>
                <p className="mt-2 text-ink/80">{about.authorBio}</p>
              </div>
            </div>
          </Reveal>
          <div className="mt-8 space-y-4 prose-measure mx-auto">
            {about.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-ink/85">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </main>
  );
}
