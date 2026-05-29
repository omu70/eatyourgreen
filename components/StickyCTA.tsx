"use client";
import { useStickyCTA } from "@/hooks/useStickyCTA";
import CTAButton from "@/components/CTAButton";

export default function StickyCTA({
  price,
  href,
  contentId,
  contentName,
  label,
  triggerId = "book-hero",
  hideAtId = "buy",
}: {
  price: number;
  href: string;
  contentId: string;
  contentName: string;
  label: string;
  triggerId?: string;
  hideAtId?: string;
}) {
  const show = useStickyCTA(triggerId, hideAtId);
  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-50 safe-bottom transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="bg-white border-t border-mist shadow-[0_-4px_20px_rgba(0,0,0,.08)] px-4 py-3 flex items-center gap-3">
        <div className="leading-tight">
          <div className="text-xs text-ink/60">{contentName}</div>
          <div className="font-heading font-bold text-forest text-lg">₹{price}</div>
        </div>
        <CTAButton
          href={href}
          value={price}
          contentId={contentId}
          contentName={contentName}
          label={label}
          className="flex-1"
        />
      </div>
    </div>
  );
}
