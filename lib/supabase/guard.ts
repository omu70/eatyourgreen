import { serviceConfigured } from "./config";
import { createAdminClient } from "./admin";

// Pages call this; middleware already enforced auth. Returns a service client
// for data access, or null when Supabase isn't configured yet.
export function adminDb() {
  if (!serviceConfigured) return null;
  return createAdminClient();
}
