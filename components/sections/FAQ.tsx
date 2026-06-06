import { faqs as defaultFaqs, type FAQ as FAQType } from "@/data/faq";
import { getContent } from "@/lib/site-data";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Reveal from "@/components/Reveal";

export default async function FAQ({
  items,
  heading = "Questions, answered",
}: {
  items?: FAQType[];
  heading?: string;
}) {
  let list = items;
  if (!list) {
    const c = await getContent();
    list = c.faqs && c.faqs.length ? c.faqs : defaultFaqs;
  }
  return (
    <section className="section bg-cream">
      <div className="container-page max-w-2xl">
        <Reveal>
          <h2 className="text-h2 md:text-h2-lg text-forest text-center mb-8">{heading}</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <Accordion type="single" collapsible>
            {list.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
