import { Star, Quote, BadgeCheck } from "lucide-react";
import { testimonials as staticTestimonials } from "@/data/testimonials";

type T = { quote?: string; name?: string; role?: string; stars?: number };

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4" fill={i < n ? "var(--gold)" : "none"} stroke="var(--gold)" />
      ))}
    </div>
  );
}

export default function TestimonialCarousel({ items }: { items?: T[] }) {
  const list: T[] = Array.isArray(items) && items.length ? items : staticTestimonials;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
      {list.map((t, i) => {
        const name = String(t?.name || "A happy parent");
        const role = String(t?.role || "");
        const quote = String(t?.quote || "");
        const stars = Math.max(1, Math.min(5, Number(t?.stars) || 5));
        const initials =
          name.trim().split(/\s+/).map((w) => (w && w[0]) || "").join("").slice(0, 2).toUpperCase() || "P";
        if (!quote) return null;
        return (
          <figure key={i} className="h-full rounded-card bg-white border border-mist shadow-card p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <Quote className="h-7 w-7 text-leaf/40" />
              <Stars n={stars} />
            </div>
            <blockquote className="mt-3 text-ink/90 flex-1 break-words">{quote}</blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-mist pt-4">
              <span
                className="h-11 w-11 rounded-full flex items-center justify-center text-white text-sm font-heading font-semibold shrink-0"
                style={{ background: "var(--green-700)" }}
                aria-hidden
              >
                {initials}
              </span>
              <span className="leading-tight min-w-0">
                <span className="block font-heading font-semibold text-forest text-sm break-words">{name}</span>
                <span className="block text-xs text-ink/60 break-words">{role}</span>
              </span>
              <span className="ml-auto inline-flex items-center gap-1 text-xs text-brand font-medium shrink-0">
                <BadgeCheck className="h-4 w-4 text-leaf" /> Verified
              </span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
