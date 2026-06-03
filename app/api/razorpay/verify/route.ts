import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Verifies a Razorpay payment signature.
export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return NextResponse.json({ ok: false }, { status: 200 });
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    const expected = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    return NextResponse.json({ ok: expected === razorpay_signature }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
