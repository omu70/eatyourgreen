import { createClient } from "@supabase/supabase-js";

// Anon browser client — used ONLY to upload a file straight to Supabase Storage
// via a short-lived signed upload URL. This bypasses Vercel's ~4.5MB Server
// Action body limit, which is why large book PDFs never uploaded before.
export function createBrowserSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
