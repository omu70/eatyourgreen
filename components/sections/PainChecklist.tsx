import { Check } from "lucide-react";
import { pain } from "@/data/content";
import Reveal from "@/components/Reveal";

export default function PainChecklist() {
  return (
    <section className="section bg-mist">
      <div className="container-page max-w-3xl">
        <Reveal>
          <h2 className="text-h2 md:text-h2-lg text-forest text-center">{pain.heading}</h2>
        </Reveal>
        <ul className="mt-8 space-y-3">
          {pain.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <li className="flex items-start gap-3 bg-white rounded-card border border-mist shadow-card p-4">
                <span className="mt-0.5 shrink-0 h-6 w-6 rounded-md bg-leaf/15 flex items-center justify-center">
                  <Check className="h-4 w-4 text-leaf" />
                </span>
                <span className="text-ink/90">{item}</span>
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal>
          <p className="mt-8 text-center text-ink/80 prose-measure mx-auto font-medium">
            {pain.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
