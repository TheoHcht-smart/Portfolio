
export const AboutSection = () => {

    return ( <section id="about" className="py-24 px-4 relative">
        {""}
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            À propos de <span className="text-primary"> Moi</span>  
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h3></h3>
                    <p className="text-lg text-muted-foreground">
                    Je suis étudiant en informatique en 2ème année de BUT informatique parcours réalisation d'applications.
                    </p>
                    <p className="text-lg text-muted-foreground">J'ai pu créer plusieurs petits projets scolaires, ainsi qu'un projet professionnel en collaboration avec @mirecos et @eva. Ce projet consistait à créer une application de gestion de planning et de prévision clientèle pour un restaurant, ce qui m'a permis d'acquérir une expérience précieuse en développement d'applications web et en travail d'équipe.</p>
                    <p className="text-lg text-muted-foreground">
                    En plus de mes compétences techniques, je suis également passionné par la finance et les marchés financiers. J'aime comprendre comment les marchés fonctionnent et comment les données peuvent être utilisées pour mieux comprendre le monde qui nous entoure.
                    </p>
                    <div className=" flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                        <a href="Contact" className="cosmic-button bg-primary/80 hover:bg-primary"> Télécharger mon CV</a>
                    </div>


                </div>
            </div>

        </div>
    </section>  );

}   