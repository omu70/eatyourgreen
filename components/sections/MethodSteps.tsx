import { Sparkles, Heart, TrendingUp, Users, Palette, Repeat, type LucideIcon } from "lucide-react";
import { method } from "@/data/content";
import Reveal from "@/components/Reveal";

const ICONS: Record<string, LucideIcon> = { Sparkles, Heart, TrendingUp, Users, Palette, Repeat };

export default function MethodSteps() {
  return (
    <section className="section bg-forest text-white">
      <div className="container-page max-w-4xl">
        <Reveal>
          <h2 className="text-h2 md:text-h2-lg text-white text-center">{method.heading}</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {method.steps.map((step, i) => {
            const Icon = ICONS[step.icon] ?? Sparkles;
            return (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="flex gap-4 rounded-card bg-white/5 border border-white/10 p-5 h-full">
                  <div className="shrink-0 h-12 w-12 rounded-full bg-leaf/20 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-leaf" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-leaf font-heading font-bold">{i + 1}</span>
                      <h3 className="text-h3 md:text-h3-lg text-white">{step.title}</h3>
                    </div>
                    <p className="mt-1 text-white/80">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
