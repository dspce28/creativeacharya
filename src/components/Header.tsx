"use client";

import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/content";
import { Facebook, Instagram, Mail, Phone, Whatsapp } from "@/lib/icons";
import { useFlair } from "./Btn";

export function Logo() {
  return (
    <a href="#top" className="logo" aria-label={site.name}>
      <span className="logo__mark">
        <img src="/images/brand/logo-mark.webp" alt="" />
      </span>
      <span>
        Creative<b>Acharya</b>
      </span>
    </a>
  );
}

export function Socials() {
  return (
    <div className="socials">
      <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
        <Instagram />
      </a>
      <a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
        <Facebook />
      </a>
      <a href={site.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <Whatsapp />
      </a>
      <a href={`mailto:${site.email}`} aria-label="Email">
        <Mail />
      </a>
    </div>
  );
}

export default function Header() {
  const header = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");
  const flair = useFlair<HTMLAnchorElement>();

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const h = header.current!;
      h.classList.toggle("is-sticky", y > 60);
      h.classList.toggle("is-hidden", y > last && y > 400);
      last = y;
      // highlight the section currently in view
      let cur = "#top";
      for (const n of nav) {
        const el = document.querySelector(n.href);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = n.href;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open]);

  return (
    <>
      <header className="header" ref={header}>
        <div className="container-fluid header__inner">
          <Logo />
          <div className="header__right">
            <nav className="menu" aria-label="Primary">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className={active === n.href ? "is-active" : ""}>
                  <span>{n.label}</span>
                  <span aria-hidden>{n.label}</span>
                </a>
              ))}
            </nav>
            <a className="social-dot" href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram />
            </a>
            <a className="header-btn" href="#contact" onPointerEnter={flair.onPointerEnter} onPointerLeave={flair.onPointerLeave}>
              <span className="flair" />
              Book a Shoot
            </a>
            <button className="hamburger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
              <i />
              <i />
              <i />
            </button>
          </div>
        </div>
      </header>

      <div className={`offcanvas-overlay ${open ? "is-open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`offcanvas ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="offcanvas__top">
          <Logo />
          <button className="offcanvas__close" aria-label="Close menu" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
        <nav className="offcanvas__nav">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              {n.label}
            </a>
          ))}
        </nav>
        <p className="text-muted">Cinematic photography, videography and creative design that help brands and people express their true identity.</p>
        <div>
          <h4>Gallery</h4>
          <div className="offcanvas__gallery">
            {["w1027", "w453", "w65", "w26", "w274", "w64"].map((g) => (
              <img key={g} src={`/images/work/${g}.webp`} alt="" loading="lazy" />
            ))}
          </div>
        </div>
        <div>
          <h4>Contact</h4>
          <ul className="info-list">
            <li>
              <span className="ico">
                <Phone />
              </span>
              <a href={site.phoneHref}>{site.phone}</a>
            </li>
            <li>
              <span className="ico">
                <Mail />
              </span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
        </div>
        <Socials />
      </aside>
    </>
  );
}
