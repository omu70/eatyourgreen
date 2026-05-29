import { results } from "@/data/content";
import Reveal from "@/components/Reveal";

export default function ResultsTimeline() {
  return (
    <section className="section bg-forest text-white">
      <div className="container-page max-w-4xl">
        <Reveal>
          <h2 className="text-h2 md:text-h2-lg text-white text-center">{results.heading}</h2>
          <p className="mt-3 text-center text-white/80 prose-measure mx-auto">{results.sub}</p>
        </Reveal>
        <ol className="mt-10 grid md:grid-cols-3 gap-5">
          {results.steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <li className="rounded-card bg-white/5 border border-white/10 p-6 h-full">
                <span className="inline-flex items-center rounded-full bg-leaf/20 text-leaf text-xs font-semibold px-3 py-1">
                  {s.when}
                </span>
                <h3 className="mt-3 text-h3 text-white">{s.title}</h3>
                <p className="mt-2 text-white/80 text-sm">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
