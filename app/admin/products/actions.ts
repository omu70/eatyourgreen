"use server";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { serviceConfigured } from "@/lib/supabase/config";
import { books as staticBooks } from "@/data/books";

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/books/[slug]", "page");
}

type DB = ReturnType<typeof createAdminClient>;

// Upload a File from a form to the public "media" bucket; returns the public URL or null.
async function uploadToMedia(db: DB, slug: string, file: unknown): Promise<string | null> {
  if (!file || typeof file === "string") return null;
  const f = file as File;
  if (!f.size || f.size === 0) return null;
  const ext = (f.name?.split(".").pop() || "jpg").toLowerCase();
  const path = `products/${slug || "misc"}/${Date.now()}-${Math.floor(Math.random() * 1e4)}.${ext}`;
  const buf = Buffer.from(await f.arrayBuffer());
  const { error } = await db.storage
    .from("media")
    .upload(path, buf, { contentType: f.type || "image/jpeg", upsert: true });
  if (error) return null;
  return db.storage.from("media").getPublicUrl(path).data.publicUrl;
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

export async function seedProducts() {
  if (!serviceConfigured) return;
  const db = createAdminClient();
  const rows = staticBooks.map((b, i) => ({
    slug: b.slug, title: b.title, tagline: b.tagline, subhead: b.subhead,
    price: b.price, old_price: b.oldPrice, cover: b.cover, pdf: b.pdf,
    accent: b.accent, badge: b.badge ?? null, for_who: b.forWho, pages: b.pages,
    format: b.format, whats_inside: b.whatsInside, outcomes: b.outcomes,
    gallery: b.gallery ?? [], faqs: b.faqs, cta_label: b.ctaLabel,
    meta_title: b.metaTitle, meta_description: b.metaDescription, sort: i, active: true,
  }));
  await db.from("products").upsert(rows, { onConflict: "slug" });
  revalidatePublic();
}

export async function updateProduct(formData: FormData) {
  if (!serviceConfigured) return;
  const db = createAdminClient();
  const slug = String(formData.get("slug"));

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
    pdf: String(formData.get("pdf") || ""),
    accent: String(formData.get("accent") || "brand"),
    meta_title: String(formData.get("meta_title") || ""),
    meta_description: String(formData.get("meta_description") || ""),
    sort: Number(formData.get("sort") || 0),
    active: formData.get("active") === "on",
    updated_at: new Date().toISOString(),
  };

  // Optional list fields (edited as JSON). Only overwrite if valid JSON was provided.
  const wi = parseJsonOrUndefined(formData.get("whats_inside"));
  if (wi !== undefined) patch.whats_inside = wi;
  const oc = parseJsonOrUndefined(formData.get("outcomes"));
  if (oc !== undefined) patch.outcomes = oc;
  const fq = parseJsonOrUndefined(formData.get("faqs"));
  if (fq !== undefined) patch.faqs = fq;

  // Optional cover image upload (replaces cover if a file was chosen).
  const coverUrl = await uploadToMedia(db, slug, formData.get("cover_file"));
  if (coverUrl) patch.cover = coverUrl;

  await db.from("products").update(patch).eq("slug", slug);
  revalidatePublic();
}

export async function addProduct(formData: FormData) {
  if (!serviceConfigured) return;
  const db = createAdminClient();
  const slug = String(formData.get("slug") || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  if (!slug) return;
  await db.from("products").upsert(
    {
      slug,
      title: String(formData.get("title") || "New book"),
      price: Number(formData.get("price") || 0),
      old_price: Number(formData.get("old_price") || 0),
      cta_label: "Buy now",
      accent: "brand",
      active: true,
      sort: Number(formData.get("sort") || 99),
    },
    { onConflict: "slug" }
  );
  revalidatePublic();
}

export async function deleteProduct(formData: FormData) {
  if (!serviceConfigured) return;
  const db = createAdminClient();
  await db.from("products").delete().eq("slug", String(formData.get("slug")));
  revalidatePublic();
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
