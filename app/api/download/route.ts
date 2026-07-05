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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan, token } = body || {};
    if (!secret) {
      return NextResponse.json({ ok: false, error: "not_configured" }, { status: 403 });
    }

    // Authorise via EITHER a valid Razorpay payment signature OR a valid free-coupon token
    // (the token is issued server-side by /api/razorpay/order for a 100%-off coupon).
    let authorized = false;
    if (token) {
      const expectedFree = crypto.createHmac("sha256", secret).update(`free|${plan}`).digest("hex");
      authorized = token === expectedFree;
    } else if (razorpay_order_id && razorpay_payment_id && razorpay_signature) {
      const expected = crypto
        .createHmac("sha256", secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");
      authorized = expected === razorpay_signature;
    }
    if (!authorized) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 403 });
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
          .select("pdf, title")
          .eq("slug", slug)
          .maybeSingle();

        const pdfVal = row?.pdf ? String(row.pdf) : "";
        if (pdfVal.startsWith("private:")) {
          // Private upload → short-lived signed link (forces a download, expires in 1 hour).
          const { data: signed } = await db.storage
            .from("downloads")
            .createSignedUrl(pdfVal.slice(8), 60 * 60, { download: true });
          if (signed?.signedUrl) url = signed.signedUrl;
        } else if (pdfVal) {
          // Legacy public path / URL.
          url = pdfVal;
        }
      }
      if (!url && meta?.pdf) url = meta.pdf;
      if (url) items.push({ title, url });
    }

    return NextResponse.json({ ok: true, items }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 200 });
  }
}
