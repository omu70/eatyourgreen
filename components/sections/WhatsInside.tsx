import Image from "next/image";
import { whatsInside } from "@/data/content";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Reveal from "@/components/Reveal";

export default function WhatsInside() {
  return (
    <section className="section bg-cream">
      <div className="container-page">
        <Reveal>
          <h2 className="text-h2 md:text-h2-lg text-forest text-center">{whatsInside.heading}</h2>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            {whatsInside.items.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <Card className="p-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading font-semibold text-forest">{item.name}</h3>
                    <p className="text-ink/75 text-sm mt-1">{item.desc}</p>
                  </div>
                  <Badge variant="gold" className="shrink-0 whitespace-nowrap">{item.value}</Badge>
                </Card>
              </Reveal>
            ))}
            <Reveal>
              <p className="text-center font-heading font-bold text-forest text-lg mt-2">
                {whatsInside.footerLine}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="relative aspect-square rounded-card overflow-hidden shadow-card border border-mist md:sticky md:top-24">
              {/* TODO: real product mockup image */}
              <Image
                src="/images/product-mockup.png"
                alt="The Eat Your Green Guide and Toolkit product mockup"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
