"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { HiArrowDown, HiArrowRight, HiArrowUp } from "react-icons/hi2";
import { ModeToggle } from "@/components/common/ThemeToggle";
import { useLoading } from "@/context/LoadingContext";
import {
  bodySm,
  clipPathButton,
  dashboardCardShell,
  dashboardCornerAccentBottom,
  dashboardCornerAccentTop,
  dashboardHoverGlow,
  heroEyebrow,
  heroTitle,
  monoButton,
  navLink,
  sectionInner,
  statLabel,
  statValue,
} from "@/lib/ui";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ================================================================== */
/*  Data                                                               */
/* ================================================================== */
const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "GitHub", href: "#github-contrib" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const NAV_IDS = NAV_LINKS.map((l) => l.href.slice(1));

const DEFAULT_STATS = [
  { value: "0", label: "Problems Solved" },
  { value: "0", label: "Projects Built" },
  { value: "0", label: "Skills" },
  { value: "0", label: "Experiences" },
];

const ROLES = [
  "Full Stack Developer",
  "Python Backend Developer",
  "MERN Stack Developer",
  "Generative AI Developer",
  "API & Systems Engineer",
];

const TECH = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Tailwind CSS",

  "Node.js",
  "Express.js",
  "Python",
  "FastAPI",
  "Django",

  "MongoDB",
  "SQL",
  "PostgreSQL",
  "Redis",

  "REST APIs",
  "WebSockets",
  "Socket.IO",
  "JWT Authentication",

  "Docker",
  "Git",
  "GitHub",

  "Gemini API",
];

const TECH_REVERSED = [...TECH].reverse();

/* Floating code symbols in the hero background */
const SYMBOLS: { t: string; style: CSSProperties; d: number }[] = [
  { t: "{ }", style: { left: "10%", top: "62%" }, d: 0 },
  { t: "</>", style: { right: "12%", top: "68%" }, d: 0.8 },
  { t: "=>", style: { left: "22%", top: "14%" }, d: 1.6 },
  { t: "[ ]", style: { right: "24%", top: "12%" }, d: 2.4 },
  { t: "fn()", style: { left: "4%", top: "40%" }, d: 3.2 },
  { t: "0x1F", style: { right: "5%", top: "44%" }, d: 4 },
];

/* Shooting stars (deterministic) */
const STARS = [
  { top: "12%", left: "62%", delay: 1, repeat: 7 },
  { top: "26%", left: "88%", delay: 3, repeat: 9 },
  { top: "9%", left: "30%", delay: 5, repeat: 8 },
];

const buttonBase = cn(
  monoButton,
  "group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden px-8 py-3.5 transition-colors duration-200 sm:w-auto",
);

const EASE = [0.22, 1, 0.36, 1] as const;
const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

/* Hexagon shape for the PY logo */
const HEX = "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)";

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

/* Deterministic particles (same on server + client, no hydration mismatch) */
const PARTICLES = Array.from({ length: 28 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin(i * 97.13 + n * 13.7) * 10000;
    return x - Math.floor(x);
  };
  return {
    left: `${Math.round(r(1) * 100)}%`,
    size: 2 + Math.round(r(2) * 3),
    duration: 7 + r(3) * 9,
    delay: r(4) * 4,
    drift: (r(5) - 0.5) * 120,
  };
});

/* CSS for the marquee, selection and focus styles */
const PAGE_CSS = `
@keyframes pf-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.pf-marquee { animation: pf-marquee var(--d, 30s) linear infinite; will-change: transform; }
.pf-marquee-rev { animation-direction: reverse; }
.pf-marquee-wrap:hover .pf-marquee { animation-play-state: paused; }
.pf-selection ::selection { background: color-mix(in oklch, var(--color-primary) 35%, transparent); }
.pf-focus a:focus-visible, .pf-focus button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}
html { scroll-behavior: smooth; scroll-padding-top: 80px; }
@media (prefers-reduced-motion: reduce) {
  .pf-marquee { animation: none; }
  html { scroll-behavior: auto; }
}
`;

/* ================================================================== */
/*  Variants (timings kept short so everything loads fast)             */
/* ================================================================== */

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE },
  },
};

const statsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const statCard: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.88, rotateX: -20 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { type: "spring", stiffness: 190, damping: 16 },
  },
};

/* Mobile drawer */
const drawerPanel: Variants = {
  hidden: { x: "100%" },
  show: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 34,
      staggerChildren: 0.05,
      delayChildren: 0.08,
    },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

const drawerItem: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.28, ease: EASE } },
};

/* Logo letters */
const logoLetter = (dir: 1 | -1): Variants => ({
  rest: { y: 0, rotate: 0, scale: 1 },
  hover: {
    y: -3,
    rotate: dir * 8,
    scale: 1.15,
    transition: { type: "spring", stiffness: 400, damping: 12 },
  },
});

/* ================================================================== */
/*  Hooks                                                              */
/* ================================================================== */

/** Jo section viewport mein hai, uska nav link active dikhata hai */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return active;
}

/** Mobile menu khula ho to page scroll lock + Escape se close */
function useMobileMenuEffects(open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onResize = () => {
      if (window.innerWidth >= 900) close();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);
}

/* ================================================================== */
/*  Text effects                                                       */
/* ================================================================== */

