"use client";

import { nav, services, site } from "@/lib/content";
import { Mail, Phone, Whatsapp } from "@/lib/icons";
import Btn from "./Btn";
import { Logo, Socials } from "./Header";

export default function Footer() {
  // No newsletter backend: the field opens a pre-filled email to Chirag.
  const subscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Keep me posted")}&body=${encodeURIComponent(`Please add ${email} to your updates.`)}`;
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <Logo />
          <div className="footer__news">
            <h3>Get updates on new shoots</h3>
            <form onSubmit={subscribe}>
              <input name="email" type="email" placeholder="Email..." required aria-label="Email" />
              <Btn type="submit" size="sm">
                Subscribe
              </Btn>
            </form>
            <small>No spam — just new work and availability.</small>
          </div>
        </div>
        <div className="footer__cols">
          <div>
            <h4>Services</h4>
            <ul>
              {services.map((s) => (
                <li key={s.title}>
                  <a href="#services">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__contact">
            <h4>Get in Touch</h4>
            <ul className="info-list">
              <li>
                <span className="ico">
                  <Phone />
                </span>
                <div>
                  <small>Call Me</small>
                  <a href={site.phoneHref}>{site.phone}</a>
                </div>
              </li>
              <li>
                <span className="ico">
                  <Whatsapp />
                </span>
                <div>
                  <small>WhatsApp</small>
                  <a href={site.whatsapp} target="_blank" rel="noreferrer">
                    Chat with me
                  </a>
                </div>
              </li>
              <li>
                <span className="ico">
                  <Mail />
                </span>
                <div>
                  <small>Email</small>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>
            © <b>Creative Acharya</b> {new Date().getFullYear()}. All rights reserved.
          </p>
          <Socials />
        </div>
      </div>
    </footer>
  );
}
