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
    // Initialize the starting scroll position
    if (typeof window !== "undefined") {
      lastScrollY.current = window.scrollY;
    }

    const handleScroll = () => {
      // Use requestAnimationFrame to throttle the scroll event handler 
      // preventing jank and keeping performance buttery smooth
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // If we scroll down and are past the threshold -> Hide
          if (currentScrollY > lastScrollY.current && currentScrollY > threshold) {
            setIsVisible(false);
          } 
          // If we scroll up OR we are at the very top -> Show
          else if (currentScrollY < lastScrollY.current || currentScrollY <= threshold) {
            setIsVisible(true);
          }

          // Update the last known scroll position
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    // Attach passive scroll listener for better scrolling performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isVisible;
}
