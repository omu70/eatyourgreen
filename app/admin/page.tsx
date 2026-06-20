import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { IndianRupee, TrendingUp, ShoppingBag, Mail, BookOpen, Pencil, ArrowUpRight } from "lucide-react";
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

function Stat({
  label,
  value,
  href,
  hint,
  icon: Icon,
  tint,
}: {
  label: string;
  value: string;
  href?: string;
  hint?: string;
  icon: LucideIcon;
  tint: string;
}) {
  const inner = (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 h-full transition-all hover:border-emerald-300 hover:shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm text-neutral-500">{label}</span>
        <span className={`h-8 w-8 rounded-lg flex items-center justify-center ${tint}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-2 text-2xl font-semibold text-neutral-900">{value}</div>
      {hint ? <div className="mt-0.5 text-xs text-neutral-400">{hint}</div> : null}
    </div>
  );
  return href ? (
    <Link href={href} className="block h-full">
      {inner}
    </Link>
  ) : (
    inner
  );
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
  const todayRevenue =
    "₹" + Math.round(todays.reduce((s, o) => s + (o.amount || 0), 0) / 100).toLocaleString("en-IN");
  const recent = all.slice(0, 6);

  return (
    <div>
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-500">A quick look at how your shop is doing.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-2 text-sm font-medium text-white hover:bg-emerald-800"
          >
            <BookOpen className="h-4 w-4" /> Edit books
          </Link>
          <Link
            href="/admin/content"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 px-3.5 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            <Pencil className="h-4 w-4" /> Edit website
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        <Stat label="Money earned" value={revenue} href="/admin/orders" icon={IndianRupee} tint="bg-emerald-50 text-emerald-700" />
        <Stat label="Sales today" value={todayRevenue} hint={`${todays.length} order${todays.length === 1 ? "" : "s"} today`} href="/admin/orders" icon={TrendingUp} tint="bg-amber-50 text-amber-600" />
        <Stat label="Books sold" value={String(orderCount ?? 0)} href="/admin/orders" icon={ShoppingBag} tint="bg-sky-50 text-sky-600" />
        <Stat label="Email sign-ups" value={String(leadCount ?? 0)} href="/admin/leads" icon={Mail} tint="bg-violet-50 text-violet-600" />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4 items-start">
        <div className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
            <h2 className="text-sm font-semibold text-neutral-800">Recent sales</h2>
            <Link href="/admin/orders" className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:underline">
              See all <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="px-5 py-8 text-sm text-neutral-500 text-center">
              No sales yet. Share your website to get your first one! 🌱
            </p>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {recent.map((o, i) => (
                <li key={i} className="px-5 py-3 flex items-center gap-3 text-sm">
                  <span className="h-9 w-9 shrink-0 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <ShoppingBag className="h-4 w-4" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-medium text-neutral-800 truncate">{o.product_title || o.plan || "Order"}</span>
                    <span className="block text-xs text-neutral-400 truncate">
                      {o.email || "—"}
                      {o.created_at ? " · " + new Date(o.created_at).toLocaleString("en-IN") : ""}
                    </span>
                  </span>
                  <span className="font-semibold text-neutral-900 shrink-0">
                    ₹{Math.round((o.amount || 0) / 100).toLocaleString("en-IN")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-neutral-800">Quick guide</h2>
          <ul className="mt-3 space-y-2.5 text-sm text-neutral-600">
            <li className="flex gap-2"><ShoppingBag className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" /><span><Link className="text-emerald-700 hover:underline" href="/admin/orders">Sales</Link> — who bought what.</span></li>
            <li className="flex gap-2"><TrendingUp className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" /><span><Link className="text-emerald-700 hover:underline" href="/admin/visitors">Visitors</Link> — where traffic comes from.</span></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" /><span><Link className="text-emerald-700 hover:underline" href="/admin/leads">Sign-ups</Link> — your email list.</span></li>
            <li className="flex gap-2"><BookOpen className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" /><span><Link className="text-emerald-700 hover:underline" href="/admin/products">Books</Link> — prices, photos, PDFs.</span></li>
            <li className="flex gap-2"><Pencil className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" /><span><Link className="text-emerald-700 hover:underline" href="/admin/content">Website</Link> — all text & images.</span></li>
          </ul>
          <p className="mt-4 text-xs text-neutral-400">After you Save a change, your live site updates in a few seconds.</p>
        </div>
      </div>
    </div>
  );
}
