import { ShieldCheck } from "lucide-react";
import { guarantee } from "@/data/content";
import { getContent } from "@/lib/site-data";
import Reveal from "@/components/Reveal";

export default async function Guarantee() {
  const c = await getContent();
  const heading = c.guaranteeHeading || guarantee.heading;
  const body = c.guaranteeBody || guarantee.body;
  return (
    <section className="section bg-forest text-white">
      <div className="container-page max-w-3xl text-center">
        <Reveal>
          <div className="mx-auto mb-5 h-20 w-20 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center">
            <ShieldCheck className="h-10 w-10 text-gold" />
          </div>
          <h2 className="text-h2 md:text-h2-lg text-white">{heading}</h2>
          <p className="mt-4 text-white/85 prose-measure mx-auto">{body}</p>
        </Reveal>
      </div>
    </section>
  );
}
