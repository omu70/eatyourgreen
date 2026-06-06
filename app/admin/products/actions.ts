"use server";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { serviceConfigured } from "@/lib/supabase/config";
import { books as staticBooks } from "@/data/books";

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/books/[slug]", "page");
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
  const patch = {
    title: String(formData.get("title") || ""),
    tagline: String(formData.get("tagline") || ""),
    subhead: String(formData.get("subhead") || ""),
    price: Number(formData.get("price") || 0),
    old_price: Number(formData.get("old_price") || 0),
    badge: String(formData.get("badge") || "") || null,
    cta_label: String(formData.get("cta_label") || ""),
    sort: Number(formData.get("sort") || 0),
    active: formData.get("active") === "on",
    updated_at: new Date().toISOString(),
  };
  await db.from("products").update(patch).eq("slug", slug);
  revalidatePublic();
}
