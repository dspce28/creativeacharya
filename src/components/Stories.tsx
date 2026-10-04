"use client";

import dynamic from "next/dynamic";
import { site, stories } from "@/lib/content";
import { Chevrons } from "@/lib/icons";
import CharTitle from "./CharTitle";

const Chrome3D = dynamic(() => import("./Chrome3D"), { ssr: false });

export default function Stories() {
  return (
    <section className="blog py-120" id="stories">
      <div className="blog__shape">
        <Chrome3D variant="rings" />
      </div>
      <div className="container">
        <div className="blog__head">
          <CharTitle lines={["Latest stories", "from the lens"]} className="center tight" />
          <Chevrons className="blog__arrow bounce-x" />
        </div>
        <div className="blog__grid">
          {stories.map((s, i) => (
            <a className="blog-card" key={s.title} href={site.instagram} target="_blank" rel="noreferrer" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={200 + i * 100}>
              <div className="blog-card__img">
                <img src={s.image} alt="" loading="lazy" />
                <img src={s.image} alt="" loading="lazy" />
              </div>
              <div className="blog-card__meta">
                {site.handle} — <span>{s.category}</span>
              </div>
              <h3>{s.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
