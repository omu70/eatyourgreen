import { adminDb } from "@/lib/supabase/guard";
import SetupNotice from "@/components/admin/SetupNotice";
import LeadsTable from "@/components/admin/LeadsTable";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const db = adminDb();
  if (!db) return <SetupNotice />;
  const { data } = await db.from("leads").select("*").order("created_at", { ascending: false }).limit(2000);
  return <LeadsTable leads={(data || []) as never} />;
}
