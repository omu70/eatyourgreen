import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <LegalPage title="Terms of Service" updated="TODO">
      <p>By purchasing or using our digital books, you agree to these terms.</p>
      <h2>Digital products</h2>
      <p>Our books are delivered as instant digital downloads for your personal, non-commercial use. Please don&rsquo;t redistribute or resell them.</p>
      <h2>Payments</h2>
      <p>Payments are processed securely by our checkout provider. Prices are shown in INR.</p>
      <h2>Refunds</h2>
      <p>See our Refund Policy for our 14-day money-back guarantee.</p>
    </LegalPage>
  );
}
