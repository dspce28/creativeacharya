"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Odometer-style count-up that starts when the number scrolls into view.
export default function Counter({ value, suffix = "", as: Tag = "strong" }: { value: number; suffix?: string; as?: "strong" | "span" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const o = { v: 0 };
    el.textContent = `0${suffix}`;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () =>
        gsap.to(o, { v: value, duration: 2, ease: "power2.out", onUpdate: () => (el.textContent = `${Math.round(o.v)}${suffix}`) }),
    });
    return () => st.kill();
  }, [value, suffix]);
  return <Tag ref={ref as never}>{`${value}${suffix}`}</Tag>;
}
