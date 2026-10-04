"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { site } from "@/lib/content";
import { ArrowUpRight } from "@/lib/icons";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const h = header.current!;
      h.classList.toggle("is-scrolled", y > 40);
      h.classList.toggle("is-hidden", y > last && y > 300 && !open);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const m = menu.current!;
    // context.revert() restores inline styles, so StrictMode's double-mount
    // doesn't leave the second timeline tweening from an already-applied state
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(m, { visibility: "visible" })
        .to(m, { clipPath: "circle(150% at calc(100% - 60px) 42px)", duration: 0.9, ease: "power3.inOut" })
        .fromTo(m.querySelectorAll(".menu__links a"), { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.07, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .fromTo(m.querySelector(".menu__foot"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4");
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (open) {
      tl.current?.timeScale(1).play();
      window.__lenis?.stop();
    } else {
      tl.current?.timeScale(1.6).reverse();
      window.__lenis?.start();
    }
  }, [open]);

  return (
    <>
      <header className="header" ref={header}>
        <div className="container header__inner">
          <a href="#top" className="logo" aria-label={site.name} onClick={() => setOpen(false)}>
            <span className="logo__mark">
              <img src="/images/brand/logo-mark.webp" alt="" />
            </span>
            Creative Acharya
          </a>
          <nav className="nav" aria-label="Primary">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                <span>{l.label}</span>
                <span aria-hidden>{l.label}</span>
              </a>
            ))}
          </nav>
          <div className="header__right">
            <a href="#contact" className="btn btn--solid header__cta">
              Let&apos;s Talk <ArrowUpRight />
            </a>
            <button
              className={`burger ${open ? "is-open" : ""}`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <i />
              <i />
            </button>
          </div>
        </div>
      </header>

      <div className="menu" ref={menu} aria-hidden={!open}>
        <nav className="menu__links">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <small>0{i + 1}</small>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <a href={site.phoneHref} tabIndex={open ? 0 : -1}>{site.phone}</a>
          <a href={`mailto:${site.email}`} tabIndex={open ? 0 : -1}>{site.email}</a>
          <a href={site.instagram} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>Instagram</a>
          <a href={site.facebook} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>Facebook</a>
        </div>
      </div>
    </>
  );
}
