// Thin rotated-ellipse line art standing in for the template's green
// wireframe "bg-shape" PNGs.
export default function Spiro({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-100 -100 200 200" fill="none" stroke="currentColor" strokeWidth="0.35" aria-hidden>
      {Array.from({ length: 36 }).map((_, i) => (
        <ellipse key={i} rx="92" ry="34" transform={`rotate(${i * 5})`} />
      ))}
    </svg>
  );
}
