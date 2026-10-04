"use client";

import dynamic from "next/dynamic";
import { services, servicesIntro } from "@/lib/content";
import { Camera, Check, Film, Pen, Share } from "@/lib/icons";
import Btn from "./Btn";
import CharTitle from "./CharTitle";
import Spiro from "./Spiro";

const Chrome3D = dynamic(() => import("./Chrome3D"), { ssr: false });
const ICONS = [Camera, Pen, Share, Film];

export default function Services() {
  return (
    <section className="services pt-120" id="services">
      <Spiro className="services__spiro" />
      <div className="container">
        <div className="services__head">
          <div>
            <CharTitle lines={[servicesIntro.title.join(" ")]} />
            <p>{servicesIntro.text}</p>
            <Btn href="#contact" variant="outline">
              Explore More
            </Btn>
          </div>
          <div className="services__shape">
            <Chrome3D variant="rings" />
          </div>
        </div>

        <div className="services__grid">
          {services.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <article className="service-card" key={s.title} data-aos="fade-up" data-aos-duration="1000" data-aos-delay={200 + i * 100}>
                <Icon className="service-card__icon" />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>
                      <Check />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