/* ---------- Split text (letter reveal + hover lift) ---------- */

function SplitText({ text, delay = 0 }: { text: string; delay?: number }) {
  let index = 0;
  return (
    <span aria-label={text} className="inline-block">
      {text.split(" ").map((word, wi, arr) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          {word.split("").map((ch) => {
            const i = index++;
            return (
              <span
                key={i}
                className="-my-[0.12em] inline-block overflow-hidden py-[0.12em] align-bottom"
              >
                <motion.span
                  className="inline-block cursor-default transition-colors duration-200 hover:text-primary"
                  initial={{ y: "115%", rotate: 10, opacity: 0 }}
                  animate={{ y: "0%", rotate: 0, opacity: 1 }}
                  whileHover={{ y: "-8%", scale: 1.12 }}
                  transition={{
                    delay: delay + i * 0.03,
                    duration: 0.55,
                    ease: EASE,
                  }}
                >
                  {ch}
                </motion.span>
              </span>
            );
          })}
          {wi < arr.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
}

/* ---------- Word reveal (blur-to-sharp, word by word) ---------- */

function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span aria-label={text}>
      {text.split(" ").map((word, i, arr) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: delay + i * 0.02, duration: 0.45, ease: EASE }}
        >
          {word}
          {i < arr.length - 1 ? "\u00A0" : null}
        </motion.span>
      ))}
    </span>
  );
}

/* ---------- Scramble text (hover par decrypt effect) ---------- */

function ScrambleText({ text, reduce }: { text: string; reduce: boolean }) {
  const [out, setOut] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  const run = useCallback(() => {
    if (reduce) return;
    stop();
    let frame = 0;
    const total = text.length * 3;
    timer.current = setInterval(() => {
      frame++;
      const reveal = Math.floor(frame / 3);
      setOut(
        text
          .split("")
          .map((c, i) =>
            c === " " || i < reveal
              ? c
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      if (frame >= total) {
        stop();
        setOut(text);
      }
    }, 28);
  }, [text, reduce, stop]);

  useEffect(() => stop, [stop]);

  return (
    <span onMouseEnter={run} onFocus={run} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}

/* ---------- Typewriter ---------- */

function Typewriter({
  phrases,
  reduce,
}: {
  phrases: string[];
  reduce: boolean;
}) {
  const [text, setText] = useState(reduce ? phrases[0] : "");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const full = phrases[index];
    let delay = deleting ? 24 : 60;
    if (!deleting && text === full) delay = 1600;
    if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else {
        setText(
          deleting
            ? full.slice(0, text.length - 1)
            : full.slice(0, text.length + 1),
        );
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, phrases, reduce]);

  return (
    <span className="inline-flex min-h-[1.5em] items-center">
      {text}
      <motion.span
        aria-hidden
        className="ml-1 inline-block h-[1em] w-0.5 bg-primary shadow-[0_0_8px_var(--color-primary)]"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
      />
    </span>
  );
}

/* ---------- Count-up number ---------- */

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce || target === 0) {
      setDisplay(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, reduce]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ================================================================== */
/*  Interaction helpers                                                */
/* ================================================================== */

/* ---------- Magnetic wrapper ---------- */

function Magnetic({
  children,
  reduce,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  reduce: boolean;
  strength?: number;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 });

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className ?? "w-full sm:w-auto"}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Custom cursor + click ripple + soft trail glow ---------- */

function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 });
  const glowX = useSpring(x, { stiffness: 70, damping: 18, mass: 0.8 });
  const glowY = useSpring(y, { stiffness: 70, damping: 18, mass: 0.8 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      setHovering(Boolean(el?.closest("a, button")));
    };
    const down = (e: MouseEvent) => {
      setRipples((p) => [
        ...p.slice(-4),
        { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY },
      ]);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* soft trailing glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-97 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-2xl"
        style={{ x: glowX, y: glowY }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-100 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-99 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/70"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovering ? 54 : 32,
          height: hovering ? 54 : 32,
          backgroundColor: hovering
            ? "color-mix(in oklch, var(--color-primary) 14%, transparent)"
            : "transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-98 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary"
          style={{ x: r.x, y: r.y }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          onAnimationComplete={() =>
            setRipples((p) => p.filter((i) => i.id !== r.id))
          }
        />
      ))}
    </>
  );
}

/* ---------- Back to top (scroll progress ring) ---------- */

function BackToTop({
  progress,
  scrollY,
}: {
  progress: MotionValue<number>;
  scrollY: MotionValue<number>;
}) {
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 500));

  return (
    <AnimatePresence>
      {show ? (
        <motion.a
          href="#hero"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.4, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 30 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-5 right-5 z-50 flex size-12 items-center justify-center rounded-full border border-border bg-card/80 text-primary shadow-[0_0_18px_color-mix(in_oklch,var(--color-primary)_30%,transparent)] backdrop-blur-xl"
        >
          <svg
            viewBox="0 0 48 48"
            className="absolute inset-0 size-full -rotate-90"
            aria-hidden
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              strokeWidth="2"
              style={{
                stroke:
                  "color-mix(in oklch, var(--color-primary) 18%, transparent)",
              }}
            />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: progress, stroke: "var(--color-primary)" }}
            />
          </svg>
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
          >
            <HiArrowUp className="size-4" />
          </motion.span>
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}

