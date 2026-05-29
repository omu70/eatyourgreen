"use client";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID; // TODO: set in .env.local

export default function GA4() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          // Google Consent Mode v2 defaults (denied until banner accept)
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          gtag('config', '${GA_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
