import { useEffect, useRef, useState } from "react";

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
  // Extra edge clouds — all screens
  { src: `${BASE}imgPara/cloud2.PNG`, top: "1%",  startX: "90%", side: 1,  speed: 0.05, width: "230px", opacity: 0.36 },
  { src: `${BASE}imgPara/cloud1.PNG`, top: "10%", startX: "-8%", side: -1, speed: 0.07, width: "240px", opacity: 0.38 },
  { src: `${BASE}imgPara/cloud5.PNG`, top: "19%", startX: "85%", side: 1,  speed: 0.12, width: "270px", opacity: 0.46 },
  { src: `${BASE}imgPara/cloud6.PNG`, top: "16%", startX: "-3%", side: -1, speed: 0.14, width: "260px", opacity: 0.44 },
  { src: `${BASE}imgPara/cloud8.PNG`, top: "26%", startX: "88%", side: 1,  speed: 0.24, width: "330px", opacity: 0.6 },
  { src: `${BASE}imgPara/cloud7.PNG`, top: "35%", startX: "-8%", side: -1, speed: 0.22, width: "320px", opacity: 0.56 },
  { src: `${BASE}imgPara/cloud9.PNG`, top: "42%", startX: "92%", side: 1,  speed: 0.26, width: "300px", opacity: 0.52 },
  { src: `${BASE}imgPara/cloud8.PNG`, top: "44%", startX: "-6%", side: -1, speed: 0.23, width: "350px", opacity: 0.54 },
];

// Ultrawide-only clouds — hidden on normal screens, visible on 2560px+
// Positioned more towards center to fill the extra space
const ultrawideOnlyClouds = [
  { src: `${BASE}imgPara/cloud2.PNG`, top: "5%",  startX: "30%", side: -1, speed: 0.05, width: "220px", opacity: 0.32 },
  { src: `${BASE}imgPara/cloud1.PNG`, top: "11%", startX: "60%", side: 1,  speed: 0.07, width: "230px", opacity: 0.34 },
  { src: `${BASE}imgPara/cloud3.PNG`, top: "8%",  startX: "50%", side: 1,  speed: 0.06, width: "200px", opacity: 0.3 },
  { src: `${BASE}imgPara/cloud5.PNG`, top: "17%", startX: "55%", side: 1,  speed: 0.11, width: "270px", opacity: 0.42 },
  { src: `${BASE}imgPara/cloud4.PNG`, top: "22%", startX: "35%", side: -1, speed: 0.13, width: "290px", opacity: 0.44 },
  { src: `${BASE}imgPara/cloud6.PNG`, top: "26%", startX: "60%", side: 1,  speed: 0.10, width: "230px", opacity: 0.4 },
  { src: `${BASE}imgPara/cloud5.PNG`, top: "14%", startX: "28%", side: -1, speed: 0.16, width: "310px", opacity: 0.46 },
  { src: `${BASE}imgPara/cloud8.PNG`, top: "32%", startX: "25%", side: -1, speed: 0.24, width: "350px", opacity: 0.56 },
  { src: `${BASE}imgPara/cloud7.PNG`, top: "36%", startX: "50%", side: 1,  speed: 0.22, width: "330px", opacity: 0.52 },
  { src: `${BASE}imgPara/cloud9.PNG`, top: "25%", startX: "32%", side: -1, speed: 0.27, width: "310px", opacity: 0.5 },
  { src: `${BASE}imgPara/cloud8.PNG`, top: "40%", startX: "62%", side: 1,  speed: 0.23, width: "340px", opacity: 0.54 },
];

const planes = [
  // startX à l'extérieur, side inversé par rapport aux nuages → vont vers le centre
  { src: `${BASE}imgPara/plane1.png`, top: "8%",  startX: "78%", side: -1, speed: 0.18, width: "90px", opacity: 0.8, flip: false },
  { src: `${BASE}imgPara/plane2.png`, top: "26%", startX: "5%",  side: 1,  speed: 0.15, width: "70px", opacity: 0.6, flip: true },
  { src: `${BASE}imgPara/plane3.PNG`, top: "16%", startX: "87%", side: -1, speed: 0.20, width: "350px", opacity: 0.7, flip: false },
  { src: `${BASE}imgPara/plane4.PNG`, top: "36%", startX: "15%",  side: 1,  speed: 0.17, width: "150px", opacity: 0.65, flip: true },
];

