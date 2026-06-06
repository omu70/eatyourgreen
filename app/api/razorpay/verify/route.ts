import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { serviceConfigured } from "@/lib/supabase/config";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return NextResponse.json({ ok: false }, { status: 200 });
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan, amount, title, email } = body;
    const expected = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    const ok = expected === razorpay_signature;

    if (ok && serviceConfigured) {
      const db = createAdminClient();
      await db.from("orders").upsert(
        {
          razorpay_order_id,
          razorpay_payment_id,
          plan: plan || null,
          product_title: title || null,
          amount: Number(amount) || null,
          currency: "INR",
          status: "paid",
          email: email || null,
        },
        { onConflict: "razorpay_payment_id" }
      );
    }
    return NextResponse.json({ ok }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
