"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { featured, site } from "@/lib/content";
import { ArrowUpRight } from "@/lib/icons";

export default function Showcase() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      const track = el.querySelector<HTMLElement>(".showcase__track")!;
      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          pin: ".showcase__pin",
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (s) => gsap.set(".showcase__progress i", { scaleX: s.progress }),
        },
      });
      // inner image parallax per panel, synced to the horizontal tween
      gsap.utils.toArray<HTMLElement>(".panel img").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -20 },
          { xPercent: 0, ease: "none", scrollTrigger: { trigger: img.parentElement!, containerAnimation: tween, start: "left right", end: "right left", scrub: true } }
        );
      });
      gsap.utils.toArray<HTMLElement>(".panel").forEach((p) => {
        gsap.from(p, { rotation: 4, scale: 0.88, ease: "none", scrollTrigger: { trigger: p, containerAnimation: tween, start: "left right", end: "center center", scrub: true } });
      });
    }, el);
    const ctx = gsap.context(() => {
      gsap.from(".showcase__head > *", { opacity: 0, y: 40, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 75%" } });
    }, el);
    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section className="showcase" id="work" ref={root}>
      <div className="showcase__pin">
        <div className="container showcase__head">
          <div>
            <span className="eyebrow">Selected work</span>
            <h2 className="h2" style={{ marginTop: 16 }}>
              Stories <span className="outline-text">told</span>
              <br />
              in <span className="gradient-text">light</span>
            </h2>
          </div>
          <div className="showcase__progress" aria-hidden>
            <i />
          </div>
        </div>
        <div className="showcase__track">
          {featured.map((w, i) => (
            <article className="panel" key={w.src} data-cursor-label="View">
              <img src={w.src} alt={w.title} loading="lazy" />
              <span className="panel__no">0{i + 1}</span>
              <div className="panel__meta">
                <div>
                  <span>{w.category}</span>
                  <h3>{w.title}</h3>
                </div>
              </div>
            </article>
          ))}
          <a className="panel panel--end" href={site.instagram} target="_blank" rel="noreferrer" data-cursor-label="Follow">
            <div>
              <span className="eyebrow">More on Instagram</span>
              <h3 className="h2" style={{ fontSize: "clamp(32px,4vw,64px)", marginTop: 16 }}>
                {site.handle}
              </h3>
              <span className="btn" style={{ marginTop: 28 }}>
                See the feed <ArrowUpRight />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
