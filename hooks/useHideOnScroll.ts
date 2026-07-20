"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to track scroll direction and hide/show a component (like a Navbar)
 * based on the user's scroll behavior.
 *
 * Logic:
 * - Hides when scrolling down past the threshold
 * - Shows when scrolling up
 * - Always shows when near the top (<= threshold)
 *
 * @param threshold The scroll distance in pixels before the component can hide
 * @returns boolean `isVisible` indicating whether the component should be shown
 */
export function useHideOnScroll(threshold: number = 50) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      lastScrollY.current = window.scrollY;
    }

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (
            currentScrollY > lastScrollY.current &&
            currentScrollY > threshold
          ) {
            setIsVisible(false);
          } else if (
            currentScrollY < lastScrollY.current ||
            currentScrollY <= threshold
          ) {
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isVisible;
}
