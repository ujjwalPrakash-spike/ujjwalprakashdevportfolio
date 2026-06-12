"use client";

import { ReactLenis } from "lenis/react";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.6,
        smoothWheel: true,
        syncTouch: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        lerp: 0.02,
      }}
    >
      {children}
    </ReactLenis>
  );
}