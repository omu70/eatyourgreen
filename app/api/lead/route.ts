import { NextRequest, NextResponse } from "next/server";

// Email capture endpoint. TODO: forward to your ESP / Systeme.io / CRM.
export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();
    if (!email || typeof email !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    // TODO: persist lead — e.g. POST to Systeme.io API / Mailchimp / database.
    console.log("[lead]", { email, name });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 400 });
  }
}
