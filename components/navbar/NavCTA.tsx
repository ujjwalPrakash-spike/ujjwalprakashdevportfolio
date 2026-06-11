import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function NavCTA() {
  const { cta } = siteConfig.navbar;

  return (
    <Link href={cta.href} target="_blank" rel="noopener noreferrer">
      <button type="button" aria-label={cta.label} className="relative group overflow-hidden border-[1.5px] border-[#1A4DFF] text-[#1A4DFF] bg-transparent">
        <span className="absolute top-0 left-0 w-full h-full bg-[#1A4DFF] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
        <span className="relative z-10 flex items-center py-[10px] px-[32px] whitespace-nowrap group-hover:text-white transition-colors duration-300">
          <span className="uppercase text-[12px] font-semibold tracking-[0.1em]">{cta.label}</span>
          <span className="inline-block w-[8px] h-auto ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 11">
              <circle cx="2.429" cy="2.358" r="1.111" className="fill-current" transform="rotate(45 2.429 2.358)"></circle>
              <circle cx="5.571" cy="5.5" r="1.111" className="fill-current" transform="rotate(135 5.571 5.5)"></circle>
              <circle cx="2.429" cy="8.642" r="1.111" className="fill-current" transform="rotate(135 2.429 8.642)"></circle>
            </svg>
          </span>
        </span>
      </button>
    </Link>
  );
}
