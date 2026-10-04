import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Showcase from "@/components/Showcase";
import Reel from "@/components/Reel";
import Gallery from "@/components/Gallery";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <div className="grain" aria-hidden />
      <Header />
      <main>
        <Hero />
        <Marquee items={["Photography", "Videography", "Cinematic Portraits", "Brand Shoots", "Reels"]} />
        <Marquee items={["Creative Design", "Social Media", "Content Strategy", "Storytelling"]} alt reverse />
        <About />
        <Services />
        <Showcase />
        <Reel />
        <Gallery />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
