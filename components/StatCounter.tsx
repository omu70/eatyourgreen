"use client";
import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

export default function StatCounter({
  value,
  suffix = "",
  duration = 1500,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="font-heading font-bold text-leaf">
      {n}
      {suffix}
    </span>
  );
}
