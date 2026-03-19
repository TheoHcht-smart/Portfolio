import React from "react";

import BallCanvas from "./canva/ball.jsx";
import SectionWrapper from "./hoc/SectionWrapper.jsx";
import { technologies } from "./constants/index";

 const Skills = () => {

return (
    <section id="skills" className="pt-35 pb-25 py-25 px-4 relative">
    <h2 className=" text-3xl md:text-4xl font-bold mb-25 text-center">Compétences <span className="text-primary">techniques</span>.</h2>
    <div className='flex flex-row flex-wrap justify-center gap-6 md:gap-10'>
        
      {technologies.map((technology) => (
        <div className='w-15 h-20 md:w-28 md:h-28' key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
    </section>
  );
};

export default SectionWrapper(Skills, "");