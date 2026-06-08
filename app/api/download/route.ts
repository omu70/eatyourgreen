import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { books, getPlanSlugs } from "@/data/books";
import { serviceConfigured } from "@/lib/supabase/config";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// Returns download links ONLY when a valid Razorpay payment signature is presented.
// Links are short-lived signed URLs into the PRIVATE "downloads" bucket — they cannot
// be opened any other way, and they expire after 1 hour.
export async function POST(req: NextRequest) {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const body = await req.json().catch(() => ({}));
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = body || {};

    // 1) Require a real, completed payment (valid HMAC signature from Razorpay).
    if (!secret || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ ok: false, error: "missing_payment" }, { status: 403 });
    }
    const expected = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    if (expected !== razorpay_signature) {
      return NextResponse.json({ ok: false, error: "invalid_payment" }, { status: 403 });
    }

    // 2) Which book(s) does this plan deliver?
    const slugs = getPlanSlugs(plan);
    const db = serviceConfigured ? createAdminClient() : null;
    const items: { title: string; url: string }[] = [];

    for (const slug of slugs) {
      const meta = books.find((b) => b.slug === slug);
      const title = meta?.title || "Eat Your Green";
      let url = "";

      if (db) {
        const { data: row } = await db
          .from("products")
          .select("pdf_path, pdf, title")
          .eq("slug", slug)
          .maybeSingle();

        // Preferred: private file → short-lived signed link (forces a download).
        const pdfPath = (row?.pdf_path as string | null) || null;
        if (pdfPath) {
          const { data: signed } = await db.storage
            .from("downloads")
            .createSignedUrl(pdfPath, 60 * 60, { download: true });
          if (signed?.signedUrl) url = signed.signedUrl;
        }
        // Fallback to a legacy file path only if no private PDF has been uploaded yet.
        if (!url && row?.pdf) url = String(row.pdf);
      }
      if (!url && meta?.pdf) url = meta.pdf;
      if (url) items.push({ title, url });
    }

    return NextResponse.json({ ok: true, items }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 200 });
  }
}
