import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackGround.jsx";
import { Navbar } from "../components/Navbar2.jsx";
import { useEffect, useState } from "react";
import { HeroSection } from "../components/HeroSection.jsx";
import { AboutSection } from "../components/AboutSection.jsx";
import Projects from "../components/projects.jsx";
import { CloudBackground } from "../components/CloudBackground.jsx";
import Skills from "../components/skills.jsx";
import { CursorTrail } from "../components/CursorTrail.jsx";
import { Contact } from "../components/Contact.jsx";
import { Footer } from "../components/Footer.jsx";

export const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDarkMode(root.classList.contains("dark"));
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      {!isMobile && <CursorTrail />}
        <img src={`${import.meta.env.BASE_URL}logo.png`} className="logo" alt="Logo" style={{width: "100px"}} />

      {/* Thème sombre ou clair */}
    {/*}  <ThemeToggle /> */}
      {isDarkMode ? <StarBackground /> : <CloudBackground />}

      {/* Navbar*/}
      <Navbar />
      {/* contenu principal */}
      <main>
        <HeroSection />
        <AboutSection />
        <Projects />
        <Skills />
        <Contact />
      </main>
      {/* footer */}
      <Footer />
    </div>
  );
};