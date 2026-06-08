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
            Questions about this policy? Message us on WhatsApp at +91 89205 69272 or use the{" "}
            <a href="/contact" className="text-brand underline">contact form</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
