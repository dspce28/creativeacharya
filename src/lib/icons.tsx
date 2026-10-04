type P = { className?: string };

export const ArrowRight = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowLeft = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowUp = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M12 19V5M6 11l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Thin diagonal arrow used as decoration (about / portfolio).
export const LongArrow = ({ className }: P) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M10 90 90 10M40 10h50v50" />
    <path d="M18 96 96 18M46 4h50v50" opacity="0.5" />
  </svg>
);

// Triple chevron "speed arrows" from the template, drawn as SVG.
export const Chevrons = ({ className }: P) => (
  <svg className={className} viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="5" aria-hidden>
    <path d="M10 10 80 80 10 150" />
    <path d="M45 10 115 80 45 150" />
    <path d="M80 10 150 80 80 150" />
  </svg>
);

export const Asterisk = ({ className }: P) => (
  <svg className={className} viewBox="0 0 48 48" fill="currentColor" aria-hidden>
    {Array.from({ length: 12 }).map((_, i) => (
      <rect key={i} x="22.5" y="2" width="3" height="20" rx="1.5" transform={`rotate(${i * 30} 24 24)`} />
    ))}
  </svg>
);

export const Play = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
  </svg>
);

export const Quote = ({ className }: P) => (
  <svg className={className} viewBox="0 0 64 64" fill="currentColor" aria-hidden>
    <path d="M6 34c0-12 7-21 18-24l2 5c-6 2-10 7-10 12h10v21H6V34Zm32 0c0-12 7-21 18-24l2 5c-6 2-10 7-10 12h10v21H38V34Z" />
  </svg>
);

export const Phone = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />
  </svg>
);

export const Mail = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const Whatsapp = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.4.7-2 1-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2Z" />
  </svg>
);

export const Instagram = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

export const Facebook = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z" />
  </svg>
);

export const Camera = ({ className }: P) => (
  <svg className={className} viewBox="0 0 48 48" fill="currentColor" aria-hidden>
    <path d="M6 14h9l3-5h12l3 5h9v26H6V14Zm18 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
  </svg>
);

export const Pen = ({ className }: P) => (
  <svg className={className} viewBox="0 0 48 48" fill="currentColor" aria-hidden>
    <path d="M6 42 10 28 32 6l10 10-22 22L6 42Zm8-12-2 6 6-2-4-4Z" />
  </svg>
);

export const Share = ({ className }: P) => (
  <svg className={className} viewBox="0 0 48 48" fill="currentColor" aria-hidden>
    <circle cx="36" cy="10" r="7" />
    <circle cx="12" cy="24" r="7" />
    <circle cx="36" cy="38" r="7" />
    <path d="m15 21 18-9 1.8 3.6-18 9zM15 27l18 9 1.8-3.6-18-9z" />
  </svg>
);

export const Film = ({ className }: P) => (
  <svg className={className} viewBox="0 0 48 48" fill="currentColor" aria-hidden>
    <path d="M6 8h36v32H6V8Zm4 4v4h4v-4h-4Zm24 0v4h4v-4h-4ZM10 22v4h4v-4h-4Zm24 0v4h4v-4h-4ZM10 32v4h4v-4h-4Zm24 0v4h4v-4h-4ZM18 12v24h12V12H18Z" />
  </svg>
);
