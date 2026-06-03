import { Tag } from "lucide-react";
import { offer } from "@/data/content";

export default function ScarcityNote({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className="inline-flex items-center gap-2 rounded-full bg-cta/10 text-cta font-heading font-semibold px-4 py-1.5 text-sm">
        <Tag className="h-4 w-4" /> {offer.line}
      </span>
      <span className="mt-1.5 small text-ink/55">{offer.note}</span>
    </div>
  );
}
