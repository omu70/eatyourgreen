// Coupon codes → percent discount. Add or edit codes here any time.
// 100 = free (the order skips payment and is delivered with a server-signed token).
const COUPONS: Record<string, number> = {
  om25: 100,
};

export function couponPercent(code?: string | null): number {
  const c = String(code || "").trim().toLowerCase();
  return COUPONS[c] || 0;
}
