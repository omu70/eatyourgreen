import { Download, ShieldCheck, Lock, Users, Star, type LucideIcon } from "lucide-react";
import { trustBadges } from "@/data/content";

const ICONS: Record<string, LucideIcon> = { Download, ShieldCheck, Lock, Users, Star };

export default function TrustBadges() {
  return (
    <section className="bg-mist border-y border-leaf/20">
      <div className="container-page py-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-forest/90">
          {trustBadges.map((b, i) => {
            const Icon = ICONS[b.icon] ?? ShieldCheck;
            return (
              <li key={i} className="flex items-center gap-2 font-medium">
                <Icon className="h-4 w-4 text-leaf shrink-0" />
                {b.label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
