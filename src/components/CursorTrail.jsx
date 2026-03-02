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
  const isDisabledRef = useRef(false);

  useEffect(() => {
    const circles = circlesRef.current;

    circles.forEach((circle, index) => {
      if (!circle) return;
      circle.x = 0;
      circle.y = 0;
      circle.style.backgroundColor = colors[index % colors.length];
      circle.style.transition = "opacity 0.15s ease";
      circle.style.opacity = "1";
    });

    const setTrailVisibility = (visible) => {
      circles.forEach((circle) => {
        if (!circle) return;
        circle.style.opacity = visible ? "1" : "0";
      });
      isDisabledRef.current = !visible;
    };

    const shouldDisableFromTarget = (target) => {
      if (!(target instanceof Element)) return false;

      const elementAtPoint = document.elementFromPoint(
        coordsRef.current.x,
        coordsRef.current.y
      );
      const hoveredElement = elementAtPoint || target;

      const isInsideProjectsInteractiveArea = hoveredElement.closest(
        "#projects .project-list-container, #projects .project-card"
      );

      if (isInsideProjectsInteractiveArea) return true;

      const computedCursor = window.getComputedStyle(hoveredElement).cursor;

      if (computedCursor === "pointer") return true;

      const interactiveParent = hoveredElement.closest(
        "a, button, [role='button'], input[type='submit'], input[type='button']"
      );

      return Boolean(interactiveParent);
    };

    const handleMouseMove = (event) => {
      coordsRef.current.x = event.clientX;
      coordsRef.current.y = event.clientY;

      const shouldDisable = shouldDisableFromTarget(event.target);
      setTrailVisibility(!shouldDisable);
    };

    const animateCircles = () => {
      if (isDisabledRef.current) {
        animationFrameRef.current = requestAnimationFrame(animateCircles);
        return;
      }

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
