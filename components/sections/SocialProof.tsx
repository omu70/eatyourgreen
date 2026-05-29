import { stats } from "@/data/content";
import StatCounter from "@/components/StatCounter";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Reveal from "@/components/Reveal";

export default function SocialProof() {
  return (
    <section className="section bg-mist">
      <div className="container-page">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="text-center bg-white rounded-card border border-mist shadow-card p-6">
                <div className="text-4xl md:text-5xl">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-ink/75 text-sm">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h2 className="text-h2 md:text-h2-lg text-forest text-center mt-14 md:mt-16">
            Moms just like you
          </h2>
        </Reveal>
        <div className="mt-8 max-w-4xl mx-auto">
          <TestimonialCarousel />
        </div>
      </div>
    </section>
  );
}
