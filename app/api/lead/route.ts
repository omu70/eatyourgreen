import { NextRequest, NextResponse } from "next/server";
import { serviceConfigured } from "@/lib/supabase/config";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const { email, name, message, source } = await req.json();
    if (!email || typeof email !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }
    if (serviceConfigured) {
      const db = createAdminClient();
      await db.from("leads").insert({
        email: email.trim().toLowerCase(),
        name: name || null,
        message: message || null,
        source: source || "website",
      });
    } else {
      console.log("[lead]", { email, name, source });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 400 });
  }
}
