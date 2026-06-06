import { adminDb } from "@/lib/supabase/guard";
import SetupNotice from "@/components/admin/SetupNotice";
import { saveContent } from "./actions";
import { hero, offer, guarantee, finalCta } from "@/data/content";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const db = adminDb();
  if (!db) return <SetupNotice />;
  const { data } = await db.from("site_content").select("data").eq("id", 1).single();
  const c = (data?.data || {}) as Record<string, string>;
  const v = (k: string, fallback: string) => c[k] ?? fallback;

  return (
    <div>
      <h1 className="text-xl font-semibold">Site content</h1>
      <p className="mt-1 text-sm text-neutral-500">Edit the key copy on the public site. Leave a field as-is to keep the default. Changes go live after saving.</p>
      <form action={saveContent} className="mt-6 space-y-4 max-w-2xl">
        <Group title="Hero">
          <Field label="Headline" name="heroH1" def={v("heroH1", hero.h1)} />
          <Area label="Subtitle" name="heroSubhead" def={v("heroSubhead", hero.subhead)} />
        </Group>
        <Group title="Offer (scarcity line)">
          <Field label="Offer line" name="offerLine" def={v("offerLine", offer.line)} />
          <Field label="Offer note" name="offerNote" def={v("offerNote", offer.note)} />
        </Group>
        <Group title="Guarantee">
          <Field label="Heading" name="guaranteeHeading" def={v("guaranteeHeading", guarantee.heading)} />
          <Area label="Body" name="guaranteeBody" def={v("guaranteeBody", guarantee.body)} />
        </Group>
        <Group title="Final call-to-action">
          <Field label="Heading" name="finalCtaHeading" def={v("finalCtaHeading", finalCta.heading)} />
          <Field label="Urgency line" name="finalCtaUrgency" def={v("finalCtaUrgency", finalCta.urgency)} />
          <Field label="Button label" name="finalCtaCta" def={v("finalCtaCta", finalCta.cta)} />
        </Group>
        <button className="rounded-md bg-emerald-700 px-4 py-2 text-sm text-white hover:bg-emerald-800">Save content</button>
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
