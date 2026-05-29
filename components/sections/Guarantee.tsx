import { ShieldCheck } from "lucide-react";
import { guarantee } from "@/data/content";
import Reveal from "@/components/Reveal";

export default function Guarantee() {
  return (
    <section className="section bg-forest text-white">
      <div className="container-page max-w-3xl text-center">
        <Reveal>
          <div className="mx-auto mb-5 h-20 w-20 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center">
            <ShieldCheck className="h-10 w-10 text-gold" />
          </div>
          <h2 className="text-h2 md:text-h2-lg text-white">{guarantee.heading}</h2>
          <p className="mt-4 text-white/85 prose-measure mx-auto">{guarantee.body}</p>
        </Reveal>
      </div>
    </section>
  );
}
