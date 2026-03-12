import "./../assets/project.css"; 

export const Footer = () => {
  return (
    <footer className=" py-8 px-4 border-t border-border/50 bg-secondary/20" >
      <div className=" max-w-6xl mx-auto text-center space-y-2" >
        <p className="text-sm md:text-base text-foreground font-medium">
          2026 Théo Huchot
        </p>
        <p className="text-sm text-muted-foreground">
          Built using React, Vite, Tailwind CSS, Framer Motion, Three.js and GSAP
        </p>
      </div>
    </footer>
  );
};
