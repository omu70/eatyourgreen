import { hero } from "@/data/content";
import Reveal from "@/components/Reveal";
import { Sprout, Sparkles, Puzzle, Gamepad2, Eye, Smile } from "lucide-react";

const ICONS = [Sprout, Sparkles, Puzzle, Gamepad2, Eye, Smile];

export default function Discover({ heading, items }: { heading?: string; items?: string[] }) {
  const list = items && items.length ? items : hero.discover.items;
  return (
    <section className="section bg-cream">
      <div className="container-page max-w-5xl">
        <Reveal>
          <h2 className="text-h2 md:text-h2-lg text-forest text-center">
            {heading || "What you’ll discover inside"}
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {list.map((it, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={i} delay={i * 0.05} className="h-full">
                <div className="h-full flex items-start gap-3 rounded-card bg-white border border-mist shadow-card p-4">
                  <span className="h-10 w-10 shrink-0 rounded-full bg-leaf/15 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-brand" />
                  </span>
                  <p className="text-ink/85 text-sm leading-snug break-words">{String(it)}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
