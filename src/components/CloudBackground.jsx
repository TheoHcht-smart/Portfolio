import { tr } from "framer-motion/client";
import { useEffect, useRef } from "react";

const BASE = import.meta.env.BASE_URL;

// Each cloud: src, top, startX, side (-1 = left, 1 = right), speed multiplier
const clouds = [
  // Far layer — slow, spread across screen
  { src: `${BASE}imgPara/cloud1.PNG`, top: "3%",  startX: "8%",  side: -1, speed: 0.06, width: "200px", opacity: 0.4 },
  { src: `${BASE}imgPara/cloud2.PNG`, top: "9%",  startX: "78%", side: 1,  speed: 0.07, width: "240px", opacity: 0.38 },
  { src: `${BASE}imgPara/cloud3.PNG`, top: "6%",  startX: "45%", side: -1, speed: 0.05, width: "180px", opacity: 0.35 },
  { src: `${BASE}imgPara/cloud1.PNG`, top: "12%", startX: "88%", side: 1,  speed: 0.08, width: "190px", opacity: 0.42 },
  { src: `${BASE}imgPara/cloud3.PNG`, top: "2%",  startX: "2%",  side: -1, speed: 0.04, width: "210px", opacity: 0.36 },
  // Mid layer — medium
  { src: `${BASE}imgPara/cloud4.PNG`, top: "15%", startX: "12%", side: -1, speed: 0.14, width: "280px", opacity: 0.55 },
  { src: `${BASE}imgPara/cloud5.PNG`, top: "20%", startX: "70%", side: 1,  speed: 0.16, width: "300px", opacity: 0.5 },
  { src: `${BASE}imgPara/cloud6.PNG`, top: "18%", startX: "42%", side: 1,  speed: 0.12, width: "240px", opacity: 0.48 },
  { src: `${BASE}imgPara/cloud4.PNG`, top: "24%", startX: "82%", side: 1,  speed: 0.13, width: "260px", opacity: 0.52 },
  { src: `${BASE}imgPara/cloud6.PNG`, top: "13%", startX: "0%",  side: -1, speed: 0.15, width: "250px", opacity: 0.45 },
  // Near layer — fast, wide spread
  { src: `${BASE}imgPara/cloud7.PNG`, top: "28%", startX: "5%",  side: -1, speed: 0.25, width: "340px", opacity: 0.7 },
  { src: `${BASE}imgPara/cloud8.PNG`, top: "22%", startX: "45%", side: 1,  speed: 0.22, width: "360px", opacity: 0.65 },
  { src: `${BASE}imgPara/cloud9.PNG`, top: "34%", startX: "75%", side: 1,  speed: 0.28, width: "320px", opacity: 0.6 },
  { src: `${BASE}imgPara/cloud7.PNG`, top: "38%", startX: "40%", side: -1, speed: 0.20, width: "300px", opacity: 0.58 },
  { src: `${BASE}imgPara/cloud9.PNG`, top: "30%", startX: "-5%", side: -1, speed: 0.26, width: "280px", opacity: 0.55 },
];

const planes = [
  // startX à l'extérieur, side inversé par rapport aux nuages → vont vers le centre
  { src: `${BASE}imgPara/plane1.png`, top: "8%",  startX: "78%", side: -1, speed: 0.18, width: "90px", opacity: 0.8, flip: false },
  { src: `${BASE}imgPara/plane2.png`, top: "26%", startX: "5%",  side: 1,  speed: 0.15, width: "70px", opacity: 0.6, flip: true },
  { src: `${BASE}imgPara/plane3.PNG`, top: "16%", startX: "87%", side: -1, speed: 0.20, width: "350px", opacity: 0.7, flip: false },
  { src: `${BASE}imgPara/plane4.PNG`, top: "36%", startX: "15%",  side: 1,  speed: 0.17, width: "150px", opacity: 0.65, flip: true },
];

const allItems = [...clouds, ...planes];

export const CloudBackground = () => {
  const itemRefs = useRef([]);
  const rafRef = useRef(null);

  // Parallax: clouds start centered, spread outward on scroll
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        allItems.forEach((item, i) => {
          const el = itemRefs.current[i];
          if (el) {
            const xOffset = y * item.speed * item.side;
            const flip = item.flip ? 'scaleX(-1)' : '';
            el.style.transform = `translate3d(${xOffset}px, 0, 0) ${flip}`;
          }
        });
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 dark:hidden">
      {/* Gradient sky */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #87CEEB, #b8dff5 50%, #ddeefb)" }} />

      {/* Horizon glow */}
      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-white/60 to-transparent" />

      {/* All clouds & planes — individually animated */}
      {allItems.map((item, i) => (
        <img
          key={i}
          ref={(el) => { itemRefs.current[i] = el; }}
          src={item.src}
          alt=""
          draggable={false}
          decoding="async"
          className="absolute select-none"
          style={{
            top: item.top,
            left: item.startX,
            width: item.width,
            height: "auto",
            opacity: item.opacity,
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />
      ))}
    </div>
  );
};
