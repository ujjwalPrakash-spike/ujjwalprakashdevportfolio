"use client";
import React, { useEffect, useRef } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { LineShadowText } from "@/components/ui/line-shadow-text";

gsap.registerPlugin(ScrollTrigger);

export default function AppleCardsCarouselDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const title2 = title2Ref.current;
    const desc = descRef.current;
    const carousel = carouselRef.current;

    if (!container) return;

    gsap.set(container, { opacity: 0, scale: 0.98 });
    if (title) gsap.set(title, { opacity: 0, y: 15 });
    if (title2) gsap.set(title2, { opacity: 0, y: 15 });
    if (desc) gsap.set(desc, { opacity: 0, y: 10 });
    if (carousel) gsap.set(carousel, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom-=80px",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(container, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    })
      .to(
        title,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        },
        "-=0.2",
      )
      .to(
        title2,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        },
        "-=0.2",
      )
      .to(
        desc,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        },
        "-=0.2",
      )
      .to(
        carousel,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power1.out",
        },
        "-=0.25",
      );

    ScrollTrigger.refresh();
  }, []);

  const cards = data.map((card, index) => (
    <Card key={card.title + index} card={card} index={index} />
  ));

  return (
    <div className="w-full pt-16 pb-8 md:pt-20 md:pb-10  bg-transparent">
      <div ref={containerRef} className="will-change-transform">
        <div className="w-[87vw] mx-auto mb-10">
          <div className="mb-6">
            <span
              ref={titleRef}
              className="block font-bold text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.95] tracking-[-0.04em] text-[#111111] font-sans"
            >
              Explore
            </span>
            <span
              ref={title2Ref}
              className="block font-bold text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.04em] text-[#1A4DFF] mt-1 font-sans"
            >
              The{" "}
              <LineShadowText
                className="text-[#1A4DFF] italic"
                shadowColor="#111111"
              >
                Portfolio
              </LineShadowText>
            </span>
          </div>
          <p
            ref={descRef}
            className="mt-3 text-[14px] leading-[1.7] text-[#2E3129] max-w-[500px]"
          >
            Explore sections of my work — from technical projects and research
            to client experience, process, and reviews.
          </p>
        </div>
        <div ref={carouselRef}>
          <Carousel items={cards} />
        </div>
      </div>
    </div>
  );
}

/* ─── Expanded content with video + details + CTA ─────────────────────── */

interface ContentProps {
  videoSrc?: string;
  description: string;
  techStack: string[];
  metrics?: { value: string; label: string }[];
  ctaLabel: string;
  ctaHref: string;
}

const ProjectContent = ({
  videoSrc,
  description,
  techStack,
  metrics,
  ctaLabel,
  ctaHref,
}: ContentProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play video when expanded content mounts
    videoRef.current?.play().catch(() => {});
    z;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Video — 50% of expanded content */}
      {videoSrc && (
        <div className="relative rounded-2xl overflow-hidden bg-black  aspect-video">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            autoPlay
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/webm" />
            <source src={videoSrc.replace(".webm", ".mp4")} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Details */}
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg leading-relaxed">
            {description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-6">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider bg-[#1A4DFF]/8 text-[#1A4DFF] rounded-full border border-[#1A4DFF]/15"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Metrics */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-black/5">
              {metrics.map((m) => (
                <div key={m.label}>
                  <span className="text-2xl font-bold text-[#111] dark:text-white tracking-tight">
                    {m.value}
                  </span>
                  <span className="block text-[11px] uppercase tracking-wider text-neutral-500 mt-1">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 mt-8 px-6 py-3.5 bg-[#111] text-white rounded-xl font-medium text-[14px] hover:bg-[#1A4DFF] transition-colors duration-300 w-fit"
        >
          {ctaLabel}
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </a>
      </div>
    </div>
  );
};

/* ─── Card data ───────────────────────────────────────────────────────── */

const data = [
  {
    category: "Portfolio",
    title: "Projects & Research Work",
    src: "/images/media__1782064807098.png",
    videoSrc: "/part1.webm",
    targetUrl: "/projects-research",
    content: <div />,
  },
  {
    category: "Work",
    title: "Experience & Leadership",
    src: "/images/media__1782064946465.png",
    videoSrc: "/part2.webm",
    targetUrl: "/experience",
    content: <div />,
  },
  {
    category: "Services & Testimonials",
    title: "Client Process & Reviews",
    src: "/images/coffee.jpg",
    videoSrc: "/part3.webm",
    targetUrl: "/client-process",
    content: <div />,
  },
];
