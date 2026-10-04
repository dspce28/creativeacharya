"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { site, video } from "@/lib/content";
import { Chevrons, Play } from "@/lib/icons";
import CharTitle from "./CharTitle";
import Lightbox from "./Lightbox";

// Template video area: a glass capsule hangs from the top edge; the play
// button slides down it while you scroll (custom-gsap.js #19, scrub 2).
export default function VideoArea() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: ".video-button", start: "top 80%", end: "bottom 20%", scrub: 2 } })
        .fromTo(".video-button", { y: 0, opacity: 0 }, { y: 170, opacity: 1, duration: 1.6 });
    }, root);
    return () => ctx.revert();
  }, []);

  const hasEmbed = Boolean(site.showreelEmbed);

  return (
    <section className="video-area" ref={root}>
      <div className="container video-area__inner">
        <div className="video-wrap">
          {hasEmbed ? (
            <button className="video-button" onClick={() => setOpen(true)} aria-label="Play showreel">
              <Play />
            </button>
          ) : (
            <a className="video-button" href={site.instagram} target="_blank" rel="noreferrer" aria-label="Watch reels on Instagram">
              <Play />
            </a>
          )}
        </div>
        <CharTitle lines={video.title} />
      </div>
      <div className="video-chev bounce-y">
        <Chevrons />
      </div>
      {open && <Lightbox onClose={() => setOpen(false)} />}
    </section>
  );
}
