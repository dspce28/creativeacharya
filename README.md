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

Mirrors the Agenki template home page, section for section, rebuilt in React
(no template code or demo images are used — the template is a paid ThemeForest item).
Type sizes and animation timings were measured from the live template at 1440px:
headings use League Gothic at 0.9x the template's Mango Grotesque sizes (same cap
height and set width); reveals use the template's AOS settings (fade-up 100px, 1s,
replay on scroll back) and its GSAP char/pin/scrub parameters.

| Section | Effect |
| --- | --- |
| Preloader | Letter wave + camera-aperture + live % counter, then the curved SVG curtain lifts away |
| Header / offcanvas | Rolling-text menu, active-section highlight, hide-on-scroll, slide-in sidebar |
| Banner | Huge split-char title over Chirag's photo (clip reveal), stats card, spinning "About me" badge |
| About | Char-by-char titles, live three.js chrome ball, count-up, tools grid |
| Video area | Parallax background, scroll-lit headline, spinning showreel button |
| Services | three.js chrome rings, notched cards with lime fill on hover |
| Marquee | Filled / outlined words, reacts to scroll speed & direction |
| Portfolio | Sticky stacked cards that shrink and dim as the next slides over |
| Testimonials | Auto-advancing slider *(placeholder quotes — replace)* |
| Counters + team | Live three.js silk shader background, count-ups, arch portraits |
| Contact | Lime section, enquiry form → visitor's mail app |
| Stories | Instagram-linked cards |
| CTA | "LET'S WORK / TOGETHER" rows drifting in opposite directions |
| Footer | Newsletter (mailto), services, links, contact, socials, progress-ring back-to-top |

Buttons use a position-aware hover fill (grows from where the pointer enters).
Brand accent is the template's lime — change `--main` in `src/app/globals.css` to switch to Chirag's blue `#008ee9`.

## Editing content

All copy, contact details and image lists live in **`src/lib/content.ts`**.

### ⚠️ Replace the placeholder portfolio

The Canva site only contained Chirag's portraits, logo and a splash graphic — no portfolio shots.
`projects`, `stories`, testimonials and the numbers in `stats` are marked TODO in `src/lib/content.ts` — images are royalty-free stand-ins (picsum.photos/Unsplash), quotes and numbers are placeholders.
To swap them:

1. Drop real photos into `public/images/work/` (landscape ~1200px wide, `.webp` or `.jpg`).
2. Update `projects` / `stories` in `src/lib/content.ts`.
3. Confirm `stats` and replace `testimonials` with real ones.

### Showreel

Set `site.showreelEmbed` to a YouTube/Vimeo **embed** URL to play it in a modal.
While empty, the play button links to Instagram.

### Real assets used

`public/images/brand/` — Chirag's portrait cutout & studio portrait, signature logo and splash graphic (from the Canva site).
`lens/desk/social/editing.webp` are the stock images the Canva site used for the services.
