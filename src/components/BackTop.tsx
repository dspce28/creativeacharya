"use client";

import { useEffect, useRef } from "react";
import { ArrowUp } from "@/lib/icons";

const R = 25;
const C = 2 * Math.PI * R;

export default function BackTop() {
  const btn = useRef<HTMLAnchorElement>(null);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      ring.current!.style.strokeDashoffset = String(C * (1 - p));
      btn.current!.classList.toggle("is-visible", window.scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a href="#top" className="back-top" ref={btn} aria-label="Back to top">
      <svg className="progress" viewBox="0 0 52 52" aria-hidden>
        <circle ref={ring} cx="26" cy="26" r={R} strokeDasharray={C} strokeDashoffset={C} />
      </svg>
      <ArrowUp className="arrow" />
    </a>
  );
}
