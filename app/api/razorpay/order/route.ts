import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { couponPercent } from "@/lib/coupons";

// Creates a Razorpay order. Requires RAZORPAY_KEY_ID + RAZORPAY_KEY_SECRET.
// Applies a coupon discount if one is provided; a 100%-off coupon returns a free token instead.
export async function POST(req: NextRequest) {
  const key = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key || !secret || key.startsWith("TODO")) {
    return NextResponse.json({ ok: false, reason: "razorpay_not_configured" }, { status: 200 });
  }
  try {
    const { amount, plan, coupon } = await req.json();
    const pct = couponPercent(coupon);
    const baseAmount = Math.round(Number(amount) || 0);
    const finalAmount = Math.round(baseAmount * (1 - pct / 100));

    // 100%-off (or anything under ₹1): deliver free, with no payment. A server-signed
    // token authorises the download — the client can't forge it.
    if (finalAmount < 100) {
      const token = crypto.createHmac("sha256", secret).update(`free|${plan}`).digest("hex");
      return NextResponse.json({ ok: true, free: true, token, plan, discountPct: pct }, { status: 200 });
    }

    const auth = Buffer.from(`${key}:${secret}`).toString("base64");
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: finalAmount,
        currency: "INR",
        receipt: `eyg_${Date.now()}_${Math.floor(Math.random() * 1e4)}`,
      }),
    });
    const order = await res.json();
    return NextResponse.json({ ok: res.ok, order, key, discountPct: pct }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 200 });
  }
}
