import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackGround.jsx";
import { Navbar } from "../components/Navbar2.jsx";


export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Thème sombre ou clair */}
    <ThemeToggle />
      {/* Effets étoile du BG */}
    <StarBackground />
      {/* Navbar*/}
    <Navbar/>
      {/* contenu principal */}

      {/* Footer */}
    </div>
  );
}