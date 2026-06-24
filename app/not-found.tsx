"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaHouse, FaArrowLeft, FaTriangleExclamation } from "react-icons/fa6";

const NotFound = () => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const computedStyle = getComputedStyle(document.documentElement);
    const accentRaw = computedStyle.getPropertyValue("--accent-raw").trim();
    const cyanColor = computedStyle.getPropertyValue("--cyan").trim();

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.35 + 0.05,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(91, 110, 245, ${p.opacity})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden bg-background text-foreground">
      <main className="flex-1 flex items-center justify-center min-h-screen px-[5%] pt-16 relative overflow-hidden">
        <div className="py-grid-bg absolute inset-0" />
        <div
          className="animate-py-pulse-slow absolute pointer-events-none rounded-full"
          style={{
            width: 500,
            height: 500,
            top: "5%",
            left: "-15%",
            background:
              "radial-gradient(circle, rgba(91,110,245,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-py-pulse-slower absolute pointer-events-none rounded-full"
          style={{
            width: 400,
            height: 400,
            bottom: 0,
            right: 0,
            background:
              "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)",
          }}
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
        <div className="relative z-10 w-full max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="py-fadeup-1 flex items-center gap-3 mb-6 uppercase font-mono text-xs tracking-widest text-cyan">
            <span className="w-8 h-px bg-cyan opacity-40" />
            <FaTriangleExclamation className="text-cyan" />
            Error · 404 · Not Found
            <span className="w-8 h-px bg-cyan opacity-40" />
          </div>

          <div className="py-fadeup-2 py-float relative mb-4 select-none leading-none">
            <span
              className="py-num-ghost absolute inset-0 font-black leading-none pointer-events-none font-sans"
              style={{
                fontSize: "clamp(7rem, 22vw, 14rem)",
                letterSpacing: "-0.05em",
              }}
              aria-hidden="true"
            >
              404
            </span>
            <span
              className="py-num-main relative font-black leading-none font-sans"
              style={{
                fontSize: "clamp(7rem, 22vw, 14rem)",
                letterSpacing: "-0.05em",
              }}
            >
              404
            </span>
          </div>

          <div className="py-fadeup-2 flex items-center gap-4 mb-8 w-full max-w-sm">
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--border-raw))",
              }}
            />
            <span className="font-mono text-xs uppercase tracking-widest text-primary border border-primary/30 bg-primary/10 px-3 py-1.5">
              Page Not Found
            </span>
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(90deg, var(--border-raw), transparent)",
              }}
            />
          </div>

          <h1
            className="py-fadeup-3 font-bold mb-4 leading-tight font-sans text-foreground"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Looks like you&apos;ve wandered
            <br />
            <span className="py-grad-text">off the map.</span>
          </h1>

          <p className="py-fadeup-3 max-w-md mb-8 font-light leading-7 text-dimmed text-sm">
            The page you&apos;re looking for doesn&apos;t exist, was moved, or
            the URL might be mistyped. Let&apos;s get you back on track.
          </p>

          <div className="py-fadeup-4 flex gap-3 flex-wrap justify-center items-center mb-12">
            <button
              onClick={() => router.push("/")}
              className="bg-secondary font-mono text-sm tracking-wider px-8 py-3 border-0 flex items-center gap-2"
            >
              <FaHouse size={14} />
              Back to Home
            </button>
            <button
              onClick={() => router.back()}
              className="bg-secondary font-mono text-sm tracking-wider px-8 py-3 flex items-center gap-2"
            >
              <FaArrowLeft size={14} />
              Go Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
