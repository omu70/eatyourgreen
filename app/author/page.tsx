import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FinalCTA from "@/components/sections/FinalCTA";
import { author } from "@/data/content";

export const metadata: Metadata = {
  title: "About the Author",
  description: `Meet ${author.name}, ${author.title}.`,
  alternates: { canonical: "/author" },
};

export default function AuthorPage() {
  return (
    <main>
      <PageHero title={`Meet ${author.name}`} subtitle={author.title} />
      <section className="section pt-4 bg-cream">
        <div className="container-page max-w-3xl">
          <Reveal>
            <div className="grid sm:grid-cols-[200px_1fr] gap-8 items-start bg-white rounded-card border border-mist shadow-card p-6 md:p-8">
              <div className="relative w-40 h-48 sm:w-full sm:h-56 mx-auto rounded-card overflow-hidden border border-mist bg-mist">
                {/* TODO: replace /images/author.jpg with the real photo of Prerna */}
                <Image src={author.photo} alt={author.name} fill sizes="200px" className="object-cover" />
              </div>
              <div>
                <h2 className="text-h3 md:text-h3-lg text-forest">{author.name}</h2>
                <p className="small text-ink/60">{author.title}</p>
                <div className="mt-4 space-y-3 text-ink/85">
                  {author.bio.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <FinalCTA />
    </main>
  );
}
