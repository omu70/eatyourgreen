import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { whatsappCommunity } from "@/data/content";
import { getContent } from "@/lib/site-data";
import Reveal from "@/components/Reveal";

export default async function WhatsAppCommunity() {
  const c = await getContent();
  const label = c.waLabel || whatsappCommunity.label;
  const qr = c.waQr || whatsappCommunity.qr;
  const link = c.waLink || whatsappCommunity.link;
  return (
    <section className="section bg-cream">
      <div className="container-page max-w-2xl">
        <Reveal>
          <div className="rounded-card bg-white border border-mist shadow-card p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="relative h-36 w-36 shrink-0 rounded-card overflow-hidden border border-mist bg-mist">
              <Image src={qr} alt="Scan to join our WhatsApp community" fill sizes="144px" className="object-contain p-2" />
            </div>
            <div>
              {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand font-heading font-semibold hover:underline">
                  <MessageCircle className="h-5 w-5" /> {label}
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-brand font-heading font-semibold">
                  <MessageCircle className="h-5 w-5" /> {label}
                </span>
              )}
              <p className="mt-2 text-ink/75 text-sm">
                Scan the QR code with your phone camera to join other Indian parents, ask questions,
                and get gentle mealtime tips — free.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
