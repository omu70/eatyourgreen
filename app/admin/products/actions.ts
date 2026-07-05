"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { serviceConfigured } from "@/lib/supabase/config";
import { books as staticBooks } from "@/data/books";

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/books/[slug]", "page");
}

type DB = ReturnType<typeof createAdminClient>;

// Create a storage bucket if it doesn't exist yet — so uploads work with NO manual SQL setup.
async function ensureBucket(db: DB, id: string, isPublic: boolean) {
  try {
    await db.storage.createBucket(id, { public: isPublic, fileSizeLimit: "30mb" });
  } catch {
    /* already exists — ignore */
  }
}

// Upload a File from a form to the public "media" bucket; returns the public URL or null.
async function uploadToMedia(db: DB, slug: string, file: unknown): Promise<string | null> {
  if (!file || typeof file === "string") return null;
  const f = file as File;
  if (!f.size || f.size === 0) return null;
  await ensureBucket(db, "media", true);
  const ext = (f.name?.split(".").pop() || "jpg").toLowerCase();
  const path = `products/${slug || "misc"}/${Date.now()}-${Math.floor(Math.random() * 1e4)}.${ext}`;
  const buf = Buffer.from(await f.arrayBuffer());
  const { error } = await db.storage
    .from("media")
    .upload(path, buf, { contentType: f.type || "image/jpeg", upsert: true });
  if (error) return null;
  return db.storage.from("media").getPublicUrl(path).data.publicUrl;
}

// Upload a PDF to the PRIVATE "downloads" bucket. Returns the storage PATH (never a URL):
// the file is not public and can only be reached via a short-lived signed link after payment.
async function uploadToDownloads(db: DB, slug: string, file: unknown): Promise<string | null> {
  if (!file || typeof file === "string") return null;
  const f = file as File;
  if (!f.size || f.size === 0) return null;
  await ensureBucket(db, "downloads", false);
  const safeName = (f.name || "book.pdf").replace(/[^a-zA-Z0-9._-]+/g, "-");
  const path = `${slug || "misc"}/${Date.now()}-${safeName}`;
  const buf = Buffer.from(await f.arrayBuffer());
  const { error } = await db.storage
    .from("downloads")
    .upload(path, buf, { contentType: f.type || "application/pdf", upsert: true });
  if (error) throw new Error(error.message || "Could not upload to storage.");
  return path;
}

function parseJsonOrUndefined(v: FormDataEntryValue | null): unknown | undefined {
  const s = String(v || "").trim();
  if (!s) return undefined;
  try {
    return JSON.parse(s);
  } catch {
    return undefined;
  }
}

// Finish a Server Action by redirecting back to Products with a visible
// success/error banner — so the admin NEVER sees a raw crash screen and always
// gets told exactly what happened.
function finish(ok: boolean, msg: string): never {
  redirect(`/admin/products?ok=${ok ? "1" : "0"}&msg=${encodeURIComponent(msg)}`);
}

const NOT_CONNECTED =
  "Storage isn't connected. Add SUPABASE_SERVICE_ROLE_KEY in Vercel → Settings → Environment Variables, then redeploy.";

export async function seedProducts() {
  if (!serviceConfigured) finish(false, NOT_CONNECTED);
  let message = "";
  try {
    const db = createAdminClient();
    const rows = staticBooks.map((b, i) => ({
      slug: b.slug, title: b.title, tagline: b.tagline, subhead: b.subhead,
      price: b.price, old_price: b.oldPrice, cover: b.cover, pdf: b.pdf,
      accent: b.accent, badge: b.badge ?? null, for_who: b.forWho, pages: b.pages,
      format: b.format, whats_inside: b.whatsInside, outcomes: b.outcomes,
      gallery: b.gallery ?? [], faqs: b.faqs, cta_label: b.ctaLabel,
      meta_title: b.metaTitle, meta_description: b.metaDescription, sort: i, active: true,
    }));
    const { error } = await db.from("products").upsert(rows, { onConflict: "slug" });
    if (error) message = error.message;
  } catch (e) {
    message = String((e as Error)?.message || e);
  }
  if (message) finish(false, "Couldn't load your books: " + message);
  revalidatePublic();
  finish(true, "Your books are loaded. ✓");
}

