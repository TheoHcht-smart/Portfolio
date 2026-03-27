import { useEffect, useRef, useState } from "react";
import { Briefcase, Code, User } from "lucide-react";
export const AboutSection = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = sectionRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return ( <section id="about" className="py-24 px-4 relative">
        {""}
        <div className="container mx-auto" ref={sectionRef}>

            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center ">
            À propos de <span className="text-primary"> Moi</span>. 
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div
                    className={`space-y-4 card-hover p-4 rounded-lg glass-panel opacity-0 ${
                        isVisible ? "animate-fade-in-delay-1" : ""
                    }`}
                >
                    <p className="text-md  text-muted-foreground ">
                    Je suis actuellement en 2ème année de BUT Informatique, parcours réalisation d’applications, à l’IUT de Metz.
                    </p>
                    <p className="text-md  text-muted-foreground">Passionné par le développement et l’entrepreneuriat, j’ai co-créé en 2021 un projet e-commerce avec trois amis. Cette expérience m’a apporté de l’autonomie, de la rigueur et une première vision concrète de la gestion de projet.</p>
                    <p className="text-md  text-muted-foreground">Elle m’a aussi appris à mieux organiser mon travail, prioriser mes tâches et concilier un projet personnel avec mes études.</p>
                    <p className="text-md  text-muted-foreground">Au cours de ma formation, j’ai également réalisé plusieurs projets académiques ainsi qu’un projet professionnel avec deux développeurs autour d’une application web de gestion de planning et de prévision de clientèle pour un restaurant. Cette expérience a renforcé mes compétences techniques et mon efficacité en équipe sur un projet concret.</p>
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
                    <p className="text-md  text-muted-foreground">
                    Par ailleurs, je m’intéresse fortement à la finance et aux marchés financiers. Depuis plusieurs années, j’investis en bourse et m’informe quotidiennement sur les enjeux géopolitiques mondiaux, en cherchant à comprendre leurs impacts sur les marchés. Cette curiosité me permet de développer une vision analytique et globale du monde, en croisant données, économie et actualité.
                    </p>
                    <div className=" flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                        <a
                            href={`${import.meta.env.BASE_URL}cv-theo-huchot.pdf`}
                            download="CV-Theo-Huchot.pdf"
                            className="cosmic-button bg-primary/80 hover:bg-primary"
                        >
                            Télécharger mon CV
                        </a>
                    </div>
                </div>
            <div className="hidden md:grid grid-cols-1 gap-6">
                <div className={`gradient-border p-6 card-hover opacity-0 ${isVisible ? "animate-fade-in-delay-2" : ""}`}>
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                        <Code className="h-6 w-6 text-primary"/>
                        </div>
                        <div className="text-left">
                            <h4 className="font-semibold text-lg text-primary">Compétences techniques</h4>
                            <p className="about-skill-text">Développement d'application, programmation, bases de données</p>
                        </div>
                    </div>
                </div>
                <div className={`gradient-border p-6 card-hover opacity-0 ${isVisible ? "animate-fade-in-delay-3" : ""}`}>
                     <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                        <User className="h-6 w-6 text-primary"/>
                        </div>
                        <div className="text-left">
                            <h4 className="font-semibold text-lg text-primary">Compétences personnelles</h4>
                            <p className="about-skill-text">Communication, travail d'équipe, organisation</p>
                        </div>
                    </div>
                </div>
                <div className={`gradient-border p-6 card-hover opacity-0 ${isVisible ? "animate-fade-in-delay-4" : ""}`}>
                     <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                        <Briefcase className="h-6 w-6 text-primary"/>
                        </div>
                        <div className="text-left">
                            <h4 className="font-semibold text-lg text-primary">Expérience professionnelle</h4>
                            <p className="about-skill-text">Développement d'unapplications web, collaboration en équipe, gestion de projets</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
          
            
        </div>
    </section>  );

}   