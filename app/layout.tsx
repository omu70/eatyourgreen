import type { Metadata } from "next";
import { poppins, inter } from "./fonts";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/sections/Footer";
import PageViewTracker from "@/components/PageViewTracker";
import VisitTracker from "@/components/VisitTracker";
import MetaPixel from "@/components/analytics/MetaPixel";
import GA4 from "@/components/analytics/GA4";
import GTM from "@/components/analytics/GTM";
import ConsentBanner from "@/components/analytics/ConsentBanner";
import { SITE } from "@/lib/seo";
import HideOnAdmin from "@/components/HideOnAdmin";
import LeadPopup from "@/components/LeadPopup";
import WhatsAppSupport from "@/components/WhatsAppSupport";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "End Mealtime Battles — Get Your Child Eating Greens | Eat Your Green",
    template: "%s | Eat Your Green",
  },
  description:
    "Two gentle, pressure-free digital books that help moms get picky eaters (ages 2–12) curious about greens — without tears, bribes, or guilt. Instant download, 28-day money-back guarantee.",
  keywords: [
    "picky eater",
    "get kids to eat vegetables",
    "gentle parenting feeding",
    "fussy eater help",
    "kids eat greens",
    "kids recipe book",
  ],
  alternates: { canonical: SITE.url },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: "End Mealtime Battles — Get Your Child Eating Greens",
    description:
      "Two gentle, pressure-free books that help moms turn “yuck” into “yes.” Instant download. 28-day money-back guarantee.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Eat Your Green" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "End Mealtime Battles — Get Your Child Eating Greens",
    description: "Two gentle, pressure-free books that help moms turn “yuck” into “yes.”",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <GTM />
        <GA4 />
        <MetaPixel />
        <PageViewTracker />
        <VisitTracker />
        <SiteHeader />
        {children}
        <HideOnAdmin>
          <Footer />
          <ConsentBanner />
          <LeadPopup />
          <WhatsAppSupport />
        </HideOnAdmin>
      </body>
    </html>
  );
}
