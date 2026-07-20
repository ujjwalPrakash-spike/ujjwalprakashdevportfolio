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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
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
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-h-[90dvh] sm:max-h-none sm:h-auto sm:max-w-xl rounded-t-[2.5rem] sm:rounded-3xl bg-white/95 dark:bg-neutral-900/95 p-6 sm:p-8 border-t sm:border border-neutral-200/50 dark:border-neutral-800/50 shadow-[0_-10px_40px_rgba(0,0,0,0.1),0_20px_50px_rgba(0,0,0,0.15)] z-10 overflow-y-auto [scrollbar-width:thin] flex flex-col gap-4 sm:gap-6"
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none z-0" />

        {/* Decorative ambient glow */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#1A4DFF]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#1A4DFF]/5 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 hover:rotate-90 cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
        </button>

        <div className="relative z-10 flex flex-col gap-4 sm:gap-6 pb-6 sm:pb-0">
          {/* Title */}
          <div className="pr-8">
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
          <div className="p-3.5 md:p-4 rounded-2xl bg-neutral-50/80 dark:bg-neutral-800/40 border border-neutral-200/30 dark:border-neutral-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#1A4DFF]/10 dark:bg-[#1A4DFF]/20 flex items-center justify-center shadow-inner shrink-0">
                <Mail className="w-4.5 h-4.5 md:w-5 md:h-5 text-[#1A4DFF]" />
              </div>
              <div className="min-w-0">
                <span className="block text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-neutral-400">
                  Direct Email
                </span>
                <span className="text-xs md:text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate block">
                  {emailAddress}
                </span>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-[#1A4DFF] hover:border-transparent hover:text-white dark:hover:bg-[#1A4DFF] transition-all duration-300 cursor-pointer shadow-sm active:scale-95 w-full sm:w-auto"
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

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Quick Template Selector */}
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
                Select Purpose (Optional Template)
              </span>
              <div className="flex flex-row flex-nowrap overflow-x-auto gap-2 pb-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-1 px-1">
                {quickTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => handleTagClick(tag)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer border whitespace-nowrap ${
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
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:border-[#1A4DFF] focus:bg-white dark:focus:bg-neutral-950 focus:ring-2 focus:ring-[#1A4DFF]/15 transition-all duration-200 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleCopyContent}
                disabled={!name || !email || !message}
                className="flex items-center justify-center gap-2 px-3 py-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98] cursor-pointer"
              >
                {copiedContent ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Form
                  </>
                )}
              </button>

              <button
                onClick={handleSendEmail}
                disabled={!name || !email || !message}
                className="flex items-center justify-center gap-2 px-3 py-3.5 rounded-xl bg-[#1A4DFF] hover:bg-[#1A4DFF]/90 text-white text-xs sm:text-sm font-bold shadow-[0_4px_14px_rgba(26,77,255,0.3)] disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98] cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Send Email
              </button>
            </div>

            {/* Notice for no mail app */}
            <p className="text-[10px] text-center text-neutral-400 leading-normal pt-1">
              💡 Don't have a mail app? Enter details, click <strong className="text-neutral-500 dark:text-neutral-300">Copy Form</strong>, and paste it directly into your webmail.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
