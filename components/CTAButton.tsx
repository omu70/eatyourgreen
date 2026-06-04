"use client";
import { Button, type ButtonProps } from "@/components/ui/button";
import { track } from "@/lib/analytics";

const RZP_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const rzpReady = !!RZP_KEY && !RZP_KEY.startsWith("TODO");

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if ((window as unknown as { Razorpay?: unknown }).Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

type Props = ButtonProps & {
  href?: string;
  label: string;
  value?: number;
  contentId?: string;
  contentName?: string;
};

export default function CTAButton({
  href: _href = "",
  label,
  value = 0,
  contentId = "guide",
  contentName = "The Eat Your Green Guide",
  ...rest
}: Props) {
  async function purchase() {
    track("begin_checkout", {
      value,
      currency: "INR",
      content_name: contentName,
      content_ids: [contentId],
      content_type: "product",
      items: [{ item_id: contentId, item_name: contentName, price: value, quantity: 1 }],
    });

    if (rzpReady) {
      const ok = await loadRazorpay();
      if (ok) {
        try {
          const res = await fetch("/api/razorpay/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: value * 100, plan: contentId, name: contentName }),
          });
          const data = await res.json();
          if (data.ok && data.order?.id) {
            const RZP = (window as unknown as { Razorpay: new (o: unknown) => { open: () => void } }).Razorpay;
            const rzp = new RZP({
              key: data.key,
              amount: data.order.amount,
              currency: "INR",
              name: "Eat Your Green",
              description: contentName,
              order_id: data.order.id,
              theme: { color: "#1F6B3D" },
              handler: async (resp: Record<string, string>) => {
                await fetch("/api/razorpay/verify", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(resp),
                }).catch(() => {});
                window.location.href = `/thank-you?plan=${encodeURIComponent(contentId)}&value=${value}`;
              },
            });
            rzp.open();
            return;
          }
        } catch {
          /* fall through to link */
        }
      }
    }
    // Razorpay only — no external checkout. If keys aren't configured yet, tell the buyer gently.
    alert("Payments are being set up. Please try again in a little while, or message us on WhatsApp.");
  }

  return (
    <Button onClick={purchase} {...rest}>
      {label}
    </Button>
  );
}
