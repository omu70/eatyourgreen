export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
export const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const ok = (v: string) => !!v && !v.startsWith("TODO");

// Public site / auth can run with URL + anon key.
export const supabaseConfigured = ok(SUPABASE_URL) && ok(SUPABASE_ANON);
// Server-side data reads/writes need the service role key.
export const serviceConfigured = supabaseConfigured && ok(SERVICE_KEY);

// Comma-separated allowlist of admin emails (lowercased).
export const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email?: string | null) {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
