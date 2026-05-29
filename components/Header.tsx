"use client";
import { useEffect, useState } from "react";
import CTAButton from "@/components/CTAButton";
import { CHECKOUT } from "@/data/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "bg-cream/90 backdrop-blur shadow-card" : "bg-cream/60 backdrop-blur-sm"
      }`}
    >
      <div className="container-page flex items-center justify-between py-3">
        <a href="#hero" className="flex items-center gap-2 font-heading font-bold text-forest text-lg">
          <span aria-hidden className="text-xl">🥬</span>
          Eat Your Green
        </a>
        <CTAButton
          href={CHECKOUT.guide}
          plan="guide"
          label="Get the Guide ₹399"
          size="pill"
        />
      </div>
    </header>
  );
}
