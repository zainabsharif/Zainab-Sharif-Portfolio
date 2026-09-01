import { useState } from "react";
import { RecruiterModeProvider, useRecruiterMode } from "./context/RecruiterModeContext";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About";
import CapabilityDiagram from "./components/CapabilityDiagram/CapabilityDiagram";
import TechStackGrid from "./components/TechStack/TechStackGrid";
import ProjectsGrid from "./components/Projects/ProjectsGrid";
import Extracurricular from "./components/Extracurricular";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer";
import NowPlayingWidget from "./components/MusicPlayer/NowPlayingWidget";

function Sections() {
  const { recruiterMode } = useRecruiterMode();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        {!recruiterMode && <CapabilityDiagram />}
        <TechStackGrid />
        <ProjectsGrid />
        <Extracurricular />
        <Contact />
      </main>
      <Footer />
      <NowPlayingWidget />
    </>
  );
}

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <RecruiterModeProvider>
      {!introDone && <Loader onComplete={() => setIntroDone(true)} />}
      <Sections />
    </RecruiterModeProvider>
  );
}
