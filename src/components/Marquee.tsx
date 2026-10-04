import { Asterisk } from "@/lib/icons";

// Template marquee: constant-speed loop (Swiper autoplay, linear), words
// alternate filled / outlined, spinning lime stars between them.
export default function Marquee({ items }: { items: string[] }) {
  const row = (k: string) =>
    items.map((t, i) => (
      <span className="marquee__item" key={k + i}>
        <span className="word">{t}</span>
        <Asterisk />
      </span>
    ));
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
