// Single source of truth for site copy and media.
// Copy below is taken from creativeacharya.my.canva.site.
// Portfolio images marked `placeholder: true` are royalty-free stand-ins
// (picsum.photos / Unsplash) — replace them with Chirag's own work.

export const site = {
  name: "Creative Acharya",
  person: "Chirag Acharya",
  tagline: "Splash of Visual Magic",
  role: "Photographer · Videographer · Visual Storyteller",
  url: "https://creativeacharya.vercel.app",
  phone: "+91 8485 956 974",
  phoneHref: "tel:+918485956974",
  email: "creativeacharya@gmail.com",
  whatsapp: "https://wa.me/qr/RJE5JIBTPLEYA1",
  instagram: "https://www.instagram.com/creativeacharya/",
  facebook: "https://www.facebook.com/creativeacharya/",
  handle: "@creativeacharya",
  // Set to a YouTube/Vimeo embed URL to play a showreel in the modal.
  // Leave empty to send visitors to Instagram reels instead.
  showreelEmbed: "",
};

export const about = {
  heading: "Who am I",
  intro:
    "Hi, I’m Chirag Acharya — a multidisciplinary creative professional with a passion for turning ideas into powerful visuals and experiences.",
  paragraphs: [
    "I work across photography, graphic design and digital content creation, bringing a mix of artistry and strategy into everything I do. I specialize in cinematic and creative storytelling and impactful visuals that connect with people.",
    "What drives me is the challenge of transforming concepts into experiences — whether it’s capturing emotion through the lens, designing engaging content, or curating an atmosphere with music. I take pride in creating work that’s not just visually appealing, but also deeply connects with audiences.",
  ],
  mission:
    "At the heart of everything I do lies a simple goal: to help brands and individuals express their true identity with style, emotion, and authenticity.",
  skills: ["Cinematic Portraits", "Brand Shoots", "Reels & Edits", "Colour Grading", "Graphic Design", "Social Strategy"],
};

export const services = [
  {
    no: "01",
    title: "Photography & Videography",
    text: "From cinematic portraits to brand shoots, I capture visuals that connect emotionally and look stunning on every platform.",
    image: "/images/brand/lens.webp",
    tags: ["Portraits", "Brand shoots", "Events"],
  },
  {
    no: "02",
    title: "Creative Designing",
    text: "From branding and social media creatives to custom website design, I create designs that are visually stunning, user-friendly, and aligned with your brand’s identity.",
    image: "/images/brand/desk.webp",
    tags: ["Branding", "Creatives", "Web design"],
  },
  {
    no: "03",
    title: "Social Media Management",
    text: "I create and manage content that grows your presence online — from planning and posting to engagement and analytics.",
    image: "/images/brand/social.webp",
    tags: ["Planning", "Posting", "Analytics"],
  },
  {
    no: "04",
    title: "Content Creation & Strategy",
    text: "I craft engaging videos, reels, and visual campaigns designed to grab attention and tell your story effectively.",
    image: "/images/brand/editing.webp",
    tags: ["Reels", "Campaigns", "Storytelling"],
  },
];

export type Work = {
  src: string;
  title: string;
  category: "Portrait" | "Cinematic" | "Event" | "Travel" | "Brand";
  placeholder?: boolean;
};

export const works: Work[] = [
  { src: "/images/work/w1027.webp", title: "Quiet Gaze", category: "Portrait", placeholder: true },
  { src: "/images/work/w453.webp", title: "Stage Lights", category: "Event", placeholder: true },
  { src: "/images/work/w65.webp", title: "Golden Hour", category: "Cinematic", placeholder: true },
  { src: "/images/work/w1011.webp", title: "Still Waters", category: "Travel", placeholder: true },
  { src: "/images/work/w26.webp", title: "Everyday Carry", category: "Brand", placeholder: true },
  { src: "/images/work/w64.webp", title: "Wildflower", category: "Portrait", placeholder: true },
  { src: "/images/work/w274.webp", title: "Neon Nights", category: "Cinematic", placeholder: true },
  { src: "/images/work/w548.webp", title: "Ember", category: "Cinematic", placeholder: true },
  { src: "/images/work/w342.webp", title: "Street Pulse", category: "Event", placeholder: true },
  { src: "/images/work/w177.webp", title: "Summit", category: "Travel", placeholder: true },
  { src: "/images/work/w365.webp", title: "Morning Ritual", category: "Brand", placeholder: true },
  { src: "/images/work/w399.webp", title: "Afterglow", category: "Portrait", placeholder: true },
  { src: "/images/work/w1067.webp", title: "City Rise", category: "Travel", placeholder: true },
  { src: "/images/work/w1035.webp", title: "Rainbow Falls", category: "Cinematic", placeholder: true },
  { src: "/images/work/w494.webp", title: "Light Well", category: "Cinematic", placeholder: true },
  { src: "/images/work/w22.webp", title: "Crossing", category: "Event", placeholder: true },
];

// Featured strip for the pinned horizontal section.
export const featured = [works[0], works[2], works[1], works[4], works[6], works[3]];

export const process = [
  { step: "Discover", text: "We talk through your story, audience and the feeling the visuals should leave behind." },
  { step: "Design", text: "Moodboards, shot lists, locations and looks — every frame planned before the shutter clicks." },
  { step: "Capture", text: "Cinematic direction on set, so the moments feel natural and the light does the talking." },
  { step: "Craft", text: "Edit, colour grade and sound — delivered in formats ready for every platform." },
];
