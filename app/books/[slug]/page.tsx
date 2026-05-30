import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, FileText, Download } from "lucide-react";
import { books, getBook } from "@/data/books";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CTAButton from "@/components/CTAButton";
import StickyCTA from "@/components/StickyCTA";
import Reveal from "@/components/Reveal";
import SocialProof from "@/components/sections/SocialProof";
import TrustBadges from "@/components/sections/TrustBadges";
import ResultsTimeline from "@/components/sections/ResultsTimeline";
import HowToGet from "@/components/sections/HowToGet";
import Guarantee from "@/components/sections/Guarantee";
import FAQ from "@/components/sections/FAQ";
import { BookJsonLd } from "@/components/JsonLd";
import BookView from "@/components/BookView";
import CountdownTimer from "@/components/CountdownTimer";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return {};
  return {
    title: book.metaTitle,
    description: book.metaDescription,
    alternates: { canonical: `/books/${book.slug}` },
    openGraph: { title: book.metaTitle, description: book.metaDescription, images: [book.cover] },
  };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  const other = books.find((b) => b.slug !== book.slug);

  return (
    <>
      <BookJsonLd book={book} />
      <BookView slug={book.slug} title={book.title} price={book.price} />
      <StickyCTA
        price={book.price}
        href={book.checkout}
        contentId={book.slug}
        contentName={book.title}
        label={book.ctaLabel}
      />

      <main>
        {/* Hero */}
        <section id="book-hero" className="pt-24 md:pt-28 pb-12 md:pb-16 bg-cream">
          <div className="container-page grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <Reveal>
              <div className="relative mx-auto w-56 md:w-72 aspect-[3/4] rounded-card overflow-hidden shadow-card border border-mist">
                <Image src={book.cover} alt={`${book.title} cover`} fill priority sizes="(max-width:768px) 224px, 288px" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              {book.badge && (
                <Badge variant={book.accent === "gold" ? "gold" : "default"}>{book.badge}</Badge>
              )}
              <h1 className="mt-3 text-h1 md:text-h1-lg text-forest">{book.title}</h1>
              <p className="mt-4 text-ink/80 prose-measure">{book.subhead}</p>
              <div id="buy" className="mt-6 flex items-baseline gap-3 scroll-mt-24">
                <span className="text-ink/40 line-through">₹{book.oldPrice}</span>
                <span className="text-4xl font-heading font-bold text-forest">₹{book.price}</span>
              </div>
              <div className="mt-4">
                <CTAButton
                  href={book.checkout}
                  value={book.price}
                  contentId={book.slug}
                  contentName={book.title}
                  label={book.ctaLabel}
                  size="lg"
                  className="w-full sm:w-auto"
                />
              </div>
              <p className="mt-4 small font-semibold text-cta uppercase tracking-wide">Special launch price — ends soon:</p>
              <CountdownTimer className="mt-2 justify-start" />
              <p className="mt-4 small text-ink/70 flex flex-wrap gap-x-4 gap-y-1">
                <span className="flex items-center gap-1"><Download className="h-4 w-4 text-leaf" /> {book.format}</span>
                <span className="flex items-center gap-1"><FileText className="h-4 w-4 text-leaf" /> {book.pages}</span>
                <span>★ 4.8/5 · 28-day guarantee</span>
              </p>
            </Reveal>
          </div>
        </section>

        <TrustBadges />

        {/* Who it's for */}
        <section className="section bg-mist">
          <div className="container-page max-w-3xl text-center">
            <Reveal>
              <h2 className="text-h2 md:text-h2-lg text-forest">Who it&rsquo;s for</h2>
              <p className="mt-3 text-ink/80 prose-measure mx-auto">{book.forWho}</p>
            </Reveal>
          </div>
        </section>

        {/* What's inside */}
        <section className="section bg-cream">
          <div className="container-page max-w-3xl">
            <Reveal>
              <h2 className="text-h2 md:text-h2-lg text-forest text-center">What&rsquo;s inside</h2>
            </Reveal>
            <div className="mt-8 space-y-4">
              {book.whatsInside.map((item, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <Card className="p-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading font-semibold text-forest">{item.name}</h3>
                      <p className="text-ink/75 text-sm mt-1">{item.desc}</p>
                    </div>
                    {item.value && (
                      <Badge variant="gold" className="shrink-0 whitespace-nowrap">{item.value}</Badge>
                    )}
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="section bg-forest text-white">
          <div className="container-page max-w-3xl">
            <Reveal>
              <h2 className="text-h2 md:text-h2-lg text-white text-center">What changes for you</h2>
            </Reveal>
            <ul className="mt-8 grid sm:grid-cols-2 gap-4">
              {book.outcomes.map((o, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <li className="flex items-start gap-3 rounded-card bg-white/5 border border-white/10 p-4">
                    <Check className="h-5 w-5 text-leaf shrink-0 mt-0.5" />
                    <span className="text-white/90">{o}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <ResultsTimeline />

        <SocialProof />

        {/* Cross-sell */}
        {other && (
          <section className="section bg-cream">
            <div className="container-page max-w-3xl">
              <Reveal>
                <div className="rounded-card border border-mist shadow-card bg-white p-6 md:flex md:items-center md:gap-6">
                  <div className="relative w-20 h-28 shrink-0 rounded-lg overflow-hidden border border-mist mx-auto md:mx-0">
                    <Image src={other.cover} alt={`${other.title} cover`} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="mt-4 md:mt-0 md:flex-1 text-center md:text-left">
                    <p className="small text-brand font-semibold">Most parents add this</p>
                    <h3 className="font-heading font-semibold text-forest">{other.title}</h3>
                    <p className="text-ink/75 text-sm mt-1">{other.tagline}</p>
                    <p className="mt-1"><span className="text-ink/40 line-through text-sm">₹{other.oldPrice.toLocaleString("en-IN")}</span> <span className="font-heading font-bold text-forest">₹{other.price.toLocaleString("en-IN")}</span></p>
                  </div>
                  <div className="mt-4 md:mt-0 flex flex-col gap-2 w-full md:w-auto">
                    <CTAButton href={other.checkout} value={other.price} contentId={other.slug} contentName={other.title} label={`Add — ₹${other.price}`} className="w-full md:w-auto" />
                    <Link href={`/books/${other.slug}`} className="text-center text-brand text-sm font-medium hover:underline">View details</Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        <HowToGet />

        <FAQ items={book.faqs} heading={`${book.title} — FAQ`} />
        <Guarantee />

        {/* Final buy */}
        <section className="section bg-mist">
          <div className="container-page max-w-2xl text-center">
            <Reveal>
              <h2 className="text-h2 md:text-h2-lg text-forest">Start tonight.</h2>
              <div className="mt-6">
                <CTAButton
                  href={book.checkout}
                  value={book.price}
                  contentId={book.slug}
                  contentName={book.title}
                  label={`${book.ctaLabel} — ₹${book.price}`}
                  size="lg"
                  className="w-full sm:w-auto"
                />
              </div>
              <p className="mt-4 small font-semibold text-cta">Launch price ends soon.</p>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
