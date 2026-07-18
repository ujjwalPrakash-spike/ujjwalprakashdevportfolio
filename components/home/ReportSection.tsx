"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ReportSection() {
  const { report } = siteConfig.home;

  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLSpanElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const title1 = title1Ref.current;
    const title2 = title2Ref.current;
    const desc = descRef.current;
    const cta = ctaRef.current;

    if (!card) return;

    gsap.set(card, { opacity: 0, scale: 0.98 });
    if (image) gsap.set(image, { scale: 1.12 });
    if (title1) gsap.set(title1, { opacity: 0 });
    if (title2) gsap.set(title2, { opacity: 0 });
    if (desc) gsap.set(desc, { opacity: 0 });
    if (cta) gsap.set(cta, { opacity: 0 });

    // Snappy timeline for scroll-triggered entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top bottom-=80px",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(card, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    })
      .to(
        [title1, title2],
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.08,
          ease: "power1.out",
        },
        "-=0.2",
      )
      .to(
        [desc, cta],
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.08,
          ease: "power1.out",
        },
        "-=0.15",
      );

    if (image) {
      gsap.to(image, {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section
      id="report"
      className="relative w-full px-6 lg:px-10 pt-32 pb-24 z-10"
    >
      <div
        ref={cardRef}
        className="w-[87vw] mx-auto grid grid-cols-1 md:grid-cols-2 rounded-[28px]  overflow-hidden bg-transparent hover:border-black/20 transition-all duration-500 will-change-transform"
      >
        {/* Left Column: Image Container */}
        <div className="relative w-full h-[350px] md:h-[580px] overflow-hidden">
          <div
            ref={imageRef}
            className="relative w-full h-full will-change-transform"
          >
            {/*
            <Image
              src={report.imagePath}
              alt="2025 Report Visual"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            */}
            <Image
              src="/images/optimized_video.webp"
              alt="Client Projects Reel"
              fill
              className="object-cover object-center animate-fade-in"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-between h-auto md:h-[580px]">
          {/* Title / Header */}
          <div>
            <span
              ref={title1Ref}
              className="block font-bold text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.95] tracking-[-0.04em] text-[#111111]"
            >
              {report.titleLine1}
            </span>
            <span
              ref={title2Ref}
              className="block font-bold text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.04em] text-[#1A4DFF] mt-1"
            >
              {report.titleLine2}
            </span>
          </div>

          {/* Description & Action Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 mt-12 md:mt-0 w-full">
            {/* Description */}
            <p
              ref={descRef}
              className="text-[14px] leading-[1.7] text-[#2E3129] max-w-[300px]"
            >
              {report.description}
            </p>

            {/* Action Card Button */}
            <Link
              ref={ctaRef}
              href={report.ctaHref}
              className="group relative flex flex-col justify-between w-full sm:w-[210px] h-[130px] p-5 rounded-2xl border border-black/10 bg-transparent hover:bg-black/5 hover:border-black/20 transition-all duration-300 shrink-0 cursor-pointer"
            >
              {/* Format Indicator */}
              <span className="text-[11px] font-bold text-[#1A4DFF] tracking-wider uppercase opacity-80">
                {report.ctaSublabel}
              </span>

              {/* Label and Arrow */}
              <div className="flex items-end justify-between">
                <span className="text-[16px] font-bold text-[#111111] tracking-tight leading-tight max-w-[120px]">
                  {report.ctaLabel}
                </span>
                <div className="w-[38px] h-[38px] rounded-full border border-black/10 flex items-center justify-center bg-white group-hover:bg-[#1A4DFF] group-hover:border-transparent transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-[#1A4DFF] group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
