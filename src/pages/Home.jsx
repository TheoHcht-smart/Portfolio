import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackGround.jsx";
import { Navbar } from "../components/Navbar2.jsx";
import { useEffect, useState } from "react";
import { HeroSection } from "../components/HeroSection.jsx";
import { AboutSection } from "../components/AboutSection.jsx";
import Projects from "../components/projects.jsx";
import { CloudBackground } from "../components/CloudBackground.jsx";
import Skills from "../components/skills.jsx";

export const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDarkMode(root.classList.contains("dark"));
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
         <img src="/logo.png" className="logo" alt="Logo" style={{width: "100px"}} />

      {/* Thème sombre ou clair */}
      <ThemeToggle />
      {isDarkMode ? <StarBackground /> : <CloudBackground />}

      {/* Navbar*/}
      <Navbar />
      {/* contenu principal */}
      <main>
        <HeroSection />
        <AboutSection />
        <Projects />
        <Skills />
      </main>
      {/* Footer */}
    </div>
  );
};