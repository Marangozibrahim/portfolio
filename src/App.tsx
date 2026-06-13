import { BackgroundCanvas } from "./components/BackgroundCanvas";
import { BootLoader } from "./components/BootLoader";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HudFrame } from "./components/HudFrame";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Statement } from "./components/Statement";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

export default function App() {
  useSmoothScroll();

  return (
    <>
      <BackgroundCanvas scene="network" />
      <BootLoader />
      <HudFrame />
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
