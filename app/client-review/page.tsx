"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, MessageSquare, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

const reviews = [
  {
    quote: "Ujjwal puts in the work. He delivered a complex system ahead of schedule that our team uses daily. Would hire again in a heartbeat.",
    author: "— Production Client",
    role: "Startup Founder",
    category: "Client Review",
    icon: <ShieldCheck className="w-5 h-5 text-[#10B981]" />,
  },
  {
    quote: "I like how Ujjwal teaches, he puts in the work required. His bootcamp sessions were the most practical engineering classes I've attended at IITK.",
    author: "— Student Review",
    role: "RAS.DEVCAMP Participant",
    category: "Teaching & Mentorship",
    icon: <MessageSquare className="w-5 h-5 text-[#1A4DFF]" />,
  },
  {
    quote: "Maintaining 37K+ LOC codebase for 20,000+ active users with 99.9% uptime. PIMS was built ahead of schedule with 2K+ daily active users from day one.",
    author: "— System Track Record",
    role: "IIT Kanpur SPO",
    category: "Production Operations",
    icon: <Zap className="w-5 h-5 text-[#7C3AED]" />,
  },
];

export default function ClientReviewPage() {
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
            Client Reviews & Feedback
          </h1>
          <p className="mt-6 text-[15px] md:text-[17px] leading-[1.7] text-[#2E3129] opacity-80">
            Read what startup founders, student developers, and campus organizers say about working with Ujjwal.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {reviews.map((review, index) => (
            <motion.div
              key={review.author + index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 border border-black/5 hover:border-black/15 p-6 md:p-8 rounded-3xl flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-black/5 mb-6">
                  <span className="text-[9px] font-bold text-[#1A4DFF] uppercase tracking-wider">
                    {review.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center border border-black/5">
                    {review.icon}
                  </div>
                </div>
                <p className="text-[14px] leading-relaxed text-[#2E3129] italic font-medium">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1A4DFF]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#1A4DFF] text-xs font-bold">
                    {review.author[2]}
                  </span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-neutral-800">
                    {review.author}
                  </h3>
                  <p className="text-[10px] text-neutral-500">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full bg-[#111111] text-white p-8 md:p-16 rounded-[28px] flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
              Ready to build something together?
            </h2>
            <p className="text-neutral-400 mt-2 text-sm md:text-base max-w-[500px]">
              Hire a full-stack engineer with proven experience managing production applications. Book a meet or send a direct email.
            </p>
          </div>
          <a
            href="mailto:ujjwalprakash858@gmail.com"
            className="group inline-flex items-center gap-2 px-6 py-4 bg-[#1A4DFF] hover:bg-[#1A4DFF]/90 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 w-full md:w-auto justify-center"
          >
            Get in touch <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </motion.div>
      </div>
    </main>
  );
}
