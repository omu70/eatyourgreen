import PageHero from "@/components/PageHero";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main>
      <PageHero title={title} />
      <section className="section pt-4 bg-cream">
        <div className="container-page max-w-2xl prose-measure mx-auto text-ink/85 space-y-4 [&_h2]:font-heading [&_h2]:text-forest [&_h2]:text-h3 [&_h2]:mt-6">
          <p className="small text-ink/55">Last updated: {updated}</p>
          {children}
          <p className="small text-ink/55 pt-6">
            This is a placeholder. TODO: replace with policy text reviewed by your legal advisor.
          </p>
        </div>
      </section>
    </main>
  );
}
