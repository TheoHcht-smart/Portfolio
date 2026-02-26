import { useEffect, useState } from "react";

export const CloudBackground = () => {
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    const generateClouds = () => {
      const numberOfClouds = Math.max(8, Math.floor(window.innerWidth / 220));
      const newClouds = Array.from({ length: numberOfClouds }, (_, index) => ({
        id: index,
        width: Math.random() * 140 + 120,
        height: Math.random() * 45 + 35,
        y: Math.random() * 70,
        duration: Math.random() * 45 + 35,
        delay: Math.random() * -45,
        opacity: Math.random() * 0.25 + 0.18,
      }));

      setClouds(newClouds);
    };

    generateClouds();
    window.addEventListener("resize", generateClouds);
    return () => window.removeEventListener("resize", generateClouds);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200/85 via-sky-100/65 to-sky-50/30 dark:hidden" />
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="cloud"
          style={{
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            top: `${cloud.y}%`,
            opacity: cloud.opacity + 0.18,
            animationDuration: `${cloud.duration}s`,
            animationDelay: `${cloud.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
