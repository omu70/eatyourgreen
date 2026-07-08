// One-time setup: adds the two new ₹199 books to your live store and updates the
// hero headline — writing directly to YOUR Supabase using YOUR own credentials.
//
// HOW TO RUN (from the project root, i.e. the eat-your-green folder):
//     node scripts/setup-new-books.mjs
//
// It reads NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from your
// .env.local / .env (or the environment). Nothing is sent anywhere except your
// own Supabase project. It only ADDS the two new books and updates the hero text
// — your existing 3 books are left exactly as they are.

import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

// ---- load env from .env.local / .env (without overwriting real env vars) -----
for (const file of [".env.local", ".env"]) {
  const p = path.resolve(process.cwd(), file);
  if (!fs.existsSync(p)) continue;
  for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
    }
  }
}

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hbsgwulglogwxhxkqtpf.supabase.co";
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!KEY) {
  console.error("\n❌ Missing your Supabase service-role key (SUPABASE_SERVICE_ROLE_KEY).");
  console.error("   Easiest fix — pull your Vercel env vars into this folder, then re-run:\n");
  console.error("       vercel env pull .env.local --environment=production");
  console.error("       node scripts/setup-new-books.mjs\n");
  console.error("   Or run it in one line with the key pasted in:\n");
  console.error('       SUPABASE_SERVICE_ROLE_KEY="eyJ..." node scripts/setup-new-books.mjs\n');
  process.exit(1);
}

const db = createClient(URL, KEY, { auth: { persistSession: false, autoRefreshToken: false } });

// ---- the two new books -------------------------------------------------------
const NEW_BOOKS = [
  {
    slug: "beyond-the-screens",
    title: "Beyond the Screens",
    tagline: "Less screen time. More childhood.",
    subhead:
      "A calm, step-by-step guide for parents to gently cut their child's screen time — and bring back play, focus and real childhood — without daily fights or guilt.",
    price: 199,
    old_price: 499,
    cover: "/images/cover-beyond-the-screens.jpg",
    pdf: "/downloads/beyond-the-screens.pdf",
    accent: "brand",
    badge: "New",
    for_who: "Parents of children aged 2–12 who feel their child is glued to phones, tablets or YouTube.",
    pages: "~70 pages",
    format: "Instant PDF download",
    whats_inside: [
      { name: "Why screens hook kids", desc: "The simple reason children crave screens — and why shouting or snatching never works." },
      { name: "The gentle screen-time plan", desc: "A day-by-day path to less screen time, even for the most stubborn kids." },
      { name: "What to say (word-for-word)", desc: "Calm lines to use when your child demands the phone — no bribing, no yelling." },
      { name: "Screen-free activities kids love", desc: "Easy ideas your child will choose over YouTube on their own." },
      { name: 'Handling tantrums & "I\'m bored"', desc: "How to stay calm and consistent when the meltdowns come." },
    ],
    outcomes: [
      "Less screen time — without daily battles",
      "A child who plays, reads and sleeps better",
      "Calm evenings instead of phone fights",
      "More talking, focus and real connection at home",
    ],
    gallery: [],
    faqs: [
      { q: "Will this work for a very screen-addicted child?", a: "Yes. The plan is built for stubborn, screen-loving kids aged 2–12. It works by slowly lowering the pull of screens — not by snatching them away — so it sticks." },
      { q: "Do I have to ban screens completely?", a: "No. This is about balance and calm boundaries, not a total ban. Your child still enjoys some screen time — just far less, and without fights." },
      { q: "How do I get the book?", a: "Instant digital download — the PDF arrives right after payment, with a WhatsApp and email backup. Start tonight." },
    ],
    cta_label: "Get the Book",
    meta_title: "Beyond the Screens — Less Screen Time, More Childhood",
    meta_description:
      "A calm, step-by-step guide for parents to gently reduce their child's screen time and bring back play, focus and real childhood — without daily fights. Instant download.",
  },
  {
    slug: "raising-healthy-kids-in-a-digital-world",
    title: "Raising Healthy Kids in a Digital World",
    tagline: "Helping children thrive between screens and real life.",
    subhead:
      "A practical guide built on the simple 4B Framework — Boundaries, Balance, Bonding and Belonging — to help your child grow up healthy, confident and connected in a screen-filled world.",
    price: 199,
    old_price: 599,
    cover: "/images/cover-raising-healthy-kids.jpg",
    pdf: "/downloads/raising-healthy-kids-in-a-digital-world.pdf",
    accent: "gold",
    badge: "New",
    for_who: "Parents who want their child to enjoy technology safely — without losing sleep, focus, health or family time.",
    pages: "~80 pages",
    format: "Instant PDF download",
    whats_inside: [
      { name: "The 4B Framework", desc: "Boundaries, Balance, Bonding and Belonging — a simple system for healthy screen habits." },
      { name: "Boundaries that stick", desc: "How to set screen rules kids actually follow, without constant policing." },
      { name: "Balance, not banning", desc: "Help your child enjoy screens and real life — sleep, play, study and family time." },
      { name: "Bonding & belonging", desc: "Rebuild connection so your child turns to you, not just the screen." },
      { name: "Age-by-age guidance", desc: "What healthy screen use looks like as your child grows." },
    ],
    outcomes: [
      "Clear screen rules the whole family follows",
      "Better sleep, focus and mood",
      "Less conflict about phones and tablets",
      "A closer, more connected family",
    ],
    gallery: [],
    faqs: [
      { q: "What is the 4B Framework?", a: "It's a simple parenting system built on four pillars — Boundaries, Balance, Bonding and Belonging — that helps kids use screens in a healthy, balanced way." },
      { q: "What age is this for?", a: "It's written for parents of children aged 2–12, with ideas that adapt as your child grows." },
      { q: "How do I get the book?", a: "Instant digital download — your PDF arrives right after payment, with a WhatsApp and email backup." },
    ],
    cta_label: "Get the Book",
    meta_title: "Raising Healthy Kids in a Digital World — The 4B Framework",
    meta_description:
      "A practical parenting guide built on the 4B Framework — Boundaries, Balance, Bonding, Belonging — to help children thrive between screens and real life. Instant download.",
  },
];

