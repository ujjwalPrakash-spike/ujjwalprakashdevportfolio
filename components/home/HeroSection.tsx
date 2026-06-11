import React from "react";
import { siteConfig } from "@/config/site";

export default function HeroSection() {
  const { hero } = siteConfig.home;

  return (
    <section className="relative w-full px-10 pt-10 pb-32 z-10 flex flex-col justify-between min-h-[calc(100vh-70px)]">
      <div className="grid grid-cols-12 gap-x-4 mt-10">
        <div className="col-span-12">
          <h1 className="text-[60px] md:text-[100px] lg:text-[150px] font-medium leading-[0.85] tracking-[-0.04em] text-[#2E3129]">
            <span className="block">{hero.titleLine1}</span>
            <span className="flex items-center mt-2 lg:mt-4">
              <span className="mr-4 lg:mr-8 whitespace-nowrap">{hero.titleLine2}</span>
              <span className="hidden sm:flex w-[8rem] h-[4rem] sm:w-[14rem] sm:h-[7.5rem] rounded-full overflow-hidden bg-gradient-to-r from-[#D0D5FF] to-[#E2E5FF] shadow-inner shadow-black/10 relative">
                <div className="absolute inset-0 rounded-full border border-white/40"></div>
                <div className="w-16 h-16 bg-[#A4B1FF] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50 blur-xl"></div>
              </span>
            </span>
            <span className="block text-[#1A4DFF] mt-2 lg:mt-4">{hero.titleHighlight}</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-x-4 mt-32 items-end">
        <div className="col-span-12 sm:col-span-3 flex items-center mb-6 sm:mb-0">
          <span className="font-bold text-[18px]">{hero.footerPrefix}</span>
          <span className="ml-2 text-[18px] text-[#111111]">{hero.footerText}</span>
        </div>

        <div className="col-span-12 sm:col-span-5 lg:col-start-3 lg:col-span-4 mb-6 sm:mb-0">
          <button className="w-full bg-[#1A4DFF] hover:bg-[#0036FF] transition-colors text-white py-6 px-10 rounded-sm text-center font-bold tracking-widest text-[14px] flex items-center justify-center gap-2">
            {hero.cta}
            <span className="inline-block w-[10px] h-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 11">
                <circle cx="2.429" cy="2.358" r="1.111" className="fill-current" transform="rotate(45 2.429 2.358)"></circle>
                <circle cx="5.571" cy="5.5" r="1.111" className="fill-current" transform="rotate(135 5.571 5.5)"></circle>
                <circle cx="2.429" cy="8.642" r="1.111" className="fill-current" transform="rotate(135 2.429 8.642)"></circle>
              </svg>
            </span>
          </button>
        </div>

        <div className="col-span-12 sm:col-span-4 lg:col-start-11 lg:col-span-2 flex flex-col justify-end">
          <span className="text-[#1A4DFF] text-[32px] leading-none mb-4 block font-light">*</span>
          <p className="text-[13px] leading-[1.4] text-[#111111]">
            {hero.descriptionInfo}
          </p>
        </div>
      </div>
    </section>
  );
}
