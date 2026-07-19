"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, Calendar, Users, Award } from "lucide-react";
import Link from "next/link";

const experienceData = [
  {
    role: "Senior Software Engineer & Team Lead",
    company: "RAS (IITK Placement Portal)",
    location: "Kanpur, India",
    duration: "Aug 2024 – Present",
    color: "#1A4DFF",
    metrics: [
      { label: "Codebase", value: "37K+ LOC" },
      { label: "Students Served", value: "20,000+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Team Size", value: "4 Devs" },
    ],
    highlights: [
      "Oversee full system architecture and maintain production codebase (Go/Gin, Next.js, PostgreSQL, Docker) serving 20,000+ students and top-tier recruiters.",
      "Direct and mentor 4 junior developers, accelerating feature delivery by 25% and reducing post-deployment bugs by 35% through standardized code reviews.",
      "Spearheaded the design and development of an institutional QR-based attendance tracking app, integrating it with RAS portal APIs dynamically.",
      "Resolved critical departmental eligibility and resume-tagging microservice bottlenecks, securing sub-200ms page loads during peak traffic surges.",
      "Function as primary on-call engineer, implementing secure API gateways and deploying zero-downtime hotfixes for high-stakes placement operations.",
    ],
  },
  {
    role: "SPO RAS.DEVCAMP Instructor & Leader",
    company: "Students' Placement Office, IIT Kanpur",
    location: "Kanpur, India",
    duration: "Jan 2026 – Present",
    color: "#10B981",
    metrics: [
      { label: "Students", value: "57+" },
      { label: "Lectures", value: "12+" },
      { label: "Rating", value: "4.8 / 5.0" },
      { label: "Duration", value: "10 Weeks" },
    ],
    highlights: [
      "Designed and delivered a 10-week full-stack/backend engineering bootcamp under IIT Kanpur’s Students’ Placement Office.",
      "Taught core backend and full-stack concepts from JavaScript/Go fundamentals through Docker, WebSockets, and CI/CD with live coding sessions.",
      "Provided hands-on mentorship through structured assignments with multi-part grading rubrics, debugging sessions, and one-on-one support.",
    ],
  },
  {
    role: "Freelance Developer",
    company: "Self-Employed",
    location: "Remote",
    duration: "2024 – Present",
    color: "#F59E0B",
    metrics: [
      { label: "Scale", value: "50K+ Users" },
      { label: "Delivery", value: "End-to-End" },
      { label: "Backends", value: "Go / Node" },
    ],
    highlights: [
      "Engineering a web application designed to scale for 50,000+ users for an external client.",
      "Delivered multiple full-stack web applications, independently managing requirements, database design, system architecture, and production deployment.",
      "Developed high-performance backends (Go, Node.js) and modern Next.js frontends with clean REST APIs; deployed via Docker.",
    ],
  },
  {
    role: "Software Engineer",
    company: "PhD Placement Portal, IIT Kanpur",
    location: "Kanpur, India",
    duration: "2024 – Present",
    color: "#7C3AED",
    metrics: [
      { label: "Relational DB", value: "PostgreSQL" },
      { label: "API Design", value: "RESTful" },
    ],
    highlights: [
      "Architected clean backend APIs and relational database schemas matching PhD candidates with corporate R&D sectors.",
      "Translated academic recruitment policies into secure, multi-role access controls and workflows.",
      "Developed and maintained core features of the production platform, fixing bugs and implementing feature updates in a live environment.",
    ],
  },
  {
    role: "Web Executive",
    company: "SPO (Students’ Placement Office), IIT Kanpur",
    location: "Kanpur, India",
    duration: "2024 – 2025",
    color: "#EF4444",
    metrics: [
      { label: "Perf Score", value: "95+" },
      { label: "Search Traffic", value: "+25%" },
      { label: "Drop-off", value: "-30%" },
    ],
    highlights: [
      "Engineered and deployed core Next.js frontend modules, improving Google Lighthouse performance score to 95+ and increasing organic traffic.",
      "Architected a type-safe TypeScript migration, reducing runtime production exceptions by 45% and accelerating development velocity.",
      "Redesigned the navigation architecture and UI, reducing recruiter drop-off by 30% and shortening job posting creation times by 20%.",
    ],
  },
];

export default function ExperiencePage() {
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
            Experience & Leadership
          </h1>
          <p className="mt-6 text-[15px] md:text-[17px] leading-[1.7] text-[#2E3129] opacity-80">
            A track record of engineering leadership, building scalable systems for tens of thousands of users, and mentoring developers.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-black/10 pl-6 md:pl-10 ml-2 space-y-16">
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.role + index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div
                className="absolute -left-[31px] md:-left-[47px] top-1 w-[9px] h-[9px] rounded-full border border-black/20 bg-[#dee1e4] group-hover:scale-125 transition-transform"
                style={{ borderColor: exp.color }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Role, Company, Metrics */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#1A4DFF]">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.duration}
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#111111]">
                      {exp.role}
                    </h2>
                    <p className="text-sm font-semibold text-[#555] mt-1">
                      {exp.company} — <span className="font-normal italic">{exp.location}</span>
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {exp.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="bg-white/20 border border-black/5 p-3 rounded-xl flex flex-col justify-center"
                      >
                        <span className="text-lg font-bold text-[#111] tracking-tight">
                          {metric.value}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-neutral-500 mt-0.5">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Highlights List */}
                <div className="lg:col-span-7 bg-white/10 border border-black/5 p-6 md:p-8 rounded-2xl">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-4 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" /> Key Contributions
                  </h3>
                  <ul className="space-y-3.5">
                    {exp.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="text-[13px] md:text-[14px] leading-relaxed text-[#2E3129] relative pl-5 before:content-['•'] before:absolute before:left-1 before:text-[#1A4DFF] before:font-bold"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
