"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Star } from "@/lib/icons";

// Infinite marquee whose speed and direction react to scroll velocity.
export default function Marquee({ items, alt = false, reverse = false }: { items: string[]; alt?: boolean; reverse?: boolean }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current!;
    const dir = reverse ? 1 : -1;
    let x = 0;
    let boost = 0;
    const half = () => el.scrollWidth / 2;

    const tick = () => {
      x += dir * (0.6 + boost);
      boost *= 0.92;
      const w = half();
      if (x <= -w) x += w;
      if (x >= 0 && dir > 0) x -= w;
      el.style.transform = `translate3d(${x}px,0,0)`;
    };
    if (reverse) x = -half();
    gsap.ticker.add(tick);
    const st = ScrollTrigger.create({
      trigger: el,
      onUpdate: (s) => (boost = Math.min(Math.abs(s.getVelocity()) / 120, 18)),
    });
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
    };
  }, [reverse]);

  const row = (key: string) =>
    items.map((t, i) => (
      <span className="marquee__item" key={`${key}${i}`}>
        {t}
        <Star />
      </span>
    ));

  return (
    <div className={`marquee ${alt ? "marquee--alt" : ""}`} aria-hidden>
      <div className="marquee__track" ref={track}>
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
