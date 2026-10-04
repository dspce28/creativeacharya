"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { works, type Work } from "@/lib/content";
import Lightbox from "./Lightbox";

const GalleryScene = dynamic(() => import("./GalleryScene"), { ssr: false });

const FILTERS = ["All", "Portrait", "Cinematic", "Event", "Travel", "Brand"] as const;

export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  const scroll = useRef(0);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [open, setOpen] = useState<Work | null>(null);
  const [visible, setVisible] = useState(false);

  const list = useMemo(() => (filter === "All" ? works : works.filter((w) => w.category === filter)), [filter]);
  // keep the ring readable when a filter only has a few images
  const ring = useMemo(() => (list.length >= 6 ? list : [...list, ...list, ...list].slice(0, Math.max(6, list.length))), [list]);
  const ringKeyed = useMemo(() => ring.map((w, i) => ({ ...w, src: w.src + (i >= list.length ? `?r=${i}` : "") })), [ring, list.length]);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: root.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (s) => (scroll.current = s.progress),
      onToggle: (s) => s.isActive && setVisible(true),
    });
    const ctx = gsap.context(() => {
      gsap.from(".gallery__title > *", { opacity: 0, y: 40, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 70%" } });
    }, root);
    return () => {
      st.kill();
      ctx.revert();
    };
  }, []);

  const close = useCallback(() => setOpen(null), []);

  return (
    <section className="gallery" id="gallery" ref={root}>
      <div className="gallery__canvas">{visible && <GalleryScene works={ringKeyed} scroll={scroll} onOpen={setOpen} />}</div>
      <div className="gallery__ui">
        <div className="gallery__title container">
          <span className="eyebrow">Visual archive</span>
          <h2 className="h2">
            Frames in <span className="gradient-text">motion</span>
          </h2>
        </div>
        <div>
          <div className="gallery__filters" role="tablist" aria-label="Filter gallery">
            {FILTERS.map((f) => (
              <button key={f} role="tab" aria-selected={filter === f} className={filter === f ? "is-active" : ""} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
          <p className="gallery__hint">Drag to spin · Click to view</p>
        </div>
      </div>
      {open && <Lightbox work={open} onClose={close} />}
    </section>
  );
}
