"use client";
import { useEffect, useState } from "react";

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("eyg_consent")) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  function decide(granted: boolean) {
    try {
      localStorage.setItem("eyg_consent", granted ? "granted" : "denied");
    } catch {}
    if (window.gtag) {
      const v = granted ? "granted" : "denied";
      window.gtag("consent", "update", {
        ad_storage: v,
        ad_user_data: v,
        ad_personalization: v,
        analytics_storage: v,
      });
    }
    setShow(false);
  }

  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] safe-bottom">
      <div className="container-page mb-3">
        <div className="rounded-card bg-forest text-white shadow-card p-4 md:flex md:items-center md:gap-4">
          <p className="small mb-3 md:mb-0 md:flex-1">
            We use cookies to measure ad performance and improve your experience.
          </p>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => decide(false)}
              className="min-h-[44px] px-4 rounded-lg border border-white/40 text-white text-sm"
            >
              Decline
            </button>
            <button
              onClick={() => decide(true)}
              className="min-h-[44px] px-4 rounded-lg bg-cta hover:bg-cta-hover text-white text-sm font-semibold"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
