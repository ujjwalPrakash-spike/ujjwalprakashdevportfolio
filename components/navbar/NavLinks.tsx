import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function NavLinks() {
  const { links } = siteConfig.navbar;

  return (
    <ul className="flex-1 flex items-center justify-around font-semibold text-[12px] tracking-[0.1em] text-[#1A4DFF] uppercase pr-8">
      {links.map((link) => (
        <li key={link.label}>
          <Link href={link.href} className="hover:opacity-70 transition-opacity">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
