"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Code, Database, Globe, Brain } from "lucide-react";
import Link from "next/link";

const projectsData = [
  {
    title: "TRINETRA: Vision-Language for ISRO",
    subtitle: "Research — IEEE IGARSS 2026 Oral Presentation",
    description: "Developed a novel vision-language ensemble framework in collaboration with the Indian Space Research Organisation (ISRO). Accepted for a prestigious Oral Presentation at the flagship IEEE International Geoscience and Remote Sensing Symposium in Washington D.C.",
    tech: ["Python", "FastAPI", "Flask", "Next.js", "Supabase", "Qwen-VL", "LLaMA 3.1", "Modal"],
    metrics: [
      { label: "Medal", value: "Silver — Inter IIT" },
      { label: "Scope", value: "Oral Presentation" },
      { label: "Competitors", value: "100+ Teams" },
    ],
    ctaLabel: "View Details",
    ctaHref: "https://www.linkedin.com/in/ujjwal-prakash-036873336/",
    icon: <Brain className="w-5 h-5 text-[#1A4DFF]" />,
  },
  {
    title: "Placement Interview Management System (PIMS)",
    subtitle: "Production Operations Platform",
    description: "Architected and deployed a real-time interview operations platform to replace manual, Excel-based workflows. Features a Global Availability Engine with real-time conflict detection and seamless RAS portal sync, eliminating data silos.",
    tech: ["Go", "Gin", "Next.js", "PostgreSQL", "Docker", "Nginx", "Redis"],
    metrics: [
      { label: "Daily Active Users", value: "2,000+" },
      { label: "Operational Savings", value: "100s Hrs Daily" },
      { label: "Adoption", value: "Immediate" },
    ],
    ctaLabel: "View on GitHub",
    ctaHref: "https://github.com/ujjwalPrakash-spike",
    icon: <Code className="w-5 h-5 text-[#10B981]" />,
  },
  {
    title: "RAS Portal: 30K+ Users Platform",
    subtitle: "Engineering Leadership",
    description: "As Senior Software Engineer & Team Lead, managing the official IIT Kanpur placement portal. Handles a 37,000+ line production codebase serving 20,000+ students and top-tier recruiters including Google, Microsoft, Tower Research Capital, and Optiver.",
    tech: ["Go", "Gin", "Next.js", "PostgreSQL", "Docker", "TypeScript", "Nginx"],
    metrics: [
      { label: "LOC Maintained", value: "37K+" },
      { label: "Students", value: "20K+" },
      { label: "Latency", value: "<200ms Loads" },
    ],
    ctaLabel: "View Portfolio Link",
    ctaHref: "https://www.linkedin.com/in/ujjwal-prakash-036873336/",
    icon: <Database className="w-5 h-5 text-[#7C3AED]" />,
  },
  {
    title: "Research Lab Portal",
    subtitle: "Centralized Campus Application Portal",
    description: "Architecting a centralized portal/ecosystem to automate research lab applications across IIT Kanpur. Designed relational data models with index optimizations to reduce local query latency to sub-100ms.",
    tech: ["NestJS", "Prisma ORM", "PostgreSQL", "AWS", "React", "Tailwind CSS", "TypeScript"],
    metrics: [
      { label: "Community Scale", value: "30,000+ Users" },
      { label: "Query Speedup", value: "40% faster" },
      { label: "DB Latency", value: "sub-100ms" },
    ],
    ctaLabel: "View GitHub",
    ctaHref: "https://github.com/ujjwalPrakash-spike",
    icon: <Globe className="w-5 h-5 text-[#F59E0B]" />,
  },
  {
    title: "Cipher — AI-Powered Productivity OS",
    subtitle: "Personal Productivity & Auto-Deploy Pipeline",
    description: "Built a productivity platform (task tracking, focus modes) integrated with an LLM pipeline that accepts natural-language feature descriptions, generates production-ready code, and auto-deploys via a CI/CD pipeline on merge.",
    tech: ["Next.js", "React", "TypeScript", "PostgreSQL", "Docker", "GitHub Actions"],
    metrics: [
      { label: "Integration", value: "LLM Pipeline" },
      { label: "Deploy Model", value: "Auto CI/CD" },
    ],
    ctaLabel: "View GitHub",
    ctaHref: "https://github.com/ujjwalPrakash-spike",
    icon: <Brain className="w-5 h-5 text-[#EC4899]" />,
  },
  {
    title: "2D Battle Arena — Multiplayer Game",
    subtitle: "Real-Time Authoritative Multi-player Game",
    description: "Implemented a fixed-timestep authoritative game loop in Go that syncs player actions over WebSockets. Leveraged Canvas-based renderer with client-side prediction and server reconciliation to mask network latency.",
    tech: ["Go", "WebSockets", "TypeScript", "Canvas API", "Redis", "PostgreSQL"],
    metrics: [
      { label: "FPS", value: "Smooth 60fps" },
      { label: "Round-trip", value: "sub-50ms" },
    ],
    ctaLabel: "View Repo",
    ctaHref: "https://github.com/ujjwalPrakash-spike",
    icon: <Code className="w-5 h-5 text-[#3B82F6]" />,
  },
];

export default function ProjectsResearchPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#dee1e4] py-16 md:py-24 font-sans text-[#111111] z-10">
      <div className="w-[87vw] mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A4DFF] hover:opacity-75 transition-opacity mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Title Block */}
        <div className="max-w-[700px] mb-20">
          <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-[-0.05em] leading-[0.9] text-[#2E3129]">
            Projects & Research Work
          </h1>
          <p className="mt-6 text-[15px] md:text-[17px] leading-[1.7] text-[#2E3129] opacity-80">
            Selected engineering achievements and peer-reviewed research, highlighting full-stack scale, high-availability architecture, and vision-language integrations.
          </p>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.title + index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white/10 border border-black/5 hover:border-black/20 p-6 md:p-8 rounded-2xl flex flex-col justify-between transition-all duration-300"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A4DFF]">
                      {project.subtitle}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#111] mt-1.5 leading-tight">
                      {project.title}
                    </h2>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center shrink-0 border border-black/5">
                    {project.icon}
                  </div>
                </div>

                {/* Description */}
                <p className="text-[13px] md:text-[14px] leading-relaxed text-[#2E3129]/90 mt-4">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mt-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-[#1A4DFF]/5 text-[#1A4DFF] rounded-md border border-[#1A4DFF]/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Block */}
              <div className="mt-8 pt-6 border-t border-black/5">
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="text-left">
                      <span className="block text-sm md:text-base font-bold text-neutral-800 tracking-tight leading-none">
                        {m.value}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-neutral-500 mt-1 block">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Link */}
                <a
                  href={project.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#111] hover:text-[#1A4DFF] transition-colors"
                >
                  {project.ctaLabel}
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
