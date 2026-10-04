"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Asterisk } from "@/lib/icons";

// Infinite text marquee (filled / outlined words + spinning lime stars).
// Speeds up with scroll velocity and flips direction with scroll direction.
export default function Marquee({ items }: { items: string[] }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current!;
    let x = 0;
    let dir = -1;
    let boost = 0;
    const tick = () => {
      const half = el.scrollWidth / 2;
      x += dir * (1 + boost);
      boost *= 0.92;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      el.style.transform = `translate3d(${x}px,0,0)`;
    };
    gsap.ticker.add(tick);
    const st = ScrollTrigger.create({
      trigger: el,
      onUpdate: (s) => {
        dir = s.direction === 1 ? -1 : 1;
        boost = Math.min(Math.abs(s.getVelocity()) / 150, 14);
      },
    });
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
    };
  }, []);

  const row = (k: string) =>
    items.map((t, i) => (
      <span className="marquee__item" key={k + i}>
        <span className="word">{t}</span>
        <Asterisk />
      </span>
    ));

  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track" ref={track}>
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
