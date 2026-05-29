"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "");
    const name = String(data.get("name") || "");
    const message = String(data.get("message") || "");
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, message }),
      });
      if (!res.ok) throw new Error("failed");
      track("generate_lead", { email });
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-card border border-leaf/40 bg-white shadow-card p-6 text-center">
        <p className="font-heading font-semibold text-forest">Thanks — message received!</p>
        <p className="text-ink/75 text-sm mt-1">We&rsquo;ll get back to you within 1–2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-card border border-mist bg-white shadow-card p-6 space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink/80 mb-1">Name</label>
        <input id="name" name="name" type="text" autoComplete="name"
          className="w-full min-h-[48px] rounded-xl border border-mist px-4 focus:border-brand outline-none" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink/80 mb-1">Email *</label>
        <input id="email" name="email" type="email" required autoComplete="email"
          className="w-full min-h-[48px] rounded-xl border border-mist px-4 focus:border-brand outline-none" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink/80 mb-1">Message</label>
        <textarea id="message" name="message" rows={4}
          className="w-full rounded-xl border border-mist px-4 py-3 focus:border-brand outline-none" />
      </div>
      <Button type="submit" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>
      {status === "error" && (
        <p className="text-sm text-cta text-center">Something went wrong. Please email us directly.</p>
      )}
    </form>
  );
}
