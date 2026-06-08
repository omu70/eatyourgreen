import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy",
  alternates: { canonical: "/refund-policy" },
};

export default function Refund() {
  return (
    <LegalPage title="Cancellation & Refund Policy" updated="8 June 2026">
      <p>
        Eat Your Green (operated by Kiaan Creations) offers a 28-day money-back guarantee on every
        digital book and bundle we sell.
      </p>
      <h2>Cancellations</h2>
      <p>
        Our products are instant digital downloads, so an order cannot be &ldquo;cancelled&rdquo; once
        the files have been delivered. Instead, every purchase is covered by the 28-day refund
        guarantee below.
      </p>
      <h2>Refunds</h2>
      <p>
        If within 28 days of purchase you don&rsquo;t feel the book helped your child become calmer and
        more curious around greens, contact us and we&rsquo;ll refund every rupee — no questions asked.
      </p>
      <h2>How to request a refund</h2>
      <p>
        Message us on WhatsApp at +91 89205 69272 (or use the contact form) with the email address and
        date you used at checkout. Approved refunds are processed back to your original payment method,
        usually within 5–7 business days.
      </p>
    </LegalPage>
  );
}
