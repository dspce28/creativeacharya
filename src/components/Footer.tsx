"use client";

import { site } from "@/lib/content";
import { ArrowUp } from "@/lib/icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__row">
          <a href="#top" className="logo">
            <span className="logo__mark">
              <img src="/images/brand/logo-mark.webp" alt="" />
            </span>
            Creative Acharya
          </a>
          <div className="footer__links">
            <a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={site.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a href={site.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href={`mailto:${site.email}`}>Email</a>
          </div>
          <a href="#top" className="to-top" aria-label="Back to top">
            <ArrowUp />
          </a>
        </div>
        <div className="footer__giant" aria-hidden>
          Acharya
        </div>
        <div className="footer__row" style={{ marginTop: 24 }}>
          <p className="footer__copy">© Creative Acharya {new Date().getFullYear()}. All rights reserved.</p>
          <p className="footer__copy">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
