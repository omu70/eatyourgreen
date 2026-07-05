"use client";
import { useState } from "react";
import { Upload, FileText } from "lucide-react";

export default function FileField({
  name,
  accept,
  chooseLabel = "Choose file",
  submitLabel,
  multiple = false,
}: {
  name: string;
  accept: string;
  chooseLabel?: string;
  submitLabel?: string;
  multiple?: boolean;
}) {
  const [fname, setFname] = useState("");
  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="inline-flex items-center gap-2 cursor-pointer rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
        <Upload className="h-4 w-4" /> {chooseLabel}
        <input
          type="file"
          name={name}
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files;
            setFname(!f || f.length === 0 ? "" : f.length === 1 ? f[0].name : `${f.length} files`);
          }}
        />
      </label>
      {fname ? (
        <span className="inline-flex items-center gap-1.5 text-sm text-neutral-700 min-w-0">
          <FileText className="h-4 w-4 text-emerald-600 shrink-0" />
          <span className="truncate max-w-[200px]">{fname}</span>
        </span>
      ) : (
        <span className="text-xs text-neutral-400">No file chosen</span>
      )}
      {submitLabel ? (
        <button className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800">
          {submitLabel}
        </button>
      ) : null}
    </div>
  );
}
