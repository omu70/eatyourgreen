// Fixes broken images for the new books by uploading them INTO Supabase Storage
// (the same place your Guide/Bundle covers live) and pointing the database at
// those URLs — so they display regardless of code deploys.
//
// RUN from the eat-your-green folder:
//   SUPABASE_SERVICE_ROLE_KEY="your-key" node scripts/fix-media.mjs

import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

for (const file of [".env.local", ".env"]) {
  const p = path.resolve(process.cwd(), file);
  if (!fs.existsSync(p)) continue;
  for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hbsgwulglogwxhxkqtpf.supabase.co";
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!KEY) {
  console.error('\n❌ Missing key. Run:  SUPABASE_SERVICE_ROLE_KEY="eyJ..." node scripts/fix-media.mjs\n');
  process.exit(1);
}
const db = createClient(URL, KEY, { auth: { persistSession: false, autoRefreshToken: false } });

// upload a local file to the public "media" bucket, return its public URL
async function put(localPath, destPath, contentType) {
  const abs = path.resolve(process.cwd(), localPath);
  if (!fs.existsSync(abs)) throw new Error("file not found: " + localPath);
  const buf = fs.readFileSync(abs);
  const { error } = await db.storage.from("media").upload(destPath, buf, { contentType, upsert: true });
  if (error) throw new Error(error.message);
  return db.storage.from("media").getPublicUrl(destPath).data.publicUrl;
}

async function main() {
  console.log("Uploading images into Supabase…\n");

  // ---- Covers ----
  const covers = [
    ["beyond-the-screens", "public/images/cover-beyond-the-screens.jpg"],
    ["raising-healthy-kids-in-a-digital-world", "public/images/cover-raising-healthy-kids.jpg"],
  ];
  for (const [slug, file] of covers) {
    const url = await put(file, `products/${slug}/cover-${Date.now()}.jpg`, "image/jpeg");
    const { error } = await db.from("products").update({ cover: url, updated_at: new Date().toISOString() }).eq("slug", slug);
    console.log(`  ${error ? "❌ " + slug + " — " + error.message : "✓ cover fixed: " + slug}`);
  }

  // ---- Raising Healthy Kids: glimpse gallery ----
  const samples = [
    ["public/images/rhk-sample-1.jpg", "The Digital Health Check — see where your family stands today"],
    ["public/images/rhk-sample-2.jpg", "The Reset Framework — bounce back after tough weeks"],
    ["public/images/rhk-sample-3.jpg", "The Wise Choice Filter — raising kids who decide for themselves"],
  ];
  const gallery = [];
  for (let i = 0; i < samples.length; i++) {
    const url = await put(samples[i][0], `products/raising-healthy-kids-in-a-digital-world/page-${i + 1}-${Date.now()}.jpg`, "image/jpeg");
    gallery.push({ img: url, caption: samples[i][1] });
  }
  const { error: gErr } = await db
    .from("products")
    .update({ gallery, updated_at: new Date().toISOString() })
    .eq("slug", "raising-healthy-kids-in-a-digital-world");
  console.log(`  ${gErr ? "❌ glimpse — " + gErr.message : "✓ glimpse (3 pages) fixed: raising-healthy-kids"}`);

  console.log("\nDone. Refresh your site — the covers and glimpse now load from Supabase.\n");
}

main().catch((e) => { console.error("\n❌ " + (e?.message || e) + "\n"); process.exit(1); });
