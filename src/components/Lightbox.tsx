"use client";

import { useEffect } from "react";
import type { Work } from "@/lib/content";
import { site } from "@/lib/content";

type Props = { work?: Work | null; video?: boolean; onClose: () => void };

export default function Lightbox({ work, video, onClose }: Props) {
  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    window.__lenis?.stop();
    return () => {
      window.removeEventListener("keydown", key);
      window.__lenis?.start();
    };
  }, [onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="lightbox__close" aria-label="Close" onClick={onClose}>
        ✕
      </button>
      {video ? (
        <iframe
          className="lightbox__frame"
          src={site.showreelEmbed}
          title="Showreel"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          onClick={(e) => e.stopPropagation()}
        />
      ) : work ? (
        <figure onClick={(e) => e.stopPropagation()}>
          <img src={work.src} alt={work.title} />
          <figcaption>
            {work.title}
            <span>{work.category}</span>
          </figcaption>
        </figure>
      ) : null}
    </div>
  );
}
