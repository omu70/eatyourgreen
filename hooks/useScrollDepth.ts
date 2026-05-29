"use client";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function useScrollDepth() {
  useEffect(() => {
    const fired = new Set<number>();
    const thresholds = [25, 50, 75, 100];

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      for (const t of thresholds) {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          track("scroll_depth", { percent: t });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
