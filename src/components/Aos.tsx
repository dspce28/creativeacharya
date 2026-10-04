"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

// Minimal AOS replacement with the template's settings:
// once: false, offset: 0, anchorPlacement "top-bottom".
// Elements animate in when their top crosses the viewport bottom and
// animate back out when scrolled back above it.
// Mounted last on the page so every section's [data-aos] node exists.
export default function Aos() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-aos]"));
    const triggers = els.map((el) => {
      const delay = el.dataset.aosDelay;
      const duration = el.dataset.aosDuration;
      if (delay) el.style.transitionDelay = `${delay}ms`;
      if (duration) el.style.transitionDuration = `${duration}ms`;
      return ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        onEnter: () => el.classList.add("aos-animate"),
        onLeaveBack: () => el.classList.remove("aos-animate"),
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      triggers.forEach((t) => t.kill());
      window.removeEventListener("load", refresh);
    };
  }, []);
  return null;
}
