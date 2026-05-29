"use client";
import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { PRICE_INR } from "@/lib/seo";

export default function PageAnalytics() {
  useScrollDepth();
  useEffect(() => {
    // small delay so pixel/ga4 scripts are ready
    const t = setTimeout(() => {
      track("page_view", {});
      track("view_item", {
        value: PRICE_INR,
        currency: "INR",
        content_type: "product",
        content_ids: ["guide", "toolkit"],
        items: [{ item_id: "guide", item_name: "The Guide", price: PRICE_INR }],
      });
    }, 600);
    return () => clearTimeout(t);
  }, []);
  return null;
}
