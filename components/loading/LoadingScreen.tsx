"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

/* ────────────────────────────────────────────────────────────────────────────
   DESIGN (PREMIUM UPGRADE):
   • Deep black background with blurred aurora glow orbs (blue & violet).
   • A giant 40vw subtle stroke text of the percentage in the background.
   • The name "UJJWAL PRAKASH" reveals with a 3D blur stagger and gradient text.
   • Progress bar has a glowing head and a gradient fill.
   • A sleek tag line with gradient accents.
   • The split curtain has a glass edge highlight before it reveals the site.
   ──────────────────────────────────────────────────────────────────────────── */

const NAME_TOP = "UJJWAL";
const NAME_BOTTOM = "PRAKASH";
const TAGLINE = "Software Engineer • Backend Developer";
const LOADING_DURATION = 2800; // ms for the counter to reach 100
const EXIT_DELAY = 600;        // ms pause after counter hits 100 before exit
const CURTAIN_DURATION = 1.2;  // seconds for the curtain to fully open

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

  // Smooth counter with easeInOut curve via requestAnimationFrame
  const tick = useCallback(() => {
    if (!startTimeRef.current) startTimeRef.current = performance.now();
    const elapsed = performance.now() - startTimeRef.current;
    const raw = Math.min(elapsed / LOADING_DURATION, 1);

    // easeInOutCubic for a satisfying acceleration / deceleration feel
    const eased =
      raw < 0.5
        ? 4 * raw * raw * raw
        : 1 - Math.pow(-2 * raw + 2, 3) / 2;

    setProgress(Math.round(eased * 100));

    if (raw < 1) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      // Counter reached 100 — pause, then begin exit
      setTimeout(() => setPhase("exiting"), EXIT_DELAY);
    }
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  // After curtain animation completes, fully unmount
  useEffect(() => {
    if (phase === "exiting") {
      document.body.style.overflow = "";
      const timer = setTimeout(() => {
        setPhase("done");
      }, CURTAIN_DURATION * 1000 + 100);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  if (phase === "done") return null;

  /* ── Letter stagger configs ───────────────────────────────────────────── */
  const letterVariants = {
    hidden: { y: "100%", opacity: 0, filter: "blur(10px)", rotateX: -45 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
        delay: 0.2 + i * 0.05,
      },
    }),
  };

  /* ── Curtain panel config ─────────────────────────────────────────────── */
  const curtainTransition = {
    duration: CURTAIN_DURATION,
    ease: [0.76, 0, 0.24, 1] as const,
  };

  const isExiting = phase === "exiting";

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        zIndex: 99999,
        pointerEvents: isExiting ? "none" : "auto",
      }}
    >
      {/* ── Left curtain panel ─────────────────────────────────────── */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full z-0 overflow-hidden flex justify-end"
        style={{ background: "#050505" }}
        initial={false}
        animate={isExiting ? { x: "-100%" } : { x: "0%" }}
        transition={curtainTransition}
      >
        <div className="absolute top-1/4 right-0 w-[60vw] h-[60vw] bg-[#1A4DFF]/10 rounded-full blur-[120px] translate-x-1/2" />
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#1A4DFF]/30 to-transparent" />
      </motion.div>

      {/* ── Right curtain panel ────────────────────────────────────── */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full z-0 overflow-hidden flex justify-start"
        style={{ background: "#050505" }}
        initial={false}
        animate={isExiting ? { x: "100%" } : { x: "0%" }}
        transition={curtainTransition}
      >
        <div className="absolute bottom-1/4 left-0 w-[60vw] h-[60vw] bg-violet-600/10 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-violet-500/30 to-transparent" />
      </motion.div>

      {/* ── Content layer (fades out before curtains open) ────────── */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full h-full select-none px-6 perspective-[1000px]"
        animate={
          isExiting
            ? { opacity: 0, scale: 0.9, filter: "blur(10px)" }
            : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* ── GIANT BACKGROUND PERCENTAGE ───────────────────────────── */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <span
            className="text-[40vw] font-bold tracking-tighter"
            style={{
              fontFamily: "var(--font-inter)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.04)",
            }}
          >
            {progress}
          </span>
        </motion.div>

        {/* ── Percentage counter ───────────────────────────────────── */}
        <motion.div
          className="absolute top-6 right-6 sm:top-8 sm:right-10 md:top-10 md:right-14 z-20 flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-2 h-2 rounded-full bg-[#1A4DFF] animate-pulse" />
          <span
            className="text-[clamp(0.7rem,1.2vw,1rem)] tracking-[0.25em] tabular-nums"
            style={{
              fontFamily: "var(--font-mono)",
              color: "#ffffff",
            }}
          >
            {String(progress).padStart(3, "0")} %
          </span>
        </motion.div>

        {/* ── Top-left corner marker ────────────────────────────────── */}
        <motion.div
          className="absolute top-6 left-6 sm:top-8 sm:left-10 md:top-10 md:left-14 z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.5, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          <span
            className="text-[9px] sm:text-[11px] tracking-[0.3em] uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: "#ffffff",
            }}
          >
            Portfolio © 2026
          </span>
        </motion.div>

        {/* ── Progress bar (sleek, glowing) ─────────────────────────── */}
        <div
          className="absolute bottom-16 sm:bottom-20 left-6 right-6 sm:left-10 sm:right-10 md:left-14 md:right-14 h-[2px] rounded-full overflow-hidden z-20"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <motion.div
            className="h-full origin-left relative"
            style={{ background: "linear-gradient(90deg, #1A4DFF 0%, #87CEFA 100%)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.1, ease: "linear" }}
          >
            <div className="absolute top-0 right-0 h-full w-20 bg-white blur-[4px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-80" />
          </motion.div>
        </div>

        {/* ── Name typography ───────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-0 sm:gap-1 md:gap-2 z-20">
          {/* Top line: UJJWAL */}
          <div className="overflow-hidden pb-2">
            <div className="flex">
              {NAME_TOP.split("").map((char, i) => (
                <motion.span
                  key={`top-${i}`}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-[clamp(2.5rem,12vw,8rem)] font-medium tracking-[-0.04em] leading-none bg-clip-text text-transparent"
                  style={{
                    fontFamily: "var(--font-inter)",
                    backgroundImage: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Bottom line: PRAKASH */}
          <div className="overflow-hidden pb-2">
            <div className="flex">
              {NAME_BOTTOM.split("").map((char, i) => (
                <motion.span
                  key={`bottom-${i}`}
                  custom={i + NAME_TOP.length}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-[clamp(2.5rem,12vw,8rem)] font-light tracking-[-0.04em] leading-none bg-clip-text text-transparent"
                  style={{
                    fontFamily: "var(--font-inter)",
                    backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 100%)",
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#1A4DFF]" />
            <p
              className="text-[clamp(0.55rem,1.1vw,0.85rem)] tracking-[0.4em] sm:tracking-[0.5em] uppercase text-center"
              style={{
                fontFamily: "var(--font-mono)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {TAGLINE}
            </p>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-violet-500" />
          </motion.div>
        </div>

        {/* ── Bottom-right label ────────────────────────────────────── */}
        <motion.div
          className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 md:bottom-10 md:right-14 z-20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.4, x: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
        >
          <span
            className="text-[9px] sm:text-[11px] tracking-[0.3em] uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: "#ffffff",
            }}
          >
            IIT Kanpur • India
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
