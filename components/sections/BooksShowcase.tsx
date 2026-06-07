import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { books as staticBooks, type Book } from "@/data/books";
import { booksIntro, payments } from "@/data/content";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";
import ScarcityNote from "@/components/ScarcityNote";

export default function BooksShowcase({ books = staticBooks, offer }: { books?: Book[]; offer?: { line?: string; note?: string } }) {
  return (
    <section id="books" className="section bg-cream scroll-mt-20">
      <div className="container-page">
        <Reveal>
          <h2 className="text-h2 md:text-h2-lg text-forest text-center">{booksIntro.heading}</h2>
          <p className="mt-3 text-center text-ink/75 prose-measure mx-auto">{booksIntro.sub}</p>
          <ScarcityNote className="mt-5" line={offer?.line} note={offer?.note} />
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
          {books.map((b, i) => {
            const popular = b.accent === "gold";
            const hasDiscount = b.oldPrice > b.price && b.price > 0;
            const savePct = hasDiscount ? Math.round((1 - b.price / b.oldPrice) * 100) : 0;
            return (
              <Reveal key={b.slug} delay={i * 0.08} className="h-full">
                <Card
                  className={`relative p-5 sm:p-6 h-full flex flex-col ${
                    popular ? "border-gold border-2 shadow-lg" : ""
                  }`}
                >
                  {b.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant={popular ? "gold" : "default"} className="shadow-card whitespace-nowrap">
                        {popular ? "★ " : ""}{b.badge}
                      </Badge>
                    </div>
                  )}
                  <div className="flex gap-4 mt-2">
                    <div className="relative w-24 h-32 shrink-0 rounded-lg overflow-hidden shadow-card border border-mist bg-mist">
                      <Image src={b.cover || "/images/cover-guide.jpg"} alt={`${b.title} cover`} fill sizes="96px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading font-semibold text-forest text-base sm:text-lg leading-snug break-words">{b.title}</h3>
                      <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                        {hasDiscount && (
                          <span className="text-ink/40 line-through text-sm">₹{b.oldPrice.toLocaleString("en-IN")}</span>
                        )}
                        <span className="text-2xl font-heading font-bold text-forest">₹{b.price.toLocaleString("en-IN")}</span>
                        {hasDiscount && savePct > 0 && (
                          <span className="text-xs font-semibold text-cta bg-cta/10 rounded-full px-2 py-0.5 whitespace-nowrap">Save {savePct}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-ink/80 text-sm flex-1 break-words">{b.tagline}</p>
                  <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
                    <CTAButton
                      href={b.checkout}
                      value={b.price}
                      contentId={b.slug}
                      contentName={b.title}
                      label={b.ctaLabel}
                      className="w-full sm:flex-1"
                    />
                    <Link
                      href={`/books/${b.slug}`}
                      className="inline-flex items-center justify-center gap-1 text-brand font-semibold text-sm min-h-[48px] px-2 hover:underline whitespace-nowrap"
                    >
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <p className="mt-8 text-center small text-ink/70">
            All backed by the 28-day money-back guarantee.
          </p>
          <p className="mt-2 text-center small text-ink/60">Pay with {payments}</p>
        </Reveal>
      </div>
    </section>
  );
}
