import { adminDb } from "@/lib/supabase/guard";
import SetupNotice from "@/components/admin/SetupNotice";
import {
  seedProducts, updateProduct, addProduct, deleteProduct, addGalleryImage, removeGalleryImage,
} from "./actions";

export const dynamic = "force-dynamic";

type Gallery = { img?: string; caption?: string };
type P = {
  slug: string; title: string; tagline: string | null; subhead: string | null;
  price: number; old_price: number; badge: string | null; cta_label: string | null;
  for_who: string | null; pages: string | null; format: string | null; pdf: string | null;
  accent: string | null; meta_title: string | null; meta_description: string | null;
  sort: number; active: boolean; cover: string | null;
  whats_inside: unknown; outcomes: unknown; faqs: unknown; gallery: Gallery[] | null;
};

function j(v: unknown) {
  try { return JSON.stringify(v ?? [], null, 2); } catch { return "[]"; }
}

export default async function ProductsPage() {
  const db = adminDb();
  if (!db) return <SetupNotice />;
  const { data } = await db.from("products").select("*").order("sort", { ascending: true });
  const products = (data || []) as P[];

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl font-semibold">Products</h1>
        <form action={seedProducts}>
          <button className="rounded-md border border-emerald-700 px-3 py-1.5 text-sm text-emerald-700 hover:bg-emerald-50">
            {products.length ? "Re-import from site" : "Import current site products"}
          </button>
        </form>
      </div>

      {/* Add new product */}
      <form action={addProduct} className="mt-5 rounded-xl border border-dashed border-neutral-300 bg-white p-4 flex flex-wrap items-end gap-3">
        <label className="block"><span className="text-xs text-neutral-500">New product slug</span>
          <input name="slug" placeholder="my-new-book" className="mt-1 block rounded-md border border-neutral-300 px-3 py-2 text-sm" /></label>
        <label className="block"><span className="text-xs text-neutral-500">Title</span>
          <input name="title" placeholder="Book title" className="mt-1 block rounded-md border border-neutral-300 px-3 py-2 text-sm" /></label>
        <label className="block"><span className="text-xs text-neutral-500">Price ₹</span>
          <input name="price" type="number" defaultValue={0} className="mt-1 block w-24 rounded-md border border-neutral-300 px-3 py-2 text-sm" /></label>
        <button className="rounded-md bg-emerald-700 px-4 py-2 text-sm text-white hover:bg-emerald-800">+ Add product</button>
      </form>

      {products.length === 0 && (
        <p className="mt-6 text-sm text-neutral-500">No products yet. Click “Import current site products” to load your books, then edit them here.</p>
      )}

      <div className="mt-6 space-y-8">
        {products.map((p) => (
          <div key={p.slug} className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="text-xs rounded bg-neutral-100 px-2 py-0.5 text-neutral-500">{p.slug}</span>
              <span className="text-sm font-medium text-neutral-700">{p.title}</span>
            </div>

            <form action={updateProduct} className="mt-4 grid md:grid-cols-[160px_1fr] gap-5">
              <input type="hidden" name="slug" value={p.slug} />

              <div>
                <div className="text-xs text-neutral-500 mb-1">Cover</div>
                {p.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.cover} alt="cover" className="w-full rounded-md border border-neutral-200" />
                ) : (
                  <div className="aspect-[3/4] rounded-md border border-dashed border-neutral-300 flex items-center justify-center text-xs text-neutral-400">no cover</div>
                )}
                <div className="mt-2 text-xs text-neutral-500">Replace cover</div>
                <input type="file" name="cover_file" accept="image/*" className="mt-1 block w-full text-xs" />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Title" name="title" def={p.title} />
                <Field label="Badge" name="badge" def={p.badge || ""} />
                <Field label="Price (₹)" name="price" def={String(p.price)} type="number" />
                <Field label="Old price (₹)" name="old_price" def={String(p.old_price)} type="number" />
                <Field label="CTA label" name="cta_label" def={p.cta_label || ""} />
                <Field label="Sort order" name="sort" def={String(p.sort)} type="number" />
                <Field label="Pages" name="pages" def={p.pages || ""} />
                <Field label="Format" name="format" def={p.format || ""} />
                <label className="block text-sm">
                  <span className="text-neutral-500">Accent</span>
                  <select name="accent" defaultValue={p.accent || "brand"} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm">
                    <option value="brand">brand (green)</option>
                    <option value="gold">gold (most popular)</option>
                  </select>
                </label>
                <label className="flex items-center gap-2 text-sm sm:mt-6">
                  <input type="checkbox" name="active" defaultChecked={p.active} /> Active (show on site)
                </label>
                <div className="sm:col-span-2"><Field label="PDF path (delivered after payment)" name="pdf" def={p.pdf || ""} /></div>
                <div className="sm:col-span-2"><Field label="Tagline" name="tagline" def={p.tagline || ""} /></div>
                <div className="sm:col-span-2"><Area label="Subhead" name="subhead" def={p.subhead || ""} /></div>
                <div className="sm:col-span-2"><Area label="For who" name="for_who" def={p.for_who || ""} /></div>
                <div className="sm:col-span-2"><Area label="What's inside (JSON list)" name="whats_inside" def={j(p.whats_inside)} rows={5} mono /></div>
                <div className="sm:col-span-2"><Area label="Outcomes (JSON list)" name="outcomes" def={j(p.outcomes)} rows={4} mono /></div>
                <div className="sm:col-span-2"><Area label="FAQs (JSON list)" name="faqs" def={j(p.faqs)} rows={5} mono /></div>
                <Field label="Meta title (SEO)" name="meta_title" def={p.meta_title || ""} />
                <Field label="Meta description (SEO)" name="meta_description" def={p.meta_description || ""} />
                <div className="sm:col-span-2">
                  <button className="rounded-md bg-emerald-700 px-4 py-2 text-sm text-white hover:bg-emerald-800">Save changes</button>
                </div>
              </div>
            </form>

            <div className="mt-6 border-t border-neutral-100 pt-4">
              <div className="text-sm font-medium text-neutral-700">&ldquo;A peek inside&rdquo; gallery</div>
              <div className="mt-3 flex flex-wrap gap-3">
                {(p.gallery || []).map((g, i) => (
                  <div key={i} className="w-24">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={g.img} alt={g.caption || ""} className="w-24 h-32 object-cover rounded border border-neutral-200" />
                    <form action={removeGalleryImage}>
                      <input type="hidden" name="slug" value={p.slug} />
                      <input type="hidden" name="img" value={g.img} />
                      <button className="mt-1 w-full text-xs text-red-600 hover:underline">Remove</button>
                    </form>
                  </div>
                ))}
              </div>
              <form action={addGalleryImage} className="mt-3 flex flex-wrap items-end gap-3">
                <input type="hidden" name="slug" value={p.slug} />
                <label className="block"><span className="text-xs text-neutral-500">Add image(s) — select several at once</span>
                  <input type="file" name="file" accept="image/*" multiple className="mt-1 block text-xs" /></label>
                <label className="block"><span className="text-xs text-neutral-500">Caption</span>
                  <input name="caption" placeholder="optional" className="mt-1 block rounded-md border border-neutral-300 px-3 py-2 text-sm" /></label>
                <button className="rounded-md border border-emerald-700 px-3 py-1.5 text-sm text-emerald-700 hover:bg-emerald-50">Upload</button>
              </form>
            </div>

            <form action={deleteProduct} className="mt-5 border-t border-neutral-100 pt-4">
              <input type="hidden" name="slug" value={p.slug} />
              <button className="text-sm text-red-600 hover:underline">Delete this product</button>
            </form>
          </div>
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
function Area({ label, name, def, rows = 2, mono = false }: { label: string; name: string; def: string; rows?: number; mono?: boolean }) {
  return (
    <label className="block text-sm">
      <span className="text-neutral-500">{label}</span>
      <textarea name={name} defaultValue={def} rows={rows}
        className={`mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm ${mono ? "font-mono text-xs" : ""}`} />
    </label>
  );
}
