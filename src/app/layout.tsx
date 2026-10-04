import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

const syne = Syne({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-syne", display: "swap" });
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
  themeColor: "#07080d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="is-loading">{children}</body>
    </html>
  );
}
