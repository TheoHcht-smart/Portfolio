import { useEffect, useRef, useState } from "react";

// id , taille , x, y , opacity, animationDurée
// id , taille , x, y , delay , animationDurée

export const StarBackground = () => {

    const [stars, setStars] = useState([]);
    const [meteors, setMeteors] = useState([]);
    const lastSizeRef = useRef({ width: 0, height: 0, isMobile: false });

    useEffect(() => {
        generateStars();
        generateMeteors();

        lastSizeRef.current = {
            width: window.innerWidth,
            height: window.innerHeight,
            isMobile: window.innerWidth <= 768,
        };
        
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const isMobile = width <= 768;
            const previous = lastSizeRef.current;

            // iOS triggers resize on scroll due to browser chrome show/hide.
            // On mobile, only regenerate when width changes or breakpoint changes.
            const shouldRegenerate = isMobile
                ? previous.width !== width || previous.isMobile !== isMobile
                : previous.width !== width || previous.height !== height || previous.isMobile !== isMobile;

            if (!shouldRegenerate) return;

            lastSizeRef.current = { width, height, isMobile };
            generateStars();
            generateMeteors();
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };

    },[]);

    const generateStars = () =>{
        const nbOfStars = Math.floor((window.innerWidth * window.innerHeight) / 10000);
        const newStars = [];
        for ( let i = 0; i < nbOfStars; i++){
            newStars.push({
                id: i,
                size: Math.random() * 3 + 1, 
                x: Math.random()*100,
                y: Math.random()*100,
                opacity: Math.random() * 0.5 + 0.5,
                animationDuration: Math.random()* 30 + 5, 

            })
        };

    setStars(newStars)
    };

    const generateMeteors = () =>{
        const isMobile = window.innerWidth <= 768;
        const nbOfMeteors = isMobile ? 15 : 30;
        const newMeteors = [];
        for ( let i = 0; i < nbOfMeteors; i++){
            newMeteors.push({
                id: i,
                size: Math.random() * 1 + 1, 
                x: Math.random()*40,
                y: Math.random()*100,
                delay: Math.random() * 15,
                animationDuration: Math.random()* 5 + 2 , 

            })
        };

    setMeteors(newMeteors)
    };

return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {stars.map((star)=>(
            <div key={star.id} className="star animate-pulse-subtle" style={{
                width: star.size + "px" , 
                height: star.size + "px", 
                left: star.x + "%", 
                top: star.y + "%", 
                opacity: star.opacity ,
                animationDuration: star.animationDuration + "s" , 
            }}/>
        ))}

      {meteors.map((meteor)=>(
            <div key={meteor.id} className="meteor animate-meteor-mobile md:animate-meteor" style={{
                width: meteor.size* 50 + "px" , 
                height: meteor.size + "px", 
                left: meteor.x + "%", 
                top: meteor.y + "%", 
                animationDelay: meteor.delay,
                animationDuration: meteor.animationDuration + "s" , 
            }}/>
        ))}
    </div>
);
};