// Mobile-only clouds — visible only on <768px, smaller and fewer
const mobileClouds = [
  { src: `${BASE}imgPara/cloud1.PNG`, top: "2%",  startX: "5%",  side: -1, speed: 0.04, width: "140px", opacity: 0.45 },
  { src: `${BASE}imgPara/cloud2.PNG`, top: "8%",  startX: "55%", side: 1,  speed: 0.05, width: "160px", opacity: 0.4 },
  { src: `${BASE}imgPara/cloud5.PNG`, top: "16%", startX: "10%", side: -1, speed: 0.10, width: "180px", opacity: 0.5 },
  { src: `${BASE}imgPara/cloud6.PNG`, top: "22%", startX: "60%", side: 1,  speed: 0.12, width: "170px", opacity: 0.48 },
  { src: `${BASE}imgPara/cloud7.PNG`, top: "30%", startX: "20%", side: -1, speed: 0.18, width: "200px", opacity: 0.6 },
  { src: `${BASE}imgPara/cloud9.PNG`, top: "38%", startX: "50%", side: 1,  speed: 0.20, width: "190px", opacity: 0.55 },
  // Mobile planes — from outside toward center
  { src: `${BASE}imgPara/plane1.png`, top: "12%", startX: "70%", side: -1, speed: 0.14, width: "450px", opacity: 0.75, flip: false },
  { src: `${BASE}imgPara/plane2.png`, top: "34%", startX: "5%",  side: 1,  speed: 0.12, width: "90px", opacity: 0.6, flip: true },
];

const allItems = [...clouds, ...planes];
const allUltrawide = [...ultrawideOnlyClouds];
const allMobile = [...mobileClouds];
const allRefs = [...allItems, ...allUltrawide, ...allMobile];

const balloons = [
  { src: `${BASE}imgPara/m1.png`, startX: "10%", startY: "112%", speed: 0.42, width: "140px", opacity: 0.95 },
  { src: `${BASE}imgPara/m2.PNG`, startX: "48%", startY: "118%", speed: 0.38, width: "100px", opacity: 0.95 },
  { src: `${BASE}imgPara/m3.PNG`, startX: "78%", startY: "114%", speed: 0.45, width: "145px", opacity: 0.95 },
];

