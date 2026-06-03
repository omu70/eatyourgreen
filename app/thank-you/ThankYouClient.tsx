"use client";
import { useEffect, useState } from "react";
import { Download, CheckCircle2 } from "lucide-react";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { books, type DownloadItem } from "@/data/books";

function triggerDownload(file: string, filename: string) {
  const a = document.createElement("a");
  a.href = file;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default function ThankYouClient({
  value,
  plan,
  downloads,
}: {
  value: number;
  plan: string;
  downloads: DownloadItem[];
}) {
  const [started, setStarted] = useState(false);

  // Fire Purchase once
  useEffect(() => {
    track("purchase", {
      value,
      currency: "INR",
      content_type: "product",
      content_ids: [plan],
      items: downloads.map((d) => ({
        item_id: plan,
        item_name: d.title,
        price: d.price,
        quantity: 1,
      })),
    });
  }, [value, plan, downloads]);

  // Auto-start download(s) shortly after load (slight stagger for multiple files)
  useEffect(() => {
    const timers = downloads.map((d, i) =>
      setTimeout(() => {
        const filename = d.file.split("/").pop() || "eat-your-green.pdf";
        triggerDownload(d.file, filename);
      }, 800 + i * 1200)
    );
    setStarted(true);
    return () => timers.forEach(clearTimeout);
  }, [downloads]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream px-5 py-28">
      <div className="text-center max-w-lg">
        <CheckCircle2 className="mx-auto h-14 w-14 text-leaf" />
        <h1 className="mt-4 text-h2 md:text-h2-lg text-forest">You&rsquo;re all set!</h1>
        <p className="mt-3 text-ink/80">
          {started ? "Your download is starting automatically." : "Preparing your download…"} If it
          doesn&rsquo;t begin in a few seconds, tap the button below. We&rsquo;ve also emailed your
          copy as a backup.
        </p>

        <div className="mt-8 space-y-3">
          {downloads.map((d, i) => {
            const filename = d.file.split("/").pop() || "eat-your-green.pdf";
            return (
              <div
                key={i}
                className="rounded-card border border-mist bg-white shadow-card p-4 flex items-center gap-4 text-left"
              >
                <Download className="h-5 w-5 text-brand shrink-0" />
                <span className="flex-1 font-heading font-semibold text-forest">{d.title}</span>
                <Button asChild size="pill">
                  <a href={d.file} download={filename} rel="noopener">
                    Download
                  </a>
                </Button>
              </div>
            );
          })}
        </div>

        {(() => {
          const purchased = new Set(downloads.map((d) => d.file));
          const others = books.filter((b) => !purchased.has(b.pdf));
          if (others.length === 0) return null;
          return (
            <div className="mt-10 text-left">
              <h2 className="text-h3 text-forest font-heading text-center">Complete your set</h2>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {others.map((o) => (
                  <a key={o.slug} href={`/books/${o.slug}`} className="rounded-card border border-mist bg-white shadow-card p-3 flex gap-3 items-center hover:border-leaf">
                    <span className="relative w-12 h-16 shrink-0 rounded overflow-hidden border border-mist">
                      <Image src={o.cover} alt={o.title} fill sizes="48px" className="object-cover" />
                    </span>
                    <span className="leading-tight">
                      <span className="block font-heading font-semibold text-forest text-sm">{o.title}</span>
                      <span className="block text-brand text-sm font-bold">₹{o.price.toLocaleString("en-IN")}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          );
        })()}

        <a href="/" className="inline-block mt-8 text-brand font-semibold underline">
          ← Back to home
        </a>
      </div>
    </main>
  );
}
