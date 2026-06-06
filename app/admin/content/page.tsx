import { adminDb } from "@/lib/supabase/guard";
import SetupNotice from "@/components/admin/SetupNotice";
import RepeatableRows from "@/components/admin/RepeatableRows";
import { saveContent } from "./actions";
import {
  hero, offer, empathy, method, stats, leadMagnet, guarantee, finalCta,
  author, about, whatsappCommunity, footer,
} from "@/data/content";
import { testimonials as staticTestimonials } from "@/data/testimonials";
import { faqs as staticFaqs } from "@/data/faq";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const db = adminDb();
  if (!db) return <SetupNotice />;
  const { data } = await db.from("site_content").select("data").eq("id", 1).single();
  const c = (data?.data || {}) as Record<string, unknown>;

  const t = (k: string, fb: string) => (typeof c[k] === "string" && c[k] ? (c[k] as string) : fb);
  const img = (k: string, fb: string) => (typeof c[k] === "string" && c[k] ? (c[k] as string) : fb);
  const lines = (k: string, fb: string[]) => (Array.isArray(c[k]) ? (c[k] as string[]) : fb).join("\n");
  const rows = (k: string, fb: Record<string, unknown>[]) => (Array.isArray(c[k]) ? (c[k] as Record<string, unknown>[]) : fb);

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold">Edit your website</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Change any words, photo or link below and click <b>Save</b> at the bottom. Leave a box empty to keep the original.
        Your website updates within a few seconds.
      </p>

      <form action={saveContent} className="mt-6 space-y-4">
        <Group title="Top of the page (hero)">
          <Field label="Big headline" name="heroH1" def={t("heroH1", hero.h1)} />
          <Area label="Sentence under the headline" name="heroSubhead" def={t("heroSubhead", hero.subhead)} />
          <Field label="Small trust line (under the buttons)" name="heroTrust" def={t("heroTrust", hero.trust)} />
          <Field label="'What you'll discover' heading" name="discoverHeading" def={t("discoverHeading", hero.discover.heading)} />
          <Lines label="What you'll discover - one point per line" name="discover" def={lines("discover", hero.discover.items)} />
          <ImageField label="Main photo" name="heroImage" src={img("heroImage", "/images/hero.jpg")} />
        </Group>

        <Group title="Special offer line">
          <Field label="Offer line" name="offerLine" def={t("offerLine", offer.line)} />
          <Field label="Small note under it" name="offerNote" def={t("offerNote", offer.note)} />
        </Group>

        <Group title="'You're not a bad parent' section">
          <Field label="Heading" name="empathyHeading" def={t("empathyHeading", empathy.heading)} />
          <Area label="Paragraph" name="empathyBody" def={t("empathyBody", empathy.body)} />
          <ImageField label="Photo" name="empathyImage" src={img("empathyImage", "/images/empathy.jpg")} />
        </Group>

        <Group title="4C method">
          <Field label="Heading" name="methodHeading" def={t("methodHeading", method.heading)} />
        </Group>

        <Group title="Numbers band (5000+ etc.)">
          <RepeatableRows
            name="stats"
            itemLabel="Number"
            addLabel="+ Add a number"
            fields={[
              { key: "value", label: "Number (digits only)", type: "number" },
              { key: "suffix", label: "Symbol after it (+ or %)" },
              { key: "label", label: "What it means" },
            ]}
            initial={rows("stats", stats as unknown as Record<string, unknown>[])}
          />
        </Group>

        <Group title="Free sample box">
          <Field label="Heading" name="lmHeading" def={t("lmHeading", leadMagnet.heading)} />
          <Area label="Sentence" name="lmSub" def={t("lmSub", leadMagnet.sub)} />
          <Field label="Button text" name="lmCta" def={t("lmCta", leadMagnet.cta)} />
        </Group>

        <Group title="Money-back guarantee">
          <Field label="Heading" name="guaranteeHeading" def={t("guaranteeHeading", guarantee.heading)} />
          <Area label="Paragraph" name="guaranteeBody" def={t("guaranteeBody", guarantee.body)} />
        </Group>

        <Group title="Final call-to-action">
          <Field label="Heading" name="finalCtaHeading" def={t("finalCtaHeading", finalCta.heading)} />
          <Field label="Urgency line" name="finalCtaUrgency" def={t("finalCtaUrgency", finalCta.urgency)} />
          <Field label="Button text" name="finalCtaCta" def={t("finalCtaCta", finalCta.cta)} />
        </Group>

        <Group title="Reviews / testimonials">
          <RepeatableRows
            name="testimonials"
            itemLabel="Review"
            addLabel="+ Add a review"
            fields={[
              { key: "quote", label: "What the parent said", type: "textarea" },
              { key: "name", label: "Their name" },
              { key: "role", label: "About them (e.g. mom of a 4-year-old)" },
              { key: "stars", label: "Stars (1 to 5)", type: "number" },
            ]}
            initial={rows("testimonials", staticTestimonials.map((x) => ({ quote: x.quote, name: x.name, role: x.role, stars: x.stars })))}
          />
        </Group>

        <Group title="FAQs (questions on the homepage)">
          <RepeatableRows
            name="faqs"
            itemLabel="Question"
            addLabel="+ Add a question"
            fields={[
              { key: "q", label: "Question" },
              { key: "a", label: "Answer", type: "textarea" },
            ]}
            initial={rows("faqs", staticFaqs as unknown as Record<string, unknown>[])}
          />
        </Group>

        <Group title="About the author">
          <Field label="Author name" name="authorName" def={t("authorName", author.name)} />
          <Field label="Author title" name="authorTitle" def={t("authorTitle", author.title)} />
          <Lines label="Author bio - one paragraph per line" name="authorBio" def={lines("authorBio", author.bio)} />
          <ImageField label="Author photo" name="authorPhoto" src={img("authorPhoto", author.photo)} />
          <Lines label="About page text - one paragraph per line" name="aboutBody" def={lines("aboutBody", about.body)} />
        </Group>

        <Group title="WhatsApp community">
          <Field label="Label" name="waLabel" def={t("waLabel", whatsappCommunity.label)} />
          <Field label="Join link (optional)" name="waLink" def={t("waLink", whatsappCommunity.link)} />
          <ImageField label="QR code image" name="waQr" src={img("waQr", whatsappCommunity.qr)} />
        </Group>

        <Group title="Links & logo">
          <Field label="Instagram link" name="instagram" def={t("instagram", footer.instagram)} />
          <Field label="Support email" name="supportEmail" def={t("supportEmail", footer.email)} />
          <Field label="Payments line (shown in footer)" name="payments" def={t("payments", footer.payments)} />
          <ImageField label="Logo" name="logo" src={img("logo", "/images/logo.png")} />
        </Group>

        <div className="sticky bottom-0 bg-neutral-50 py-3 border-t border-neutral-200">
          <button className="rounded-md bg-emerald-700 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-800">Save everything</button>
          <span className="ml-3 text-xs text-neutral-500">Upload one large photo at a time.</span>
        </div>
      </form>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-emerald-800">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}
function Field({ label, name, def }: { label: string; name: string; def: string }) {
  return (
    <label className="block text-sm">
      <span className="text-neutral-600">{label}</span>
      <input name={name} defaultValue={def} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
    </label>
  );
}
function Area({ label, name, def }: { label: string; name: string; def: string }) {
  return (
    <label className="block text-sm">
      <span className="text-neutral-600">{label}</span>
      <textarea name={name} defaultValue={def} rows={3} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
    </label>
  );
}
function Lines({ label, name, def }: { label: string; name: string; def: string }) {
  return (
    <label className="block text-sm">
      <span className="text-neutral-600">{label}</span>
      <textarea name={name} defaultValue={def} rows={5} placeholder="One per line" className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
    </label>
  );
}
function ImageField({ label, name, src }: { label: string; name: string; src: string }) {
  return (
    <div className="text-sm">
      <span className="text-neutral-600">{label}</span>
      <div className="mt-1 flex items-center gap-3">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={label} className="h-16 w-16 object-cover rounded border border-neutral-200 bg-neutral-50" />
        ) : null}
        <input type="file" name={`${name}_file`} accept="image/*" className="text-xs" />
      </div>
    </div>
  );
}
