import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { books } from "@/data/books";
import { booksIntro } from "@/data/content";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";

export default function BooksShowcase() {
  return (
    <section id="books" className="section bg-cream scroll-mt-20">
      <div className="container-page">
        <Reveal>
          <h2 className="text-h2 md:text-h2-lg text-forest text-center">{booksIntro.heading}</h2>
          <p className="mt-3 text-center text-ink/75 prose-measure mx-auto">{booksIntro.sub}</p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
          {books.map((b, i) => {
            const popular = b.accent === "gold";
            return (
              <Reveal key={b.slug} delay={i * 0.08} className="h-full">
                <Card
                  className={`relative p-6 h-full flex flex-col ${
                    popular ? "border-gold border-2 md:scale-[1.03] shadow-lg" : ""
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
                    <div className="relative w-24 h-32 shrink-0 rounded-lg overflow-hidden shadow-card border border-mist">
                      <Image src={b.cover} alt={`${b.title} cover`} fill sizes="96px" className="object-cover" />
                    </div>
                    <div>
                      <h3 className="text-h3 md:text-h3-lg text-forest">{b.title}</h3>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-ink/40 line-through text-sm">₹{b.oldPrice.toLocaleString("en-IN")}</span>
                        <span className="text-2xl font-heading font-bold text-forest">₹{b.price.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-ink/80 text-sm flex-1">{b.tagline}</p>
                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
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
                      className="inline-flex items-center justify-center gap-1 text-brand font-semibold text-sm min-h-[48px] px-2 hover:underline"
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
            Both backed by the 14-day money-back guarantee · Most parents choose the Complete Toolkit.
          </p>
          <p className="mt-2 text-center text-2xl tracking-wide" aria-label="Accepted payments">
            💳 🏦 📱 UPI
          </p>
        </Reveal>
      </div>
    </section>
  );
}
