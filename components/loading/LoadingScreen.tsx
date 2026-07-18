"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const NAME_TOP = "UJJWAL";
const NAME_BOTTOM = "PRAKASH";
const TAGLINE = "Software Engineer • Backend Developer";
const LOADING_DURATION = 2300; // ms for counter
const EXIT_DELAY = 200; // ms pause after 100
const CURTAIN_DURATION = 0.7; // seconds for shutter panels to exit

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  // Lock body scroll while loading
  useEffect(() => {
    if (phase === "loading") {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  // Smooth counter via requestAnimationFrame
  const tick = useCallback(() => {
    if (!startTimeRef.current) startTimeRef.current = performance.now();
    const elapsed = performance.now() - startTimeRef.current;
    const raw = Math.min(elapsed / LOADING_DURATION, 1);

    const eased =
      raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;

    setProgress(Math.round(eased * 100));

    if (raw < 1) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      setTimeout(() => setPhase("exiting"), EXIT_DELAY);
    }
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  useEffect(() => {
    if (phase === "exiting") {
      document.body.style.overflow = "";
      const timer = setTimeout(
        () => {
          setPhase("done");
        },
        CURTAIN_DURATION * 1000 + 300,
      );
      return () => clearTimeout(timer);
    }
  }, [phase]);

  if (phase === "done") return null;

  const isExiting = phase === "exiting";

  // Common background grid style for panels with layout containment
  const gridStyle = {
    background: "#dee1e4",
    backgroundImage:
      "radial-gradient(rgba(0, 0, 0, 0.12) 1.3px, transparent 1.3px)",
    backgroundSize: "80px 80px",
  };

  // GPU-accelerated letters entry (spring animation on translation and scale)
  const letterVariants = {
    hidden: { x: -12, opacity: 0, scale: 0.92, filter: "blur(4px)" },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 160,
        damping: 18,
        delay: 0.1 + i * 0.03,
      },
    }),
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        zIndex: 99999,
        pointerEvents: isExiting ? "none" : "auto",
      }}
    >
      {/* ── 4 STAGGERED GRID SHUTTER PANELS (GPU COMPOSITED) ────────── */}
      {[0, 1, 2, 3].map((index) => {
        const isUp = index % 2 === 0;
        return (
          <motion.div
            key={index}
            className="absolute top-0 h-full w-1/4 z-0 overflow-hidden will-change-transform"
            style={{
              ...gridStyle,
              left: `${index * 25}%`,
              borderRight: index < 3 ? "1px solid rgba(0, 0, 0, 0.04)" : "none",
            }}
            initial={{ y: "0%" }}
            animate={isExiting ? { y: isUp ? "-100%" : "100%" } : { y: "0%" }}
            transition={{
              duration: CURTAIN_DURATION,
              ease: [0.76, 0, 0.24, 1],
              delay: index * 0.06, // Snappier stagger delay
            }}
          />
        );
      })}

      {/* ── SWEEPING SCAN LINE (GPU COMPOSITED) ─────────────────────── */}
      {!isExiting && (
        <motion.div
          className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#1A4DFF]/50 to-transparent z-10 pointer-events-none will-change-transform"
          style={{ y: `${progress}vh`, top: 0 }}
          transition={{ type: "tween", ease: "linear" }}
        />
      )}

      {/* ── Content layer (fades out before shutter opens) ────────── */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full h-full select-none px-6 perspective-[1000px]"
        animate={
          isExiting
            ? { opacity: 0, scale: 0.98, filter: "blur(6px)" }
            : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* ── GIANT BACKGROUND PERCENTAGE (STRICT CONTAINMENT) ───────── */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden"
          style={{ contain: "strict" }}
        >
          <span
            className="text-[40vw] font-bold tracking-tighter"
            style={{
              fontFamily: "var(--font-inter)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(0,0,0,0.02)",
            }}
          >
            {progress}
          </span>
        </div>

        {/* ── Percentage counter ───────────────────────────────────── */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-10 md:top-10 md:right-14 z-20 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#1A4DFF] animate-pulse" />
          <span
            className="text-[clamp(0.7rem,1.2vw,1rem)] tracking-[0.25em] tabular-nums"
            style={{
              fontFamily: "var(--font-mono)",
              color: "#111111",
            }}
          >
            {String(progress).padStart(3, "0")} %
          </span>
        </div>

        {/* ── Top-left corner marker ────────────────────────────────── */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-10 md:top-10 md:left-14 z-20">
          <span
            className="text-[9px] sm:text-[11px] tracking-[0.3em] uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: "#111111",
            }}
          >
            Portfolio © 2026
          </span>
        </div>

        {/* ── Progress bar (flat editorial line) ────────────────────── */}
        <div
          className="absolute bottom-16 sm:bottom-20 left-6 right-6 sm:left-10 sm:right-10 md:left-14 md:right-14 h-[2px] rounded-full overflow-hidden z-20"
          style={{ background: "rgba(0,0,0,0.05)" }}
        >
          <motion.div
            className="h-full origin-left bg-[#1A4DFF]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        {/* ── Name typography (GPU scale & entry) ────────────────────── */}
        <div className="flex flex-col items-center gap-0 sm:gap-1 md:gap-2 z-20">
          {/* Top line: UJJWAL */}
          <div className="overflow-hidden pb-2">
            <div className="flex tracking-[-0.04em]">
              {NAME_TOP.split("").map((char, i) => (
                <motion.span
                  key={`top-${i}`}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-[clamp(2.5rem,12vw,8rem)] font-medium leading-none bg-clip-text text-transparent will-change-transform"
                  style={{
                    fontFamily: "var(--font-inter)",
                    backgroundImage:
                      "linear-gradient(180deg, #111111 0%, #333333 100%)",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Bottom line: PRAKASH */}
          <div className="overflow-hidden pb-2">
            <div className="flex tracking-[-0.04em]">
              {NAME_BOTTOM.split("").map((char, i) => (
                <motion.span
                  key={`bottom-${i}`}
                  custom={i + NAME_TOP.length}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-[clamp(2.5rem,12vw,8rem)] font-light leading-none bg-clip-text text-transparent will-change-transform"
                  style={{
                    fontFamily: "var(--font-inter)",
                    backgroundImage:
                      "linear-gradient(180deg, #222222 0%, #555555 100%)",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* ── Tagline ─────────────────────────────────────────────── */}
          <motion.div
            className="mt-6 sm:mt-8 md:mt-10 overflow-hidden flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#1A4DFF]/50" />
            <p
              className="text-[clamp(0.55rem,1.1vw,0.85rem)] tracking-[0.4em] sm:tracking-[0.5em] uppercase text-center"
              style={{
                fontFamily: "var(--font-mono)",
                color: "rgba(0, 0, 0, 0.6)",
              }}
            >
              {TAGLINE}
            </p>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#1A4DFF]/50" />
          </motion.div>
        </div>

        {/* ── Bottom-right label ────────────────────────────────────── */}
        <motion.div
          className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 md:bottom-10 md:right-14 z-20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.5, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
        >
          <span
            className="text-[9px] sm:text-[11px] tracking-[0.3em] uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: "#111111",
            }}
          >
            IIT Kanpur • India
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
