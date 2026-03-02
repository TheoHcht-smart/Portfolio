// src/components/Projects.jsx
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import "./../assets/project.css"; // adapte le chemin selon ton arborescence

const PROJECTS_JSON_PATH = "./../json/projects.json"; // adapte si besoin

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorIcon, setCursorIcon] = useState("right");
  const containerRef = useRef();
  const cursorRef = useRef();
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    fetch(PROJECTS_JSON_PATH)
      .then((res) => res.json())
      .then((data) => setProjects(data.projects || []));
  }, []);

  // Scroll to active card on resize
  useEffect(() => {
    const handleResize = () => {
      scrollToCard(activeIdx);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, [activeIdx, projects]);

  const scrollToCard = (idx) => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".project-card");
    const card = cards[idx];
    if (!card) return;

    const targetLeft = card.offsetLeft - (containerRef.current.clientWidth - card.clientWidth) / 2;
    containerRef.current.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  };

  const updateCursorIconForCard = (cardElement, idx) => {
    if (!cardElement) return;
    if (idx === activeIdx) {
      const isSmartPlanner = projects[idx]?.title?.toLowerCase() === "smart planner";
      setCursorIcon(isSmartPlanner ? "web" : "git");
      return;
    }

    const rect = cardElement.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const screenCenter = window.innerWidth / 2;
    setCursorIcon(screenCenter > cardCenter ? "left" : "right");
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      if (!cursorRef.current) return;
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleCardMouseEnter = (idx, event) => {
    setHoveredIdx(idx);
    setCursorVisible(true);
    updateCursorIconForCard(event.currentTarget, idx);
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 1,
        rotate: 0,
        duration: 1.2,
        ease: "elastic.out(1,0.3)",
        overwrite: "auto",
      });
    }
  };

  const handleCardMouseMove = (idx, event) => {
    updateCursorIconForCard(event.currentTarget, idx);
  };

  const handleCardMouseLeave = () => {
    setHoveredIdx(null);
    setCursorVisible(false);
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 0.2,
        rotate: 45,
        duration: 0.2,
        ease: "back.in(5)",
        overwrite: "auto",
      });
    }
  };

  const handleContainerScroll = () => {
    if (!containerRef.current || projects.length === 0) return;

    const cards = Array.from(containerRef.current.querySelectorAll(".project-card"));
    if (!cards.length) return;

    const screenCenter = window.innerWidth / 2;
    let closestIndex = 0;
    let minDiff = Infinity;

    cards.forEach((card, idx) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const diff = Math.abs(screenCenter - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIdx) {
      setActiveIdx(closestIndex);
    }

    const hoveredElement = document.elementFromPoint(mousePosRef.current.x, mousePosRef.current.y);
    const hoveredCard = hoveredElement?.closest?.(".project-card");
    if (hoveredCard) {
      const hoveredCardIndex = Number(hoveredCard.dataset.index);
      if (!Number.isNaN(hoveredCardIndex)) {
        setHoveredIdx(hoveredCardIndex);
        updateCursorIconForCard(hoveredCard, hoveredCardIndex);
      }
    } else {
      setHoveredIdx(null);
      setCursorVisible(false);
    }
  };

  const handleCardClick = (idx, link) => {
    if (activeIdx === idx) {
      window.open(link, "_blank");
    } else {
      setActiveIdx(idx);
      scrollToCard(idx);
    }
  };

  return (
    <>
      <section id="projects" className="pt-100 px-4 relative" >
        <div className="project-cont" style={{ position: "relative" }}>
          <div className="grid-bg" aria-hidden="true" />
          <h2 className=" text-3xl md:text-4xl font-bold mb-12 text-center">Mes <span className="text-primary">projets</span>.</h2>
          <div className="horizontall-sect max-w-3/5 mx-auto">
            <div className="project-list-container" ref={containerRef} onScroll={handleContainerScroll}>
              <div className="project-list" style={{ display: "flex" }}>
                <div className="spacer" />
                {projects.map((project, i) => {
                    if(project.title === "Smart Planner") { return(
                         <div
                    key={project.title}
                    data-index={i}
                    className={`project-card${i === activeIdx ? " active-project" : ""}${i === hoveredIdx ? " hovered" : ""}`}
                    onClick={() => handleCardClick(i, project.link)}
                    onMouseEnter={(event) => handleCardMouseEnter(i, event)}
                    onMouseMove={(event) => handleCardMouseMove(i, event)}
                    onMouseLeave={handleCardMouseLeave}
                    tabIndex={0}
                    style={{ outline: "none" }}
                  >
                    <div className="img-text-cont">
                      <div className="img-container text-box" style={{ position: "relative" }}>
                        <div className="date-cont black-glass">{project.date}</div>
                        <img src={project.image} alt={project.title} />
                      </div>
                      <div className="txt-container">
                        <h3 className="text-box">{project.title}</h3>
                        <p className="text-box" dangerouslySetInnerHTML={{ __html: project.description }} />
                      </div>
                    </div>
                    <div className="language-bar">
                      {project.languages.map((lang) => (
                        <div className="language-text" key={lang}>{lang}</div>
                      ))}
                      <a
                        className="github-button"
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                      >
                        Voir le site
                      </a>
                    </div>
                  </div>
                    )
                    };
                  return (
                  <div
                    key={project.title}
                    data-index={i}
                    className={`project-card${i === activeIdx ? " active-project" : ""}${i === hoveredIdx ? " hovered" : ""}`}
                    onClick={() => handleCardClick(i, project.link)}
                    onMouseEnter={(event) => handleCardMouseEnter(i, event)}
                    onMouseMove={(event) => handleCardMouseMove(i, event)}
                    onMouseLeave={handleCardMouseLeave}
                    tabIndex={0}
                    style={{ outline: "none" }}
                  >
                    <div className="img-text-cont">
                      <div className="img-container text-box" style={{ position: "relative" }}>
                        <div className="date-cont black-glass">{project.date}</div>
                        <img src={project.image} alt={project.title} />
                      </div>
                      <div className="txt-container">
                        <h3 className="text-box">{project.title}</h3>
                        <p className="text-box" dangerouslySetInnerHTML={{ __html: project.description }} />
                      </div>
                    </div>
                    <div className="language-bar">
                      {project.languages.map((lang) => (
                        <div className="language-text" key={lang}>{lang}</div>
                      ))}
                      <a
                        className="github-button"
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                      >
                        Voir le Github
                      </a>
                    </div>
                  </div>
                  );
                })}
                <div className="spacer" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        ref={cursorRef}
        className={`following-cursor${cursorVisible ? " visible" : ""}`}
        aria-hidden="true"
      >
        <svg
          className={`cursor-icon${cursorIcon === "right" ? " visible" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 1200"
        >
          <path d="m150 550h775v100h-775z" />
          <path d="m710 935-70-70 265-265-265-265 70-70 335 335z" />
        </svg>
        <svg
          className={`cursor-icon${cursorIcon === "left" ? " visible" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 1200"
        >
          <path d="m1050 550h-705l215-215-70-70-335 335 335 335 70-70-215-215h705z" />
        </svg>
        <svg
          className={`cursor-icon${cursorIcon === "git" ? " visible" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
        >
          <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
        </svg>
        <svg
          className={`cursor-icon${cursorIcon === "web" ? " visible" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm7.93 9h-3.12a15.9 15.9 0 0 0-1.21-5.01A8.019 8.019 0 0 1 19.93 11ZM12 4.06c.85 1.1 1.9 3.34 2.26 6.94H9.74C10.1 7.4 11.15 5.16 12 4.06ZM4.07 13h3.12a15.9 15.9 0 0 0 1.21 5.01A8.019 8.019 0 0 1 4.07 13ZM7.19 11H4.07a8.019 8.019 0 0 1 4.33-5.01A15.9 15.9 0 0 0 7.19 11Zm4.81 8.94c-.85-1.1-1.9-3.34-2.26-6.94h4.52c-.36 3.6-1.41 5.84-2.26 6.94ZM15.6 18.01A15.9 15.9 0 0 0 16.81 13h3.12a8.019 8.019 0 0 1-4.33 5.01Z" />
        </svg>
      </div>
    </>
  );
}