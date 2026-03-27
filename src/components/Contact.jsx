import { Github, LinkedinIcon, Mail, MapPin, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";


export const Contact = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const subject = `Nouveau message depuis le portfolio - ${formData.name}`;
        const body = `Nom : ${formData.name}\nEmail : ${formData.email}\n\nMessage :\n${formData.message}`;
        const mailtoUrl = `mailto:theohuchot.contact@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoUrl;
    };

    const contactItems = [
        {
            title: "Email",
            value: "theohuchot.contact@gmail.com",
            href: "mailto:theohuchot.contact@gmail.com",
            icon: Mail,
            className: "animate-fade-in-delay-1",
        },
        {
            title: "LinkedIn",
            value: "Théo Huchot",
            href: "https://fr.linkedin.com/in/th%C3%A9o-huchot-923a6b263",
            icon: LinkedinIcon,
            className: "animate-fade-in-delay-2",
        },
        {
            title: "GitHub",
            value: "TheoHcht-smart",
            href: "https://github.com/TheoHcht-smart",
            icon: Github,
            className: "animate-fade-in-delay-3",
        },
        {
            title: "Adresse",
            value: "Metz, Moselle, France",
            href: "https://www.google.com/maps/place/Metz",
            icon: MapPin,
            className: "animate-fade-in-delay-4",
        },
    ];

    return (
        <section id="contact" className="py-24 px-4 relative bg-secondary/30" ref={sectionRef}>
            <div className="max-w-full md:max-w-3/4 mx-auto">
                <h2 className={`text-3xl md:text-4xl font-bold mb-25 text-center opacity-0 ${isVisible ? "animate-fade-in" : ""}`}>
                    Me <span className="text-primary">contacter</span>.
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"></p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className={`space-y-8 opacity-0 ${isVisible ? "animate-fade-in-delay-1" : ""}`}>
                        <div className="contact-info">
                            {contactItems.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        target={item.href.startsWith("http") ? "_blank" : undefined}
                                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        aria-label={item.title}
                                        className={`social-link black-glass opacity-0 ${isVisible ? item.className : ""}`}
                                    >
                                        <div className="social-svg-cont" aria-hidden="true">
                                            <Icon className="social-icon" size={32} />
                                        </div>
                                        <p>{item.value}</p>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div className={`contact-message-card glass-panel hidden md:block p-8 rounded-lg opacity-0 ${isVisible ? "animate-fade-in-delay-2" : ""}`}>
                        <h3 className=" text-2xl  font-semibold mb-6">Envoyez-moi un message</h3>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md border border-input/70 bg-white/55 dark:bg-white/8 focus:outline-hidden focus:ring-2 focus:ring-primary"
                                    placeholder="Votre nom..."
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md border border-input/70 bg-white/55 dark:bg-white/8 focus:outline-hidden focus:ring-2 focus:ring-primary"
                                    placeholder="votre.email@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md border border-input/70 bg-white/55 dark:bg-white/8 focus:outline-hidden focus:ring-2 focus:ring-primary"
                                    placeholder="Votre message..."
                                ></textarea>
                            </div>
                            <button type="submit" className="contact-action-button w-full">
                                <span>Envoyer un message</span>
                                <div className="icon-cont" aria-hidden="true">
                                    <Send className="icon" size={18} />
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );

}