export const CloudBackground = () => {
  const itemRefs = useRef([]);
  const balloonRefs = useRef([]);
  const mountainsRef = useRef(null);
  const rafRef = useRef(null);
  const aboutStartScrollRef = useRef(null);
  const balloonsVisibleRef = useRef(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(() => window.innerWidth <= 768);

  // Parallax: clouds spread outward, planes come inward
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const isMobileNow = window.innerWidth <= 768;
        const nextBalloonCount = isMobileNow ? 2 : balloons.length;

        if (isMobileViewport !== isMobileNow) {
          setIsMobileViewport(isMobileNow);
        }

        let skillsExitProgress = 0;

        const skillsSection = document.getElementById("skills");
        if (skillsSection) {
          const skillsTriggerY = skillsSection.getBoundingClientRect().top + y;
          const exitStartY = Math.max(0, skillsTriggerY - window.innerHeight * 0.9);
          const exitDistance = Math.max(1, skillsTriggerY - exitStartY);
          skillsExitProgress = Math.min(1, Math.max(0, (y - exitStartY) / exitDistance));
        }

        const triggerSection = isMobileNow
          ? document.getElementById("projects")
          : document.getElementById("accueil");

        if (triggerSection) {
          const triggerTopY = triggerSection.getBoundingClientRect().top + y;
          const triggerFactor = isMobileNow ? 0 : 0.35;
          const balloonTriggerY = triggerTopY + triggerSection.offsetHeight * triggerFactor;
          const inTriggerOrBelow = y >= balloonTriggerY;

          if (inTriggerOrBelow) {
            if (!balloonsVisibleRef.current) {
              setShowBalloons(true);
              balloonsVisibleRef.current = true;
            }
            if (aboutStartScrollRef.current === null) {
              aboutStartScrollRef.current = balloonTriggerY;
            }
          } else {
            if (balloonsVisibleRef.current) {
              setShowBalloons(false);
              balloonsVisibleRef.current = false;
            }
            aboutStartScrollRef.current = null;
          }
        }

        allRefs.forEach((item, i) => {
          const el = itemRefs.current[i];
          if (el) {
            const xOffset = y * item.speed * item.side;
            const movementSide = Math.sign(item.side) || 1;
            const exitOffset = movementSide * window.innerWidth * 1.8 * skillsExitProgress;
            const flip = item.flip ? 'scaleX(-1)' : '';
            el.style.transform = `translate3d(${xOffset + exitOffset}px, 0, 0) ${flip}`;
          }
        });

        const mountainsEl = mountainsRef.current;
        if (mountainsEl) {
          const doc = document.documentElement;
          const distanceToBottom = Math.max(0, doc.scrollHeight - (y + window.innerHeight));
          const revealRange = Math.max(1, window.innerHeight * 0.7);
          const revealProgress = Math.min(1, Math.max(0, 1 - distanceToBottom / revealRange));
          const settleOffset = mountainsEl.clientHeight * 0.28;
          const lift = (1 - revealProgress) * 28;

          mountainsEl.style.opacity = String(revealProgress);
          mountainsEl.style.transform = `translate3d(0, ${settleOffset + lift}px, 0)`;
        }

        if (aboutStartScrollRef.current !== null) {
          const progress = Math.max(0, y - aboutStartScrollRef.current);
          balloons.slice(0, nextBalloonCount).forEach((balloon, i) => {
            const el = balloonRefs.current[i];
            if (el) {
              const yOffset = progress * balloon.speed;
              el.style.transform = `translate3d(0, -${yOffset}px, 0)`;
            }
          });
        }

        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 dark:hidden">
      {/* Gradient sky */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #4fb5e0, #99d8fc 50%, #6b8da7)" }} />

      {/* Horizon glow */}
      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-white/60 to-transparent" />

      {/* Mountains revealed near bottom of the page */}
      <img
        ref={mountainsRef}
        src={`${BASE}imgPara/mountains.png`}
        alt=""
        aria-hidden="true"
        draggable={false}
        decoding="async"
        className="absolute inset-x-0 bottom-0 w-full h-auto select-none pointer-events-none"
        style={{
          opacity: 0,
          transform: "translate3d(0, 260px, 0)",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
        }}
      />

      {/* All clouds & planes — desktop only */}
      {allItems.map((item, i) => (
        <img
          key={i}
          ref={(el) => { itemRefs.current[i] = el; }}
          src={item.src}
          alt=""
          draggable={false}
          decoding="async"
          className="absolute select-none desktop-cloud"
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

      {/* Ultrawide-only clouds — hidden by default, shown on 2560px+ */}
      {allUltrawide.map((item, j) => (
        <img
          key={`uw-${j}`}
          ref={(el) => { itemRefs.current[allItems.length + j] = el; }}
          src={item.src}
          alt=""
          draggable={false}
          decoding="async"
          className="absolute select-none ultrawide-cloud"
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

      {/* Mobile-only clouds — shown only on <768px */}
      {allMobile.map((item, k) => (
        <img
          key={`mob-${k}`}
          ref={(el) => { itemRefs.current[allItems.length + allUltrawide.length + k] = el; }}
          src={item.src}
          alt=""
          draggable={false}
          decoding="async"
          className="absolute select-none mobile-cloud"
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

      {/* Balloons appear from #skills on mobile and from #accueil on desktop */}
      {showBalloons && balloons.slice(0, isMobileViewport ? 2 : balloons.length).map((balloon, i) => (
        <img
          key={`balloon-${i}`}
          ref={(el) => { balloonRefs.current[i] = el; }}
          src={balloon.src}
          alt=""
          draggable={false}
          decoding="async"
          className="absolute select-none"
          style={{
            left: balloon.startX,
            top: balloon.startY,
            width: balloon.width,
            height: "auto",
            opacity: balloon.opacity,
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />
      ))}
    </div>
  );
};
