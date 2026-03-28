"use client";

import { useEffect, useRef } from "react";

export default function AdvancedCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const dot = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  const isHovering = useRef(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const animate = () => {
      dot.current.x += (mouse.current.x - dot.current.x) * 0.35;
      dot.current.y += (mouse.current.y - dot.current.y) * 0.35;

      const speed = isHovering.current ? 0.35 : 0.15;

      ring.current.x += (mouse.current.x - ring.current.x) * speed;
      ring.current.y += (mouse.current.y - ring.current.y) * speed;

      if (dotRef.current && ringRef.current) {
        dotRef.current.style.left = `${dot.current.x}px`;
        dotRef.current.style.top = `${dot.current.y}px`;

        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;

        dotRef.current.style.transform = "translate(-50%, -50%)";
        ringRef.current.style.transform = "translate(-50%, -50%)";
      }

      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", move);
    animate();

    return () => {
      document.removeEventListener("mousemove", move);
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll("a, button, .cursor-hover");

    const handleEnter = () => {
      isHovering.current = true;

      if (ringRef.current) {
        ringRef.current.classList.add("scale-100", "bg-white");
      }
    };

    const handleLeave = () => {
      isHovering.current = false;

      if (ringRef.current) {
        ringRef.current.classList.remove("scale-100", "bg-white");
      }
    };

    elements.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  // 🔥 CLICK (BLOB EFFECT)
  useEffect(() => {
    const down = () => {
      if (ringRef.current) {
        ringRef.current.classList.add("scale-75");
      }
    };

    const up = () => {
      if (ringRef.current) {
        ringRef.current.classList.remove("scale-75");
      }
    };

    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);

    return () => {
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <>
      {/* DOT */}
      <div
        ref={dotRef}
        className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-9999"
      />

      {/* RING */}
      <div
        ref={ringRef}
        className="fixed w-10 h-10 border border-primary rounded-full pointer-events-none z-9998 transition-all duration-150 ease-out mix-blend-difference"
      />
    </>
  );
}
