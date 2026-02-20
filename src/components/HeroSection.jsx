import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
    return (
        <section
            id="accueil"
            className="relative min-h-screen flex items-start pt-100 px-6"
        >
            {/* Wrapper centré avec largeur max contrôlée */}
            <div className="w-full max-w-[1400px] 2xl:max-w-[1900px] mx-auto ">
                
                {/* Contenu aligné à droite dans le wrapper */}
                <div className="max-w-3xl ml-auto text-left z-10 space-y-6 ">
                    
                    <h1 className="text-3xl md:text-6xl font-bold tracking-tight">
                        <span className="text-primary opacity-0 animate-fade-in">
                            Huchot Théo
                        </span>
                        <br />
                        <span className="opacity-0 animate-fade-in-delay-1">
                            étudiant
                        </span>
                        <span className="ml-2 opacity-0 animate-fade-in-delay-2">
                            en
                        </span>
                        <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-3">
                            informatique.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl opacity-0 animate-fade-in-delay-4">
                        Je m'appelle Théo Huchot, j'ai 22 ans et je suis étudiant en informatique.
                        <br />
                        Je suis passionné par le développement d'applications web et d'automatisation.
                    </p>

                    <div className="flex space-x-4 opacity-0 animate-fade-in-delay-4">
                        <a href="#projets" className="cosmic-button bg-primary/80 hover:bg-primary">
                            Voir mes projets
                        </a>
                        <a href="#contact" className="cosmic-button border border-primary bg-transparent hover:bg-primary">
                            Me contacter
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll indicator centré proprement */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
                <span className="text-sm text-muted-foreground">Défiler</span>
                <ArrowDown className="h-5 w-5 text-primary" />
            </div>
        </section>
    );
};