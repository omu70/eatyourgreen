import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FinalCTA from "@/components/sections/FinalCTA";
import { author } from "@/data/content";

export const metadata: Metadata = {
  title: "Meet the Author",
  description: `${author.name} — ${author.title}. The creator of the Eat Your Green series.`,
  alternates: { canonical: "/author" },
};

export default function AuthorPage() {
  return (
    <main>
      <PageHero title="Meet the author" subtitle={author.title} />
      <section className="section pt-4 bg-cream">
        <div className="container-page max-w-4xl">
          <Reveal>
            <div className="grid md:grid-cols-[300px_1fr] gap-8 items-start bg-white rounded-card border border-mist shadow-card p-6 md:p-8">
              <div className="relative w-56 md:w-full aspect-[3/4] mx-auto rounded-card overflow-hidden border border-mist bg-mist">
                {/* TODO: replace /images/author.jpg with Prerna's real standing photo */}
                <Image src={author.photo} alt={author.name} fill sizes="300px" className="object-cover" />
              </div>
              <div>
                <h2 className="text-h2 md:text-h2-lg text-brand font-heading">{author.name}</h2>
                <p className="small text-ink/60">{author.title}</p>
                <div className="mt-4 space-y-3 text-ink/85">
                  {author.bio.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <blockquote className="mt-8 text-center">
              <p className="font-heading text-h3 md:text-h2 text-forest italic">
                &ldquo;{author.quote}&rdquo;
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 text-center text-ink/70 prose-measure mx-auto">{author.tagline}</p>
          </Reveal>
        </div>
      </section>
      <FinalCTA />
    </main>
  );
}
