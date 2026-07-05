import { adminDb } from "@/lib/supabase/guard";
import SetupNotice from "@/components/admin/SetupNotice";
import RepeatableRows from "@/components/admin/RepeatableRows";
import { Plus, FileCheck2, FileWarning, ChevronDown } from "lucide-react";
import FileField from "@/components/admin/FileField";
import PdfUploadForm from "@/components/admin/PdfUploadForm";
import {
  seedProducts, updateProduct, addProduct, deleteProduct, addGalleryImage, removeGalleryImage,
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

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; msg?: string }>;
}) {
  const sp = await searchParams;
  const db = adminDb();
  if (!db) return <SetupNotice />;
  const { data } = await db.from("products").select("*").order("sort", { ascending: true });
  const products = (data || []) as P[];

  return (
    <div>
      {sp?.msg ? (
        <div
          className={`mb-4 rounded-lg border px-4 py-3 text-sm ${
            sp.ok === "1"
              ? "border-emerald-300 bg-emerald-50 text-emerald-800"
              : "border-red-300 bg-red-50 text-red-700"
          }`}
        >
          {sp.msg}
        </div>
      ) : null}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Your books</h1>
          <p className="mt-1 text-sm text-neutral-500">Change prices, words and photos — or add a new book below.</p>
        </div>
        <form action={seedProducts}>
          <button className="rounded-md border border-emerald-700 px-3 py-1.5 text-sm text-emerald-700 hover:bg-emerald-50">
            {products.length ? "Reset from website" : "Load my books"}
          </button>
        </form>
      </div>

      <div className="mt-5 rounded-2xl border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-neutral-800">Add a new book</h2>
        <p className="text-xs text-neutral-500 mt-0.5">
          Fill these in and click <b>Add book</b> — it goes live instantly. The web address is created
          for you automatically. (You can add the longer details, FAQs and extra photos afterwards.)
        </p>
        <form action={addProduct} className="mt-4 grid sm:grid-cols-2 gap-4">
          <label className="block text-sm sm:col-span-2">
            <span className="text-neutral-600">Title</span>
            <input name="title" required placeholder="e.g. Eat Your Green — Snack Smart" className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="text-neutral-600">Short description (one line)</span>
            <input name="tagline" placeholder="What this book helps with, in a sentence" className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
          </label>
          <label className="block text-sm">
            <span className="text-neutral-600">Price (₹)</span>
            <input name="price" type="number" min={0} defaultValue={0} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
          </label>
          <label className="block text-sm">
            <span className="text-neutral-600">Compare-at price (₹, optional)</span>
            <input name="old_price" type="number" min={0} defaultValue={0} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
          </label>
          <div className="block text-sm">
            <span className="text-neutral-600">Cover photo</span>
            <div className="mt-1.5"><FileField name="cover_file" accept="image/*" chooseLabel="Choose cover" /></div>
          </div>
          <div className="block text-sm">
            <span className="text-neutral-600">Book PDF</span>
            <p className="mt-1.5 text-xs text-neutral-500">
              Add the book first, then upload its PDF from the book&rsquo;s row below — large PDFs upload straight to secure storage.
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" name="active" defaultChecked /> Show this book on the website right away
          </label>
          <div className="sm:col-span-2">
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-800">
              <Plus className="h-4 w-4" /> Add book
            </button>
          </div>
        </form>
      </div>

      {products.length === 0 && (
        <p className="mt-6 text-sm text-neutral-500">No books yet. Click &ldquo;Load my books&rdquo; to bring them in, then edit below.</p>
      )}

      <div className="mt-6 space-y-8">
        {products.map((p) => (
          <details key={p.slug} className="group rounded-xl border border-neutral-200 bg-white overflow-hidden">
            <summary className="flex items-center gap-3 p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-neutral-50">
              <span className="relative h-14 w-10 shrink-0 rounded border border-neutral-200 bg-white overflow-hidden">
                {p.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.cover} alt="" className="h-full w-full object-contain" />
                ) : null}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-medium text-neutral-900 truncate">{p.title}</span>
                <span className="block text-xs text-neutral-500">
                  ₹{Number(p.price).toLocaleString("en-IN")}
                  {p.old_price > p.price ? (
                    <span className="text-neutral-400 line-through ml-1">₹{Number(p.old_price).toLocaleString("en-IN")}</span>
                  ) : null}
                </span>
              </span>
              <span
                className={`hidden sm:inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                  p.active ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-500"
                }`}
              >
                {p.active ? "Visible" : "Hidden"}
              </span>
              <ChevronDown className="h-4 w-4 text-neutral-400 transition-transform group-open:rotate-180" />
            </summary>

            <div className="border-t border-neutral-100 p-5">
            <form action={updateProduct} className="grid md:grid-cols-[160px_1fr] gap-5">
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
                <div className="mt-1"><FileField name="cover_file" accept="image/*" chooseLabel="Choose photo" /></div>
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
                <div>
                  <span className="text-xs text-neutral-500">Add photo(s) — pick several at once</span>
                  <div className="mt-1"><FileField name="file" accept="image/*" multiple chooseLabel="Choose photos" /></div>
                </div>
                <label className="block"><span className="text-xs text-neutral-500">Caption</span>
                  <input name="caption" placeholder="optional" className="mt-1 block rounded-md border border-neutral-300 px-3 py-2 text-sm" /></label>
                <button className="rounded-md border border-emerald-700 px-3 py-1.5 text-sm text-emerald-700 hover:bg-emerald-50">Upload</button>
              </form>
            </div>

            <div className="mt-6 border-t border-neutral-100 pt-4">
              <div className="text-sm font-medium text-neutral-700">Book PDF — the file customers receive</div>
              <div className="mt-2 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                    (p.pdf || "").startsWith("private:") ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {(p.pdf || "").startsWith("private:") ? (
                    <>
                      <FileCheck2 className="h-3.5 w-3.5" /> PDF uploaded
                    </>
                  ) : (
                    <>
                      <FileWarning className="h-3.5 w-3.5" /> No PDF yet
                    </>
                  )}
                </span>
                <p className="mt-2 text-xs text-neutral-500">
                  Stays private — buyers can only download it on the thank-you page, right after a successful payment.
                </p>
                <div className="mt-3">
                  <PdfUploadForm
                    slug={p.slug}
                    uploaded={(p.pdf || "").startsWith("private:")}
                  />
                </div>
              </div>
            </div>

            <form action={deleteProduct} className="mt-5 border-t border-neutral-100 pt-4">
              <input type="hidden" name="slug" value={p.slug} />
              <button className="text-sm text-red-600 hover:underline">Delete this book</button>
            </form>
            </div>
          </details>
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
