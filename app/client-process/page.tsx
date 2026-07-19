"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Search, Cpu, Zap, Activity } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Requirements Scoping & Technical Architecture",
    description: "Before laying down code, we map out clear operational deliverables. I translate business requirements into concrete system designs, mapping PostgreSQL database relationships, defining exact API interfaces, and identifying performance-critical paths.",
    icon: <Search className="w-5 h-5 text-[#1A4DFF]" />,
    details: [
      "Translating user constraints into system specs",
      "Drafting preliminary relational database schemas",
      "Establishing strict API gateways & security protocols",
    ],
  },
  {
    num: "02",
    title: "High-Performance Data Modeling & APIs",
    description: "Building backends that load in sub-200ms under high load. I write type-safe APIs using Go (Gin) or Node.js (NestJS) coupled with PostgreSQL, incorporating optimal DB indexing, caching layers (Redis), and connection pooling to ensure data integrity.",
    icon: <Cpu className="w-5 h-5 text-[#10B981]" />,
    details: [
      "Go-based RESTful & WebSocket API development",
      "Prisma or native SQL query optimization",
      "Integrating Redis cache queues to lower database strain",
    ],
  },
  {
    num: "03",
    title: "Concurrency & Load Handling",
    description: "Preventing race conditions and bottlenecks. Drawing from experience managing IIT Kanpur's placement system for 20K+ users, I engineer lock-free buffers, background workers, and real-time operations engines.",
    icon: <Zap className="w-5 h-5 text-[#7C3AED]" />,
    details: [
      "WebSocket orchestration for real-time applications",
      "Dynamic data syncing without concurrency blockages",
      "Background queuing architectures",
    ],
  },
  {
    num: "04",
    title: "Docker Deployment & Zero-Downtime Operations",
    description: "Delivering stable production environments. All projects are packaged neatly with Docker & Docker-Compose and deployed behind Nginx reverse proxies, with complete GitHub Actions CI/CD pipelines ensuring automated testing and deployment validation.",
    icon: <Activity className="w-5 h-5 text-[#F59E0B]" />,
    details: [
      "Dockerized development and production pipelines",
      "GitHub Actions automated build and test runner",
      "Zero-downtime updates and live hotfix deployments",
    ],
  },
];

export default function ClientProcessPage() {
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
            Client Process & Methodology
          </h1>
          <p className="mt-6 text-[15px] md:text-[17px] leading-[1.7] text-[#2E3129] opacity-80">
            A systematic engineering pipeline designed to deliver production-grade software with absolute scale, reliability, and security.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 border border-black/5 hover:border-black/15 p-6 md:p-8 rounded-3xl flex flex-col justify-between transition-all duration-300"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between border-b border-black/5 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center border border-black/5">
                      {step.icon}
                    </div>
                    <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
                      Phase {step.num}
                    </span>
                  </div>
                  <span className="text-3xl font-bold text-black/10 tracking-tight">
                    {step.num}
                  </span>
                </div>

                {/* Info block */}
                <h2 className="text-lg md:text-xl font-bold tracking-tight text-[#111] leading-snug">
                  {step.title}
                </h2>
                <p className="text-[13px] md:text-[14px] leading-relaxed text-[#2E3129]/95 mt-4">
                  {step.description}
                </p>

                {/* Sublist */}
                <ul className="mt-6 space-y-2">
                  {step.details.map((detail, dIdx) => (
                    <li
                      key={dIdx}
                      className="text-[12px] md:text-[13px] text-[#2E3129] flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A4DFF]/60 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action/Footer */}
              <div className="mt-8 pt-4 border-t border-black/5 text-right">
                <a
                  href="mailto:ujjwalprakash858@gmail.com"
                  className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#1A4DFF] hover:opacity-85 transition-opacity"
                >
                  Inquire Process <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
