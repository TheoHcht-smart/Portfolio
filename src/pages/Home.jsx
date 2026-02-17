import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackGround.jsx";


export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Mode thème */}
    <ThemeToggle />
      {/* Effets étoile du BG */}
    <StarBackground />
      {/* Navbar*/}

      {/* contenu principal */}

      {/* Footer */}
    </div>
  );
}