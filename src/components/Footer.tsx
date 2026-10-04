"use client";

import { nav, services, site } from "@/lib/content";
import Btn from "./Btn";
import { ContactList, Logo, Socials } from "./Header";

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
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <Logo />
          </div>
          <div className="footer__news" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
            <h4>Subscribe for new shoots &amp; availability</h4>
            <form onSubmit={subscribe}>
              <input name="email" type="email" placeholder="Email..." required aria-label="Email" />
              <Btn type="submit">Subscribe</Btn>
            </form>
            <p>No spam — just new work and open dates.</p>
          </div>
        </div>
        <div className="footer__cols">
          <div data-aos="fade-up" data-aos-duration="200">
            <h4>My Services</h4>
            <ul>
              {services.map((s) => (
                <li key={s.title}>
                  <a href="#services">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div data-aos="fade-up" data-aos-duration="300">
            <h4>Quick Links</h4>
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div data-aos="fade-up" data-aos-duration="400">
            <ContactList />
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
