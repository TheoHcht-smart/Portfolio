import { useEffect, useRef } from "react";

const BASE = import.meta.env.BASE_URL;

// Cloud images from /public/imgPara, split into 3 parallax layers
const farClouds = [
  { src: `${BASE}imgPara/cloud1.PNG`, top: "5%", left: "5%", width: "220px", opacity: 0.5 },
  { src: `${BASE}imgPara/cloud2.PNG`, top: "12%", left: "55%", width: "260px", opacity: 0.45 },
  { src: `${BASE}imgPara/cloud3.PNG`, top: "8%", left: "30%", width: "200px", opacity: 0.4 },
];

const midClouds = [
  { src: `${BASE}imgPara/cloud4.PNG`, top: "18%", left: "10%", width: "280px", opacity: 0.6 },
  { src: `${BASE}imgPara/cloud5.PNG`, top: "25%", left: "50%", width: "300px", opacity: 0.55 },
  { src: `${BASE}imgPara/cloud6.PNG`, top: "15%", left: "75%", width: "240px", opacity: 0.5 },
];

const nearClouds = [
  { src: `${BASE}imgPara/cloud7.PNG`, top: "30%", left: "0%", width: "340px", opacity: 0.75 },
  { src: `${BASE}imgPara/cloud8.PNG`, top: "22%", left: "45%", width: "360px", opacity: 0.7 },
  { src: `${BASE}imgPara/cloud9.PNG`, top: "35%", left: "70%", width: "320px", opacity: 0.65 },
];

const planes = [
  { src: `${BASE}imgPara/plane1.png`, top: "10%", left: "80%", width: "90px", opacity: 0.8 },
  { src: `${BASE}imgPara/plane2.png`, top: "28%", left: "20%", width: "70px", opacity: 0.6 },
];

export const CloudBackground = () => {
  const parallaxRef = useRef([]); // [far, mid, near, planes]
  const rafRef = useRef(null);

  // Parallax scroll — each layer scrolls at a different speed
  useEffect(() => {
    const speeds = [0.015, 0.04, 0.08, 0.06];

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        parallaxRef.current.forEach((el, i) => {
          if (el) el.style.transform = `translate3d(0,${y * speeds[i]}px,0)`;
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

  const setRef = (i) => (el) => { parallaxRef.current[i] = el; };

  const renderLayer = (items) =>
    items.map((item, i) => (
      <img
        key={i}
        src={item.src}
        alt=""
        draggable={false}
        decoding="async"
        className="absolute select-none"
        style={{
          top: item.top,
          left: item.left,
          width: item.width,
          height: "auto",
          opacity: item.opacity,
        }}
      />
    ));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 dark:hidden">
      {/* Gradient sky */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #87CEEB, #b8dff5 50%, #ddeefb)" }} />

      {/* Horizon glow */}
      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-white/60 to-transparent" />

      {/* Far clouds (back) — slowest parallax */}
      <div ref={setRef(0)} className="absolute inset-0" style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}>
        {renderLayer(farClouds)}
      </div>

      {/* Mid clouds */}
      <div ref={setRef(1)} className="absolute inset-0" style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}>
        {renderLayer(midClouds)}
      </div>

      {/* Near clouds (front) — fastest parallax */}
      <div ref={setRef(2)} className="absolute inset-0" style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}>
        {renderLayer(nearClouds)}
      </div>

      {/* Planes */}
      <div ref={setRef(3)} className="absolute inset-0" style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}>
        {renderLayer(planes)}
      </div>
    </div>
  );
};
