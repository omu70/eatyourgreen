import { HeartCrack, Frown } from "lucide-react";
import { parentsKidsPain as d } from "@/data/content";
import Reveal from "@/components/Reveal";

function Col({ title, items, icon }: { title: string; items: string[]; icon: "parent" | "kid" }) {
  const Icon = icon === "parent" ? HeartCrack : Frown;
  return (
    <div className="rounded-card bg-white border border-mist shadow-card p-6 h-full">
      <div className="flex items-center gap-2 text-forest">
        <Icon className="h-5 w-5 text-cta" />
        <h3 className="font-heading font-semibold text-lg">{title}</h3>
      </div>
      <ul className="mt-4 space-y-3">
        {items.map((it, i) => (
          <li key={i} className="text-ink/85 text-sm md:text-base border-l-2 border-mist pl-3">{it}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ParentsKidsPain() {
  return (
    <section className="section bg-cream">
      <div className="container-page max-w-4xl">
        <Reveal>
          <h2 className="text-h2 md:text-h2-lg text-forest text-center">{d.heading}</h2>
          <p className="mt-3 text-center text-ink/75 prose-measure mx-auto">{d.sub}</p>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          <Reveal><Col title={d.parents.title} items={d.parents.items} icon="parent" /></Reveal>
          <Reveal delay={0.08}><Col title={d.kids.title} items={d.kids.items} icon="kid" /></Reveal>
        </div>
      </div>
    </section>
  );
}
