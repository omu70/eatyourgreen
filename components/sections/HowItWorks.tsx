import Image from "next/image";
import { howItWorks } from "@/data/content";
import Reveal from "@/components/Reveal";

export default function HowItWorks() {
  return (
    <section className="section bg-cream">
      <div className="container-page">
        <Reveal>
          <h2 className="text-h2 md:text-h2-lg text-forest text-center">{howItWorks.heading}</h2>
          <p className="mt-3 text-center text-ink/75 prose-measure mx-auto">{howItWorks.sub}</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {howItWorks.items.map((it, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <figure className="rounded-card overflow-hidden border border-mist shadow-card bg-white h-full">
                <div className="relative aspect-[4/3]">
                  {/* TODO: replace with your real photo */}
                  <Image src={it.img} alt={it.alt} fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
                </div>
                <figcaption className="p-3 text-sm text-ink/80 text-center">{it.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
