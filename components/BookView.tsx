"use client";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

export default function BookView({
  slug,
  title,
  price,
}: {
  slug: string;
  title: string;
  price: number;
}) {
  useEffect(() => {
    const t = setTimeout(() => {
      track("view_item", {
        value: price,
        currency: "INR",
        content_type: "product",
        content_ids: [slug],
        items: [{ item_id: slug, item_name: title, price }],
      });
    }, 600);
    return () => clearTimeout(t);
  }, [slug, title, price]);
  return null;
}
