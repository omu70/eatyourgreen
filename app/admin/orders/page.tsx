import { adminDb } from "@/lib/supabase/guard";
import SetupNotice from "@/components/admin/SetupNotice";

export const dynamic = "force-dynamic";

type Order = {
  created_at: string; email: string | null; product_title: string | null;
  plan: string | null; amount: number | null; status: string | null;
  razorpay_payment_id: string | null;
};

export default async function OrdersPage() {
  const db = adminDb();
  if (!db) return <SetupNotice />;
  const { data } = await db.from("orders").select("*").order("created_at", { ascending: false }).limit(500);
  const orders = (data || []) as Order[];
  const total = orders.reduce((s, o) => s + (o.amount || 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Orders</h1>
        <div className="text-sm text-neutral-600">Revenue: <b>₹{Math.round(total / 100).toLocaleString("en-IN")}</b> · {orders.length} orders</div>
      </div>
      <div className="mt-5 overflow-x-auto rounded-xl border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-neutral-500">
            <tr>
              <th className="px-4 py-2">Date</th><th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Email</th><th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th><th className="px-4 py-2">Payment ID</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-neutral-400">No orders yet.</td></tr>
            )}
            {orders.map((o, i) => (
              <tr key={i} className="border-t border-neutral-100">
                <td className="px-4 py-2 whitespace-nowrap">{new Date(o.created_at).toLocaleString("en-IN")}</td>
                <td className="px-4 py-2">{o.product_title || o.plan}</td>
                <td className="px-4 py-2">{o.email || "—"}</td>
                <td className="px-4 py-2">₹{Math.round((o.amount || 0) / 100).toLocaleString("en-IN")}</td>
                <td className="px-4 py-2">{o.status}</td>
                <td className="px-4 py-2 text-neutral-400">{o.razorpay_payment_id || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
