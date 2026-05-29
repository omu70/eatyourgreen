"use client";

// Centralized analytics fan-out: Meta Pixel (browser) + GA4 + Meta CAPI (server).
// All IDs come from env. See .env.local placeholders.

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "evt-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

type Params = Record<string, any>;

// Map a logical event to {meta, ga4} names + params, fan out to all sinks.
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const eventId = params.event_id || uuid();

  const map: Record<string, { meta?: string; ga4?: string }> = {
    page_view: { meta: "PageView", ga4: "page_view" },
    view_item: { meta: "ViewContent", ga4: "view_item" },
    begin_checkout: { meta: "InitiateCheckout", ga4: "begin_checkout" },
    add_to_cart: { meta: "AddToCart", ga4: "add_to_cart" },
    generate_lead: { meta: "Lead", ga4: "generate_lead" },
    purchase: { meta: "Purchase", ga4: "purchase" },
    scroll_depth: { ga4: "scroll_depth" },
  };

  const entry = map[event];
  if (!entry) return;

  // Meta Pixel (browser)
  if (entry.meta && window.fbq) {
    window.fbq("track", entry.meta, sanitize(params), { eventID: eventId });
  }
  // GA4
  if (entry.ga4 && window.gtag) {
    window.gtag("event", entry.ga4, sanitize(params));
  }
  // Meta Conversions API (server) — mirror for dedupe via shared eventId
  if (entry.meta) {
    sendToCapi(entry.meta, eventId, params).catch(() => {});
  }
}

function sanitize(p: Params): Params {
  const { event_id, ...rest } = p;
  return rest;
}

async function sendToCapi(metaEvent: string, eventId: string, params: Params) {
  try {
    await fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: metaEvent,
        event_id: eventId,
        event_source_url: window.location.href,
        custom_data: sanitize(params),
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
      }),
      keepalive: true,
    });
  } catch {
    /* fail silent */
  }
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return m ? m[2] : undefined;
}
