"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

/* ────────────────────────────────────────────────────────────────────────────
   DESIGN:
   • Full-screen dark overlay (#111111) that sits on top of everything.
   • A monospaced percentage counter ticks from 0 → 100.
   • The name "UJJWAL PRAKASH" reveals letter-by-letter with staggered springs.
   • A subtle role tagline fades in at the bottom.
   • On completion, a dual-panel curtain splits vertically to reveal the site.
   • Body scroll is locked during the loading sequence.
   • pointer-events are removed once the curtain begins opening.
   ──────────────────────────────────────────────────────────────────────────── */

const NAME_TOP = "UJJWAL";
const NAME_BOTTOM = "PRAKASH";
const TAGLINE = "Software Engineer • Backend Developer";
const LOADING_DURATION = 2400; // ms for the counter to reach 100
const EXIT_DELAY = 400;        // ms pause after counter hits 100 before exit
const CURTAIN_DURATION = 0.9;  // seconds for the curtain to fully open

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
      }, CURTAIN_DURATION * 1000 + 100); // slight buffer past curtain duration
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Fully unmounted — nothing in the DOM
  if (phase === "done") return null;

  /* ── Letter stagger configs ───────────────────────────────────────────── */
  const letterVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        delay: 0.3 + i * 0.04,
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
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 99999,
        pointerEvents: isExiting ? "none" : "auto",
      }}
    >
      {/* ── Left curtain panel ─────────────────────────────────────── */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full"
        style={{ background: "#111111" }}
        initial={false}
        animate={isExiting ? { x: "-100%" } : { x: "0%" }}
        transition={curtainTransition}
      />

      {/* ── Right curtain panel ────────────────────────────────────── */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full"
        style={{ background: "#111111" }}
        initial={false}
        animate={isExiting ? { x: "100%" } : { x: "0%" }}
        transition={curtainTransition}
      />

      {/* ── Content layer (fades out before curtains open) ────────── */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full h-full select-none px-6"
        animate={
          isExiting
            ? { opacity: 0, scale: 0.95 }
            : { opacity: 1, scale: 1 }
        }
        transition={{ duration: 0.35, ease: "easeIn" }}
      >
        {/* ── Percentage counter ───────────────────────────────────── */}
        <motion.div
          className="absolute top-6 right-6 sm:top-8 sm:right-10 md:top-10 md:right-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <span
            className="text-[clamp(0.7rem,1.2vw,1rem)] tracking-[0.25em] tabular-nums"
            style={{
              fontFamily: "var(--font-mono)",
              color: "#dee1e4",
            }}
          >
            {String(progress).padStart(3, "0")}
          </span>
        </motion.div>

        {/* ── Top-left corner marker ────────────────────────────────── */}
        <motion.div
          className="absolute top-6 left-6 sm:top-8 sm:left-10 md:top-10 md:left-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span
            className="text-[9px] sm:text-[11px] tracking-[0.3em] uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: "#dee1e4",
            }}
          >
            Portfolio © 2026
          </span>
        </motion.div>

        {/* ── Progress bar (thin, minimal) ─────────────────────────── */}
        <div
          className="absolute bottom-16 sm:bottom-20 left-6 right-6 sm:left-10 sm:right-10 md:left-14 md:right-14 h-[1px]"
          style={{ background: "rgba(222,225,228,0.1)" }}
        >
          <motion.div
            className="h-full origin-left"
            style={{ background: "#1A4DFF" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        {/* ── Name typography ───────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-0 sm:gap-1 md:gap-2">
          {/* Top line: UJJWAL */}
          <div className="overflow-hidden">
            <div className="flex">
              {NAME_TOP.split("").map((char, i) => (
                <motion.span
                  key={`top-${i}`}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-[clamp(2.2rem,10vw,7rem)] font-light tracking-[-0.06em] leading-none"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: "#dee1e4",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Bottom line: PRAKASH */}
          <div className="overflow-hidden">
            <div className="flex">
              {NAME_BOTTOM.split("").map((char, i) => (
                <motion.span
                  key={`bottom-${i}`}
                  custom={i + NAME_TOP.length}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-[clamp(2.2rem,10vw,7rem)] font-light tracking-[-0.06em] leading-none"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: "#dee1e4",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* ── Dot accent ──────────────────────────────────────────── */}
          <motion.div
            className="mt-2 sm:mt-3 md:mt-5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.8,
              type: "spring" as const,
              stiffness: 400,
              damping: 20,
            }}
          >
            <div
              className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] rounded-full"
              style={{ background: "#1A4DFF" }}
            />
          </motion.div>

          {/* ── Tagline ─────────────────────────────────────────────── */}
          <motion.p
            className="mt-3 sm:mt-4 md:mt-6 text-[clamp(0.5rem,1.1vw,0.8rem)] tracking-[0.2em] sm:tracking-[0.35em] uppercase text-center max-w-[90vw]"
            style={{
              fontFamily: "var(--font-mono)",
              color: "rgba(222,225,228,0.45)",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          >
            {TAGLINE}
          </motion.p>
        </div>

        {/* ── Bottom-right label ────────────────────────────────────── */}
        <motion.div
          className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 md:bottom-10 md:right-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <span
            className="text-[9px] sm:text-[11px] tracking-[0.3em] uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: "#dee1e4",
            }}
          >
            IIT Kanpur • India
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
