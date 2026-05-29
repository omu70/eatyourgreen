import Link from "next/link";
import { finalCta } from "@/data/content";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";

export default function FinalCTA({ href = "/#books", label }: { href?: string; label?: string }) {
  return (
    <section className="section bg-mist">
      <div className="container-page max-w-2xl text-center">
        <Reveal>
          <h2 className="text-h2 md:text-h2-lg text-forest">{finalCta.heading}</h2>
          <div className="mt-6">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={href}>{label ?? finalCta.cta}</Link>
            </Button>
          </div>
          <p className="mt-4 small font-semibold text-cta">{finalCta.urgency}</p>
        </Reveal>
      </div>
    </section>
  );
}
