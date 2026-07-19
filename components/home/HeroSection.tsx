"use client";

import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { siteConfig } from "@/config/site";
import RotatingText from "@/components/reactBits/RotatingText";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Briefcase, CheckCircle2 } from "lucide-react";

const notifications = [
  {
    title: "Student Review",
    description: `"I like how Ujjwal teaches, he puts in the work required..."`,
    time: "Just now",
    icon: <MessageSquare className="w-4 h-4 text-white" />,
    badgeColor: "#1A4DFF",
  },
  {
    title: "Production Scale",
    description: "Maintaining 37K+ LOC codebase for 20,000+ active users.",
    time: "Active",
    icon: <Briefcase className="w-4 h-4 text-white" />,
    badgeColor: "#2E3129",
  },
  {
    title: "Internal Tool",
    description: "PIMS built ahead of schedule. 2K+ daily active users.",
    time: "On Time",
    icon: <CheckCircle2 className="w-4 h-4 text-white" />,
    badgeColor: "#10B981",
  },
];

export default function HeroSection() {
  const { hero } = siteConfig.home;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full px-6 lg:px-10 pt-8 pb-20">
      <div className="w-[87vw]  mx-auto flex  flex-col min-h-[80vh]  rounded-xl pt-5 p-6 relative">
        <div className="flex flex-1 mt-6 min-w-0 relative">
          {/* Main Title Column */}
          <div className="w-full min-w-0">
            <h1
              className="
                font-normal
                leading-[0.95]
                tracking-[-0.06em]
                text-[clamp(3.2rem,8.5vw,11rem)]
                text-[#2E3129]
              "
            >
              <span className="block">{hero.titleLine1}</span>

              <span className="flex items-center gap-[0.15em] min-w-0 -mt-[0.05em]">
                <span>{hero.titleLine2}</span>

                <div
                  className="w-[1.5em] h-[1.5em] shrink-0"
                  style={{ mixBlendMode: "multiply" }}
                >
                  <DotLottieReact
                    src="https://lottie.host/43576938-961f-47db-863e-dcde945ced21/aOYzYLyjIH.lottie"
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </span>

              <span className="block text-[#1A4DFF] -mt-[0.05em]">
                <RotatingText
                  texts={[
                    "Architecture",
                    "Engineering",
                    "Cloud Dev",
                    "Go & Next.js",
                  ]}
                  mainClassName="
                    overflow-hidden
                    justify-start
                    pb-[0.2em]
                    -mb-[0.2em]
                  "
                  splitBy="words"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  splitLevelClassName="
                    overflow-hidden
                    pb-[0.2em]
                    -mb-[0.2em]
                  "
                  transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 400,
                  }}
                  rotationInterval={2000}
                />
              </span>
            </h1>
          </div>

        </div>

        {/* FOOTER */}
        <div className="grid grid-cols-12 items-center gap-y-8 gap-x-6 mt-10">
          {/* LEFT */}
          <div className="col-span-12 md:col-span-2 flex items-center gap-1.5 whitespace-nowrap">
            <span className="font-bold text-[13px]">{hero.footerPrefix}</span>

            <span className="text-[11px] tracking-tight text-[#111111]">
              {hero.footerText}
            </span>
          </div>

          {/* CENTER CTA */}

          <div className="col-span-12 md:col-start-3 md:col-span-4">
            <a href="mailto:ujjwalprakash858@gmail.com" className="block w-full">
              <button className="relative group overflow-hidden w-full bg-transparent py-5 px-8 rounded-sm font-bold uppercase tracking-wide text-[17px] border-2 border-[#555555] text-[#2f2f2f] cursor-pointer">
                <span className="absolute top-0 left-0 w-full h-full bg-[#313131] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>

                <span className="relative z-10 flex items-center justify-center gap-3 w-full h-full group-hover:text-white transition-colors duration-300">
                  {hero.cta}
                </span>
              </button>
            </a>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 md:col-start-10 md:col-span-3 relative">
            {/* Animated Notifications (Single item with fixed height to prevent layout shift, absolute positioned above the asterisk) */}
            <div className="hidden lg:block absolute bottom-full left-0 w-full mb-4 h-[76px] overflow-hidden z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center gap-3 p-3 rounded-xl bg-white/30 backdrop-blur-md text-[#2E3129] border border-black/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)]"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: notifications[currentIndex].badgeColor }}
                  >
                    {notifications[currentIndex].icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-[#2E3129] truncate">
                        {notifications[currentIndex].title}
                      </span>
                      <span className="text-[9px] text-[#888888] whitespace-nowrap">
                        {notifications[currentIndex].time}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#555555] leading-snug mt-0.5">
                      {notifications[currentIndex].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="text-[#1A4DFF] text-[12px] leading-none mb-3">
              ✳
            </div>

            <p className="text-[12px] leading-[1.7] text-[#111111]">
              {hero.descriptionInfo}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
