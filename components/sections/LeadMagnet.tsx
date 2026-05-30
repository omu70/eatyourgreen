"use client";
import { useState } from "react";
import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { leadMagnet } from "@/data/content";
import { track } from "@/lib/analytics";

export default function LeadMagnet() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

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
          <h2 className="mt-4 text-h2 md:text-h2-lg text-forest">{leadMagnet.heading}</h2>
          <p className="mt-3 text-ink/75 prose-measure mx-auto">{leadMagnet.sub}</p>

          {status === "ok" ? (
            <p className="mt-6 font-heading font-semibold text-brand">
              Done! Check your inbox (and spam) for your free sample. 🌱
            </p>
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
                {status === "sending" ? "Sending…" : leadMagnet.cta}
              </Button>
            </form>
          )}
          {status === "error" && (
            <p className="mt-3 text-sm text-cta">Something went wrong. Please try again.</p>
          )}
          <p className="mt-3 small text-ink/55">{leadMagnet.note}</p>
        </div>
      </div>
    </section>
  );
}
