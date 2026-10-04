"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { projects, site } from "@/lib/content";
import { Chevrons } from "@/lib/icons";

// Template portfolio: "PORTFOLIO / PROJECTS" header, then full-bleed image
// panels that pin at 20% from the top and shrink to 0.8 as the stack scrolls
// (custom-gsap.js #04: pin + scale .8, scrub 1, end at the panel area bottom).
export default function Portfolio() {
  const area = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.utils.toArray<HTMLElement>(".portfolio-panel", area.current).forEach((panel) => {
        gsap.fromTo(
          panel,
          { scale: 1 },
          {
            scale: 0.8,
            ease: "none",
            scrollTrigger: { trigger: panel, start: "top 20%", endTrigger: area.current, end: "bottom 100%", scrub: 1 },
          }
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <div className="portfolio__top">
          <h3>Portfolio</h3>
          <h2>Projects</h2>
          <Chevrons className="portfolio__arrow bounce-x" />
        </div>
        <div className="portfolio-area" ref={area}>
          {projects.map((p, i) => (
            <article className="portfolio-panel" key={p.title} data-cursor="View">
              <div className="portfolio-panel__bg">
                <img src={p.image} alt="" loading="lazy" />
              </div>
              <div>
                <span className="portfolio-panel__no">#{i + 1}</span>
              </div>
              <div>
                <div className="portfolio-panel__tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <h3>
                  <a href={site.instagram} target="_blank" rel="noreferrer">
                    {p.title}
                  </a>
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
