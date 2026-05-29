import type { Metadata } from "next";
import { Mail, Instagram } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { contact } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about the books, your download, or a refund? Get in touch.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <PageHero title={contact.heading} subtitle={contact.body} />
      <section className="section pt-4 bg-cream">
        <div className="container-page max-w-xl">
          <ContactForm />
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 text-brand font-semibold">
              <Mail className="h-4 w-4" /> {contact.email}
            </a>
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand font-semibold">
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
