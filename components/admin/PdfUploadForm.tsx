"use client";
import { useRef, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase/browser";
import { createPdfUploadUrl, setProductPdf } from "@/app/admin/products/actions";

// Uploads the book PDF straight from the browser to Supabase Storage (via a
// signed URL). This bypasses Vercel's ~4.5MB Server Action limit, so PDFs of
// any size upload reliably. The file bytes never pass through the server.
export default function PdfUploadForm({ slug, uploaded }: { slug: string; uploaded: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function onUpload() {
    const file = inputRef.current?.files?.[0];
    if (!file) {
      setStatus({ ok: false, message: "Please choose a PDF file first." });
      return;
    }
    setBusy(true);
    setStatus({ ok: true, message: "Uploading… keep this tab open." });
    try {
      const meta = await createPdfUploadUrl(slug, file.name);
      if (!meta.ok || !meta.path || !meta.token) {
        setStatus({ ok: false, message: meta.message || "Couldn't start the upload." });
        return;
      }
      const supabase = createBrowserSupabase();
      const { error } = await supabase.storage
        .from("downloads")
        .uploadToSignedUrl(meta.path, meta.token, file);
      if (error) {
        setStatus({ ok: false, message: "Upload failed: " + error.message });
        return;
      }
      const res = await setProductPdf(slug, meta.path);
      setStatus(res);
    } catch (e) {
      setStatus({ ok: false, message: "Upload failed: " + String((e as Error)?.message || e) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="block text-sm text-neutral-600 file:mr-3 file:rounded-md file:border-0 file:bg-neutral-100 file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-neutral-200"
        />
        <button
          type="button"
          onClick={onUpload}
          disabled={busy}
          className="rounded-md bg-emerald-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-800 disabled:opacity-60"
        >
          {busy ? "Uploading…" : uploaded ? "Replace PDF" : "Upload PDF"}
        </button>
      </div>
      {status ? (
        <p className={`mt-2 text-sm ${status.ok ? "text-emerald-700" : "text-red-600"}`}>{status.message}</p>
      ) : null}
    </div>
  );
}
