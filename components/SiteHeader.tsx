"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { nav } from "@/data/content";
import { Button } from "@/components/ui/button";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Hide on admin pages — must come AFTER all hooks.
  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-cream transition-shadow ${
        scrolled ? "shadow-card" : "border-b border-mist"
      }`}
    >
      <div className="container-page flex items-center justify-between py-3">
        <Link href="/" aria-label="Eat Your Green — home" className="inline-flex items-center">
          <Image src="/images/logo.png" alt="Eat Your Green" width={150} height={56} priority className="h-10 md:h-12 w-auto" />
        </Link>

        {/* desktop nav */}
        <nav className="hidden lg:flex items-center gap-5">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium hover:text-brand transition-colors whitespace-nowrap ${
                  active ? "text-brand" : "text-ink/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Button asChild size="pill">
            <Link href="/books/the-eat-your-green-complete-toolkit">Get the Bundle</Link>
          </Button>
        </nav>

        {/* mobile / tablet toggle */}
        <button
          className="lg:hidden h-11 w-11 -mr-2 flex items-center justify-center text-forest"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* mobile / tablet menu */}
      {open && (
        <div className="lg:hidden border-t border-mist bg-cream">
          <nav className="container-page py-4 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-3 text-base font-medium ${
                  pathname === item.href ? "text-brand" : "text-ink/90"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-3 w-full">
              <Link href="/books/the-eat-your-green-complete-toolkit">Get the Bundle</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
