import Image from "next/image";
import { empathy } from "@/data/content";
import { getContent } from "@/lib/site-data";
import Reveal from "@/components/Reveal";

export default async function EmpathyReframe() {
  const c = await getContent();
  return (
    <section className="section bg-cream">
      <div className="container-page grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <Reveal className="order-2 md:order-1">
          <div className="relative aspect-[5/4] rounded-card overflow-hidden shadow-card border border-mist">
            <Image
              src={c.empathyImage || "/images/empathy.jpg"}
              alt="A parent sharing a calm, gentle moment with their child"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal className="order-1 md:order-2">
          <h2 className="text-h2 md:text-h2-lg text-forest">{c.empathyHeading || empathy.heading}</h2>
          <p className="mt-4 text-ink/80 prose-measure">{c.empathyBody || empathy.body}</p>
        </Reveal>
      </div>
    </section>
  );
}
