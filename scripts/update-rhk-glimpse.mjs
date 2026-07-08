// Adds the "A peek inside" glimpse (3 real book pages) and re-confirms the cover
// for "Raising Healthy Kids in a Digital World" — writing to YOUR Supabase.
//
// RUN (from the eat-your-green folder):
//     SUPABASE_SERVICE_ROLE_KEY="your-key" node scripts/update-rhk-glimpse.mjs
//   (or run `vercel env pull .env.local --environment=production` first, if your
//    key is downloadable, then just: node scripts/update-rhk-glimpse.mjs)

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
  console.error("\n❌ Missing SUPABASE_SERVICE_ROLE_KEY. Run inline:\n   SUPABASE_SERVICE_ROLE_KEY=\"eyJ...\" node scripts/update-rhk-glimpse.mjs\n");
  process.exit(1);
}

const db = createClient(URL, KEY, { auth: { persistSession: false, autoRefreshToken: false } });
const slug = "raising-healthy-kids-in-a-digital-world";

const gallery = [
  { img: "/images/rhk-sample-1.jpg", caption: "The Digital Health Check — see where your family stands today" },
  { img: "/images/rhk-sample-2.jpg", caption: "The Reset Framework — bounce back after tough weeks" },
  { img: "/images/rhk-sample-3.jpg", caption: "The Wise Choice Filter — raising kids who decide for themselves" },
];

const { error } = await db
  .from("products")
  .update({
    gallery,
    cover: "/images/cover-raising-healthy-kids.jpg",
    updated_at: new Date().toISOString(),
  })
  .eq("slug", slug);

if (error) {
  console.error("\n❌ Update failed:", error.message, "\n");
  process.exit(1);
}
console.log("\n✓ Updated 'Raising Healthy Kids in a Digital World':");
console.log("   • Cover confirmed");
console.log("   • Glimpse 'A peek inside' now shows 3 real book pages");
console.log("\nNow run  vercel --prod  to publish the new images, then refresh.\n");
