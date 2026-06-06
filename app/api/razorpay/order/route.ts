import { NextRequest, NextResponse } from "next/server";

// Creates a Razorpay order. Requires RAZORPAY_KEY_ID + RAZORPAY_KEY_SECRET.
export async function POST(req: NextRequest) {
  const key = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key || !secret || key.startsWith("TODO")) {
    return NextResponse.json({ ok: false, reason: "razorpay_not_configured" }, { status: 200 });
  }
  try {
    const { amount, plan } = await req.json();
    const auth = Buffer.from(`${key}:${secret}`).toString("base64");
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(Number(amount)),
        currency: "INR",
        receipt: `eyg_${Date.now()}_${Math.floor(Math.random() * 1e4)}`,
      }),
    });
    const order = await res.json();
    return NextResponse.json({ ok: res.ok, order, key }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 200 });
  }
}
