import { Briefcase, Code, User } from "lucide-react";
export const AboutSection = () => {

    return ( <section id="about" className="py-24 px-4 relative">
        {""}
        <div className="container mx-auto max-w-5xl">

            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center ">
            À propos de <span className="text-primary"> Moi</span>. 
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <p className="text-md text-muted-foreground">
                    Je suis en 2ème année de BUT informatique parcours réalisation d'applications à l'iut de Metz.
                    </p>
                    <p className="text-md text-muted-foreground">J'ai pu créer plusieurs petits projets scolaires, ainsi qu'un projet professionnel en collaboration avec deux développeurs. Ce projet consistait à créer une application de gestion de planning et de prévision clientèle pour un restaurant, ce qui m'a permis d'acquérir une expérience précieuse en développement d'applications web et en travail d'équipe.</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <a
                            href="https://github.com/Mirecos"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cosmic-button border border-primary bg-transparent hover:bg-primary"
                        >
                            GitHub Mirecos
                        </a>
                        <a
                            href="https://github.com/evamln"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cosmic-button border border-primary bg-transparent hover:bg-primary"
                        >
                            GitHub evamln
                        </a>
                    </div>
                    <p className="text-md text-muted-foreground">
                    En plus de mes compétences techniques, je suis également passionné par la finance et les marchés financiers. J'aime comprendre comment les marchés fonctionnent et comment les données peuvent être utilisées pour mieux comprendre le monde qui nous entoure.
                    </p>
                    <div className=" flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                        <a href="" className="cosmic-button bg-primary/80 hover:bg-primary"> Télécharger mon CV</a>
                    </div>
                </div>
            <div className="grid grid-cols-1 gap-6">
                <div className="gradient-border p-6 card-hover">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                        <Code className="h-6 w-6 text-primary"/>
                        </div>
                        <div className="text-left">
                            <h4 className="font-semibold text-lg">Compétences techniques</h4>
                            <p className="text-muted-foreground">Développement d'application, programmation, bases de données</p>
                        </div>
                    </div>
                </div>
                <div className="gradient-border p-6 card-hover">
                     <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                        <User className="h-6 w-6 text-primary"/>
                        </div>
                        <div className="text-left">
                            <h4 className="font-semibold text-lg">Compétences personnelles</h4>
                            <p className="text-muted-foreground">Communication, travail d'équipe, organisation</p>
                        </div>
                    </div>
                </div>
                <div className="gradient-border p-6 card-hover">
                     <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                        <Briefcase className="h-6 w-6 text-primary"/>
                        </div>
                        <div className="text-left">
                            <h4 className="font-semibold text-lg">Expérience professionnelle</h4>
                            <p className="text-muted-foreground">Développement d'unapplications web, collaboration en équipe, gestion de projets</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
          
            
        </div>
    </section>  );

}   