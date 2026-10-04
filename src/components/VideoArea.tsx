"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { site, video } from "@/lib/content";
import { Chevrons, Play } from "@/lib/icons";
import Lightbox from "./Lightbox";

export default function VideoArea() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".video-area__bg", { yPercent: -12 }, { yPercent: 12, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      // words light up one by one while scrolling (template text reveal)
      gsap.fromTo(
        ".video-area h2 .word",
        { color: "rgba(255,255,255,0.18)" },
        { color: "rgba(255,255,255,1)", stagger: 0.1, ease: "none", scrollTrigger: { trigger: ".video-area h2", start: "top 80%", end: "bottom 40%", scrub: true } }
      );
      gsap.from(".video-btn", { scale: 0, rotation: -180, duration: 1.2, ease: "back.out(1.6)", scrollTrigger: { trigger: ".video-btn", start: "top 85%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  const hasEmbed = Boolean(site.showreelEmbed);
  const ring = (
    <svg className="ring" viewBox="0 0 200 200" aria-hidden>
      <defs>
        <path id="videoCircle" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
      </defs>
      <text>
        <textPath href="#videoCircle">Watch showreel • Watch showreel • Watch showreel •</textPath>
      </text>
    </svg>
  );

  return (
    <section className="video-area" ref={root}>
      <div className="video-area__bg">
        <img src={video.image} alt="" loading="lazy" />
      </div>
      <Chevrons className="video-area__arrow" />
      <div className="container video-area__inner">
        <h2>
          {video.title.split(" ").map((w, i) => (
            <span className="word" key={i}>
              {w}&nbsp;
            </span>
          ))}
        </h2>
        {hasEmbed ? (
          <button className="video-btn" onClick={() => setOpen(true)} aria-label="Play showreel">
            {ring}
            <span className="video-btn__play">
              <Play />
            </span>
          </button>
        ) : (
          <a className="video-btn" href={site.instagram} target="_blank" rel="noreferrer" aria-label="Watch reels on Instagram">
            {ring}
            <span className="video-btn__play">
              <Play />
            </span>
          </a>
        )}
      </div>
      {open && <Lightbox video onClose={() => setOpen(false)} />}
    </section>
  );
}
