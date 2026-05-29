import Reveal from "@/components/Reveal";

export default function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="pt-28 md:pt-32 pb-8 md:pb-10 bg-cream">
      <div className="container-page max-w-3xl text-center">
        <Reveal>
          <h1 className="text-h1 md:text-h1-lg text-forest">{title}</h1>
          {subtitle && <p className="mt-4 text-ink/80 prose-measure mx-auto">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}
