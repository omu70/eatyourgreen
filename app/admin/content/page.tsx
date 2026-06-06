import { adminDb } from "@/lib/supabase/guard";
import SetupNotice from "@/components/admin/SetupNotice";
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
  const jstr = (k: string, fb: unknown) => {
    try { return JSON.stringify(c[k] ?? fb, null, 2); } catch { return "[]"; }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold">Site content</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Edit any copy, image or link on the public site. Empty a text box to revert to the built-in default.
        Lists are edited as JSON. Changes go live within a few seconds of saving.
      </p>

      <form action={saveContent} className="mt-6 space-y-4">
        <Group title="Hero">
          <Field label="Headline" name="heroH1" def={t("heroH1", hero.h1)} />
          <Area label="Subtitle" name="heroSubhead" def={t("heroSubhead", hero.subhead)} />
          <Field label="Trust line (under buttons)" name="heroTrust" def={t("heroTrust", hero.trust)} />
          <Field label="“What you'll discover” heading" name="discoverHeading" def={t("discoverHeading", hero.discover.heading)} />
          <JsonArea label="Discover points (JSON list of strings)" name="discover" def={jstr("discover", hero.discover.items)} />
          <ImageField label="Hero image" name="heroImage" src={img("heroImage", "/images/hero.jpg")} />
        </Group>

        <Group title="Offer (scarcity line)">
          <Field label="Offer line" name="offerLine" def={t("offerLine", offer.line)} />
          <Field label="Offer note" name="offerNote" def={t("offerNote", offer.note)} />
        </Group>

        <Group title="Empathy section">
          <Field label="Heading" name="empathyHeading" def={t("empathyHeading", empathy.heading)} />
          <Area label="Body" name="empathyBody" def={t("empathyBody", empathy.body)} />
          <ImageField label="Empathy image" name="empathyImage" src={img("empathyImage", "/images/empathy.jpg")} />
        </Group>

        <Group title="4C method">
          <Field label="Heading" name="methodHeading" def={t("methodHeading", method.heading)} />
        </Group>

        <Group title="Stats band">
          <JsonArea label="Stats (JSON: value, suffix, label)" name="stats" def={jstr("stats", stats)} rows={8} />
        </Group>

        <Group title="Lead magnet (free sample)">
          <Field label="Heading" name="lmHeading" def={t("lmHeading", leadMagnet.heading)} />
          <Area label="Sub" name="lmSub" def={t("lmSub", leadMagnet.sub)} />
          <Field label="Button label" name="lmCta" def={t("lmCta", leadMagnet.cta)} />
        </Group>

        <Group title="Guarantee">
          <Field label="Heading" name="guaranteeHeading" def={t("guaranteeHeading", guarantee.heading)} />
          <Area label="Body" name="guaranteeBody" def={t("guaranteeBody", guarantee.body)} />
        </Group>

        <Group title="Final call-to-action">
          <Field label="Heading" name="finalCtaHeading" def={t("finalCtaHeading", finalCta.heading)} />
          <Field label="Urgency line" name="finalCtaUrgency" def={t("finalCtaUrgency", finalCta.urgency)} />
          <Field label="Button label" name="finalCtaCta" def={t("finalCtaCta", finalCta.cta)} />
        </Group>

        <Group title="Testimonials">
          <JsonArea label="Reviews (JSON: quote, name, role, stars)" name="testimonials" def={jstr("testimonials", staticTestimonials.map((x) => ({ quote: x.quote, name: x.name, role: x.role, stars: x.stars })))} rows={12} />
        </Group>

        <Group title="FAQs (homepage)">
          <JsonArea label="FAQs (JSON: q, a)" name="faqs" def={jstr("faqs", staticFaqs)} rows={12} />
        </Group>

        <Group title="Author / About">
          <Field label="Author name" name="authorName" def={t("authorName", author.name)} />
          <Field label="Author title" name="authorTitle" def={t("authorTitle", author.title)} />
          <JsonArea label="Author bio (JSON list of paragraphs)" name="authorBio" def={jstr("authorBio", author.bio)} rows={6} />
          <ImageField label="Author photo" name="authorPhoto" src={img("authorPhoto", author.photo)} />
          <JsonArea label="About page body (JSON list of paragraphs)" name="aboutBody" def={jstr("aboutBody", about.body)} rows={6} />
        </Group>

        <Group title="WhatsApp community">
          <Field label="Label" name="waLabel" def={t("waLabel", whatsappCommunity.label)} />
          <Field label="Invite link (optional)" name="waLink" def={t("waLink", whatsappCommunity.link)} />
          <ImageField label="QR image" name="waQr" src={img("waQr", whatsappCommunity.qr)} />
        </Group>

        <Group title="Links & branding">
          <Field label="Instagram URL" name="instagram" def={t("instagram", footer.instagram)} />
          <Field label="Support email" name="supportEmail" def={t("supportEmail", footer.email)} />
          <Field label="Payments line" name="payments" def={t("payments", footer.payments)} />
          <ImageField label="Logo (shown on dark footer)" name="logo" src={img("logo", "/images/logo.png")} />
        </Group>

        <div className="sticky bottom-0 bg-neutral-50 py-3">
          <button className="rounded-md bg-emerald-700 px-5 py-2 text-sm text-white hover:bg-emerald-800">Save all content</button>
          <span className="ml-3 text-xs text-neutral-500">Tip: upload one large image at a time.</span>
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
      <span className="text-neutral-500">{label}</span>
      <input name={name} defaultValue={def} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
    </label>
  );
}
function Area({ label, name, def }: { label: string; name: string; def: string }) {
  return (
    <label className="block text-sm">
      <span className="text-neutral-500">{label}</span>
      <textarea name={name} defaultValue={def} rows={3} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
    </label>
  );
}
function JsonArea({ label, name, def, rows = 4 }: { label: string; name: string; def: string; rows?: number }) {
  return (
    <label className="block text-sm">
      <span className="text-neutral-500">{label}</span>
      <textarea name={name} defaultValue={def} rows={rows} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-xs font-mono" />
    </label>
  );
}
function ImageField({ label, name, src }: { label: string; name: string; src: string }) {
  return (
    <div className="text-sm">
      <span className="text-neutral-500">{label}</span>
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
