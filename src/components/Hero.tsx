"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { site } from "@/lib/content";
import { ArrowUpRight } from "@/lib/icons";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const scroll = useRef(0);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      const split = new SplitText(".hero__title .row-1", { type: "words,chars", charsClass: "char" });
      gsap.set(split.chars, { yPercent: 110, rotation: 8, opacity: 0 });
      gsap.set(".hero__title .row-2 .row", { yPercent: 110 });
      gsap.set(".hero__fade", { y: 30, opacity: 0 });
      gsap.set(".hero__portrait", { y: 120, opacity: 0, scale: 0.92 });

      const off = onReady(() => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to(split.chars, { yPercent: 0, rotation: 0, opacity: 1, duration: 1.4, stagger: 0.035 })
          .to(".hero__title .row-2 .row", { yPercent: 0, duration: 1.4 }, 0.25)
          .to(".hero__portrait", { y: 0, opacity: 1, scale: 1, duration: 1.6 }, 0.2)
          .to(".hero__fade", { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, 0.5);
      });

      // scroll-linked parallax + particle explosion
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (s) => (scroll.current = s.progress),
      });
      gsap.to(".hero__title .row-1", { xPercent: -12, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero__title .row-2", { xPercent: 10, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero__portrait", { yPercent: 18, scale: 1.08, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });

      return () => {
        off();
        split.revert();
      };
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__canvas">
        <HeroScene scroll={scroll} />
      </div>
      <div className="hero__glow" />
      <img className="hero__portrait" src="/images/brand/chirag-cutout.webp" alt="Chirag Acharya, the photographer behind Creative Acharya" />

      <div className="container hero__content">
        <div className="hero__top">
          <span className="eyebrow hero__fade">Welcome to the {site.tagline}</span>
          <p className="hero__tag hero__fade">
            <strong>{site.role}.</strong> Cinematic storytelling and impactful visuals that connect with people.
          </p>
        </div>

        <h1 className="display hero__title" aria-label="Creative Acharya">
          <span className="row row-1 split-line">Creative</span>
          <span className="row-2">
            <span className="split-line">
              <span className="row gradient-text">Acharya</span>
            </span>
          </span>
        </h1>

        <div className="hero__bottom">
          <div className="hero__socials hero__fade">
            <a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={site.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a href={site.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
          <a href="#about" className="circle-badge hero__fade" aria-label="Scroll to explore">
            <svg className="ring" viewBox="0 0 150 150" aria-hidden>
              <defs>
                <path id="circlePath" d="M75,75 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
              </defs>
              <text>
                <textPath href="#circlePath">Scroll to explore • Visual magic • </textPath>
              </text>
            </svg>
            <span className="circle-badge__center">
              <span className="icon-rot">
                <ArrowUpRight />
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
