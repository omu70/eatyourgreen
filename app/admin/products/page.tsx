import { adminDb } from "@/lib/supabase/guard";
import SetupNotice from "@/components/admin/SetupNotice";
import { seedProducts, updateProduct } from "./actions";

export const dynamic = "force-dynamic";

type P = {
  slug: string; title: string; tagline: string | null; subhead: string | null;
  price: number; old_price: number; badge: string | null; cta_label: string | null;
  sort: number; active: boolean; cover: string | null;
};

export default async function ProductsPage() {
  const db = adminDb();
  if (!db) return <SetupNotice />;
  const { data } = await db.from("products").select("*").order("sort", { ascending: true });
  const products = (data || []) as P[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Products</h1>
        <form action={seedProducts}>
          <button className="rounded-md border border-emerald-700 px-3 py-1.5 text-sm text-emerald-700 hover:bg-emerald-50">
            {products.length ? "Re-import from site" : "Import current site products"}
          </button>
        </form>
      </div>

      {products.length === 0 && (
        <p className="mt-6 text-sm text-neutral-500">No products yet. Click “Import current site products” to load the 3 books, then edit them here.</p>
      )}

      <div className="mt-6 space-y-4">
        {products.map((p) => (
          <form key={p.slug} action={updateProduct} className="rounded-xl border border-neutral-200 bg-white p-5">
            <input type="hidden" name="slug" value={p.slug} />
            <div className="flex items-center gap-3">
              <span className="text-xs rounded bg-neutral-100 px-2 py-0.5 text-neutral-500">{p.slug}</span>
              <label className="ml-auto flex items-center gap-2 text-sm">
                <input type="checkbox" name="active" defaultChecked={p.active} /> Active
              </label>
            </div>
            <div className="mt-3 grid md:grid-cols-2 gap-3">
              <Field label="Title" name="title" def={p.title} />
              <Field label="Badge" name="badge" def={p.badge || ""} />
              <Field label="Price (₹)" name="price" def={String(p.price)} type="number" />
              <Field label="Old price (₹)" name="old_price" def={String(p.old_price)} type="number" />
              <Field label="CTA label" name="cta_label" def={p.cta_label || ""} />
              <Field label="Sort order" name="sort" def={String(p.sort)} type="number" />
            </div>
            <Field label="Tagline" name="tagline" def={p.tagline || ""} />
            <Area label="Subhead" name="subhead" def={p.subhead || ""} />
            <div className="mt-3">
              <button className="rounded-md bg-emerald-700 px-4 py-2 text-sm text-white hover:bg-emerald-800">Save</button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}

function Field({ label, name, def, type = "text" }: { label: string; name: string; def: string; type?: string }) {
  return (
    <label className="block text-sm">
      <span className="text-neutral-500">{label}</span>
      <input name={name} type={type} defaultValue={def} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
    </label>
  );
}
function Area({ label, name, def }: { label: string; name: string; def: string }) {
  return (
    <label className="mt-3 block text-sm">
      <span className="text-neutral-500">{label}</span>
      <textarea name={name} defaultValue={def} rows={2} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
    </label>
  );
}
