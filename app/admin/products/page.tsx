import { adminDb } from "@/lib/supabase/guard";
import SetupNotice from "@/components/admin/SetupNotice";
import RepeatableRows from "@/components/admin/RepeatableRows";
import {
  seedProducts, updateProduct, addProduct, deleteProduct, addGalleryImage, removeGalleryImage, uploadProductPdf,
} from "./actions";

export const dynamic = "force-dynamic";

type Gallery = { img?: string; caption?: string };
type P = {
  slug: string; title: string; tagline: string | null; subhead: string | null;
  price: number; old_price: number; badge: string | null; cta_label: string | null;
  for_who: string | null; pages: string | null; format: string | null; pdf: string | null; pdf_path: string | null;
  accent: string | null; meta_title: string | null; meta_description: string | null;
  sort: number; active: boolean; cover: string | null;
  whats_inside: unknown; outcomes: unknown; faqs: unknown; gallery: Gallery[] | null;
};

const objArr = (v: unknown) => (Array.isArray(v) ? (v as Record<string, unknown>[]) : []);
const strArr = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);

export default async function ProductsPage() {
  const db = adminDb();
  if (!db) return <SetupNotice />;
  const { data } = await db.from("products").select("*").order("sort", { ascending: true });
  const products = (data || []) as P[];

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-semibold">Your books</h1>
          <p className="text-sm text-neutral-500">Change prices, words and photos. Click <b>Save</b> on a book to make it live.</p>
        </div>
        <form action={seedProducts}>
          <button className="rounded-md border border-emerald-700 px-3 py-1.5 text-sm text-emerald-700 hover:bg-emerald-50">
            {products.length ? "Reset from website" : "Load my books"}
          </button>
        </form>
      </div>

      <form action={addProduct} className="mt-5 rounded-xl border border-dashed border-neutral-300 bg-white p-4 flex flex-wrap items-end gap-3">
        <label className="block"><span className="text-xs text-neutral-500">Add a new book - short web name</span>
          <input name="slug" placeholder="my-new-book" className="mt-1 block rounded-md border border-neutral-300 px-3 py-2 text-sm" /></label>
        <label className="block"><span className="text-xs text-neutral-500">Title</span>
          <input name="title" placeholder="Book title" className="mt-1 block rounded-md border border-neutral-300 px-3 py-2 text-sm" /></label>
        <label className="block"><span className="text-xs text-neutral-500">Price ₹</span>
          <input name="price" type="number" defaultValue={0} className="mt-1 block w-24 rounded-md border border-neutral-300 px-3 py-2 text-sm" /></label>
        <button className="rounded-md bg-emerald-700 px-4 py-2 text-sm text-white hover:bg-emerald-800">+ Add book</button>
      </form>

      {products.length === 0 && (
        <p className="mt-6 text-sm text-neutral-500">No books yet. Click &ldquo;Load my books&rdquo; to bring them in, then edit below.</p>
      )}

      <div className="mt-6 space-y-8">
        {products.map((p) => (
          <div key={p.slug} className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-neutral-800">{p.title}</span>
            </div>

            <form action={updateProduct} className="mt-4 grid md:grid-cols-[160px_1fr] gap-5">
              <input type="hidden" name="slug" value={p.slug} />

              <div>
                <div className="text-xs text-neutral-500 mb-1">Cover photo</div>
                {p.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.cover} alt="cover" className="w-full rounded-md border border-neutral-200" />
                ) : (
                  <div className="aspect-[3/4] rounded-md border border-dashed border-neutral-300 flex items-center justify-center text-xs text-neutral-400">no photo</div>
                )}
                <div className="mt-2 text-xs text-neutral-500">Change cover</div>
                <input type="file" name="cover_file" accept="image/*" className="mt-1 block w-full text-xs" />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Title" name="title" def={p.title} />
                <Field label="Highlight label (e.g. Most Popular)" name="badge" def={p.badge || ""} />
                <Field label="Price (₹)" name="price" def={String(p.price)} type="number" />
                <Field label="Old price (₹, crossed out)" name="old_price" def={String(p.old_price)} type="number" />
                <Field label="Button text" name="cta_label" def={p.cta_label || ""} />
                <label className="flex items-center gap-2 text-sm sm:mt-6">
                  <input type="checkbox" name="active" defaultChecked={p.active} /> Show this book on the website
                </label>
                <div className="sm:col-span-2"><Field label="One-line description" name="tagline" def={p.tagline || ""} /></div>
                <div className="sm:col-span-2"><Area label="Longer description" name="subhead" def={p.subhead || ""} /></div>
                <div className="sm:col-span-2"><Area label="Who it's for" name="for_who" def={p.for_who || ""} /></div>

                <div className="sm:col-span-2">
                  <p className="text-sm font-medium text-neutral-700 mb-1">What&rsquo;s inside</p>
                  <RepeatableRows
                    name="whats_inside"
                    itemLabel="Item"
                    addLabel="+ Add an item"
                    fields={[
                      { key: "name", label: "Item name" },
                      { key: "desc", label: "Short description", type: "textarea" },
                      { key: "value", label: "Value tag (optional), e.g. ₹299 value" },
                    ]}
                    initial={objArr(p.whats_inside)}
                  />
                </div>

                <div className="sm:col-span-2"><Lines label="What changes for the child - one per line" name="outcomes" def={strArr(p.outcomes).join("\n")} /></div>

                <div className="sm:col-span-2">
                  <p className="text-sm font-medium text-neutral-700 mb-1">FAQs for this book</p>
                  <RepeatableRows
                    name="faqs"
                    itemLabel="Question"
                    addLabel="+ Add a question"
                    fields={[
                      { key: "q", label: "Question" },
                      { key: "a", label: "Answer", type: "textarea" },
                    ]}
                    initial={objArr(p.faqs)}
                  />
                </div>

                <details className="sm:col-span-2 rounded-md border border-neutral-200 p-3">
                  <summary className="text-sm text-neutral-600 cursor-pointer">Advanced (optional)</summary>
                  <div className="mt-3 grid sm:grid-cols-2 gap-3">
                    <Field label="Pages text (e.g. 25+ pages)" name="pages" def={p.pages || ""} />
                    <Field label="Format text" name="format" def={p.format || ""} />
                    <label className="block text-sm">
                      <span className="text-neutral-600">Highlight colour</span>
                      <select name="accent" defaultValue={p.accent || "brand"} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm">
                        <option value="brand">Green (normal)</option>
                        <option value="gold">Gold (most popular)</option>
                      </select>
                    </label>
                    <Field label="Order on page (0 = first)" name="sort" def={String(p.sort)} type="number" />
                    <div className="sm:col-span-2"><Field label="Legacy file path (optional — leave blank and upload the PDF lower down instead)" name="pdf" def={p.pdf || ""} /></div>
                    <Field label="Google title (SEO)" name="meta_title" def={p.meta_title || ""} />
                    <Field label="Google description (SEO)" name="meta_description" def={p.meta_description || ""} />
                  </div>
                </details>

                <div className="sm:col-span-2">
                  <button className="rounded-md bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-800">Save this book</button>
                </div>
              </div>
            </form>

            <div className="mt-6 border-t border-neutral-100 pt-4">
              <div className="text-sm font-medium text-neutral-700">Extra photos (&ldquo;A peek inside&rdquo;)</div>
              <div className="mt-3 flex flex-wrap gap-3">
                {(p.gallery || []).map((g, i) => (
                  <div key={i} className="w-24">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={g.img} alt={g.caption || ""} className="w-24 h-32 object-contain bg-white rounded border border-neutral-200" />
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
                <label className="block"><span className="text-xs text-neutral-500">Add photo(s) - pick several at once</span>
                  <input type="file" name="file" accept="image/*" multiple className="mt-1 block text-xs" /></label>
                <label className="block"><span className="text-xs text-neutral-500">Caption</span>
                  <input name="caption" placeholder="optional" className="mt-1 block rounded-md border border-neutral-300 px-3 py-2 text-sm" /></label>
                <button className="rounded-md border border-emerald-700 px-3 py-1.5 text-sm text-emerald-700 hover:bg-emerald-50">Upload</button>
              </form>
            </div>

            <div className="mt-6 border-t border-neutral-100 pt-4">
              <div className="text-sm font-medium text-neutral-700">Book PDF — the file customers receive</div>
              <p className="text-xs text-neutral-500 mt-0.5">
                {p.pdf_path
                  ? "✓ A PDF is uploaded. It is private — buyers can only download it on the thank-you page right after they pay. Pick a new file to replace it."
                  : "⚠ No PDF uploaded yet. Upload the book file here. It stays private and is only delivered after a successful payment."}
              </p>
              <form action={uploadProductPdf} className="mt-2 flex flex-wrap items-end gap-3">
                <input type="hidden" name="slug" value={p.slug} />
                <input type="file" name="pdf_file" accept="application/pdf,.pdf" className="block text-xs" />
                <button className="rounded-md bg-emerald-700 px-4 py-2 text-sm text-white hover:bg-emerald-800">
                  {p.pdf_path ? "Replace PDF" : "Upload PDF"}
                </button>
              </form>
            </div>

            <form action={deleteProduct} className="mt-5 border-t border-neutral-100 pt-4">
              <input type="hidden" name="slug" value={p.slug} />
              <button className="text-sm text-red-600 hover:underline">Delete this book</button>
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
      <span className="text-neutral-600">{label}</span>
      <input name={name} type={type} defaultValue={def} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
    </label>
  );
}
function Area({ label, name, def }: { label: string; name: string; def: string }) {
  return (
    <label className="block text-sm">
      <span className="text-neutral-600">{label}</span>
      <textarea name={name} defaultValue={def} rows={2} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
    </label>
  );
}
function Lines({ label, name, def }: { label: string; name: string; def: string }) {
  return (
    <label className="block text-sm">
      <span className="text-neutral-600">{label}</span>
      <textarea name={name} defaultValue={def} rows={4} placeholder="One per line" className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
    </label>
  );
}
