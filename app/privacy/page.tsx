import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="8 June 2026">
      <p>
        Eat Your Green (operated by Kiaan Creations) respects your privacy. This policy explains what we
        collect and how we use it.
      </p>
      <h2>What we collect</h2>
      <p>
        The email address and any details you share at checkout or via the contact form, and standard
        analytics (such as Meta Pixel and Google Analytics) to understand how the site is used. Card and
        UPI details are entered directly with our payment provider, Razorpay — we never see or store
        them.
      </p>
      <h2>How we use it</h2>
      <p>
        To deliver your digital products, send your download and order confirmation, provide support, and
        improve our books and website. We do not sell your data.
      </p>
      <h2>Your choices</h2>
      <p>
        You can decline non-essential analytics cookies via the consent banner, and you can ask us to
        delete your data at any time via the contact form.
      </p>
    </LegalPage>
  );
}
