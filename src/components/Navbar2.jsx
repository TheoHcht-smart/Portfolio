import { cn } from "../lib/utils"
import { useEffect, useRef, useState } from "react";
import "../header.css";

const navItems = [
    { name: "Accueil", href: "#accueil" },
    { name: "À propos", href: "#about" },
    { name: "Projets", href: "#projets" },
    { name: "Compétences", href: "#compétences" },
    {name : "Contact", href : "#contact"},
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navRef = useRef(null);
    const selectorRef = useRef(null);
    const lastCurrentSectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
            updateSelector();
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (lastCurrentSectionRef.current) {
                updateSelectorPosition(lastCurrentSectionRef.current);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        // Initialisation
        const sections = document.querySelectorAll("section");
        if (sections.length > 0) {
            lastCurrentSectionRef.current = sections[0];
            updateSelectorPosition(sections[0]);
        }
    }, []);

    const updateSelectorPosition = (section) => {
        if (!navRef.current || !selectorRef.current) return;

        const currentNav = navRef.current.querySelector(
            `a[href="#${section.id}"]`
        );

        if (currentNav) {
            const navDiv = currentNav.querySelector(".nav-svg");
            if (navDiv) navDiv.classList.add("active-nav-svg");

            const navLeft = currentNav.parentElement.offsetLeft;
            const navWidth = currentNav.offsetWidth;

            selectorRef.current.style.opacity = "1";
            selectorRef.current.style.width = navWidth + "px";
            selectorRef.current.style.left = navLeft + "px";
        }
    };

    const updateSelector = () => {
        const scrollPos = window.scrollY;
        let maxVisibleHeight = -1;
        let currentSection = null;

        const sections = document.querySelectorAll("section");
        sections.forEach((section) => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const visibleTop = Math.max(top, scrollPos);
            const visibleBottom = Math.min(bottom, scrollPos + window.innerHeight);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);

            if (visibleHeight > maxVisibleHeight) {
                maxVisibleHeight = visibleHeight;
                currentSection = section;
            }
        });

        if (currentSection && lastCurrentSectionRef.current?.id !== currentSection.id) {
            // Supprimer la classe active de tous les SVG
            const allNavDivs = navRef.current?.querySelectorAll(".nav-svg");
            allNavDivs?.forEach((div) => div.classList.remove("active-nav-svg"));

            lastCurrentSectionRef.current = currentSection;
            updateSelectorPosition(currentSection);
        }
    };

    return (
        <header id="header">
            <nav className="navbar" ref={navRef}>
                <ul className="black-glass">
                    {navItems.map((item, key) => (
                        <li key={key}>
                            <a href={item.href}>
                                <div className="nav-svg">
                                    {item.name === "Accueil" && (
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 200 200">
                                            <polygon className="poly-svg-nav-base" points="180,99 99,20 99,99 99,128.62 48.38,110.1 48.38,158.25 99,178 149.62,158.25 149.62,110.1 " />
                                            <polygon className="poly-svg-nav-light" points="99,20 18,99 99,128.62 " />
                                        </svg>
                                    )}
                                    {item.name === "Projets" && (
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 200 200">
                                            <path className="poly-svg-nav-base" d="M144,119c-12.17,12.17-23.3,12.59-38.78,8.68l-57.55,57.55c-3.45-2.12-6.77-4.45-9.92-6.97l35.48-35.48c3.51-3.51,3.51-9.21,0-12.72l-4.16-4.16c-3.51-3.52-9.21-3.52-12.73,0l-35.37,35.37c-2.49-3.19-4.78-6.54-6.85-10.03l57.32-57.33C67.54,78.43,68.83,68.17,81,56c15.74-15.74,38.32-22.2,56.64-11.4l-27.58,27.58c-2.84,2.84-2.84,7.44,0,10.28l6.61,6.6c2.84,2.84,7.44,2.84,10.28,0l27.57-27.57C165.33,79.8,159.73,103.27,144,119z" />
                                            <path className="poly-svg-nav-light" d="M73.23,142.78l-35.48,35.48c-6.25-4.97-11.89-10.68-16.78-16.99l35.37-35.37c3.52-3.52,9.22-3.52,12.73,0l4.16,4.16C76.74,133.57,76.74,139.27,73.23,142.78z" />
                                        </svg>
                                    )}
                                    {item.name === "Compétences" && (
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 200 200">
                                            <path className="poly-svg-nav-base" d="M102.74,16.11l15.61,63.46c0.25,1.02,1.05,1.82,2.07,2.07l63.46,15.61c2.87,0.71,2.87,4.78,0,5.49l-63.46,15.61c-1.02,0.25-1.82,1.05-2.07,2.07l-15.61,63.46c-0.71,2.87-4.78,2.87-5.49,0l-15.61-63.46c-0.25-1.02-1.05-1.82-2.07-2.07l-63.46-15.61c-2.87-0.71-2.87-4.78,0-5.49l63.46-15.61c1.02-0.25,1.82-1.05,2.07-2.07l15.61-63.46C97.96,13.25,102.04,13.25,102.74,16.11z" />
                                            <path className="poly-svg-nav-light" d="M145.51,94.33l8.3,33.71c0.13,0.54,0.56,0.97,1.1,1.1l33.71,8.3c1.52,0.37,1.52,2.54,0,2.92l-33.71,8.3c-0.54,0.13-0.97,0.56-1.1,1.1l-8.3,33.71c-0.37,1.52-2.54,1.52-2.92,0l-8.3-33.71c-0.13-0.54-0.56-0.97-1.1-1.1l-33.71-8.3c-1.52-0.37-1.52-2.54,0-2.92l33.71-8.3c0.54-0.13,0.97-0.56,1.1-1.1l8.3-33.71C142.97,92.81,145.14,92.81,145.51,94.33z" />
                                        </svg>
                                    )}
                                    {item.name === "Contact" && (
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 200 200">
                                            <path className="poly-svg-nav-base" d="M160,40H40c-11.05,0-20,8.95-20,20v80c0,11.05,8.95,20,20,20h120c11.05,0,20-8.95,20-20V60C180,48.95,171.05,40,160,40z M160,60L100,95L40,60H160z M160,140H40V75l60,45l60-45V140z" />
                                            <path className="poly-svg-nav-light" d="M40,60L100,95L160,60Z" />
                                        </svg>
                                    )}
                                </div>
                                {item.name}
                            </a>
                        </li>
                    ))}
                    <div className="selector white-glass" ref={selectorRef}></div>
                </ul>
            </nav>
        </header>
    );
};