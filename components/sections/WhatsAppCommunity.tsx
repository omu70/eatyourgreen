import { MessageCircle } from "lucide-react";
import { whatsappCommunity } from "@/data/content";
import { getContent } from "@/lib/site-data";
import Reveal from "@/components/Reveal";

export default async function WhatsAppCommunity() {
  const c = await getContent();
  const label = c.waLabel || whatsappCommunity.label;
  const link = c.waLink || whatsappCommunity.link;
  return (
    <section className="section bg-cream">
      <div className="container-page max-w-2xl">
        <Reveal>
          <div className="rounded-card bg-white border border-mist shadow-card p-6 md:p-8 flex flex-col items-center gap-4 text-center">
            <div className="h-14 w-14 rounded-full bg-leaf/15 flex items-center justify-center">
              <MessageCircle className="h-7 w-7 text-brand" />
            </div>
            <h2 className="text-h3 font-heading font-semibold text-forest">{label}</h2>
            <p className="text-ink/75 text-sm prose-measure mx-auto">
              Join other Indian parents, ask questions, and get gentle mealtime tips — free.
            </p>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-leaf px-6 py-3 text-white font-semibold hover:opacity-95"
              >
                <MessageCircle className="h-5 w-5" /> Join on WhatsApp
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
