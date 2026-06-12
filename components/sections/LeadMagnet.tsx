"use client";
import { useState } from "react";
import { Gift, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { leadMagnet } from "@/data/content";
import { track } from "@/lib/analytics";

export default function LeadMagnet({ heading, sub, cta }: { heading?: string; sub?: string; cta?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  function downloadNow() {
    const a = document.createElement("a");
    a.href = leadMagnet.file;
    a.download = leadMagnet.fileName || "eat-your-green-free.pdf";
    a.rel = "noopener";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") || "");
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "lead-magnet" }),
      });
      if (!res.ok) throw new Error();
      track("generate_lead", { email });
      setStatus("ok");
      form.reset();
      // Deliver the freebie instantly — no email service required.
      setTimeout(downloadNow, 400);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section bg-mist">
      <div className="container-page max-w-2xl">
        <div className="rounded-card bg-white border border-mist shadow-card p-6 md:p-8 text-center">
          <div className="mx-auto h-14 w-14 rounded-full bg-leaf/15 flex items-center justify-center">
            <Gift className="h-7 w-7 text-brand" />
          </div>
          <h2 className="mt-4 text-h2 md:text-h2-lg text-forest">{heading || leadMagnet.heading}</h2>
          <p className="mt-3 text-ink/75 prose-measure mx-auto">{sub || leadMagnet.sub}</p>

          {status === "ok" ? (
            <div className="mt-6">
              <p className="font-heading font-semibold text-brand text-lg">{leadMagnet.successHeading}</p>
              <p className="mt-2 text-ink/75 text-sm prose-measure mx-auto">{leadMagnet.successBody}</p>
              <Button onClick={downloadNow} size="lg" className="mt-4 inline-flex items-center gap-2">
                <Download className="h-4 w-4" /> Download the cheat sheet
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                name="email"
                type="email"
                required
                placeholder="Your email address"
                autoComplete="email"
                className="flex-1 min-h-[48px] rounded-xl border border-mist px-4 focus:border-brand outline-none"
              />
              <Button type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : (cta || leadMagnet.cta)}
              </Button>
            </form>
          )}
          {status === "error" && (
            <p className="mt-3 text-sm text-cta">Something went wrong. Please try again.</p>
          )}
          {status !== "ok" && <p className="mt-3 small text-ink/55">{leadMagnet.note}</p>}
        </div>
      </div>
    </section>
  );
}
