"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { couponPercent } from "@/lib/coupons";

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
  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Lock background scroll while the checkout is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const pct = couponPercent(coupon);
  const total = Math.max(0, Math.round(value * (1 - pct / 100)));

  function validContact() {
    const okEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());
    const okPhone = phone.replace(/\D/g, "").length >= 10;
    if (!okEmail) return "Please enter a valid email address.";
    if (!okPhone) return "Please enter a valid mobile number.";
    return "";
  }

  async function pay() {
    const v = validContact();
    if (v) {
      setErr(v);
      return;
    }
    setErr("");
    setBusy(true);

    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), message: `Mobile: ${phone.trim()}`, source: "checkout" }),
      keepalive: true,
    }).catch(() => {});

    track("begin_checkout", {
      value,
      currency: "INR",
      content_name: contentName,
      content_ids: [contentId],
      content_type: "product",
      items: [{ item_id: contentId, item_name: contentName, price: value, quantity: 1 }],
    });

    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: value * 100, plan: contentId, name: contentName, coupon }),
      });
      const data = await res.json();

      if (data?.free && data?.token) {
        const qs = new URLSearchParams({ plan: contentId, value: "0", token: data.token });
        window.location.href = `/thank-you?${qs.toString()}`;
        return;
      }

      if (!data || !data.ok || !data.order?.id || !data.key) {
        console.error("Razorpay order not created:", data);
        alert("Payments are being set up. Please try again shortly, or message us on WhatsApp.");
        setBusy(false);
        return;
      }

      const ok = await loadRazorpay();
      if (!ok) {
        alert(
          "We couldn't load the secure payment window. Please turn off any ad-blocker for this site (or use a normal browser window) and try again — or message us on WhatsApp."
        );
        setBusy(false);
        return;
      }

      const RZP = (window as unknown as { Razorpay: new (o: unknown) => { open: () => void } }).Razorpay;
      const rzp = new RZP({
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "Eat Your Green",
        description: contentName,
        order_id: data.order.id,
        theme: { color: "#1F6B3D" },
        prefill: { email: email.trim(), contact: phone.trim() },
        handler: async (resp: Record<string, string>) => {
          await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...resp,
              plan: contentId,
              amount: data.order.amount,
              title: contentName,
              email: email.trim(),
            }),
          }).catch(() => {});
          const qs = new URLSearchParams({
            plan: contentId,
            value: String(Math.round((data.order.amount || 0) / 100)),
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
      setBusy(false);
    }
  }

  const field = "mt-1 w-full min-h-[46px] rounded-lg border border-mist px-3 text-sm outline-none focus:border-brand";

  const modal = (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={() => !busy && setOpen(false)}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white shadow-xl p-6 text-left my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => !busy && setOpen(false)}
          aria-label="Close"
          className="absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center text-ink/50 hover:bg-mist"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="text-lg font-heading font-bold text-forest">Checkout</h3>

        <div className="mt-4 flex items-start justify-between gap-3 border-b border-mist pb-3">
          <span className="text-sm text-ink/80">{contentName}</span>
          <span className="font-semibold text-forest whitespace-nowrap">₹{value.toLocaleString("en-IN")}</span>
        </div>

        <div className="mt-4 space-y-3">
          <label className="block text-sm">
            <span className="text-ink/70">Email <span className="text-cta">*</span></span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" autoComplete="email" className={field} />
          </label>
          <label className="block text-sm">
            <span className="text-ink/70">Mobile / WhatsApp number <span className="text-cta">*</span></span>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile number" autoComplete="tel" className={field} />
          </label>
          <label className="block text-sm">
            <span className="text-ink/70">Coupon code (optional)</span>
            <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Enter code" autoComplete="off" className={field} />
            {coupon ? (
              pct > 0 ? (
                <span className="mt-1 block text-sm text-leaf font-medium">✓ &ldquo;{coupon}&rdquo; applied — {pct}% off</span>
              ) : (
                <span className="mt-1 block text-sm text-cta">That code isn&rsquo;t valid.</span>
              )
            ) : null}
          </label>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-mist pt-3">
          <span className="font-medium text-ink">Total</span>
          <span className="text-lg font-heading font-bold text-forest">
            {total === 0 ? "FREE" : `₹${total.toLocaleString("en-IN")}`}
            {pct > 0 && total > 0 ? (
              <span className="ml-2 text-sm text-ink/40 line-through">₹{value.toLocaleString("en-IN")}</span>
            ) : null}
          </span>
        </div>

        {err ? <p className="mt-3 text-sm text-cta">{err}</p> : null}

        <button
          onClick={pay}
          disabled={busy}
          className="mt-4 w-full rounded-full bg-cta text-white font-semibold py-3 hover:opacity-95 disabled:opacity-60"
        >
          {busy ? "Please wait…" : total === 0 ? "Get it free" : `Pay ₹${total.toLocaleString("en-IN")}`}
        </button>
        <p className="mt-3 text-center text-[11px] text-ink/50">
          Secure payment by UPI, Google Pay, cards & more · Instant download · We&rsquo;ll send your book here too
        </p>
      </div>
    </div>
  );

  return (
    <>
      <Button onClick={() => setOpen(true)} {...rest}>
        {label}
      </Button>
      {open && mounted ? createPortal(modal, document.body) : null}
    </>
  );
}
