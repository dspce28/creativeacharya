"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

// Odometer-style counter (template uses odometer.js): every digit is a
// vertical reel that rolls from 0 to its value when scrolled into view.
export default function Odometer({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);
  const digits = String(value).split("");

  useEffect(() => {
    const st = ScrollTrigger.create({ trigger: ref.current, start: "top bottom", onEnter: () => setOn(true) });
    return () => st.kill();
  }, []);

  return (
    <strong ref={ref} aria-label={`${value}${suffix}`}>
      {digits.map((d, i) => (
        <span className="odo" key={i} aria-hidden>
          <span className="odo__col" style={{ transform: `translateY(${on ? -Number(d) * 1.2 : 0}em)`, transitionDelay: `${i * 0.1}s` }}>
            {Array.from({ length: 10 }).map((_, n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
        </span>
      ))}
      <span aria-hidden>{suffix}</span>
    </strong>
  );
}
