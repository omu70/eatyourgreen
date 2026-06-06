"use server";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { serviceConfigured } from "@/lib/supabase/config";

const KEYS = [
  "heroH1", "heroSubhead", "offerLine", "offerNote",
  "guaranteeHeading", "guaranteeBody", "finalCtaHeading", "finalCtaUrgency", "finalCtaCta",
] as const;

export async function saveContent(formData: FormData) {
  if (!serviceConfigured) return;
  const db = createAdminClient();
  const data: Record<string, string> = {};
  for (const k of KEYS) {
    const v = String(formData.get(k) || "").trim();
    if (v) data[k] = v;
  }
  await db.from("site_content").upsert({ id: 1, data, updated_at: new Date().toISOString() }, { onConflict: "id" });
  revalidatePath("/");
  revalidatePath("/books/[slug]", "page");
}
