import { CreditCard, Download, Smile, type LucideIcon } from "lucide-react";
import { howToGet } from "@/data/content";
import { Card } from "@/components/ui/card";
import Reveal from "@/components/Reveal";

const ICONS: Record<string, LucideIcon> = { CreditCard, Download, Smile };

export default function HowToGet() {
  return (
    <section className="section bg-mist">
      <div className="container-page max-w-4xl">
        <Reveal>
          <h2 className="text-h2 md:text-h2-lg text-forest text-center">{howToGet.heading}</h2>
          <p className="mt-3 text-center text-ink/75 prose-measure mx-auto">{howToGet.sub}</p>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {howToGet.steps.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Download;
            return (
              <Reveal key={i} delay={i * 0.08}>
                <Card className="p-6 h-full text-center">
                  <div className="mx-auto h-14 w-14 rounded-full bg-leaf/15 flex items-center justify-center">
                    <Icon className="h-7 w-7 text-brand" />
                  </div>
                  <h3 className="mt-4 font-heading font-semibold text-forest text-lg">{s.title}</h3>
                  <p className="mt-2 text-ink/75 text-sm">{s.body}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
