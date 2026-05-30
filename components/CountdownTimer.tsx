"use client";
import { useEffect, useState } from "react";
import { launchDeadline } from "@/data/content";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s, done: ms === 0 };
}

function Box({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="min-w-[44px] rounded-lg bg-forest text-white font-heading font-bold text-xl md:text-2xl px-2 py-1 tabular-nums">
        {String(n).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[11px] uppercase tracking-wide text-ink/60">{label}</span>
    </div>
  );
}

export default function CountdownTimer({ className = "" }: { className?: string }) {
  const target = new Date(launchDeadline).getTime();
  const [t, setT] = useState(() => diff(target));
  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (t.done) return null;
  return (
    <div className={`flex items-center justify-center gap-2 md:gap-3 ${className}`} aria-label="Offer ends in">
      <Box n={t.d} label="Days" />
      <Box n={t.h} label="Hrs" />
      <Box n={t.m} label="Min" />
      <Box n={t.s} label="Sec" />
    </div>
  );
}
