"use client";
import { Button, type ButtonProps } from "@/components/ui/button";
import { track } from "@/lib/analytics";

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

    try {
      // 1) Create the order on the server. The server returns the Razorpay key id,
      //    so the button does NOT depend on any NEXT_PUBLIC build-time variable.
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: value * 100, plan: contentId, name: contentName }),
      });
      const data = await res.json();

      if (!data || !data.ok || !data.order?.id || !data.key) {
        console.error("Razorpay order not created:", data);
        alert("Payments are being set up. Please try again shortly, or message us on WhatsApp.");
        return;
      }

      // 2) Load Razorpay Checkout.
      const ok = await loadRazorpay();
      if (!ok) {
        alert(
          "We couldn't load the secure payment window. Please turn off any ad-blocker for this site (or use a normal browser window) and try again — or message us on WhatsApp."
        );
        return;
      }

      // 3) Open the checkout.
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
            body: JSON.stringify({ ...resp, plan: contentId, amount: value * 100, title: contentName }),
          }).catch(() => {});
          // Pass the signed payment proof to the thank-you page so it can unlock the
          // download. Without a valid signature, no download link is ever issued.
          const qs = new URLSearchParams({
            plan: contentId,
            value: String(value),
            oid: resp.razorpay_order_id || "",
            pid: resp.razorpay_payment_id || "",
            sig: resp.razorpay_signature || "",
          });
          window.location.href = `/thank-you?${qs.toString()}`;
        },
      });
      rzp.open();
    } catch (e) {
      console.error("Razorpay error:", e);
      alert("Something went wrong starting the payment. Please try again, or message us on WhatsApp.");
    }
  }

  return (
    <Button onClick={purchase} {...rest}>
      {label}
    </Button>
  );
}
