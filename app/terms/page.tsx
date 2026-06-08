import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <LegalPage title="Terms & Conditions" updated="8 June 2026">
      <p>
        This website is operated by Kiaan Creations under the brand &ldquo;Eat Your Green&rdquo;. By
        purchasing or using our digital books, you agree to these terms.
      </p>
      <h2>Digital products</h2>
      <p>
        Our books, bundles and printables are delivered as instant digital downloads for your personal,
        non-commercial use. Please don&rsquo;t copy, redistribute or resell them.
      </p>
      <h2>Payments</h2>
      <p>
        Payments are processed securely by Razorpay. All prices are shown in Indian Rupees (INR) and
        include applicable taxes unless stated otherwise.
      </p>
      <h2>Delivery</h2>
      <p>
        Because the products are digital, there is no physical shipping. Your download is unlocked on
        the thank-you page immediately after a successful payment, and we also share it on WhatsApp/email
        on request. See the Shipping &amp; Delivery note in our Refund Policy for details.
      </p>
      <h2>Refunds</h2>
      <p>See our Cancellation &amp; Refund Policy for the 28-day money-back guarantee.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India.</p>
    </LegalPage>
  );
}
