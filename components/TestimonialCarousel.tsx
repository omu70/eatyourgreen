"use client";
import { useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import { testimonials } from "@/data/testimonials";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4" fill={i < n ? "var(--gold)" : "none"} stroke="var(--gold)" />
      ))}
    </div>
  );
}

export default function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-1 px-1"
        style={{ scrollbarWidth: "none" }}
      >
        {testimonials.map((t, i) => (
          <figure
            key={i}
            className="snap-center shrink-0 w-[85%] sm:w-[360px] rounded-card bg-white border border-mist shadow-card p-6 flex flex-col"
          >
            <div className="flex items-center justify-between">
              <Quote className="h-7 w-7 text-leaf/40" />
              <Stars n={t.stars} />
            </div>
            <blockquote className="mt-3 text-ink/90 flex-1">{t.quote}</blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-mist pt-4">
              <span
                className="h-11 w-11 rounded-full flex items-center justify-center text-white text-sm font-heading font-semibold shrink-0"
                style={{ background: "var(--green-700)" }}
                aria-hidden
              >
                {t.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </span>
              <span className="leading-tight">
                <span className="block font-heading font-semibold text-forest text-sm">{t.name}</span>
                <span className="block text-xs text-ink/60">{t.role}</span>
              </span>
              <span className="ml-auto inline-flex items-center gap-1 text-xs text-brand font-medium">
                <BadgeCheck className="h-4 w-4 text-leaf" /> Verified
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-2">
        <button onClick={() => scroll(-1)} aria-label="Previous review" className="h-11 w-11 rounded-full border border-mist bg-white shadow-card flex items-center justify-center text-brand">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button onClick={() => scroll(1)} aria-label="Next review" className="h-11 w-11 rounded-full border border-mist bg-white shadow-card flex items-center justify-center text-brand">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
