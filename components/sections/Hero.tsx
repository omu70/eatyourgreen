"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { hero } from "@/data/content";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section id="hero" className="pt-24 md:pt-28 pb-12 md:pb-20 bg-cream">
      <div className="container-page grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-h1 md:text-h1-lg text-forest">{hero.h1}</h1>
          <p className="mt-4 text-ink/80 prose-measure">{hero.subhead}</p>
          <p className="mt-5 font-heading font-semibold text-forest text-sm">{hero.discover.heading}</p>
          <ul className="mt-2 space-y-2">
            {hero.discover.items.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-ink/85 text-sm md:text-base">
                <Check className="h-5 w-5 text-leaf shrink-0 mt-0.5" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/#books">{hero.ctaPrimary}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/books/the-eat-your-green-guide">Start with the Guide ₹399</Link>
            </Button>
          </div>
          <p className="mt-4 small text-ink/70">{hero.trust}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative aspect-[4/3] rounded-card overflow-hidden shadow-card border border-mist"
        >
          {/* TODO: replace /images/hero.jpg with your warm lifestyle photo (mom + child over greens) */}
          <Image
            src="/images/hero.jpg"
            alt="A mom and her child laughing together while preparing greens"
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
