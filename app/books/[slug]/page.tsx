import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, FileText, Download } from "lucide-react";
import { books } from "@/data/books";
import { getProduct, getProducts, getContent } from "@/lib/site-data";
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
import ScarcityNote from "@/components/ScarcityNote";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = await getProduct(slug);
  if (!book) return {};
  return {
    title: book.metaTitle,
    description: book.metaDescription,
    alternates: { canonical: `/books/${book.slug}` },
    openGraph: { title: book.metaTitle, description: book.metaDescription, images: [book.cover || "/og-image.png"] },
  };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = await getProduct(slug);
  if (!book) notFound();

  const allProducts = await getProducts();
  const others = allProducts.filter((b) => b.slug !== book.slug);
  const c = await getContent();

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
              <div className="relative mx-auto w-56 md:w-72 aspect-[3/4] rounded-card overflow-hidden shadow-card border border-mist bg-white">
                <Image src={book.cover || "/images/cover-guide.jpg"} alt={`${book.title} cover`} fill priority sizes="(max-width:768px) 224px, 288px" className="object-contain" />
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              {book.badge && (
                <Badge variant={book.accent === "gold" ? "gold" : "default"}>{book.badge}</Badge>
              )}
              <h1 className="mt-3 text-h1 md:text-h1-lg text-forest break-words">{book.title}</h1>
              <p className="mt-4 text-ink/80 prose-measure">{book.subhead}</p>
              <div id="buy" className="mt-6 flex items-baseline gap-3 flex-wrap scroll-mt-24">
                {book.oldPrice > book.price && (
                  <span className="text-ink/40 line-through">₹{book.oldPrice.toLocaleString("en-IN")}</span>
                )}
                <span className="text-4xl font-heading font-bold text-forest">₹{book.price.toLocaleString("en-IN")}</span>
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
              <ScarcityNote className="mt-4 items-start" line={c.offerLine} note={c.offerNote} />
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

        {/* Real pages gallery (Toolkit) */}
        {book.gallery && book.gallery.length > 0 && (
          <section className="section bg-mist">
            <div className="container-page max-w-4xl">
              <Reveal>
                <h2 className="text-h2 md:text-h2-lg text-forest text-center">A peek inside</h2>
                <p className="mt-3 text-center text-ink/75 prose-measure mx-auto">Real pages from the pack — printables your child will actually want to fill in.</p>
              </Reveal>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                {book.gallery.filter((g) => g && g.img).map((g, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <figure className="rounded-card overflow-hidden border border-mist shadow-card bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={g.img as string} alt={String(g.caption || book.title)} loading="lazy" className="w-full h-auto block" />
                      {g.caption ? (
                        <figcaption className="p-3 text-sm text-ink/75 text-center break-words">{g.caption}</figcaption>
                      ) : null}
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Outcomes */}
        <section className="section bg-forest text-white">
          <div className="container-page max-w-3xl">
            <Reveal>
              <h2 className="text-h2 md:text-h2-lg text-white text-center">What changes for you</h2>
            </Reveal>
            <div className="mt-8 grid sm:grid-cols-2 gap-4 items-stretch">
              {book.outcomes.map((o, i) => (
                <Reveal key={i} delay={i * 0.05} className="h-full">
                  <div className="flex h-full items-start gap-3 rounded-card bg-white/5 border border-white/10 p-4">
                    <Check className="h-5 w-5 text-leaf shrink-0 mt-0.5" />
                    <span className="text-white/90">{String(o)}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ResultsTimeline />

        <SocialProof />

        {/* Cross-sell */}
        {others.length > 0 && (
          <section className="section bg-cream">
            <div className="container-page max-w-4xl">
              <Reveal>
                <h2 className="text-h2 md:text-h2-lg text-forest text-center">Most parents also get</h2>
              </Reveal>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {others.map((o) => (
                  <Reveal key={o.slug}>
                    <div className="rounded-card border border-mist shadow-card bg-white p-5 flex gap-4 h-full">
                      <div className="relative w-20 h-28 shrink-0 rounded-lg overflow-hidden border border-mist bg-white">
                        <Image src={o.cover || "/images/cover-guide.jpg"} alt={`${o.title} cover`} fill sizes="80px" className="object-contain" />
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <h3 className="font-heading font-semibold text-forest text-sm break-words">{o.title}</h3>
                        <p className="text-ink/70 text-xs mt-1 flex-1 break-words">{o.tagline}</p>
                        <p className="mt-1">
                          {o.oldPrice > o.price && (
                            <span className="text-ink/40 line-through text-xs">₹{o.oldPrice.toLocaleString("en-IN")}</span>
                          )}{" "}
                          <span className="font-heading font-bold text-forest">₹{o.price.toLocaleString("en-IN")}</span>
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <CTAButton href={o.checkout} value={o.price} contentId={o.slug} contentName={o.title} label={`Add — ₹${o.price}`} size="pill" />
                          <Link href={`/books/${o.slug}`} className="text-brand text-xs font-medium hover:underline">Details</Link>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
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