export async function updateProduct(formData: FormData) {
  if (!serviceConfigured) finish(false, NOT_CONNECTED);
  const slug = String(formData.get("slug"));
  let message = "";
  try {
    const db = createAdminClient();

    const patch: Record<string, unknown> = {
      title: String(formData.get("title") || ""),
      tagline: String(formData.get("tagline") || ""),
      subhead: String(formData.get("subhead") || ""),
      price: Number(formData.get("price") || 0),
      old_price: Number(formData.get("old_price") || 0),
      badge: String(formData.get("badge") || "") || null,
      cta_label: String(formData.get("cta_label") || ""),
      for_who: String(formData.get("for_who") || ""),
      pages: String(formData.get("pages") || ""),
      format: String(formData.get("format") || ""),
      accent: String(formData.get("accent") || "brand"),
      meta_title: String(formData.get("meta_title") || ""),
      meta_description: String(formData.get("meta_description") || ""),
      sort: Number(formData.get("sort") || 0),
      active: formData.get("active") === "on",
      updated_at: new Date().toISOString(),
    };

    // "What's inside" and "FAQs" come from add/remove rows (submitted as JSON).
    const clean = (v: unknown) =>
      Array.isArray(v)
        ? (v as Record<string, unknown>[]).filter((r) => r && Object.values(r).some((x) => String(x ?? "").trim() !== ""))
        : undefined;
    const wi = clean(parseJsonOrUndefined(formData.get("whats_inside")));
    if (wi) patch.whats_inside = wi;
    const fq = clean(parseJsonOrUndefined(formData.get("faqs")));
    if (fq) patch.faqs = fq;
    // "Outcomes" is one item per line.
    patch.outcomes = String(formData.get("outcomes") ?? "").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);

    // Optional cover image upload (replaces cover if a file was chosen).
    const coverUrl = await uploadToMedia(db, slug, formData.get("cover_file"));
    if (coverUrl) patch.cover = coverUrl;

    const { error } = await db.from("products").update(patch).eq("slug", slug);
    if (error) message = error.message;
  } catch (e) {
    message = String((e as Error)?.message || e);
  }
  if (message) finish(false, "Couldn't save your changes: " + message);
  revalidatePublic();
  finish(true, "Saved. ✓");
}

export async function addProduct(formData: FormData) {
  if (!serviceConfigured) finish(false, NOT_CONNECTED);

  const title = String(formData.get("title") || "").trim();
  if (!title) finish(false, "Please enter a book title.");

  let message = "";
  try {
    const db = createAdminClient();

    // Auto-create the web address (slug) from the title.
    const base =
      title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "book";
    const { data: existing } = await db.from("products").select("slug");
    const taken = new Set((existing || []).map((r: { slug: string }) => r.slug));
    let slug = base;
    let n = 2;
    while (taken.has(slug)) slug = `${base}-${n++}`;

    // Optional uploads (cover -> public media; PDF -> private downloads bucket).
    const coverUrl = await uploadToMedia(db, slug, formData.get("cover_file"));
    let pdfPath: string | null = null;
    try {
      pdfPath = await uploadToDownloads(db, slug, formData.get("pdf_file"));
    } catch {
      pdfPath = null;
    }

    // New book goes to the end of the list.
    const { data: maxRow } = await db
      .from("products")
      .select("sort")
      .order("sort", { ascending: false })
      .limit(1)
      .maybeSingle();
    const sort = (Number(maxRow?.sort) || 0) + 1;

    const row: Record<string, unknown> = {
      slug,
      title,
      tagline: String(formData.get("tagline") || "") || null,
      price: Number(formData.get("price") || 0),
      old_price: Number(formData.get("old_price") || 0),
      cover: coverUrl,
      cta_label: "Buy now",
      accent: "brand",
      format: "Instant PDF download",
      active: formData.get("active") === "on",
      sort,
    };
    if (pdfPath) row.pdf = `private:${pdfPath}`; // store in the existing 'pdf' column (no extra column needed)

    const { error } = await db.from("products").insert(row);
    if (error) message = error.message;
  } catch (e) {
    message = String((e as Error)?.message || e);
  }
  if (message) finish(false, "Couldn't add the book: " + message);
  revalidatePublic();
  finish(true, "Book added. ✓");
}

export async function deleteProduct(formData: FormData) {
  if (!serviceConfigured) finish(false, NOT_CONNECTED);
  const slug = String(formData.get("slug"));
  let message = "";
  try {
    const db = createAdminClient();
    const { error } = await db.from("products").delete().eq("slug", slug);
    if (error) message = error.message;
  } catch (e) {
    message = String((e as Error)?.message || e);
  }
  if (message) finish(false, "Couldn't delete the book: " + message);
  revalidatePublic();
  finish(true, "Book deleted.");
}

