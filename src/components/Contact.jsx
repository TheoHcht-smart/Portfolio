import { LinkedinIcon, Mail, MapPin, Send } from "lucide-react";
import { cn } from "../lib/utils";


export const Contact = () => {
    return (
        <section id="contact" className="py-24 px-4 relative bg-secondary/30">
            <div className="max-w-3/4 mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-50 text-center">
                    Me <span className="text-primary">contacter.</span>
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"></p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h3 className="text-2xl font-semibold mb-30">Information de contact</h3>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold">Email</h4>
                                    <a
                                        href="mailto:theohuchot.contact@gmail.com"
                                        className="text-lg text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        theohuchot.contact@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <LinkedinIcon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold">LinkedIn</h4>
                                    <a
                                        href="https://fr.linkedin.com/in/th%C3%A9o-huchot-923a6b263"
                                        className="text-lg text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Théo Huchot
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold">Adresse</h4>
                                    <a
                                        href="https://www.google.com/maps/place/Metz"
                                        className="text-lg text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Metz, Moselle, France
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card p-8 rounded-lg shadow-xs">
                        <h3 className="text-2xl font-semibold mb-6">Envoyez-moi un message</h3>

                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 rounded-md border border-input focus:outline-hidden focus:ring-2 focus:ring-primary"
                                    placeholder="Votre nom ..."
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
                                    className="w-full px-4 py-3 rounded-md border border-input focus:outline-hidden focus:ring-2 focus:ring-primary"
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
                                    className="w-full px-4 py-3 rounded-md border border-input focus:outline-hidden focus:ring-2 focus:ring-primary"
                                    placeholder="Votre message ..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className={cn(
                                    "cosmic-button w-full flex items-center justify-center bg-primary hover:bg-primary/80 text-white transition-colors"
                                )}
                            >
                                Envoyer un message
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );

}