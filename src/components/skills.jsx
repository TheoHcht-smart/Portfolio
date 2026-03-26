import React from "react";

import BallCanvas from "./canva/ball.jsx";
import SectionWrapper from "./hoc/SectionWrapper.jsx";
import { technologies } from "./constants/index";

const orbitConfig = [
  { size: "40%", duration: "18s", direction: "normal", angles: ["25deg", "205deg"] },
  { size: "55%", duration: "24s", direction: "reverse", angles: ["-12deg", "118deg", "246deg"] },
  { size: "70%", duration: "32s", direction: "normal", angles: ["72deg", "252deg"] },
  { size: "90%", duration: "40s", direction: "reverse", angles: ["20deg", "145deg", "270deg"] },
];

const Skills = () => {
  let startIndex = 0;

  const orbits = orbitConfig.map((orbit) => {
    const items = technologies.slice(startIndex, startIndex + orbit.angles.length);
    startIndex += orbit.angles.length;
    return { ...orbit, items };
  });

  return (
    <section id="skills" className="pt-35 pb-25 py-25 px-4 relative flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-14 text-center w-full">
        Système <span className="text-primary">des compétences</span>.
      </h2>

      <div className="skills-solar mx-auto">
        <div className="skills-core">
          <span>Skills</span>
        </div>

        {orbits.map((orbit, orbitIndex) => (
          <div
            key={`orbit-${orbitIndex}`}
            className="skills-orbit-ring"
            style={{
              "--orbit-size": orbit.size,
              "--orbit-duration": orbit.duration,
              "--orbit-direction": orbit.direction,
            }}
          >
            {orbit.items.map((technology, itemIndex) => (
              <div
                key={technology.name}
                className="skills-orbit-ball"
                style={{
                  "--ball-angle": orbit.angles[itemIndex],
                  zIndex: orbits.length - orbitIndex,
                }}
                title={technology.name}
              >
                <div className="skills-orbit-ball-inner">
                  <BallCanvas icon={technology.icon} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Skills, "");