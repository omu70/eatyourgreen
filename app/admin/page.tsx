import Link from "next/link";
import { adminDb } from "@/lib/supabase/guard";
import SetupNotice from "@/components/admin/SetupNotice";

export const dynamic = "force-dynamic";

function Stat({ label, value, href }: { label: string; value: string; href?: string }) {
  const inner = (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">
      <div className="text-sm text-neutral-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-emerald-800">{value}</div>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

export default async function AdminDashboard() {
  const db = adminDb();
  if (!db) return <SetupNotice />;

  const [{ count: leadCount }, { count: orderCount }, { data: orders }] = await Promise.all([
    db.from("leads").select("*", { count: "exact", head: true }),
    db.from("orders").select("*", { count: "exact", head: true }),
    db.from("orders").select("amount, created_at").order("created_at", { ascending: false }).limit(1000),
  ]);

  const revenuePaise = (orders || []).reduce((s, o: { amount: number | null }) => s + (o.amount || 0), 0);
  const revenue = "₹" + Math.round(revenuePaise / 100).toLocaleString("en-IN");

  return (
    <div>
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        <Stat label="Total revenue" value={revenue} href="/admin/orders" />
        <Stat label="Orders" value={String(orderCount ?? 0)} href="/admin/orders" />
        <Stat label="Email leads" value={String(leadCount ?? 0)} href="/admin/leads" />
      </div>
      <p className="mt-6 text-sm text-neutral-500">
        Manage <Link className="text-emerald-700 underline" href="/admin/products">products</Link> and{" "}
        <Link className="text-emerald-700 underline" href="/admin/content">site content</Link>.
      </p>
    </div>
  );
}
