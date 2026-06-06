import { books as staticBooks, type Book } from "@/data/books";
import { supabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";

type Row = Record<string, unknown>;
function rowToBook(r: Row): Book {
  return {
    slug: String(r.slug),
    title: String(r.title ?? ""),
    tagline: String(r.tagline ?? ""),
    subhead: String(r.subhead ?? ""),
    price: Number(r.price ?? 0),
    oldPrice: Number(r.old_price ?? 0),
    checkout: "",
    cover: String(r.cover ?? ""),
    pdf: String(r.pdf ?? ""),
    accent: (r.accent === "gold" ? "gold" : "brand"),
    badge: (r.badge as string) || undefined,
    forWho: String(r.for_who ?? ""),
    pages: String(r.pages ?? ""),
    format: String(r.format ?? ""),
    whatsInside: (r.whats_inside as Book["whatsInside"]) ?? [],
    outcomes: (r.outcomes as string[]) ?? [],
    gallery: (r.gallery as Book["gallery"]) ?? [],
    faqs: (r.faqs as Book["faqs"]) ?? [],
    ctaLabel: String(r.cta_label ?? "Buy now"),
    metaTitle: String(r.meta_title ?? r.title ?? ""),
    metaDescription: String(r.meta_description ?? ""),
  };
}

export async function getProducts(): Promise<Book[]> {
  if (!supabaseConfigured) return staticBooks;
  try {
    const db = createPublicClient();
    const { data, error } = await db.from("products").select("*").eq("active", true).order("sort", { ascending: true });
    if (error || !data || data.length === 0) return staticBooks;
    return (data as Row[]).map(rowToBook);
  } catch {
    return staticBooks;
  }
}

export async function getProduct(slug: string): Promise<Book | undefined> {
  return (await getProducts()).find((b) => b.slug === slug);
}

export type ContentOverrides = Partial<{
  heroH1: string; heroSubhead: string;
  offerLine: string; offerNote: string;
  guaranteeHeading: string; guaranteeBody: string;
  finalCtaHeading: string; finalCtaUrgency: string; finalCtaCta: string;
}>;

export async function getContent(): Promise<ContentOverrides> {
  if (!supabaseConfigured) return {};
  try {
    const db = createPublicClient();
    const { data } = await db.from("site_content").select("data").eq("id", 1).single();
    return ((data?.data as ContentOverrides) || {});
  } catch {
    return {};
  }
}
