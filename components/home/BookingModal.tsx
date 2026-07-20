"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Copy, Check, Mail, Send, Sparkles, MessageSquare, Briefcase, Coffee } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedContent, setCopiedContent] = useState(false);

  if (!isOpen) return null;

  const emailAddress = "ujjwalprakash858@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy email", err);
    }
  };

  const handleCopyContent = async () => {
    const formattedText = `Hi Ujjwal,\n\nI would like to book a meeting with you.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    try {
      await navigator.clipboard.writeText(formattedText);
      setCopiedContent(true);
      setTimeout(() => setCopiedContent(false), 2000);
    } catch (err) {
      console.error("Failed to copy content", err);
    }
  };

  const handleSendEmail = () => {
    const subject = `Meeting Request from ${name || "Portfolio Visitor"}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const quickTags = [
    {
      id: "project",
      label: "Freelance Project",
      icon: <Briefcase className="w-3.5 h-3.5" />,
      template: "Hi Ujjwal, I would like to discuss a freelance full-stack project. I have a scope ready and would love to chat about scale, timeline, and estimation.",
    },
    {
      id: "teaching",
      label: "Teaching / Mentorship",
      icon: <MessageSquare className="w-3.5 h-3.5" />,
      template: "Hi Ujjwal, I saw you teach full-stack engineering. I would love to schedule a session/call to learn more and discuss how you can help me/my team.",
    },
    {
      id: "chat",
      label: "Quick Coffee Chat",
      icon: <Coffee className="w-3.5 h-3.5" />,
      template: "Hi Ujjwal, I'm looking to connect and have a quick informal coffee chat about engineering practices, systems, and tech stack ideas.",
    },
  ];

  const handleTagClick = (tag: typeof quickTags[0]) => {
    setSelectedTag(tag.id);
    setMessage(tag.template);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-xl rounded-3xl bg-white/95 dark:bg-neutral-900/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] md:p-8 border border-neutral-200/50 dark:border-neutral-800/50 z-10 overflow-hidden"
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none z-0" />

        {/* Decorative ambient glow */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#1A4DFF]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#1A4DFF]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-0 right-0 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 hover:rotate-90 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
          </button>

          {/* Title */}
          <div className="mb-6 pr-8">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#1A4DFF]" />
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                Book a Meeting
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5">
              Let's connect. Fill out the form below or copy my direct contact details.
            </p>
          </div>

          {/* Direct Email Actions (Glassmorphic design) */}
          <div className="mb-6 p-4 rounded-2xl bg-neutral-50/80 dark:bg-neutral-800/40 border border-neutral-200/30 dark:border-neutral-800/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1A4DFF]/10 dark:bg-[#1A4DFF]/20 flex items-center justify-center shadow-inner">
                <Mail className="w-5 h-5 text-[#1A4DFF]" />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest font-bold text-neutral-400">
                  Direct Email
                </span>
                <span className="text-xs md:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  {emailAddress}
                </span>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-[#1A4DFF] hover:border-transparent hover:text-white dark:hover:bg-[#1A4DFF] transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Email
                </>
              )}
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Quick Template Selector */}
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
                Select Purpose (Optional Template)
              </span>
              <div className="flex flex-wrap gap-2">
                {quickTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => handleTagClick(tag)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer border ${
                      selectedTag === tag.id
                        ? "bg-[#1A4DFF] text-white border-transparent shadow-[0_4px_12px_rgba(26,77,255,0.2)]"
                        : "bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    }`}
                  >
                    {tag.icon}
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ujjwal Prakash"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:border-[#1A4DFF] focus:bg-white dark:focus:bg-neutral-950 focus:ring-2 focus:ring-[#1A4DFF]/15 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ujjwalprakash858@gmail.com"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:border-[#1A4DFF] focus:bg-white dark:focus:bg-neutral-950 focus:ring-2 focus:ring-[#1A4DFF]/15 transition-all duration-200"
                />
              </div>
            </div>

            {/* Textarea */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1.5">
                Message / Purpose
              </label>
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setSelectedTag("");
                }}
                placeholder="Tell me about your project scale, tech stack, scope, or timeline..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:border-[#1A4DFF] focus:bg-white dark:focus:bg-neutral-950 focus:ring-2 focus:ring-[#1A4DFF]/15 transition-all duration-200 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleCopyContent}
                disabled={!name || !email || !message}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98] cursor-pointer"
              >
                {copiedContent ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Form Text
                  </>
                )}
              </button>

              <button
                onClick={handleSendEmail}
                disabled={!name || !email || !message}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#1A4DFF] hover:bg-[#1A4DFF]/90 text-white text-sm font-bold shadow-[0_4px_14px_rgba(26,77,255,0.3)] disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Open in Mail App
              </button>
            </div>

            {/* Notice for no mail app */}
            <p className="text-[10px] text-center text-neutral-400 leading-normal pt-2">
              💡 Don't have a mail app? Enter details, click <strong className="text-neutral-500 dark:text-neutral-300">Copy Form Text</strong>, and paste it directly into your webmail.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
