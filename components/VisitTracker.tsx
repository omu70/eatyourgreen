"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Logs an anonymous visit to /api/track on each page (no personal data).
export default function VisitTracker() {
  const pathname = usePathname();
  const last = useRef<string>("");

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    const full = pathname + (typeof window !== "undefined" ? window.location.search : "");
    if (last.current === full) return;
    last.current = full;
    const t = setTimeout(() => {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: full, referrer: typeof document !== "undefined" ? document.referrer : "" }),
        keepalive: true,
      }).catch(() => {});
    }, 300);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
