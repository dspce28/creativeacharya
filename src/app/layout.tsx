import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — Photographer & Videographer`,
  description:
    "Creative Acharya by Chirag Acharya — cinematic photography, videography, creative design and content strategy that help brands and people express their true identity.",
  keywords: ["Creative Acharya", "Chirag Acharya", "photographer", "videographer", "cinematic portraits", "brand shoots", "reels"],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: "Cinematic photography, videography and creative storytelling by Chirag Acharya.",
    images: ["/images/brand/chirag-studio.webp"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <head>
        {/* Satoshi (Fontshare, free for commercial use) — the template's body font */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" />
      </head>
      <body className="is-loading">{children}</body>
    </html>
  );
}
