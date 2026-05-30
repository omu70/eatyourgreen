import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FinalCTA from "@/components/sections/FinalCTA";
import { about, author } from "@/data/content";

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
        <div className="container-page max-w-2xl">
          <div className="space-y-4 prose-measure mx-auto">
            {about.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-ink/85">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-8 text-center">
              <Link href="/author" className="text-brand font-semibold underline">
                Meet the author, {author.name} →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
      <FinalCTA />
    </main>
  );
}
