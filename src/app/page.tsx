import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import About from "@/components/About";
import VideoArea from "@/components/VideoArea";
import Services from "@/components/Services";
import Marquee from "@/components/Marquee";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import CounterTeam from "@/components/CounterTeam";
import Contact from "@/components/Contact";
import Stories from "@/components/Stories";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import BackTop from "@/components/BackTop";
import Aos from "@/components/Aos";
import { marquee } from "@/lib/content";

// Section order mirrors the Agenki template home page.
export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <Header />
      <main>
        <Banner />
        <About />
        <VideoArea />
        <Services />
        <Marquee items={marquee} />
        <Portfolio />
        <Testimonials />
        <CounterTeam />
        <Contact />
        <Stories />
        <Cta />
      </main>
      <Footer />
      <BackTop />
      <Aos />
    </>
  );
}