/* ================================================================== */
/*  Background decorations                                             */
/* ================================================================== */

function FloatingSymbols() {
  return (
    <>
      {SYMBOLS.map((s) => (
        <motion.span
          key={s.t}
          aria-hidden
          className="pointer-events-none absolute hidden select-none font-mono text-lg text-primary/30 lg:block"
          style={s.style}
          animate={{
            y: [0, -22, 0],
            rotate: [-6, 6, -6],
            opacity: [0.25, 0.7, 0.25],
          }}
          transition={{
            duration: 6 + s.d,
            delay: s.d * 0.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          {s.t}
        </motion.span>
      ))}
    </>
  );
}

function ShootingStars() {
  return (
    <>
      {STARS.map((s, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute h-px w-24 origin-right -rotate-35 bg-linear-to-l from-primary to-transparent"
          style={{ top: s.top, left: s.left }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], x: [0, -320], y: [0, 220] }}
          transition={{
            duration: 1.2,
            delay: s.delay,
            ease: "easeIn",
            repeat: Infinity,
            repeatDelay: s.repeat,
          }}
        />
      ))}
    </>
  );
}

function PulseRings() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 size-130 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: [0.3, 1.5], opacity: [0.5, 0] }}
          transition={{
            duration: 7,
            delay: i * 2.3,
            ease: "easeOut",
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

/* ================================================================== */
/*  Availability badge                                                 */
/* ================================================================== */

function AvailabilityBadge({ reduce }: { reduce: boolean }) {
  return (
    <motion.a
      href={`mailto:${SITE.email}`}
      variants={fadeUp}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="group relative mb-5 inline-flex items-center gap-2.5 overflow-hidden border border-primary/30 bg-card/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground backdrop-blur-md transition-colors hover:border-primary hover:text-primary"
      style={{ clipPath: clipPathButton }}
    >
      <span className="relative flex size-2">
        {!reduce ? (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
        ) : null}
        <span className="relative inline-flex size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgb(52_211_153)]" />
      </span>
      <span>Open to work</span>
      <HiArrowRight className="size-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
    </motion.a>
  );
}

/* ================================================================== */
/*  Stat card: entry + idle float + 3D tilt + cursor glare + scan line */
/* ================================================================== */

function StatCard({
  stat,
  index,
  reduce,
}: {
  stat: { value: string; label: string };
  index: number;
  reduce: boolean;
}) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 16 });
  const sry = useSpring(ry, { stiffness: 220, damping: 16 });

  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glareOpacity = useSpring(0, { stiffness: 160, damping: 20 });
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, color-mix(in oklch, white 22%, transparent), transparent 55%)`;

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 22);
    rx.set(-(py - 0.5) * 22);
    gx.set(px * 100);
    gy.set(py * 100);
    glareOpacity.set(1);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      variants={statCard}
      className="h-full"
      style={{ transformPerspective: 900 }}
    >
      <motion.div
        className="h-full"
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={{
          duration: 3.5 + index * 0.4,
          ease: "easeInOut",
          repeat: Infinity,
          delay: index * 0.2,
        }}
      >
        <motion.div
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          whileHover={{ scale: 1.06 }}
          style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
          className={cn(
            dashboardCardShell,
            "group relative flex h-full flex-col items-center justify-center overflow-hidden px-4 py-5 sm:py-6",
          )}
        >
          <span className={dashboardCornerAccentTop} />
          <span className={dashboardCornerAccentBottom} />
          <span
            className={dashboardHoverGlow}
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, color-mix(in oklch, var(--color-primary) 8%, transparent), transparent 75%)",
            }}
          />
          {/* scan line sweeping across the top edge */}
          {!reduce ? (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 h-px w-1/3 bg-linear-to-r from-transparent via-primary to-transparent"
              animate={{ x: ["-100%", "320%"] }}
              transition={{
                duration: 2.2,
                delay: index * 0.4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          ) : null}
          {/* cursor ke sath chalne wala glare */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: glare, opacity: glareOpacity }}
          />
          <div className={statValue}>
            <CountUp value={stat.value} />
          </div>
          <div className={cn("mt-1.5", statLabel)}>{stat.label}</div>

          {/* bottom accent bar that grows on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-primary via-secondary-foreground to-chart-3 transition-transform duration-500 group-hover:scale-x-100"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ================================================================== */
/*  Tech marquee (2 rows, opposite directions, pauses on hover)        */
/* ================================================================== */

function MarqueeRow({
  items,
  reverse = false,
  duration = 30,
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn("pf-marquee flex w-max", reverse && "pf-marquee-rev")}
      style={{ "--d": `${duration}s` } as CSSProperties}
    >
      {doubled.map((t, i) => (
        <span
          key={`${t}-${i}`}
          className="mr-3 shrink-0 cursor-default border border-border bg-card/70 px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:border-primary hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_16px_color-mix(in_oklch,var(--color-primary)_35%,transparent)]"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function Marquee() {
  return (
    <div
      className="pf-marquee-wrap relative mt-10 flex w-full flex-col gap-3 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)",
      }}
    >
      <MarqueeRow items={TECH} duration={32} />
      <MarqueeRow items={TECH_REVERSED} reverse duration={38} />
    </div>
  );
}

/* ================================================================== */
/*  NAVBAR PARTS                                                       */
/* ================================================================== */

/* ---------- PY logo: hexagon mark, spinning gradient border ---------- */

function Logo({
  reduce,
  size = "md",
}: {
  reduce: boolean;
  size?: "md" | "lg";
}) {
  return (
    <motion.a
      href="#hero"
      aria-label="PY - Home"
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.9 }}
      className={cn(
        "relative flex shrink-0 items-center justify-center",
        size === "lg" ? "size-14" : "size-11",
      )}
    >
      {/* outer glow */}
      {!reduce ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-primary/40 blur-xl"
          animate={{ opacity: [0.15, 0.5, 0.15], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        />
      ) : null}

      {/* spinning conic border (clipped to hexagon) */}
      <span
        aria-hidden
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: HEX }}
      >
        <motion.span
          className="absolute left-1/2 top-1/2 size-[200%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "conic-gradient(from 0deg, var(--color-primary), transparent 30%, var(--color-secondary-foreground) 55%, transparent 75%, var(--color-chart-3))",
          }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 5, ease: "linear", repeat: Infinity }}
        />
      </span>

      {/* inner face */}
      <span
        aria-hidden
        className="absolute inset-0.5 bg-background"
        style={{ clipPath: HEX }}
      />
      <span
        aria-hidden
        className="absolute inset-0.5 bg-linear-to-br from-primary/15 to-transparent"
        style={{ clipPath: HEX }}
      />

      {/* PY letters */}
      <span
        className={cn(
          "relative z-10 flex items-baseline font-bold leading-none tracking-tight",
          size === "lg" ? "text-xl" : "text-base",
        )}
      >
        <motion.span
          variants={logoLetter(-1)}
          className="inline-block bg-linear-to-br from-primary to-secondary-foreground bg-clip-text text-transparent"
        >
          P
        </motion.span>
        <motion.span
          variants={logoLetter(1)}
          className="inline-block bg-linear-to-br from-secondary-foreground to-chart-3 bg-clip-text text-transparent"
        >
          Y
        </motion.span>
      </span>

      {/* tiny status dot */}
      <motion.span
        aria-hidden
        className="absolute -right-0.5 top-1 z-10 size-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]"
        animate={
          reduce ? undefined : { scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }
        }
        transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
      />
    </motion.a>
  );
}

/* ---------- Hire me button ---------- */

function HireButton({ reduce }: { reduce: boolean }) {
  return (
    <Magnetic
      reduce={reduce}
      strength={0.2}
      className="hidden min-[900px]:block"
    >
      <motion.a
        href={`mailto:${SITE.email}`}
        initial={{ opacity: 0, x: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={
          reduce
            ? { opacity: 1, x: 0 }
            : {
                opacity: 1,
                x: 0,
                boxShadow: [
                  "0 0 0 0 color-mix(in oklch, var(--color-primary) 0%, transparent)",
                  "0 0 18px 2px color-mix(in oklch, var(--color-primary) 35%, transparent)",
                  "0 0 0 0 color-mix(in oklch, var(--color-primary) 0%, transparent)",
                ],
              }
        }
        transition={{
          opacity: { delay: 0.3, duration: 0.35 },
          x: { delay: 0.3, duration: 0.35, ease: EASE },
          boxShadow: { duration: 2.8, ease: "easeInOut", repeat: Infinity },
        }}
        className="group relative inline-flex items-center gap-2 overflow-hidden border border-primary/60 px-4 py-2 font-mono text-xs uppercase tracking-wide text-primary"
        style={{ clipPath: clipPathButton }}
      >
        <span
          aria-hidden
          className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"
        />
        {!reduce ? (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -skew-x-20 bg-primary/25"
            animate={{ x: ["0%", "650%"] }}
            transition={{
              duration: 1.4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 2.6,
            }}
          />
        ) : null}
        <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-primary-foreground">
          Hire Me
          <motion.span
            animate={reduce ? undefined : { x: [0, 4, 0] }}
            transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
            className="inline-flex"
          >
            <HiArrowRight className="size-3" />
          </motion.span>
        </span>
      </motion.a>
    </Magnetic>
  );
}

/* ---------- Desktop links: glass capsule + single sliding pill ---------- */

function DesktopLinks({ active, reduce }: { active: string; reduce: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null);
  /* pill hover par us link pe jata hai, mouse hatne par active link pe wapas */
  const target = hovered ?? (NAV_IDS.includes(active) ? `#${active}` : null);

  return (
    <motion.ul
      initial={{ opacity: 0, y: -14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.1, duration: 0.4, ease: EASE }}
      onMouseLeave={() => setHovered(null)}
      className="relative hidden list-none items-center gap-1 border border-primary/30 bg-card/60 px-4 py-1.5 shadow-[0_0_24px_-10px_var(--color-primary),inset_0_1px_0_color-mix(in_oklch,white_8%,transparent)] backdrop-blur-xl before:pointer-events-none before:absolute before:-left-px before:-top-px before:size-2.5 before:border-l-2 before:border-t-2 before:border-primary after:pointer-events-none after:absolute after:-bottom-px after:-right-px after:size-2.5 after:border-b-2 after:border-r-2 after:border-primary min-[900px]:flex"
    >
      {NAV_LINKS.map((link, i) => {
        const isActive = active === link.href.slice(1);
        return (
          <motion.li
            key={link.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.04, duration: 0.3, ease: EASE }}
            onMouseEnter={() => setHovered(link.href)}
            onFocus={() => setHovered(link.href)}
            onBlur={() => setHovered(null)}
            className="relative"
          >
            {target === link.href ? (
              <motion.span
                layoutId="nav-pill"
                aria-hidden
                className="absolute inset-0 border border-primary/40 bg-primary/12 shadow-[0_0_18px_-4px_var(--color-primary)]"
                transition={{ type: "spring", stiffness: 500, damping: 34 }}
              />
            ) : null}
            <motion.a
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              whileTap={{ scale: 0.94 }}
              className={cn(
                navLink,
                "relative z-10 flex items-baseline gap-2 px-5 py-2",
                isActive && "text-primary",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "font-mono text-[9px] tracking-widest transition-colors",
                  isActive || target === link.href
                    ? "text-primary"
                    : "text-primary/40",
                )}
              >
                0{i + 1}
              </span>
              <ScrambleText text={link.label} reduce={reduce} />
              {isActive ? (
                <motion.span
                  layoutId="nav-dot"
                  aria-hidden
                  className="absolute -top-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]"
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                />
              ) : null}
            </motion.a>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

/* ---------- Mobile drawer (slides from right) ---------- */

function MobileDrawer({
  open,
  active,
  reduce,
  onClose,
}: {
  open: boolean;
  active: string;
  reduce: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            key="backdrop"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-55 bg-background/70 backdrop-blur-md min-[900px]:hidden"
          />
          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            variants={drawerPanel}
            initial="hidden"
            animate="show"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 90 || info.velocity.x > 500) onClose();
            }}
            className="fixed inset-y-0 right-0 z-60 flex w-[min(86vw,380px)] flex-col overflow-hidden border-l border-border bg-background/95 shadow-[-30px_0_60px_-30px_color-mix(in_oklch,var(--color-primary)_45%,transparent)] backdrop-blur-2xl min-[900px]:hidden"
          >
            {/* decorative grid + glow */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(color-mix(in oklch, var(--color-primary) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--color-primary) 7%, transparent) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                maskImage: "linear-gradient(180deg, black, transparent 70%)",
                WebkitMaskImage:
                  "linear-gradient(180deg, black, transparent 70%)",
              }}
            />
            {!reduce ? (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/25 blur-3xl"
                animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{
                  duration: 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            ) : null}

            {/* header */}
            <motion.div
              variants={drawerItem}
              className="relative flex items-center justify-between border-b border-border px-5 py-4"
            >
              <Logo reduce={reduce} />
              <motion.button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.85 }}
                className="flex size-10 items-center justify-center border border-border bg-card text-primary hover:border-primary"
              >
                <HiX className="size-5" />
              </motion.button>
            </motion.div>

            {/* links */}
            <nav className="relative flex flex-1 flex-col justify-center gap-1 px-3 py-6">
              {NAV_LINKS.map((link, i) => {
                const isActive = active === link.href.slice(1);
                return (
                  <motion.a
                    key={link.href}
                    variants={drawerItem}
                    href={link.href}
                    onClick={onClose}
                    whileTap={{ scale: 0.97, x: 8 }}
                    className={cn(
                      "group relative flex items-center justify-between overflow-hidden px-4 py-3.5 font-mono text-lg uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary",
                      isActive && "text-primary",
                    )}
                  >
                    {/* hover/active fill */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-0 origin-left bg-primary/10 transition-transform duration-300",
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-y-2 left-0 w-0.5 bg-primary transition-opacity",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span className="relative flex items-baseline gap-4">
                      <span
                        aria-hidden
                        className="text-xs tracking-widest text-primary/50"
                      >
                        0{i + 1}
                      </span>
                      {link.label}
                    </span>
                    <HiArrowRight className="relative size-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </motion.a>
                );
              })}
            </nav>

            {/* footer */}
            <motion.div
              variants={drawerItem}
              className="relative space-y-3 border-t border-border p-5"
            >
              <motion.a
                href={`mailto:${SITE.email}`}
                onClick={onClose}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 bg-linear-to-br from-primary to-secondary-foreground px-4 py-3 font-mono text-sm uppercase tracking-wide text-white"
                style={{ clipPath: clipPathButton }}
              >
                Hire Me
                <HiArrowRight className="size-4" />
              </motion.a>
              <p className="truncate text-center font-mono text-[11px] text-muted-foreground">
                {SITE.email}
              </p>
            </motion.div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

/* ---------- Navbar ---------- */

function Navbar({
  active,
  scrolled,
  hidden,
  progress,
  menuOpen,
  setMenuOpen,
  reduce,
}: {
  active: string;
  scrolled: boolean;
  hidden: boolean;
  progress: MotionValue<number>;
  menuOpen: boolean;
  setMenuOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  reduce: boolean;
}) {
  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: hidden ? -110 : 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 26 }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full"
    >
      <nav
        aria-label="Primary"
        className={cn(
          "pointer-events-auto relative grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 border-b px-4 backdrop-blur-xl transition-[background-color,border-color,box-shadow,padding] duration-500 sm:px-8 lg:px-12",
          scrolled
            ? "border-border bg-background/80 py-1.5 shadow-[0_10px_40px_-14px_color-mix(in_oklch,var(--color-primary)_50%,transparent)] sm:py-2"
            : "border-border/50 bg-background/50 py-2.5 sm:py-3",
        )}
      >
        {/* light sweep every time the bar changes state */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <motion.span
            key={scrolled ? "scrolled" : "top"}
            className="absolute inset-y-0 left-0 w-1/4 -skew-x-20 bg-linear-to-r from-transparent via-primary/20 to-transparent"
            initial={{ x: "-120%" }}
            animate={{ x: "520%" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        </span>

        {/* animated gradient line along the top edge */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-80"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, var(--color-primary), var(--color-secondary-foreground), var(--color-chart-3), transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={
            reduce ? undefined : { backgroundPosition: ["0% 0%", "200% 0%"] }
          }
          transition={{ duration: 5, ease: "linear", repeat: Infinity }}
        />

        {/* travelling light across the top edge */}
        {!reduce ? (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute top-0 h-0.5 w-40 bg-linear-to-r from-transparent via-primary to-transparent shadow-[0_0_12px_var(--color-primary)]"
            initial={{ left: "-12%" }}
            animate={{ left: ["-12%", "105%"] }}
            transition={{
              duration: 2.2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 3.5,
            }}
          />
        ) : null}

        {/* corner accents */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -left-px -top-px size-2 border-l border-t border-primary transition-opacity duration-300",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -bottom-px -right-px size-2 border-b border-r border-primary transition-opacity duration-300",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />

        {/* scroll progress bar */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress, transformOrigin: "0% 50%" }}
          className="absolute inset-x-0 -bottom-px h-0.5 bg-linear-to-r from-primary via-secondary-foreground to-chart-3 shadow-[0_0_12px_var(--color-primary)]"
        />

        {/* LEFT: PY logo */}
        <motion.div
          initial={{ opacity: 0, x: -20, rotate: -20 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18,
            delay: 0.05,
          }}
          className="justify-self-start"
        >
          <Logo reduce={reduce} />
        </motion.div>

        {/* CENTER: links capsule */}
        <div className="flex justify-center">
          <DesktopLinks active={active} reduce={reduce} />
        </div>

        {/* RIGHT: hire, theme, menu */}
        <div className="flex items-center justify-self-end gap-2 sm:gap-3">
          <HireButton reduce={reduce} />

          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              delay: 0.25,
              type: "spring",
              stiffness: 260,
              damping: 16,
            }}
            whileHover={{ scale: 1.1, rotate: 8 }}
            whileTap={{ scale: 0.9 }}
            className="flex size-9 items-center justify-center border border-border bg-card hover:border-primary"
          >
            <ModeToggle />
          </motion.div>

          <motion.button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 260,
              damping: 16,
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.85 }}
            className="flex size-9 items-center justify-center border border-border bg-card hover:border-primary min-[900px]:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.16 }}
                className="block"
              >
                {menuOpen ? (
                  <HiX className="size-5 text-primary" />
                ) : (
                  <HiMenu className="size-5 text-muted-foreground" />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>
    </motion.header>
  );
}

/* ================================================================== */
/*  Home                                                               */
/* ================================================================== */

export const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduce = useReducedMotion() ?? false;
  const active = useActiveSection(NAV_IDS);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useMobileMenuEffects(menuOpen, closeMenu);

  /* scroll effects */
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const contentY = useTransform(scrollY, [0, 500], [0, -70]);
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0.25]);
  const gridY = useTransform(scrollY, [0, 600], [0, 90]);
  const auroraScale = useTransform(scrollY, [0, 600], [1, 1.4]);

  /* navbar: solid after scroll + neeche scroll par chhup, upar scroll par wapas */
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    setHidden(latest > prev && latest > 260 && !menuOpen);
  });

  /* mouse spotlight (px) + normalized mouse (-0.5..0.5) for parallax */
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const sx = useSpring(mx, { stiffness: 110, damping: 20 });
  const sy = useSpring(my, { stiffness: 110, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, color-mix(in oklch, var(--color-primary) 16%, transparent), transparent 70%)`;

  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const snx = useSpring(nx, { stiffness: 60, damping: 20 });
  const sny = useSpring(ny, { stiffness: 60, damping: 20 });
  const orbAx = useTransform(snx, [-0.5, 0.5], [60, -60]);
  const orbAy = useTransform(sny, [-0.5, 0.5], [40, -40]);
  const orbBx = useTransform(snx, [-0.5, 0.5], [-70, 70]);
  const orbBy = useTransform(sny, [-0.5, 0.5], [-50, 50]);

  const onHeroMove = (e: ReactMouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
    nx.set((e.clientX - r.left) / r.width - 0.5);
    ny.set((e.clientY - r.top) / r.height - 0.5);
  };

  const { trackPromise } = useLoading();

  useEffect(() => {
    const controller = new AbortController();
    const statsPromise = fetch("/api/public/stats", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success || !data.stats) return;
        const s = data.stats;
        setStats([
          {
            value: s.problemsSolved > 0 ? `${s.problemsSolved}+` : "0",
            label: "Problems Solved",
          },
          { value: String(s.projects), label: "Projects Built" },
          { value: String(s.skills), label: "Skills" },
          { value: String(s.experiences), label: "Experiences" },
        ]);
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        console.warn("Failed to load public stats:", err);
      });

    trackPromise("home-stats", statsPromise);

    return () => controller.abort();
  }, [trackPromise]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="pf-selection pf-focus">
        <style>{PAGE_CSS}</style>
        <CursorFollower />
        <BackToTop progress={progress} scrollY={scrollY} />

        {/* ============================ NAV ============================ */}
        <Navbar
          active={active}
          scrolled={scrolled}
          hidden={hidden}
          progress={progress}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          reduce={reduce}
        />
        <MobileDrawer
          open={menuOpen}
          active={active}
          reduce={reduce}
          onClose={closeMenu}
        />

        {/* ============================ HERO ============================ */}
        <section
          id="hero"
          onMouseMove={onHeroMove}
          className={cn(
            sectionInner,
            "relative flex min-h-screen flex-col items-center justify-center overflow-hidden pb-12 pt-24 text-center sm:pb-16 sm:pt-28",
          )}
        >
          {/* Slow rotating aurora */}
          {!reduce ? (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 size-225 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
              style={{
                scale: auroraScale,
                background:
                  "conic-gradient(from 0deg, color-mix(in oklch, var(--color-primary) 30%, transparent), transparent 25%, color-mix(in oklch, var(--color-secondary-foreground) 30%, transparent) 50%, transparent 75%, color-mix(in oklch, var(--color-primary) 30%, transparent))",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            />
          ) : null}

          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={
              reduce
                ? { opacity: 1 }
                : { opacity: 1, backgroundPosition: ["0px 0px", "60px 60px"] }
            }
            transition={{
              opacity: { duration: 0.8 },
              backgroundPosition: {
                duration: 8,
                ease: "linear",
                repeat: Infinity,
              },
            }}
            style={{
              y: reduce ? 0 : gridY,
              backgroundImage:
                "linear-gradient(color-mix(in oklch, var(--color-primary) 8%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--color-primary) 8%, transparent) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage:
                "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)",
            }}
          />

          {/* Pulse rings, shooting stars, floating code symbols */}
          {!reduce ? (
            <>
              <PulseRings />
              <ShootingStars />
              <FloatingSymbols />
            </>
          ) : null}

          {/* Cursor spotlight */}
          {!reduce ? (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: spotlight }}
            />
          ) : null}

          {/* Big floating glow orbs (mouse parallax + idle float) */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-1/4"
            style={reduce ? undefined : { x: orbAx, y: orbAy }}
          >
            <motion.div
              className="size-80 rounded-full bg-primary/25 blur-3xl"
              animate={
                reduce
                  ? undefined
                  : {
                      x: [0, 120, -40, 0],
                      y: [0, -80, 60, 0],
                      scale: [1, 1.25, 0.9, 1],
                    }
              }
              transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
            />
          </motion.div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-24 bottom-1/4"
            style={reduce ? undefined : { x: orbBx, y: orbBy }}
          >
            <motion.div
              className="size-96 rounded-full bg-secondary-foreground/25 blur-3xl"
              animate={
                reduce
                  ? undefined
                  : {
                      x: [0, -100, 40, 0],
                      y: [0, 80, -60, 0],
                      scale: [1, 0.88, 1.2, 1],
                    }
              }
              transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
            />
          </motion.div>

          {/* Rising particles */}
          {!reduce
            ? PARTICLES.map((p, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 rounded-full bg-primary/60"
                  style={{ left: p.left, width: p.size, height: p.size }}
                  initial={{ y: 0, x: 0, opacity: 0 }}
                  animate={{
                    y: [0, -900],
                    x: [0, p.drift],
                    opacity: [0, 0.9, 0],
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                />
              ))
            : null}

          {/* Rotating geometric shapes */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[8%] top-[22%] hidden size-16 border border-primary/40 md:block"
            animate={reduce ? undefined : { rotate: 360, y: [0, -20, 0] }}
            transition={{
              rotate: { duration: 18, ease: "linear", repeat: Infinity },
              y: { duration: 5, ease: "easeInOut", repeat: Infinity },
            }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-[26%] left-[7%] hidden size-12 rounded-full border border-secondary-foreground/40 md:block"
            animate={
              reduce
                ? undefined
                : { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }
            }
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-[12%] top-[20%] hidden size-10 border border-chart-3/40 md:block"
            animate={reduce ? undefined : { rotate: -360 }}
            transition={{ duration: 24, ease: "linear", repeat: Infinity }}
          />

          {/* Film grain (premium texture) */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
            style={{ backgroundImage: GRAIN }}
          />

          {/* Soft vignette so the edges blend into the next section */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent"
          />

          {/* Content (parallax on scroll) */}
          <motion.div
            style={
              reduce ? undefined : { y: contentY, opacity: contentOpacity }
            }
            className="relative z-10 w-full"
          >
            <motion.div
              variants={heroContainer}
              initial="hidden"
              animate="show"
              className="mx-auto flex max-w-4xl flex-col items-center"
            >
              {/* Availability badge */}
              <AvailabilityBadge reduce={reduce} />

              {/* Typewriter roles with terminal prompt */}
              <motion.p variants={fadeUp} className={cn("mb-6", heroEyebrow)}>
                <span
                  aria-hidden
                  className="mr-2 select-none font-mono text-primary/70"
                >
                  {">"}
                </span>
                <Typewriter phrases={ROLES} reduce={reduce} />
              </motion.p>

              {/* Title */}
              <h1 className={cn("mb-6", heroTitle)}>
                <SplitText text={SITE.name} delay={0.1} />
                <br />
                <motion.span
                  className="inline-block bg-linear-to-r from-primary via-secondary-foreground to-chart-3 bg-clip-text text-transparent"
                  style={{ backgroundSize: "200% 200%" }}
                  initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    ...(reduce
                      ? {}
                      : {
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }),
                  }}
                  transition={{
                    default: { duration: 0.6, delay: 0.4, ease: EASE },
                    backgroundPosition: {
                      duration: 5,
                      ease: "easeInOut",
                      repeat: Infinity,
                    },
                  }}
                >
                  {SITE.title}.
                </motion.span>
              </h1>

              {/* Description (word-by-word blur reveal) */}
              <p className={cn("mb-8 max-w-2xl sm:mb-10", bodySm)}>
                <WordReveal
                  delay={0.45}
                  text="I build scalable backend systems, enterprise-grade APIs, and production-ready full-stack applications with clean architecture and strong security."
                />
              </p>

              {/* CTA buttons (magnetic) */}
              <motion.div
                variants={fadeUp}
                className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
              >
                <Magnetic reduce={reduce}>
                  <motion.a
                    href={SITE.resumePath}
                    download
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={
                      reduce
                        ? undefined
                        : {
                            boxShadow: [
                              "0 0 0 0 color-mix(in oklch, var(--color-primary) 0%, transparent)",
                              "0 0 28px 4px color-mix(in oklch, var(--color-primary) 40%, transparent)",
                              "0 0 0 0 color-mix(in oklch, var(--color-primary) 0%, transparent)",
                            ],
                          }
                    }
                    transition={{
                      boxShadow: {
                        duration: 2.6,
                        ease: "easeInOut",
                        repeat: Infinity,
                      },
                    }}
                    className={cn(
                      buttonBase,
                      "bg-linear-to-br from-primary to-secondary-foreground text-white hover:opacity-90",
                    )}
                    style={{ clipPath: clipPathButton }}
                  >
                    {/* shimmer sweep */}
                    {!reduce ? (
                      <motion.span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -skew-x-20 bg-white/35"
                        animate={{ x: ["0%", "600%"] }}
                        transition={{
                          duration: 1.6,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      />
                    ) : null}
                    <motion.span
                      animate={reduce ? undefined : { y: [0, 4, 0] }}
                      transition={{
                        duration: 1.2,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                      className="inline-flex"
                    >
                      <HiArrowDown className="size-3.5" />
                    </motion.span>
                    Download Resume
                  </motion.a>
                </Magnetic>

                <Magnetic reduce={reduce}>
                  <motion.a
                    href={`mailto:${SITE.email}`}
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      buttonBase,
                      "border border-border text-muted-foreground hover:border-primary hover:text-primary",
                    )}
                    style={{ clipPath: clipPathButton }}
                  >
                    {/* fill sweep on hover */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-primary/10 transition-transform duration-500 group-hover:scale-x-100"
                    />
                    <span className="relative inline-flex items-center gap-2.5">
                      <ScrambleText text="Hire Me" reduce={reduce} />
                      <motion.span
                        animate={reduce ? undefined : { x: [0, 5, 0] }}
                        transition={{
                          duration: 1.2,
                          ease: "easeInOut",
                          repeat: Infinity,
                        }}
                        className="inline-flex"
                      >
                        <HiArrowRight className="size-3.5" />
                      </motion.span>
                    </span>
                  </motion.a>
                </Magnetic>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={statsContainer}
                className="mt-10 grid w-full grid-cols-2 gap-3 border-t border-border pt-8 sm:grid-cols-4 sm:gap-4"
              >
                {stats.map((stat, i) => (
                  <StatCard
                    key={stat.label}
                    stat={stat}
                    index={i}
                    reduce={reduce}
                  />
                ))}
              </motion.div>

              {/* Tech marquee */}
              <motion.div variants={fadeUp} className="w-full">
                <Marquee />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll cue (mouse icon with moving wheel + label) */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-4 z-10 hidden justify-center sm:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <a
              href="#projects"
              aria-label="Scroll to projects"
              className="pointer-events-auto flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary"
            >
              <span className="flex h-9 w-5 justify-center rounded-full border border-current pt-1.5">
                <motion.span
                  className="block h-1.5 w-0.5 rounded-full bg-current"
                  animate={reduce ? undefined : { y: [0, 12], opacity: [1, 0] }}
                  transition={{
                    duration: 1.4,
                    ease: "easeOut",
                    repeat: Infinity,
                  }}
                />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em]">
                Scroll
              </span>
            </a>
          </motion.div>
        </section>
      </div>
    </MotionConfig>
  );
};
