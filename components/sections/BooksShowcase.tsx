import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { books } from "@/data/books";
import { booksIntro, bundle } from "@/data/content";
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

        <div className="mt-10 grid md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
          {books.map((b, i) => (
            <Reveal key={b.slug} delay={i * 0.08} className="h-full">
              <Card className="p-6 h-full flex flex-col">
                <div className="flex gap-4">
                  <div className="relative w-24 h-32 shrink-0 rounded-lg overflow-hidden shadow-card border border-mist">
                    <Image src={b.cover} alt={`${b.title} cover`} fill sizes="96px" className="object-cover" />
                  </div>
                  <div>
                    {b.badge && (
                      <Badge variant={b.accent === "gold" ? "gold" : "default"}>{b.badge}</Badge>
                    )}
                    <h3 className="mt-2 text-h3 md:text-h3-lg text-forest">{b.title}</h3>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-ink/40 line-through text-sm">₹{b.oldPrice}</span>
                      <span className="text-2xl font-heading font-bold text-forest">₹{b.price}</span>
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
          ))}
        </div>

        {/* Bundle */}
        <Reveal>
          <div className="mt-8 max-w-4xl mx-auto rounded-card bg-forest text-white shadow-card p-6 md:p-8 md:flex md:items-center md:gap-8">
            <div className="md:flex-1">
              <Badge variant="gold" className="shadow-card">★ Best value</Badge>
              <h3 className="mt-3 text-h3 md:text-h3-lg text-white">{bundle.heading}</h3>
              <p className="mt-2 text-white/85">{bundle.body}</p>
            </div>
            <div className="mt-5 md:mt-0 text-center shrink-0">
              <div className="flex items-baseline gap-2 justify-center">
                <span className="text-white/50 line-through">₹{bundle.oldPrice}</span>
                <span className="text-3xl font-heading font-bold text-white">₹{bundle.price}</span>
              </div>
              <CTAButton
                href={bundle.href}
                value={bundle.price}
                contentId="bundle"
                contentName="Complete Pack (both books)"
                label={bundle.cta}
                size="lg"
                className="mt-3 w-full"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
