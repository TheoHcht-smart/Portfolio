import React from "react";

import BallCanvas from "../components/canva/ball.jsx";
import SectionWrapper from "../components/hoc/SectionWrapper";
import { technologies } from "../components/constants/index";

 const Skills = () => {

return (
    <section id="skills" className=" py-25 px-4 relative">
    <h2 className=" text-3xl md:text-4xl font-bold mb-25 text-center">Compétences <span className="text-primary">techniques</span> .</h2>
    <div className='flex flex-row flex-wrap justify-center gap-10'>
        
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
    </section>
  );
};

export default SectionWrapper(Skills, "");