// ---- new hero copy (problem-first) ------------------------------------------
const HERO_H1 = "The daily fight over green veggies ends here.";
const HERO_SUB =
  'Tears at the table. Bribes that stop working. Cooking two separate dinners just so your child eats one green veggie. Eat Your Green is the gentle, pressure-free way to turn "no" into "yes" — and get your fussy eater (2–12) happily eating green veggies in as little as 7 days. No nagging, no guilt.';

async function main() {
  console.log("\nConnecting to your Supabase project…");
  console.log("  URL:", URL);

  // Find the current highest sort so the new books go to the end of the list.
  const { data: maxRow, error: maxErr } = await db
    .from("products")
    .select("sort")
    .order("sort", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (maxErr) {
    console.error("\n❌ Could not read your products table:", maxErr.message);
    console.error("   (If this says the table does not exist, your DB schema hasn't been set up yet — tell me and I'll help.)");
    process.exit(1);
  }
  let sort = Number(maxRow?.sort) || 0;

  console.log("\nAdding the two new books at ₹199…");
  for (const b of NEW_BOOKS) {
    sort += 1;
    const row = { ...b, sort, active: true, updated_at: new Date().toISOString() };
    const { error } = await db.from("products").upsert(row, { onConflict: "slug" });
    console.log("  " + (error ? "❌ " + b.title + " — " + error.message : "✓ " + b.title + " (₹" + b.price + ")"));
    if (error) process.exitCode = 1;
  }

  console.log("\nUpdating the hero headline…");
  const { data: sc, error: scErr } = await db.from("site_content").select("data").eq("id", 1).maybeSingle();
  if (scErr) {
    console.log("  ⚠ Couldn't read site_content (" + scErr.message + ") — skipping hero update.");
  } else {
    const data = (sc && sc.data) || {};
    data.heroH1 = HERO_H1;
    data.heroSubhead = HERO_SUB;
    const { error } = await db.from("site_content").upsert({ id: 1, data, updated_at: new Date().toISOString() });
    console.log("  " + (error ? "❌ hero — " + error.message : "✓ hero headline + subhead updated"));
    if (error) process.exitCode = 1;
  }

  console.log("\nDone. Refresh your website (it may take a minute to update).");
  console.log("Your 3 existing books were NOT changed.\n");
}

main().catch((e) => {
  console.error("\n❌ Unexpected error:", e?.message || e);
  process.exit(1);
});
