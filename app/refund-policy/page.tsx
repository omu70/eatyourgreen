import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy",
  alternates: { canonical: "/refund-policy" },
};

export default function Refund() {
  return (
    <LegalPage title="Refund Policy" updated="TODO">
      <p>We offer a 14-day money-back guarantee on every book.</p>
      <h2>How it works</h2>
      <p>If within 14 days of purchase you don&rsquo;t see your child more curious and calmer around greens, email us and we&rsquo;ll refund every rupee — no questions asked.</p>
      <h2>How to request</h2>
      <p>Email us with your order details and we&rsquo;ll process your refund within a few business days.</p>
    </LegalPage>
  );
}
