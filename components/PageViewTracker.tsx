"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import { useScrollDepth } from "@/hooks/useScrollDepth";

export default function PageViewTracker() {
  const pathname = usePathname();
  useScrollDepth();
  useEffect(() => {
    const t = setTimeout(() => track("page_view", { page_path: pathname }), 400);
    return () => clearTimeout(t);
  }, [pathname]);
  return null;
}
