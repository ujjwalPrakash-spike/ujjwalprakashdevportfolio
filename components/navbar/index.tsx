"use client";

import React from "react";
import NavBrand from "./NavBrand";
import NavMeta from "./NavMeta";
import NavLinks from "./NavLinks";
import NavCTA from "./NavCTA";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";

export default function Navbar() {
  const isVisible = useHideOnScroll(50);

  return (
   <header
  className="fixed top-0 left-0 w-full flex justify-center z-50 font-sans bg-transparent"
  style={{
    transform: isVisible ? "translateY(0)" : "translateY(-100%)",
    opacity: isVisible ? 1 : 0,
    transition: "transform 0.4s ease, opacity 0.3s ease",
  }}
>
  <nav className="grid grid-cols-12 lg:items-start w-[92vw] pt-10 pb-6 px-10">
    <NavBrand />
    <NavMeta />
    <div className="col-start-7 col-span-6 flex items-center justify-between">
      <NavLinks />
      <NavCTA />
    </div>
  </nav>
</header>
  );
}
