"use client";
import { useRef } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { testimonials } from "@/data/testimonials";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4"
          fill={i < n ? "var(--gold)" : "none"}
          stroke="var(--gold)"
        />
      ))}
    </div>
  );
}

export default function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-1 px-1 scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {testimonials.map((t, i) => (
          <Card
            key={i}
            className="snap-center shrink-0 w-[85%] sm:w-[360px] p-6"
          >
            <Stars n={t.stars} />
            <p className="mt-3 text-ink/90">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-4 flex items-center gap-3">
              <Image
                src={t.avatar}
                alt={t.name}
                width={44}
                height={44}
                className="rounded-full bg-mist object-cover"
              />
              <div>
                <div className="font-heading font-semibold text-forest text-sm">{t.name}</div>
                <div className="text-xs text-ink/60">{t.role}</div>
              </div>
              <Badge variant="verified" className="ml-auto">Verified buyer</Badge>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-2">
        <button
          onClick={() => scroll(-1)}
          aria-label="Previous testimonial"
          className="h-11 w-11 rounded-full border border-mist bg-white shadow-card flex items-center justify-center text-brand"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Next testimonial"
          className="h-11 w-11 rounded-full border border-mist bg-white shadow-card flex items-center justify-center text-brand"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