export async function uploadProductPdf(
  _prev: unknown,
  formData: FormData
): Promise<{ ok: boolean; message: string }> {
  if (!serviceConfigured) {
    return { ok: false, message: "Storage isn't connected (the service-role key is missing in your hosting environment)." };
  }
  const db = createAdminClient();
  const slug = String(formData.get("slug"));
  const file = formData.get("pdf_file");
  if (!file || typeof file === "string" || !(file as File).size) {
    return { ok: false, message: "Please choose a PDF file first, then click Upload." };
  }
  try {
    const path = await uploadToDownloads(db, slug, file);
    if (!path) return { ok: false, message: "Upload failed — the file didn't reach storage." };
    const { error } = await db
      .from("products")
      .update({ pdf: `private:${path}`, updated_at: new Date().toISOString() })
      .eq("slug", slug);
    if (error) return { ok: false, message: "File saved, but couldn't update the book: " + error.message };
    revalidatePublic();
    return { ok: true, message: "PDF uploaded — your book is ready to deliver. ✓" };
  } catch (e) {
    return { ok: false, message: "Couldn't upload: " + String((e as Error)?.message || e) };
  }
}

// ---- Large-PDF upload (browser -> Supabase Storage directly) -----------------
// Server Actions on Vercel cap the request body at ~4.5MB, so book PDFs (5-18MB)
// can never be uploaded through an action. Instead the browser uploads straight
// to Storage using a signed URL created here, then links the path to the book.

// Step 1: create a short-lived signed upload URL for the private downloads bucket.
export async function createPdfUploadUrl(
  slug: string,
  filename: string
): Promise<{ ok: boolean; path?: string; token?: string; message?: string }> {
  if (!serviceConfigured) return { ok: false, message: NOT_CONNECTED };
  try {
    const db = createAdminClient();
    await ensureBucket(db, "downloads", false);
    const safe = (filename || "book.pdf").replace(/[^a-zA-Z0-9._-]+/g, "-");
    const path = `${slug || "misc"}/${Date.now()}-${safe}`;
    const { data, error } = await db.storage.from("downloads").createSignedUploadUrl(path);
    if (error || !data) return { ok: false, message: error?.message || "Could not start the upload." };
    return { ok: true, path: data.path, token: data.token };
  } catch (e) {
    return { ok: false, message: String((e as Error)?.message || e) };
  }
}

// Step 2: after the file is in Storage, link its path to the book (secure "private:" prefix).
export async function setProductPdf(
  slug: string,
  path: string
): Promise<{ ok: boolean; message: string }> {
  if (!serviceConfigured) return { ok: false, message: NOT_CONNECTED };
  try {
    const db = createAdminClient();
    const { error } = await db
      .from("products")
      .update({ pdf: `private:${path}`, updated_at: new Date().toISOString() })
      .eq("slug", slug);
    if (error) return { ok: false, message: "Uploaded, but couldn't link it to the book: " + error.message };
    revalidatePublic();
    return { ok: true, message: "PDF uploaded — your book is ready to deliver. ✓" };
  } catch (e) {
    return { ok: false, message: String((e as Error)?.message || e) };
  }
}

export async function addGalleryImage(formData: FormData) {
  if (!serviceConfigured) return;
  const db = createAdminClient();
  const slug = String(formData.get("slug"));
  const caption = String(formData.get("caption") || "");
  const files = formData.getAll("file"); // supports selecting multiple images at once
  const { data } = await db.from("products").select("gallery").eq("slug", slug).single();
  const gallery = Array.isArray(data?.gallery) ? data!.gallery : [];
  let added = 0;
  for (const file of files) {
    const url = await uploadToMedia(db, slug, file);
    if (url) { gallery.push({ img: url, caption }); added++; }
  }
  if (added === 0) return;
  await db.from("products").update({ gallery, updated_at: new Date().toISOString() }).eq("slug", slug);
  revalidatePublic();
}

export async function removeGalleryImage(formData: FormData) {
  if (!serviceConfigured) return;
  const db = createAdminClient();
  const slug = String(formData.get("slug"));
  const img = String(formData.get("img"));
  const { data } = await db.from("products").select("gallery").eq("slug", slug).single();
  const gallery = (Array.isArray(data?.gallery) ? data!.gallery : []).filter(
    (g: { img?: string }) => g?.img !== img
  );
  await db.from("products").update({ gallery, updated_at: new Date().toISOString() }).eq("slug", slug);
  revalidatePublic();
}
