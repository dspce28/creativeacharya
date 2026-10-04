"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Chevrons } from "@/lib/icons";
import Magnet from "./Magnet";

// Template CTA (custom-gsap.js #07): line 1 drifts 10% → -15%, line 2
// -10% → 10%, scrubbed across the section.
export default function Cta() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top 100%", end: "bottom 20%", scrub: true, invalidateOnRefresh: true };
      gsap.fromTo(".cta-1", { x: "10%" }, { x: "-15%", ease: "none", scrollTrigger: st });
      gsap.fromTo(".cta-2", { x: "-10%" }, { x: "10%", ease: "none", scrollTrigger: st });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="cta" ref={root}>
      <div className="container" style={{ position: "relative" }}>
        <h3 className="cta-1">Let’s Work</h3>
        <div className="cta__row2">
          <Chevrons className="cta__arrows bounce-x" />
          <h2 className="cta-2">Together</h2>
        </div>
        <div className="cta__btn">
          <Magnet href="#contact" solid>
            Book a Shoot
          </Magnet>
        </div>
      </div>
    </section>
  );
}
