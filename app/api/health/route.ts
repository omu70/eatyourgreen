import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Safe diagnostic: reports ONLY whether each variable is present (never the value).
const set = (v?: string) => !!v && !v.startsWith("TODO");

export async function GET() {
  return NextResponse.json({
    supabase_url: set(process.env.NEXT_PUBLIC_SUPABASE_URL),
    supabase_anon_key: set(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    supabase_service_role_key: set(process.env.SUPABASE_SERVICE_ROLE_KEY),
    admin_emails: set(process.env.ADMIN_EMAILS),
    razorpay_public_key_id: set(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID),
    razorpay_key_id: set(process.env.RAZORPAY_KEY_ID),
    razorpay_key_secret: set(process.env.RAZORPAY_KEY_SECRET),
    // public, safe to show — helps confirm the URL is the right project:
    supabase_url_preview: (process.env.NEXT_PUBLIC_SUPABASE_URL || "").slice(0, 22),
  });
}
