import { NextRequest, NextResponse } from "next/server";
import { serviceConfigured } from "@/lib/supabase/config";
import { createAdminClient } from "@/lib/supabase/admin";

// Optional: if you set BREVO_API_KEY (and optionally BREVO_LIST_ID) in your hosting
// environment, every new sign-up is added to your Brevo marketing list automatically.
// If the key isn't set, this does nothing — sign-ups still save to your admin list.
async function syncToBrevo(email: string, source?: string) {
  const key = process.env.BREVO_API_KEY;
  if (!key) return;
  const listId = Number(process.env.BREVO_LIST_ID || "");
  try {
    await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "api-key": key, "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        ...(listId ? { listIds: [listId] } : {}),
        attributes: { SOURCE: source || "website" },
      }),
    });
  } catch {
    // Best-effort only — never block a sign-up if Brevo is unreachable.
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, name, message, source } = await req.json();
    if (!email || typeof email !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }
    const clean = email.trim().toLowerCase();
    if (serviceConfigured) {
      const db = createAdminClient();
      await db.from("leads").insert({
        email: clean,
        name: name || null,
        message: message || null,
        source: source || "website",
      });
    } else {
      console.log("[lead]", { email: clean, name, source });
    }
    await syncToBrevo(clean, source);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 400 });
  }
}
