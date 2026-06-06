import Link from "next/link";
import { finalCta } from "@/data/content";
import { getContent } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import ScarcityNote from "@/components/ScarcityNote";
import Reveal from "@/components/Reveal";

export default async function FinalCTA({ href = "/#books", label }: { href?: string; label?: string }) {
  const c = await getContent();
  const heading = c.finalCtaHeading || finalCta.heading;
  const urgency = c.finalCtaUrgency || finalCta.urgency;
  const cta = label ?? c.finalCtaCta ?? finalCta.cta;
  return (
    <section className="section bg-mist">
      <div className="container-page max-w-2xl text-center">
        <Reveal>
          <h2 className="text-h2 md:text-h2-lg text-forest">{heading}</h2>
          <p className="mt-4 small font-semibold text-cta uppercase tracking-wide">{urgency}</p>
          <ScarcityNote className="mt-3" line={c.offerLine} note={c.offerNote} />
          <div className="mt-6">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={href}>{cta}</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
