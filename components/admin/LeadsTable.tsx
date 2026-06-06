"use client";
type Lead = { created_at: string; email: string; name: string | null; source: string | null; message: string | null };

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  function exportCsv() {
    const head = ["Date", "Email", "Name", "Source", "Message"];
    const rows = leads.map((l) => [
      new Date(l.created_at).toLocaleString("en-IN"), l.email, l.name || "", l.source || "", (l.message || "").replace(/\n/g, " "),
    ]);
    const csv = [head, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url; a.download = `eat-your-green-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Email leads</h1>
        <button onClick={exportCsv} disabled={!leads.length}
          className="rounded-md bg-emerald-700 px-3 py-1.5 text-sm text-white hover:bg-emerald-800 disabled:opacity-50">
          Export CSV
        </button>
      </div>
      <div className="mt-5 overflow-x-auto rounded-xl border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-neutral-500">
            <tr><th className="px-4 py-2">Date</th><th className="px-4 py-2">Email</th><th className="px-4 py-2">Name</th><th className="px-4 py-2">Source</th><th className="px-4 py-2">Message</th></tr>
          </thead>
          <tbody>
            {leads.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-neutral-400">No leads yet.</td></tr>}
            {leads.map((l, i) => (
              <tr key={i} className="border-t border-neutral-100">
                <td className="px-4 py-2 whitespace-nowrap">{new Date(l.created_at).toLocaleString("en-IN")}</td>
                <td className="px-4 py-2">{l.email}</td>
                <td className="px-4 py-2">{l.name || "—"}</td>
                <td className="px-4 py-2">{l.source || "—"}</td>
                <td className="px-4 py-2 max-w-xs truncate">{l.message || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
