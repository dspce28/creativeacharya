"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Chevrons } from "@/lib/icons";
import { useFlair } from "./Btn";

// "LET'S WORK / TOGETHER" rows drift in opposite directions with scroll
// (template .tw-cta-title-1 / -2), lime circle button in between.
export default function Cta() {
  const root = useRef<HTMLElement>(null);
  const flair = useFlair<HTMLAnchorElement>();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top 100%", end: "bottom 20%", scrub: true, invalidateOnRefresh: true };
      gsap.fromTo(".cta__row--1", { x: "10%" }, { x: "-15%", ease: "none", scrollTrigger: st });
      gsap.fromTo(".cta__row--2", { x: "-10%" }, { x: "10%", ease: "none", scrollTrigger: st });
      gsap.from(".cta__btn .view-circle", { scale: 0, rotation: -90, duration: 1, ease: "back.out(1.8)", scrollTrigger: { trigger: ".cta__btn", start: "top 90%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="cta pb-140 pt-140" ref={root}>
      <div className="cta__row cta__row--1">Let’s Work</div>
      <div className="cta__row cta__row--2">
        <Chevrons className="cta__arrows" />
        Together
      </div>
      <div className="cta__btn">
        <a className="view-circle" href="#contact" onPointerEnter={flair.onPointerEnter} onPointerLeave={flair.onPointerLeave}>
          <span className="flair" />
          Book a
          <br />
          Shoot
        </a>
      </div>
    </section>
  );
}
