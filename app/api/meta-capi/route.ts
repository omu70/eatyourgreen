import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Meta Conversions API (server-side). Mirrors browser Pixel events for dedupe.
// Requires META_CAPI_ACCESS_TOKEN + META_CAPI_PIXEL_ID in env.
export async function POST(req: NextRequest) {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  const pixelId = process.env.META_CAPI_PIXEL_ID;
  const testCode = process.env.META_TEST_EVENT_CODE;

  if (!token || !pixelId || token.startsWith("TODO")) {
    // Not configured yet — accept silently so the client never errors.
    return NextResponse.json({ ok: false, reason: "capi_not_configured" }, { status: 200 });
  }

  try {
    const body = await req.json();
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
    const ua = req.headers.get("user-agent") || undefined;

    const userData: Record<string, unknown> = {
      client_ip_address: ip,
      client_user_agent: ua,
    };
    if (body.fbp) userData.fbp = body.fbp;
    if (body.fbc) userData.fbc = body.fbc;
    if (body.email) userData.em = [hash(body.email)];

    const payload: Record<string, unknown> = {
      data: [
        {
          event_name: body.event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id: body.event_id,
          action_source: "website",
          event_source_url: body.event_source_url,
          user_data: userData,
          custom_data: body.custom_data || {},
        },
      ],
    };
    if (testCode) payload.test_event_code = testCode;

    const res = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const json = await res.json();
    return NextResponse.json({ ok: res.ok, meta: json }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 200 });
  }
}

function hash(v: string) {
  return crypto.createHash("sha256").update(v.trim().toLowerCase()).digest("hex");
}
