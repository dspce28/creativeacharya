// Single source of truth for site copy and media.
//
// Copy marked "from Canva" is Chirag's own text from creativeacharya.my.canva.site.
// Anything marked TODO is a stand-in that must be confirmed or replaced before
// the site is shared widely (numbers, testimonials, portfolio images).

export const site = {
  name: "Creative Acharya",
  person: "Chirag Acharya",
  tagline: "Splash of Visual Magic",
  url: "https://creativeacharya.vercel.app",
  phone: "+91 8485 956 974",
  phoneHref: "tel:+918485956974",
  email: "creativeacharya@gmail.com",
  whatsapp: "https://wa.me/qr/RJE5JIBTPLEYA1",
  instagram: "https://www.instagram.com/creativeacharya/",
  facebook: "https://www.facebook.com/creativeacharya/",
  handle: "@creativeacharya",
  // Set to a YouTube/Vimeo embed URL to play the showreel in a modal.
  // While empty, the play button opens Instagram.
  showreelEmbed: "",
};

export const nav = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#stories", label: "Stories" },
  { href: "#contact", label: "Contacts" },
];

// TODO: confirm every number with Chirag before sharing the site.
export const stats = {
  projects: { value: 150, suffix: "+", label: ["Completed", "Projects"] },
  happyClients: 32,
  experience: { value: 5, suffix: "+", label: ["Years of", "Experience"] },
  counters: [
    { value: 5, suffix: "+", label: ["Years of", "Experience"] },
    { value: 150, suffix: "+", label: ["Projects", "Delivered"] },
    { value: 1, suffix: "M+", label: ["Views on", "Reels"] },
    { value: 100, suffix: "%", label: ["Passion in", "Every Frame"] },
  ],
};

export const banner = {
  words: ["CREATIVE", "ACHARYA"],
  text: "Photographer, videographer & visual storyteller — helping brands and individuals express their true identity with style, emotion, and authenticity.",
};

export const about = {
  title: ["About", "Acharya"],
  // from Canva
  text: "Hi, I’m Chirag Acharya — a multidisciplinary creative professional with a passion for turning ideas into powerful visuals and experiences. I work across photography, graphic design and digital content creation, bringing a mix of artistry and strategy into everything I do.",
  // from Canva
  lead: "I specialize in cinematic and creative storytelling and impactful visuals that connect with people",
  tools: ["Lightroom", "Photoshop", "Premiere Pro", "After Effects", "DaVinci Resolve", "Illustrator", "Canva", "Final Cut Pro", "CapCut", "Figma"],
};

export const video = {
  title: ["Capturing emotion through", "the lens, frame by frame."],
  image: "/images/brand/editing.webp",
};

export const servicesIntro = {
  title: ["What", "I Do"],
  // from Canva
  text: "I help brands and individuals tell their stories through visuals, design, and strategy. Here’s how I can bring your vision to life.",
};

// Titles and descriptions from Canva; bullet points summarise each line.
export const services = [
  {
    title: "Photography & Videography",
    text: "From cinematic portraits to brand shoots, I capture visuals that connect emotionally and look stunning on every platform.",
    points: ["Cinematic portraits", "Brand & product shoots", "Events & films"],
  },
  {
    title: "Creative Designing",
    text: "From branding and social media creatives to custom website design — visually stunning, user-friendly and aligned with your identity.",
    points: ["Logo & brand identity", "Social media creatives", "Website design"],
  },
  {
    title: "Social Media Management",
    text: "I create and manage content that grows your presence online — from planning and posting to engagement and analytics.",
    points: ["Content calendars", "Posting & engagement", "Analytics & growth"],
  },
  {
    title: "Content Creation & Strategy",
    text: "I craft engaging videos, reels, and visual campaigns designed to grab attention and tell your story effectively.",
    points: ["Reels & short films", "Visual campaigns", "Storytelling strategy"],
  },
];

export const marquee = ["Photography", "Videography", "Cinematic", "Design", "Reels", "Branding", "Content"];

// TODO: placeholder images (picsum.photos / Unsplash licence) — replace with Chirag's work.
export const projects = [
  { title: "Cinematic Portrait Sessions", tags: ["Photography", "Portrait"], image: "/images/work/w1027.webp" },
  { title: "Live Music & Event Coverage", tags: ["Videography", "Event"], image: "/images/work/w453.webp" },
  { title: "Golden Hour Brand Story", tags: ["Brand Shoot", "Film"], image: "/images/work/w65.webp" },
  { title: "Product Shoot for Lifestyle Brand", tags: ["Product", "Design"], image: "/images/work/w26.webp" },
];

// TODO: replace with real client testimonials. Shown as placeholders.
export const testimonials = {
  clientsLine: ["Trusted by brands, couples", "and creators alike"],
  rating: "5.0",
  ratingLabel: "Client rating",
  image: "/images/brand/chirag-studio.webp",
  items: [
    {
      quote: "Chirag has an eye for light and emotion. The portraits felt cinematic and completely us — every frame told a story.",
      name: "Client Name",
      role: "Portrait Session",
    },
    {
      quote: "From planning the shoot to delivering reels, everything was smooth. Our brand finally looks the way we always imagined.",
      name: "Client Name",
      role: "Brand Shoot",
    },
    {
      quote: "Creative, patient and super quick with edits. The content grew our Instagram engagement within weeks.",
      name: "Client Name",
      role: "Social Media",
    },
  ],
};

export const team = {
  title: ["Meet the", "Creator", "Behind the Lens"],
  members: [
    { name: "Chirag Acharya", role: "Photographer", image: "/images/brand/chirag-cutout.webp", cutout: true },
    { name: "Videography", role: "Films & Reels", image: "/images/brand/lens.webp" },
    { name: "Design", role: "Brand & Social Creatives", image: "/images/brand/desk.webp" },
    { name: "Content", role: "Strategy & Editing", image: "/images/brand/editing.webp" },
  ],
};

export const contact = {
  title: ["Contact Me", "For Your Project"],
  // from Canva
  text: "Have a project in mind, or just want to say hi? I’m always excited to collaborate on photography, design, or social media projects that bring ideas to life.",
};

// Instagram-style story cards (no blog yet). TODO: replace images with real posts.
export const stories = [
  { image: "/images/work/w64.webp", category: "Portraits", title: "Behind the lens of a cinematic portrait session" },
  { image: "/images/work/w274.webp", category: "Reels", title: "How I plan reels that stop the scroll" },
  { image: "/images/work/w365.webp", category: "Brand", title: "Styling a product shoot from moodboard to final frame" },
];
