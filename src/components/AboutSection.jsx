import { Briefcase, Code, User } from "lucide-react";
export const AboutSection = () => {

    return ( <section id="about" className="py-24 px-4 relative">
        {""}
        <div className="container mx-auto">

            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center ">
            À propos de <span className="text-primary"> Moi</span>. 
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <p className="text-md text-muted-foreground">
                    Je suis actuellement en 2ème année de BUT Informatique, parcours réalisation d’applications, à l’IUT de Metz.
                    </p>
                    <p className="text-md text-muted-foreground">Passionné par le développement et l’entrepreneuriat, j’ai eu l’opportunité en 2021, pendant la période du Covid, de co-créer une entreprise de e-commerce avec trois amis, en parallèle de mes études. Cette expérience m’a permis de développer une forte capacité de travail en autonomie, de prise de décision, ainsi qu’une compréhension concrète de la complexité de la création et de la gestion d’une entreprise.</p>
                    <p className="text-md text-muted-foreground">J’y ai également acquis des compétences en organisation, en optimisation des processus et en gestion des priorités, notamment en mettant en place des systèmes de to-do lists priorisées ainsi qu’une planification hebdomadaire structurée, réalisée en amont chaque semaine, tout en conservant des créneaux dédiés aux imprévus. Cette rigueur m’a permis de concilier efficacement le développement de ce projet avec la réussite de mon baccalauréat.</p>
                    <p className="text-md text-muted-foreground">Au cours de ma formation, j’ai réalisé plusieurs projets académiques ainsi qu’un projet professionnel en collaboration avec deux développeurs, consistant à concevoir une application web de gestion de planning et de prévision de clientèle pour un restaurant. Développé dans le cadre de mon expérience en restauration, ce projet répondait à des problématiques concrètes d’optimisation de la masse salariale et des plannings. Il m’a permis de renforcer mes compétences techniques en développement web tout en développant ma capacité à travailler efficacement en équipe sur un projet réel.</p>
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
                <div className="gradient-border p-6 card-hover">
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
                <div className="gradient-border p-6 card-hover">
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
                <div className="gradient-border p-6 card-hover">
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