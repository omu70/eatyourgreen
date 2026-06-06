"use client";
import { useState } from "react";

type Field = { key: string; label: string; type?: "text" | "textarea" | "number" };

export default function RepeatableRows({
  name,
  fields,
  initial,
  addLabel = "+ Add",
  itemLabel = "Item",
}: {
  name: string;
  fields: Field[];
  initial: Record<string, unknown>[];
  addLabel?: string;
  itemLabel?: string;
}) {
  const [rows, setRows] = useState<Record<string, unknown>[]>(
    Array.isArray(initial) ? initial : []
  );

  const update = (i: number, key: string, val: unknown) =>
    setRows((r) => r.map((row, idx) => (idx === i ? { ...row, [key]: val } : row)));
  const add = () =>
    setRows((r) => [...r, Object.fromEntries(fields.map((f) => [f.key, f.type === "number" ? 0 : ""]))]);
  const remove = (i: number) => setRows((r) => r.filter((_, idx) => idx !== i));

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(rows)} readOnly />
      <div className="space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="rounded-md border border-neutral-200 p-3 bg-neutral-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-neutral-500">{itemLabel} {i + 1}</span>
              <button type="button" onClick={() => remove(i)} className="text-xs text-red-600 hover:underline">Remove</button>
            </div>
            <div className="grid gap-2">
              {fields.map((f) => (
                <label key={f.key} className="block text-xs">
                  <span className="text-neutral-500">{f.label}</span>
                  {f.type === "textarea" ? (
                    <textarea
                      value={String(row[f.key] ?? "")}
                      onChange={(e) => update(i, f.key, e.target.value)}
                      rows={2}
                      className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
                    />
                  ) : (
                    <input
                      type={f.type === "number" ? "number" : "text"}
                      value={String(row[f.key] ?? "")}
                      onChange={(e) => update(i, f.key, f.type === "number" ? Number(e.target.value) : e.target.value)}
                      className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
                    />
                  )}
                </label>
              ))}
            </div>
          </div>
        ))}
        {rows.length === 0 && <p className="text-xs text-neutral-400">Nothing yet. Click below to add one.</p>}
      </div>
      <button type="button" onClick={add} className="mt-2 rounded-md border border-emerald-700 px-3 py-1.5 text-sm text-emerald-700 hover:bg-emerald-50">
        {addLabel}
      </button>
    </div>
  );
}
