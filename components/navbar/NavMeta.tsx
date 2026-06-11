import React from "react";
import { siteConfig } from "@/config/site";

export default function NavMeta() {
  const { line1, line2 } = siteConfig.navbar.eventMeta;

  return (
    <div className="col-start-4 col-span-3 hidden lg:flex flex-col justify-start -mt-1 border-l border-black/10 pl-8">
      <p className="font-normal text-[12px] leading-[1.4] text-black font-light">
        {line1} <span className="text-[#1A4DFF] inline-block ml-1">/</span><br />
        {line2}
      </p>
    </div>
  );
}
