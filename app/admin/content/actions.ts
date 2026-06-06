"use server";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { serviceConfigured } from "@/lib/supabase/config";

type DB = ReturnType<typeof createAdminClient>;

const TEXT_KEYS = [
  "heroH1", "heroSubhead", "heroTrust", "discoverHeading",
  "offerLine", "offerNote",
  "empathyHeading", "empathyBody", "methodHeading",
  "lmHeading", "lmSub", "lmCta",
  "guaranteeHeading", "guaranteeBody",
  "finalCtaHeading", "finalCtaUrgency", "finalCtaCta",
  "authorName", "authorTitle",
  "waLabel", "waLink",
  "instagram", "supportEmail", "payments",
] as const;

// Lists edited as "one item per line".
const LINE_KEYS = ["discover", "authorBio", "aboutBody"] as const;
// Lists edited as add/remove rows (the UI submits these as JSON).
const JSON_KEYS = ["stats", "testimonials", "faqs"] as const;

// Image fields: a file input named `<key>_file`; uploads replace the stored URL.
const IMAGE_KEYS = ["heroImage", "empathyImage", "authorPhoto", "logo", "waQr"] as const;

async function uploadToMedia(db: DB, key: string, file: unknown): Promise<string | null> {
  if (!file || typeof file === "string") return null;
  const f = file as File;
  if (!f.size || f.size === 0) return null;
  const ext = (f.name?.split(".").pop() || "jpg").toLowerCase();
  const path = `site/${key}-${Date.now()}-${Math.floor(Math.random() * 1e4)}.${ext}`;
  const buf = Buffer.from(await f.arrayBuffer());
  const { error } = await db.storage.from("media").upload(path, buf, { contentType: f.type || "image/jpeg", upsert: true });
  if (error) return null;
  return db.storage.from("media").getPublicUrl(path).data.publicUrl;
}

export async function saveContent(formData: FormData) {
  if (!serviceConfigured) return;
  const db = createAdminClient();

  const { data: existing } = await db.from("site_content").select("data").eq("id", 1).single();
  const data: Record<string, unknown> = { ...((existing?.data as Record<string, unknown>) || {}) };

  for (const k of TEXT_KEYS) {
    const v = String(formData.get(k) ?? "").trim();
    if (v) data[k] = v;
    else delete data[k];
  }

  for (const k of LINE_KEYS) {
    const raw = String(formData.get(k) ?? "");
    const items = raw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    if (items.length) data[k] = items;
    else delete data[k];
  }

  for (const k of JSON_KEYS) {
    const raw = String(formData.get(k) ?? "").trim();
    if (!raw || raw === "[]") { delete data[k]; continue; }
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const clean = parsed.filter(
          (row) => row && Object.values(row).some((v) => String(v ?? "").trim() !== "")
        );
        if (clean.length) data[k] = clean;
        else delete data[k];
      }
    } catch {
      /* keep previous value */
    }
  }

  for (const k of IMAGE_KEYS) {
    const url = await uploadToMedia(db, k, formData.get(`${k}_file`));
    if (url) data[k] = url;
  }

  await db.from("site_content").upsert({ id: 1, data, updated_at: new Date().toISOString() }, { onConflict: "id" });
  revalidatePath("/", "layout");
}
