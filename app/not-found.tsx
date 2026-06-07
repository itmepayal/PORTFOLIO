"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HiArrowLeft, HiHome } from "react-icons/hi";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated floating particles on canvas
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

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.4 + 0.05,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(var(--primary) / ${p.opacity})`;
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

  const fadeUp = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        delay: i * 0.09,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* ── Grid texture ── */}
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[60px_60px]" />

      {/* ── Ambient glow blobs ── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/8 dark:bg-primary/12 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[200px] rounded-full bg-chart-3/8 blur-[100px] pointer-events-none" />

      {/* ── Particles canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center">
        {/* 404 glitch number */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="relative mb-6 select-none"
        >
          {/* shadow layer */}
          <span
            className="absolute inset-0 text-[10rem] sm:text-[13rem] font-black tracking-[-0.06em] leading-none text-primary/10 blur-sm"
            aria-hidden="true"
          >
            404
          </span>
          <span className="relative text-[10rem] sm:text-[13rem] font-black tracking-[-0.06em] leading-none bg-linear-to-b from-foreground/90 to-foreground/20 bg-clip-text text-transparent">
            404
          </span>
        </motion.div>

        {/* Divider with icon */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px flex-1 max-w-[80px] bg-border/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold bg-primary/10 border border-primary/20 rounded-lg px-3 py-1.5">
            Page Not Found
          </span>
          <div className="h-px flex-1 max-w-[80px] bg-border/60" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="text-2xl sm:text-3xl font-black tracking-[-0.03em] text-foreground mb-4 leading-tight"
        >
          Looks like you've wandered
          <span className="block bg-linear-to-r from-primary via-primary to-chart-3 bg-clip-text text-transparent">
            off the map.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="text-sm sm:text-base text-muted-foreground leading-7 mb-10 max-w-md mx-auto"
        >
          The page you're looking for doesn't exist, was moved, or the URL might
          be mistyped. Let's get you back on track.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            className="h-11 px-7 rounded-2xl text-sm shadow-lg shadow-primary/20"
            onClick={() => router.push("/")}
          >
            <HiHome className="mr-2 size-4" />
            Back to Home
          </Button>
          <Button
            variant="outline"
            className="h-11 px-7 rounded-2xl border-border/70 bg-background/70 dark:bg-background/40 backdrop-blur-xl hover:border-primary/30 hover:bg-primary/10 text-sm"
            onClick={() => router.back()}
          >
            <HiArrowLeft className="mr-2 size-4" />
            Go Back
          </Button>
        </motion.div>

        {/* Bottom hint */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="mt-10 text-[11px] text-muted-foreground/40 tracking-widest uppercase font-mono"
        >
          error · 404 · not found
        </motion.p>
      </div>
    </div>
  );
};

export default NotFound;
