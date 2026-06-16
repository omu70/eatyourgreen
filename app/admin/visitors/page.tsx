import { adminDb } from "@/lib/supabase/guard";
import SetupNotice from "@/components/admin/SetupNotice";

export const dynamic = "force-dynamic";

type Visit = {
  created_at: string | null;
  visitor_id: string | null;
  is_new: boolean | null;
  path: string | null;
  source: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  device: string | null;
  browser: string | null;
};

function topCounts(rows: Visit[], key: keyof Visit, n = 6): [string, number][] {
  const m = new Map<string, number>();
  for (const r of rows) {
    const k = String(r[key] || "—").trim() || "—";
    m.set(k, (m.get(k) || 0) + 1);
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 h-full">
      <div className="text-sm text-neutral-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-emerald-800">{value}</div>
      {hint ? <div className="mt-0.5 text-xs text-neutral-400">{hint}</div> : null}
    </div>
  );
}

function BarList({ title, data, total }: { title: string; data: [string, number][]; total: number }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-neutral-800">{title}</h2>
      {data.length === 0 ? (
        <p className="mt-3 text-sm text-neutral-400">No data yet.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {data.map(([k, v]) => (
            <li key={k}>
              <div className="flex items-center justify-between text-sm">
                <span className="truncate text-neutral-700">{k}</span>
                <span className="text-neutral-500 shrink-0 ml-2">{v}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${total ? Math.max(4, Math.round((v / total) * 100)) : 0}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default async function VisitorsPage() {
  const db = adminDb();
  if (!db) return <SetupNotice />;

  const since = new Date();
  since.setHours(0, 0, 0, 0);

  const [{ count: total }, { data }] = await Promise.all([
    db.from("visits").select("*", { count: "exact", head: true }),
    db
      .from("visits")
      .select("created_at, visitor_id, is_new, path, source, country, region, city, device, browser")
      .order("created_at", { ascending: false })
      .limit(2000),
  ]);

  const rows = (data || []) as Visit[];
  const uniq = new Set(rows.map((r) => r.visitor_id || "")).size;
  const todays = rows.filter((r) => r.created_at && new Date(r.created_at) >= since);
  const newToday = todays.filter((r) => r.is_new).length;
  const sources = topCounts(rows, "source");
  const pages = topCounts(rows, "path");
  const recent = rows.slice(0, 50);

  const place = (r: Visit) =>
    [r.city, r.region, r.country].filter(Boolean).join(", ") || "—";

  return (
    <div>
      <h1 className="text-xl font-semibold">Visitors</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Everyone who lands on your site, captured automatically. This is anonymous traffic data —
        source, location and device. (Phone numbers can&rsquo;t be captured this way; those only come
        from people who choose to share them.)
      </p>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 items-stretch">
        <Stat label="Total visits" value={String(total ?? rows.length)} />
        <Stat label="Unique visitors" value={String(uniq)} hint="recent window" />
        <Stat label="Visits today" value={String(todays.length)} />
        <Stat label="New visitors today" value={String(newToday)} />
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <BarList title="Where they came from" data={sources} total={rows.length} />
        <BarList title="Most-viewed pages" data={pages} total={rows.length} />
      </div>

      <div className="mt-6 rounded-xl border border-neutral-200 bg-white">
        <div className="px-5 py-4 border-b border-neutral-100">
          <h2 className="text-sm font-semibold text-neutral-800">Recent visits</h2>
        </div>
        {recent.length === 0 ? (
          <p className="px-5 py-6 text-sm text-neutral-500">
            No visits logged yet. After you deploy and run the visits SQL, this fills up automatically.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-neutral-400 border-b border-neutral-100">
                  <th className="px-5 py-2 font-medium">When</th>
                  <th className="px-3 py-2 font-medium">Location</th>
                  <th className="px-3 py-2 font-medium">Device</th>
                  <th className="px-3 py-2 font-medium">Source</th>
                  <th className="px-5 py-2 font-medium">Page</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r, i) => (
                  <tr key={i} className="border-b border-neutral-50">
                    <td className="px-5 py-2 whitespace-nowrap text-neutral-500">
                      {r.created_at ? new Date(r.created_at).toLocaleString("en-IN") : "—"}
                    </td>
                    <td className="px-3 py-2 text-neutral-700">{place(r)}</td>
                    <td className="px-3 py-2 text-neutral-700 whitespace-nowrap">
                      {r.device || "—"}
                      {r.browser ? <span className="text-neutral-400"> · {r.browser}</span> : null}
                    </td>
                    <td className="px-3 py-2 text-neutral-700">{r.source || "—"}</td>
                    <td className="px-5 py-2 text-neutral-500 truncate max-w-[220px]">{r.path || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-neutral-400">
        To actually re-reach these visitors, turn on retargeting: add your Meta Pixel and Google IDs in
        Vercel and run &ldquo;win them back&rdquo; ads. No phone numbers needed.
      </p>
    </div>
  );
}
