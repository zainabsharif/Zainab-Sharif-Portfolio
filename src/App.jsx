import { useState } from "react";
import { RecruiterModeProvider, useRecruiterMode } from "./context/RecruiterModeContext";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About";
import CapabilityDiagram from "./components/CapabilityDiagram/CapabilityDiagram";
import TechStackGrid from "./components/TechStack/TechStackGrid";
import ProjectsGrid from "./components/Projects/ProjectsGrid";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer";
import NowPlayingWidget from "./components/MusicPlayer/NowPlayingWidget";
import AmbientBackground from "./components/Background/AmbientBackground";
import StarField from "./components/Background/StarField";
import ShootingStars from "./components/Background/ShootingStars";
import Orb from "./components/Orb/Orb";
import CursorTrail from "./components/CursorTrail/CursorTrail";

function Sections() {
  const { recruiterMode } = useRecruiterMode();
  return (
    <>
      <AmbientBackground />
      <StarField />
      <ShootingStars />
      <CursorTrail />
      {!recruiterMode && <Orb />}
      <Header />
      <main>
        <Hero />
        <About />
        <CapabilityDiagram />
        <TechStackGrid />
        <ProjectsGrid />
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
