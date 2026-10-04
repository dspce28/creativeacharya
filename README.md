# Creative Acharya — Portfolio

Portfolio site for **Chirag Acharya / Creative Acharya** (photography, videography, design, content).
Built with Next.js (App Router), React Three Fiber / three.js, GSAP (ScrollTrigger + SplitText) and Lenis smooth scroll.
Layout follows the structure of the Agenki agency template, rebuilt from scratch in React.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (what Vercel runs)
```

Deploys on Vercel with zero config — framework preset **Next.js**, no env vars required.

## Sections

| Section | Effect |
| --- | --- |
| Preloader | Camera-iris SVG aperture + counter, curtain wipe |
| Hero | three.js particle "lens" (custom shader) — rings rotate, mouse repels particles, scroll explodes it into a splash; split-text title, rotating badge |
| Marquees | Infinite, speed reacts to scroll velocity |
| About | Scroll-scrubbed word highlight, clip-path image reveal, parallax splash |
| Services | Hover rows with a floating image that follows the cursor |
| Selected work | Pinned horizontal scroll with per-panel parallax (native swipe on mobile) |
| Showreel | Scroll-scaled card, magnetic play button |
| Gallery | WebGL 3D carousel — drag / scroll to spin, RGB-shift on velocity, category filters, click → lightbox |
| Process | 3D tilt cards with pointer spotlight |
| Contact | Magnetic headline, contact cards, enquiry form (opens the visitor's mail app) |

Plus: custom cursor with contextual labels, film grain, scroll progress bar, fullscreen menu, `prefers-reduced-motion` support.

## Editing content

All copy, contact details and image lists live in **`src/lib/content.ts`**.

### ⚠️ Replace the placeholder portfolio

The Canva site only contained Chirag's portraits, logo and a splash graphic — no portfolio shots.
Every entry in `works` marked `placeholder: true` is a royalty-free stand-in from picsum.photos/Unsplash.
To swap them:

1. Drop real photos into `public/images/work/` (landscape ~1200px wide, `.webp` or `.jpg`).
2. Update the `works` array in `src/lib/content.ts` (`src`, `title`, `category`) and delete `placeholder: true`.
3. `featured` (the horizontal strip) picks from `works` by index.

### Showreel

Set `site.showreelEmbed` to a YouTube/Vimeo **embed** URL to play it in a modal.
While empty, the play button links to Instagram.

### Real assets used

`public/images/brand/` — Chirag's portrait cutout & studio portrait, signature logo and splash graphic (from the Canva site).
`lens/desk/social/editing.webp` are the stock images the Canva site used for the services.
