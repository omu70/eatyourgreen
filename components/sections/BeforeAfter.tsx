import { X, Check } from "lucide-react";
import { beforeAfter } from "@/data/content";
import Reveal from "@/components/Reveal";

export default function BeforeAfter() {
  return (
    <section className="section bg-mist">
      <div className="container-page max-w-4xl">
        <Reveal>
          <h2 className="text-h2 md:text-h2-lg text-forest text-center">{beforeAfter.heading}</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-10 grid grid-cols-2 gap-3 md:gap-5">
            <div className="text-center font-heading font-semibold text-ink/60 pb-1">Before</div>
            <div className="text-center font-heading font-semibold text-brand pb-1">After</div>
            {beforeAfter.rows.map((row, i) => (
              <div key={i} className="contents">
                <div className="rounded-card bg-white border border-mist shadow-card p-4 flex items-start gap-2">
                  <X className="h-5 w-5 text-cta shrink-0 mt-0.5" />
                  <span className="text-ink/80 text-sm md:text-base">{row.before}</span>
                </div>
                <div className="rounded-card bg-white border border-leaf/40 shadow-card p-4 flex items-start gap-2">
                  <Check className="h-5 w-5 text-leaf shrink-0 mt-0.5" />
                  <span className="text-forest text-sm md:text-base font-medium">{row.after}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
