"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { HiArrowDown, HiArrowRight } from "react-icons/hi2";
import { ModeToggle } from "@/components/common/ThemeToggle";
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
/*  Data (same as before)                                              */
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

const buttonBase = cn(
  monoButton,
  "group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden px-8 py-3.5 transition-colors duration-200 sm:w-auto",
);

const EASE = [0.22, 1, 0.36, 1] as const;
const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

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
    delay: r(4) * 8,
    drift: (r(5) - 0.5) * 120,
  };
});

/* ================================================================== */
/*  Variants                                                           */
/* ================================================================== */

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const statsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const statCard: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.85, rotateX: -25 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

const mobileMenu: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: EASE, staggerChildren: 0.06 },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.18 } },
};

const mobileItem: Variants = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0 },
};

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

/* ================================================================== */
/*  Text effects                                                       */
/* ================================================================== */

/* ---------- Split text (letter reveal + hover colour) ---------- */

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
                  transition={{
                    delay: delay + i * 0.045,
                    duration: 0.75,
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
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: delay + i * 0.035, duration: 0.6, ease: EASE }}
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

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

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
  }, [text, reduce]);

  useEffect(() => stop, []);

  return (
    <span onMouseEnter={run} aria-label={text}>
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
    let delay = deleting ? 28 : 70;
    if (!deleting && text === full) delay = 1700;
    if (deleting && text === "") delay = 350;

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
      duration: 2,
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

/* ---------- Magnetic wrapper (button cursor ki taraf kheenchta hai) ---------- */

function Magnetic({
  children,
  reduce,
  strength = 0.3,
}: {
  children: ReactNode;
  reduce: boolean;
  strength?: number;
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
      className="w-full sm:w-auto"
    >
      {children}
    </motion.div>
  );
}

/* ---------- Custom cursor (sirf mouse wale devices par) ---------- */

function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 });

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
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
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
    </>
  );
}

/* ================================================================== */
/*  Stat card: entry + idle float + 3D tilt + cursor glare             */
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
          delay: index * 0.3,
        }}
      >
        <motion.div
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          whileHover={{ scale: 1.06 }}
          style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
          className={cn(
            dashboardCardShell,
            "flex h-full flex-col items-center justify-center px-4 py-5 sm:py-6",
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
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ================================================================== */
/*  Tech marquee (2 rows, ulti directions)                             */
/* ================================================================== */

function MarqueeRow({
  items,
  reduce,
  reverse = false,
  duration = 30,
}: {
  items: string[];
  reduce: boolean;
  reverse?: boolean;
  duration?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <motion.div
      className="flex w-max"
      animate={
        reduce ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
      }
      transition={{ duration, ease: "linear", repeat: Infinity }}
    >
      {doubled.map((t, i) => (
        <span
          key={`${t}-${i}`}
          className="mr-3 shrink-0 border border-border bg-card px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-[0_0_16px_color-mix(in_oklch,var(--color-primary)_35%,transparent)]"
        >
          {t}
        </span>
      ))}
    </motion.div>
  );
}

function Marquee({ reduce }: { reduce: boolean }) {
  return (
    <div
      className="relative mt-10 flex w-full flex-col gap-3 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)",
      }}
    >
      <MarqueeRow items={TECH} reduce={reduce} duration={32} />
      <MarqueeRow items={TECH_REVERSED} reduce={reduce} reverse duration={38} />
    </div>
  );
}

/* ================================================================== */
/*  Home                                                               */
/* ================================================================== */

