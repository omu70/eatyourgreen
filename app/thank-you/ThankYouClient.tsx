"use client";
import { useEffect, useState } from "react";
import { Download, CheckCircle2, Loader2, ShieldAlert } from "lucide-react";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { books, getPlanSlugs } from "@/data/books";

type Item = { title: string; url: string };

function startDownload(url: string) {
  const a = document.createElement("a");
  a.href = url;
  a.rel = "noopener";
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default function ThankYouClient({
  value,
  plan,
  oid,
  pid,
  sig,
  token,
}: {
  value: number;
  plan: string;
  oid: string;
  pid: string;
  sig: string;
  token: string;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "denied">("loading");

  // Fire Purchase once.
  useEffect(() => {
    track("purchase", {
      value,
      currency: "INR",
      content_type: "product",
      content_ids: [plan],
    });
  }, [value, plan]);

  // Unlock the download by presenting the signed payment proof to the server.
  useEffect(() => {
    let active = true;
    const hasSig = oid && pid && sig;
    if (!token && !hasSig) {
      setState("denied");
      return;
    }
    const payload = token
      ? { plan, token }
      : { razorpay_order_id: oid, razorpay_payment_id: pid, razorpay_signature: sig, plan };
    fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        if (d && d.ok && Array.isArray(d.items) && d.items.length) {
          setItems(d.items);
          setState("ready");
          d.items.forEach((it: Item, i: number) =>
            setTimeout(() => startDownload(it.url), 700 + i * 1400)
          );
        } else {
          setState("denied");
        }
      })
      .catch(() => active && setState("denied"));
    return () => {
      active = false;
    };
  }, [oid, pid, sig, plan, token]);

  const purchased = new Set(getPlanSlugs(plan));
  const others = books.filter((b) => !purchased.has(b.slug));

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream px-5 py-28">
      <div className="text-center max-w-lg w-full">
        {state === "denied" ? (
          <>
            <ShieldAlert className="mx-auto h-14 w-14 text-amber-500" />
            <h1 className="mt-4 text-h2 md:text-h2-lg text-forest">Almost there</h1>
            <p className="mt-3 text-ink/80">
              This download link only works right after a successful payment. If you&rsquo;ve already
              paid, please don&rsquo;t worry — message us on WhatsApp with your payment details and
              we&rsquo;ll send your book straight away.
            </p>
            <a
              href="https://chat.whatsapp.com/CbmN4dn73H7BBBsJkBimku"
              className="inline-block mt-6 rounded-full bg-leaf px-6 py-3 text-white font-semibold"
            >
              Message us on WhatsApp
            </a>
          </>
        ) : (
          <>
            <CheckCircle2 className="mx-auto h-14 w-14 text-leaf" />
            <h1 className="mt-4 text-h2 md:text-h2-lg text-forest">You&rsquo;re all set!</h1>
            <p className="mt-3 text-ink/80">
              {state === "loading"
                ? "Preparing your secure download…"
                : "Your download is starting automatically."}{" "}
              If it doesn&rsquo;t begin in a few seconds, tap the button below. Please save the file —
              this link expires in 1 hour.
            </p>

            <div className="mt-8 space-y-3 min-h-[64px]">
              {state === "loading" ? (
                <div className="flex items-center justify-center gap-2 text-ink/60 py-6">
                  <Loader2 className="h-5 w-5 animate-spin" /> Unlocking your book…
                </div>
              ) : (
                items.map((d, i) => (
                  <div
                    key={i}
                    className="rounded-card border border-mist bg-white shadow-card p-4 flex items-center gap-4 text-left"
                  >
                    <Download className="h-5 w-5 text-brand shrink-0" />
                    <span className="flex-1 font-heading font-semibold text-forest break-words">{d.title}</span>
                    <Button asChild size="pill">
                      <a href={d.url} target="_blank" rel="noopener">
                        Download
                      </a>
                    </Button>
                  </div>
                ))
              )}
            </div>

            {others.length > 0 && (
              <div className="mt-10 text-left">
                <h2 className="text-h3 text-forest font-heading text-center">Complete your set</h2>
                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                  {others.map((o) => (
                    <a
                      key={o.slug}
                      href={`/books/${o.slug}`}
                      className="rounded-card border border-mist bg-white shadow-card p-3 flex gap-3 items-center hover:border-leaf"
                    >
                      <span className="relative w-12 h-16 shrink-0 rounded overflow-hidden border border-mist bg-white">
                        <Image src={o.cover} alt={o.title} fill sizes="48px" className="object-contain" />
                      </span>
                      <span className="leading-tight min-w-0">
                        <span className="block font-heading font-semibold text-forest text-sm break-words">{o.title}</span>
                        <span className="block text-brand text-sm font-bold">₹{o.price.toLocaleString("en-IN")}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <a href="/" className="inline-block mt-8 text-brand font-semibold underline">
          ← Back to home
        </a>
      </div>
    </main>
  );
}
