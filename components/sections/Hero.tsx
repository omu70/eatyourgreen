"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { hero } from "@/data/content";
import { Sprout, HeartHandshake, CalendarCheck } from "lucide-react";
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
      <div className="container-page grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center rounded-full bg-brand/10 text-brand text-xs font-semibold px-3 py-1">
            Won&rsquo;t eat green veggies? You&rsquo;re not alone.
          </span>
          <h1 className="mt-3 text-h1 md:text-h1-lg text-forest">{h1 || hero.h1}</h1>
          <p className="mt-4 text-ink/80 prose-measure">{subhead || hero.subhead}</p>

          {/* Scannable icon benefits — replaces the long bullet list */}
          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 max-w-md">
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

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative aspect-[4/3] rounded-card overflow-hidden shadow-card border border-mist"
        >
          <Image
            src={image || "/images/hero.jpg"}
            alt="A mom and her child laughing together while enjoying green veggies"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
