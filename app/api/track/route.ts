import { NextRequest, NextResponse } from "next/server";
import { serviceConfigured } from "@/lib/supabase/config";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

function parseDevice(ua: string): string {
  const u = ua.toLowerCase();
  if (/ipad|tablet|playbook|silk|(android(?!.*mobile))/.test(u)) return "tablet";
  if (/mobi|iphone|ipod|android.*mobile|blackberry|windows phone/.test(u)) return "mobile";
  return "desktop";
}

function parseBrowser(ua: string): string {
  if (/edg\//i.test(ua)) return "Edge";
  if (/opr\/|opera/i.test(ua)) return "Opera";
  if (/chrome|crios/i.test(ua) && !/edg\//i.test(ua)) return "Chrome";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) return "Safari";
  return "Other";
}

function deriveSource(path: string, referrer: string): string {
  try {
    const qs = path.includes("?") ? new URLSearchParams(path.split("?")[1]) : null;
    const utm = qs?.get("utm_source");
    if (utm) return utm.toLowerCase();
  } catch {
    /* ignore */
  }
  if (!referrer) return "direct";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (/instagram/.test(host)) return "instagram";
    if (/facebook|fb\.com|fb\.me/.test(host)) return "facebook";
    if (/google/.test(host)) return "google";
    if (/youtube/.test(host)) return "youtube";
    if (/t\.co|twitter|x\.com/.test(host)) return "twitter/x";
    if (/wa\.me|whatsapp/.test(host)) return "whatsapp";
    if (/bing/.test(host)) return "bing";
    return host;
  } catch {
    return "direct";
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const path = String(body?.path || "/").slice(0, 300);
    const referrer = String(body?.referrer || "").slice(0, 300);
    const ua = req.headers.get("user-agent") || "";

    // Vercel sets these geo headers automatically (city-level, no exact address).
    const country = req.headers.get("x-vercel-ip-country") || "";
    const region = req.headers.get("x-vercel-ip-country-region") || "";
    const city = decodeURIComponent(req.headers.get("x-vercel-ip-city") || "");

    // Anonymous returning-visitor id (a random cookie value — not a person).
    let vid = req.cookies.get("eyg_vid")?.value || "";
    let isNew = false;
    if (!vid) {
      vid = globalThis.crypto?.randomUUID?.() || "v" + Date.now() + Math.random().toString(36).slice(2);
      isNew = true;
    }

    if (serviceConfigured) {
      const db = createAdminClient();
      await db.from("visits").insert({
        visitor_id: vid,
        is_new: isNew,
        path,
        referrer,
        source: deriveSource(path, referrer),
        country,
        region,
        city,
        device: parseDevice(ua),
        browser: parseBrowser(ua),
      });
    }

    const res = NextResponse.json({ ok: true });
    if (isNew) {
      res.cookies.set("eyg_vid", vid, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
    }
    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
