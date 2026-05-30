import type { Metadata } from "next";
import { Mail, Instagram } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import WhatsAppCommunity from "@/components/sections/WhatsAppCommunity";
import { contact } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about the books, your download, or a refund? Message us or join our WhatsApp community.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const showEmail = contact.email && !contact.email.startsWith("TODO");
  return (
    <main>
      <PageHero title={contact.heading} subtitle={contact.body} />
      <section className="section pt-4 bg-cream">
        <div className="container-page max-w-xl">
          <ContactForm />
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4 justify-center text-sm">
            {showEmail && (
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 text-brand font-semibold">
                <Mail className="h-4 w-4" /> {contact.email}
              </a>
            )}
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand font-semibold">
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>
      </section>
      <WhatsAppCommunity />
    </main>
  );
}
