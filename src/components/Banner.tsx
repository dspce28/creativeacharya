import { banner, site, stats } from "@/lib/content";
import { Asterisk, Chevrons } from "@/lib/icons";
import Btn from "./Btn";

// Template banner: photo card top-left, stats card tucked under its corner,
// huge condensed title overlapping the photo, sticker figure beside the
// title, rotating badge + bouncing chevrons and the intro text on the right.
// Like the template, it relies on the preloader for its entrance.
export default function Banner() {
  return (
    <section className="banner" id="top">
      <div className="container-fluid banner__wrap">
        <div className="banner__left">
          <div className="banner__thumb">
            <img src="/images/brand/chirag-studio.webp" alt="Chirag Acharya — Creative Acharya" />
          </div>

          <div className="review-card">
            <div className="review-card__num">
              <strong>
                {stats.projects.value}
                {stats.projects.suffix}
              </strong>
              <span>
                {stats.projects.label[0]}
                <br />
                {stats.projects.label[1]}
              </span>
            </div>
            <div className="avatars">
              {["w1027", "w64", "w399"].map((a) => (
                <span key={a}>
                  <img src={`/images/work/${a}.webp`} alt="" />
                </span>
              ))}
              <span className="more">{stats.happyClients}+</span>
            </div>
          </div>

          <h1 className="banner__title">
            <span className="l1">{banner.words[0]}</span>
            <span className="l2">{banner.words[1]}</span>
          </h1>

          <div className="banner__sticker">
            <img src="/images/brand/chirag-cutout.webp" alt="" />
          </div>
        </div>

        <div className="banner__right">
          <div className="about-badge">
            <a href="#about" className="circle-text" aria-label="About me">
              <svg className="ring" viewBox="0 0 135 135" aria-hidden>
                <defs>
                  <path id="aboutCircle" d="M67.5,67.5 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" />
                </defs>
                <text>
                  <textPath href="#aboutCircle">About me • About me • About me •</textPath>
                </text>
              </svg>
              <Asterisk className="star" />
            </a>
            <Chevrons className="chevrons bounce-x" />
          </div>
          <div>
            <p className="banner__text">{banner.text}</p>
            <Btn href="#about">Explore More</Btn>
          </div>
        </div>
      </div>
      <span hidden>{site.name}</span>
    </section>
  );
}
