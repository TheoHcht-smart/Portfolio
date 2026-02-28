import { useEffect, useRef } from "react";

const colors = [
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
];

export const CursorTrail = () => {
  const circlesRef = useRef([]);
  const coordsRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const circles = circlesRef.current;

    circles.forEach((circle, index) => {
      if (!circle) return;
      circle.x = 0;
      circle.y = 0;
      circle.style.backgroundColor = colors[index % colors.length];
    });

    const handleMouseMove = (event) => {
      coordsRef.current.x = event.clientX;
      coordsRef.current.y = event.clientY;
    };

    const animateCircles = () => {
      let x = coordsRef.current.x;
      let y = coordsRef.current.y;

      circles.forEach((circle, index) => {
        if (!circle) return;

        circle.style.left = `${x - 12}px`;
        circle.style.top = `${y - 12}px`;
        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        if (!nextCircle) return;

        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
      });

      animationFrameRef.current = requestAnimationFrame(animateCircles);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameRef.current = requestAnimationFrame(animateCircles);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="circle"
          ref={(element) => {
            circlesRef.current[index] = element;
          }}
        />
      ))}
    </>
  );
};
