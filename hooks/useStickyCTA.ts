"use client";
import { useEffect, useState } from "react";

// Shows sticky CTA after hero scrolls out; hides while pricing section is visible.
export function useStickyCTA(heroId = "hero", pricingId = "pricing") {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    const pricing = document.getElementById(pricingId);
    let heroOut = false;
    let pricingVisible = false;

    const update = () => setShow(heroOut && !pricingVisible);

    const heroObs = new IntersectionObserver(
      ([e]) => {
        heroOut = !e.isIntersecting;
        update();
      },
      { threshold: 0 }
    );
    const priceObs = new IntersectionObserver(
      ([e]) => {
        pricingVisible = e.isIntersecting;
        update();
      },
      { threshold: 0.1 }
    );

    if (hero) heroObs.observe(hero);
    if (pricing) priceObs.observe(pricing);
    return () => {
      heroObs.disconnect();
      priceObs.disconnect();
    };
  }, [heroId, pricingId]);

  return show;
}
