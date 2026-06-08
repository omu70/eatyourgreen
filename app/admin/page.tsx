import Link from "next/link";
import { adminDb } from "@/lib/supabase/guard";
import SetupNotice from "@/components/admin/SetupNotice";

export const dynamic = "force-dynamic";

type Order = {
  amount: number | null;
  created_at: string | null;
  product_title?: string | null;
  email?: string | null;
  plan?: string | null;
};

function Stat({ label, value, href, hint }: { label: string; value: string; href?: string; hint?: string }) {
  const inner = (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 hover:border-emerald-300 transition-colors h-full">
      <div className="text-sm text-neutral-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-emerald-800">{value}</div>
      {hint ? <div className="mt-0.5 text-xs text-neutral-400">{hint}</div> : null}
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

export default async function AdminDashboard() {
  const db = adminDb();
  if (!db) return <SetupNotice />;

  const since = new Date();
  since.setHours(0, 0, 0, 0);

  const [{ count: leadCount }, { count: orderCount }, { data: orders }] = await Promise.all([
    db.from("leads").select("*", { count: "exact", head: true }),
    db.from("orders").select("*", { count: "exact", head: true }),
    db
      .from("orders")
      .select("amount, created_at, product_title, email, plan")
      .order("created_at", { ascending: false })
      .limit(1000),
  ]);

  const all = (orders || []) as Order[];
  const revenuePaise = all.reduce((s, o) => s + (o.amount || 0), 0);
  const revenue = "₹" + Math.round(revenuePaise / 100).toLocaleString("en-IN");
  const todays = all.filter((o) => o.created_at && new Date(o.created_at) >= since);
  const todayRevenue = "₹" + Math.round(todays.reduce((s, o) => s + (o.amount || 0), 0) / 100).toLocaleString("en-IN");
  const recent = all.slice(0, 6);

  return (
    <div>
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-semibold">Welcome 👋</h1>
          <p className="mt-1 text-sm text-neutral-500">Here&rsquo;s how your shop is doing.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/products" className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-800">
            Edit books
          </Link>
          <Link href="/admin/content" className="rounded-md border border-emerald-700 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50">
            Edit website
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 items-stretch">
        <Stat label="Money earned" value={revenue} href="/admin/orders" />
        <Stat label="Sales today" value={todayRevenue} hint={`${todays.length} order${todays.length === 1 ? "" : "s"} today`} href="/admin/orders" />
        <Stat label="Books sold" value={String(orderCount ?? 0)} href="/admin/orders" />
        <Stat label="Email sign-ups" value={String(leadCount ?? 0)} href="/admin/leads" />
      </div>

      <div className="mt-8 rounded-xl border border-neutral-200 bg-white">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
          <h2 className="text-sm font-semibold text-neutral-800">Recent sales</h2>
          <Link href="/admin/orders" className="text-xs text-emerald-700 hover:underline">See all</Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-5 py-6 text-sm text-neutral-500">No sales yet. Share your website to get your first one!</p>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {recent.map((o, i) => (
              <li key={i} className="px-5 py-3 flex items-center gap-3 text-sm">
                <span className="flex-1 min-w-0">
                  <span className="block font-medium text-neutral-800 truncate">{o.product_title || o.plan || "Order"}</span>
                  <span className="block text-xs text-neutral-400 truncate">
                    {o.email || "—"}
                    {o.created_at ? " · " + new Date(o.created_at).toLocaleString("en-IN") : ""}
                  </span>
                </span>
                <span className="font-semibold text-emerald-800 shrink-0">
                  ₹{Math.round((o.amount || 0) / 100).toLocaleString("en-IN")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-emerald-800">What can I do here?</h2>
        <ul className="mt-3 space-y-2 text-sm text-neutral-700">
          <li>• <Link className="text-emerald-700 underline" href="/admin/orders">Sales</Link> — see who bought what and how much you earned.</li>
          <li>• <Link className="text-emerald-700 underline" href="/admin/leads">Email sign-ups</Link> — everyone who asked for the free sample (download as a list).</li>
          <li>• <Link className="text-emerald-700 underline" href="/admin/products">Books</Link> — change prices, covers, photos, details, and upload the PDF buyers receive.</li>
          <li>• <Link className="text-emerald-700 underline" href="/admin/content">Website text &amp; photos</Link> — edit any words, image or link on your site.</li>
        </ul>
        <p className="mt-3 text-xs text-neutral-400">Tip: after you change something and click Save, your website updates in a few seconds.</p>
      </div>
    </div>
  );
}
