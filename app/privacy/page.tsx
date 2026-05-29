import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="TODO">
      <p>We respect your privacy. This policy explains what we collect and how we use it.</p>
      <h2>What we collect</h2>
      <p>Your email and any details you share at checkout or via the contact form, plus standard analytics (Meta Pixel, Google Analytics) to understand how the site is used.</p>
      <h2>How we use it</h2>
      <p>To deliver your digital products, provide support, and improve our books and website. We do not sell your data.</p>
      <h2>Your choices</h2>
      <p>You can decline analytics cookies via the consent banner, and request deletion of your data by emailing us.</p>
    </LegalPage>
  );
}
