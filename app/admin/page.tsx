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
      <h1 className="text-xl font-semibold">Welcome 👋</h1>
      <p className="mt-1 text-sm text-neutral-500">Here&rsquo;s how your shop is doing. Tap a box to see more.</p>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        <Stat label="Money earned" value={revenue} href="/admin/orders" />
        <Stat label="Books sold" value={String(orderCount ?? 0)} href="/admin/orders" />
        <Stat label="Email sign-ups" value={String(leadCount ?? 0)} href="/admin/leads" />
      </div>

      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-emerald-800">What can I do here?</h2>
        <ul className="mt-3 space-y-2 text-sm text-neutral-700">
          <li>• <Link className="text-emerald-700 underline" href="/admin/orders">Sales</Link> — see who bought what and how much you earned.</li>
          <li>• <Link className="text-emerald-700 underline" href="/admin/leads">Email sign-ups</Link> — everyone who asked for the free sample (download as a list).</li>
          <li>• <Link className="text-emerald-700 underline" href="/admin/products">Books</Link> — change prices, covers, photos and details.</li>
          <li>• <Link className="text-emerald-700 underline" href="/admin/content">Website text &amp; photos</Link> — edit any words, image or link on your site.</li>
        </ul>
        <p className="mt-3 text-xs text-neutral-400">Tip: after you change something and click Save, your website updates in a few seconds.</p>
      </div>
    </div>
  );
}
