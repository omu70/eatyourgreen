import { madeForIndia } from "@/data/content";
import Reveal from "@/components/Reveal";

export default function MadeForIndia() {
  return (
    <section className="section bg-cream">
      <div className="container-page max-w-3xl">
        <Reveal>
          <div className="rounded-card bg-white border border-mist shadow-card p-7 md:p-9 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-mist text-brand text-sm font-semibold px-4 py-1.5">
              🇮🇳 {madeForIndia.heading}
            </span>
            <p className="mt-4 text-ink/85 prose-measure mx-auto">{madeForIndia.body}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