export const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState(DEFAULT_STATS);
  const reduce = useReducedMotion() ?? false;
  const active = useActiveSection(NAV_IDS);

  /* scroll effects */
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const contentY = useTransform(scrollY, [0, 500], [0, -70]);
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0.25]);
  const gridY = useTransform(scrollY, [0, 600], [0, 90]);
  const auroraScale = useTransform(scrollY, [0, 600], [1, 1.4]);

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

  useEffect(() => {
    fetch("/api/public/stats")
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
      .catch(() => undefined);
  }, []);

  return (
    <>
      <CursorFollower />

      {/* ============================ NAV ============================ */}
      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 16 }}
        className={cn(
          sectionInner,
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border bg-background/90 py-3 backdrop-blur-xl sm:py-4",
        )}
      >
        {/* scroll progress bar (glow ke sath) */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress, transformOrigin: "0% 50%" }}
          className="absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-primary via-secondary-foreground to-chart-3 shadow-[0_0_12px_var(--color-primary)]"
        />

        <motion.a
          href="#hero"
          whileHover={{ scale: 1.12, rotate: -3 }}
          whileTap={{ scale: 0.92 }}
          className="bg-linear-to-br from-primary to-secondary-foreground bg-clip-text text-xl font-bold text-transparent"
        >
          PY.
        </motion.a>

        <ul className="hidden list-none items-center gap-6 min-[900px]:flex">
          {NAV_LINKS.map((link, i) => {
            const isActive = active === link.href.slice(1);
            return (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                transition={{
                  delay: 0.4 + i * 0.08,
                  duration: 0.5,
                  ease: EASE,
                }}
              >
                <a
                  href={link.href}
                  className={cn(
                    navLink,
                    "group/link relative",
                    isActive && "text-primary",
                  )}
                >
                  <ScrambleText text={link.label} reduce={reduce} />
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary/60 transition-all duration-300 group-hover/link:w-full" />
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary shadow-[0_0_10px_var(--color-primary)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  ) : null}
                </a>
              </motion.li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 8 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-9 w-9 items-center justify-center border border-border bg-card hover:border-primary"
          >
            <ModeToggle />
          </motion.div>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="min-[900px]:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {menuOpen ? (
                  <HiX className="size-5 text-muted-foreground" />
                ) : (
                  <HiMenu className="size-5 text-muted-foreground" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* ========================= MOBILE MENU ========================= */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            variants={mobileMenu}
            initial="hidden"
            animate="show"
            exit="exit"
            className={cn(
              sectionInner,
              "fixed inset-x-0 top-14 z-40 border-b border-border bg-background/95 py-3 backdrop-blur-xl min-[900px]:hidden",
            )}
          >
            {NAV_LINKS.map((link) => (
              <motion.a
                key={link.href}
                variants={mobileItem}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "block py-2 font-mono text-sm uppercase tracking-wide text-muted-foreground hover:text-primary",
                  active === link.href.slice(1) && "text-primary",
                )}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

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
            opacity: { duration: 1.4 },
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
          }}
        />

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
            reduce ? undefined : { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }
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

        {/* Content (parallax on scroll) */}
        <motion.div
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
          className="relative z-10 w-full"
        >
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="mx-auto flex max-w-4xl flex-col items-center"
          >
            {/* Typewriter roles */}
            <motion.p variants={fadeUp} className={cn("mb-6", heroEyebrow)}>
              <Typewriter phrases={ROLES} reduce={reduce} />
            </motion.p>

            {/* Title */}
            <h1 className={cn("mb-6", heroTitle)}>
              <SplitText text={SITE.name} delay={0.35} />
              <br />
              <motion.span
                className="inline-block bg-linear-to-r from-primary via-secondary-foreground to-chart-3 bg-clip-text text-transparent"
                style={{ backgroundSize: "200% 200%" }}
                initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  ...(reduce
                    ? {}
                    : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }),
                }}
                transition={{
                  default: { duration: 0.9, delay: 1.1, ease: EASE },
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
                delay={1.3}
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
              <Marquee reduce={reduce} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll cue (mouse icon with moving wheel) */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-4 hidden justify-center sm:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <a
            href="#projects"
            aria-label="Scroll to projects"
            className="pointer-events-auto text-muted-foreground hover:text-primary"
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
          </a>
        </motion.div>
      </section>
    </>
  );
};
