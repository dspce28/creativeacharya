"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { site } from "@/lib/content";
import { Play } from "@/lib/icons";
import Lightbox from "./Lightbox";

export default function Reel() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".reel", { scale: 0.82, borderRadius: 80 }, { scale: 1, borderRadius: 32, ease: "none", scrollTrigger: { trigger: ".reel", start: "top bottom", end: "center center", scrub: true } });
      gsap.fromTo(".reel__bg", { yPercent: -10 }, { yPercent: 10, ease: "none", scrollTrigger: { trigger: ".reel", start: "top bottom", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  // magnetic play button
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const b = e.currentTarget.querySelector<HTMLElement>(".reel__play")!;
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25, duration: 0.6, ease: "power3" });
  };
  const onLeave = (e: React.PointerEvent<HTMLElement>) =>
    gsap.to(e.currentTarget.querySelector(".reel__play"), { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,0.4)" });

  const hasEmbed = Boolean(site.showreelEmbed);

  return (
    <section className="section" ref={root} style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="reel" onPointerMove={onMove} onPointerLeave={onLeave}>
          <div className="reel__bg">
            <img src="/images/brand/editing.webp" alt="" loading="lazy" />
          </div>
          {hasEmbed ? (
            <button className="reel__play" aria-label="Play showreel" onClick={() => setOpen(true)} data-cursor-label="Play">
              <Play />
            </button>
          ) : (
            <a className="reel__play" href={site.instagram} target="_blank" rel="noreferrer" aria-label="Watch reels on Instagram" data-cursor-label="Watch">
              <Play />
            </a>
          )}
          <div className="reel__label">
            <small>Showreel · Reels · Campaigns</small>
            Watch the <span className="gradient-text">reel</span>
          </div>
        </div>
      </div>
      {open && <Lightbox video onClose={() => setOpen(false)} />}
    </section>
  );
}
