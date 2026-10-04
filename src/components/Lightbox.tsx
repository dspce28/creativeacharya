"use client";

import { useEffect } from "react";
import { site } from "@/lib/content";

// Showreel modal. Rendered only when site.showreelEmbed is set.
export default function Lightbox({ onClose }: { video?: boolean; onClose: () => void }) {
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
      <iframe
        className="lightbox__frame"
        src={site.showreelEmbed}
        title="Showreel"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
