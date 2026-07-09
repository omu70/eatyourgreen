"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { hero } from "@/data/content";
import { Sprout, HeartHandshake, CalendarCheck, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const BENEFITS = [
  { icon: Sprout, label: "Curiosity, not pressure" },
  { icon: HeartHandshake, label: "Calmer mealtimes" },
  { icon: CalendarCheck, label: "First wins in ~7 days" },
];

export default function Hero({
  h1,
  subhead,
  trust,
  image,
  bundlePrice = 799,
}: {
  h1?: string;
  subhead?: string;
  trust?: string;
  image?: string;
  discoverHeading?: string;
  discover?: string[];
  bundlePrice?: number;
}) {
  return (
    <section id="hero" className="pt-24 md:pt-28 pb-12 md:pb-20 bg-cream">
      <div className="container-page flex flex-col gap-6 md:grid md:grid-cols-2 md:grid-rows-[auto_auto] md:items-center md:gap-x-12 md:gap-y-4">
        {/* Headline block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="order-1 md:col-start-1 md:row-start-1 md:self-end"
        >
          <span className="inline-flex items-center rounded-full bg-brand/10 text-brand text-xs font-semibold px-3 py-1">
            Won&rsquo;t eat green veggies? You&rsquo;re not alone.
          </span>
          <h1 className="mt-3 text-h1 md:text-h1-lg text-forest">{h1 || hero.h1}</h1>
          <p className="mt-4 text-ink/80 prose-measure">{subhead || hero.subhead}</p>
        </motion.div>

        {/* Author reel — matted frame. On mobile it sits between headline and buttons. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative order-2 mx-auto w-full max-w-[250px] sm:max-w-[300px] md:order-none md:col-start-2 md:row-start-1 md:row-span-2 md:max-w-[340px] md:self-center"
        >
          {/* botanical accents */}
          <Sprout aria-hidden className="pointer-events-none absolute -left-6 -top-6 h-12 w-12 -rotate-12 text-leaf/60" />
          <Leaf aria-hidden className="pointer-events-none absolute -right-5 top-1/3 h-10 w-10 rotate-12 text-brand/50" />
          <Leaf aria-hidden className="pointer-events-none absolute -left-4 bottom-8 h-8 w-8 -rotate-6 text-leaf/50" />

          {/* gradient frame + cream mat */}
          <div className="relative rounded-[30px] bg-gradient-to-br from-forest via-leaf to-forest p-[10px] shadow-[0_22px_55px_-18px_rgba(31,107,61,0.5)]">
            <div className="rounded-[24px] bg-cream p-[4px]">
              <video
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="auto"
                poster={image || "/images/hero.jpg"}
                className="block aspect-[9/16] w-full rounded-[20px] bg-black object-cover"
              >
                <source src="/founder-clean.mp4" type="video/mp4" />
              </video>
            </div>
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-mist bg-white px-4 py-1.5 text-xs font-heading font-semibold text-forest shadow-card">
              ▶ A note from the author
            </span>
          </div>
        </motion.div>

        {/* Benefits + buttons + trust */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="order-3 md:col-start-1 md:row-start-2 md:self-start"
        >
          {/* Scannable icon benefits */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-md">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center text-center gap-2 rounded-xl bg-white/70 border border-mist p-3"
                >
                  <span className="h-9 w-9 rounded-full bg-leaf/15 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-brand" />
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-forest leading-tight">{b.label}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/books/the-eat-your-green-complete-toolkit">Get the Bundle ₹{bundlePrice.toLocaleString("en-IN")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/#books">See all books</Link>
            </Button>
          </div>
          <p className="mt-4 small text-ink/70">{trust || hero.trust}</p>
        </motion.div>
      </div>
    </section>
  );
}
