"use client";
import { useEffect, useState, useCallback } from "react";
import { X, Gift, Download } from "lucide-react";
import { leadMagnet } from "@/data/content";
import { track } from "@/lib/analytics";

const COOKIE = "eyg_lead";

function getCookie(name: string) {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return m ? m[2] : "";
}
function setCookie(name: string, value: string, days: number) {
  const d = new Date();
  d.setTime(d.getTime() + days * 864e5);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

export default function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const maybeOpen = useCallback(() => {
    if (typeof document === "undefined") return;
    if (getCookie(COOKIE)) return;
    if (window.location.pathname.startsWith("/admin") || window.location.pathname.startsWith("/thank-you")) return;
    setOpen(true);
  }, []);

  useEffect(() => {
    if (getCookie(COOKIE)) return;
    const timer = setTimeout(maybeOpen, 15000);
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) maybeOpen();
    };
    document.addEventListener("mouseleave", onLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [maybeOpen]);

  function close() {
    setOpen(false);
    if (status !== "ok") setCookie(COOKIE, "closed", 7);
  }

  function downloadNow() {
    const a = document.createElement("a");
    a.href = leadMagnet.file;
    a.download = leadMagnet.fileName || "eat-your-green.pdf";
    a.target = "_blank";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const wa = String(fd.get("whatsapp") || "").trim();
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message: wa ? `WhatsApp: ${wa}` : undefined, source: "popup" }),
      });
      if (!res.ok) throw new Error();
      track("generate_lead", { email });
      setCookie(COOKIE, "done", 365);
      setStatus("ok");
      setTimeout(downloadNow, 400);
    } catch {
      setStatus("error");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white shadow-xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center text-ink/50 hover:bg-mist"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "ok" ? (
          <div className="text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-leaf/15 flex items-center justify-center">
              <Download className="h-7 w-7 text-brand" />
            </div>
            <h3 className="mt-4 text-xl font-heading font-bold text-forest">{leadMagnet.successHeading}</h3>
            <p className="mt-2 text-ink/75 text-sm">{leadMagnet.successBody}</p>
            <button
              onClick={downloadNow}
              className="mt-4 w-full rounded-full bg-cta text-white font-semibold py-3 hover:opacity-95"
            >
              Download the cheat sheet
            </button>
          </div>
        ) : (
          <>
            <div className="mx-auto h-14 w-14 rounded-full bg-leaf/15 flex items-center justify-center">
              <Gift className="h-7 w-7 text-brand" />
            </div>
            <h3 className="mt-4 text-center text-xl font-heading font-bold text-forest">
              Wait — grab your free cheat sheet 🌱
            </h3>
            <p className="mt-2 text-center text-ink/75 text-sm">
              10 calm things to say at the table tonight that stop the fights — no bribes, no tears. Free.
            </p>
            <form onSubmit={onSubmit} className="mt-5 space-y-3">
              <input
                name="email"
                type="email"
                required
                placeholder="Your email address"
                autoComplete="email"
                className="w-full min-h-[48px] rounded-xl border border-mist px-4 focus:border-brand outline-none"
              />
              <input
                name="whatsapp"
                type="tel"
                placeholder="WhatsApp number (optional)"
                autoComplete="tel"
                className="w-full min-h-[48px] rounded-xl border border-mist px-4 focus:border-brand outline-none"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-cta text-white font-semibold py-3 hover:opacity-95 disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send me the free cheat sheet"}
              </button>
            </form>
            {status === "error" && (
              <p className="mt-2 text-center text-sm text-cta">Something went wrong. Please try again.</p>
            )}
            <p className="mt-3 text-center text-[11px] text-ink/50">No spam. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </div>
  );
}
