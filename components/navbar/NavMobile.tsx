"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function NavMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { links, cta } = siteConfig.navbar;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const mobileLinks = [{ label: "Home", href: "/" }, ...links];

  const overlayContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", ease: [0.76, 0, 0.24, 1], duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-[#fafffa] flex flex-col"
        >
          {/* Header */}
          <div className="px-6 pt-10 pb-6 flex justify-between items-center">
            <Link 
              href="/" 
              className="text-[#1A4DFF] font-bold text-[18px] tracking-tight" 
              onClick={toggleMenu}
            >
              {siteConfig.navbar.brandTop.toLowerCase()}
            </Link>
            <button 
              onClick={toggleMenu} 
              aria-label="Close menu" 
              className="text-[#111111] p-2 -mr-2 transition-transform hover:rotate-90 duration-300"
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10L30 30M30 10L10 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
              </svg>
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 flex flex-col justify-center px-6">
            <nav className="flex flex-col gap-2">
              {mobileLinks.map((link, i) => (
                <div key={link.label} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Link
                      href={link.href}
                      className="text-[15vw] sm:text-8xl font-bold tracking-tighter text-[#111111] hover:text-[#1A4DFF] transition-colors leading-[1] block"
                      onClick={toggleMenu}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="px-6 pb-10 pt-6 mt-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col gap-8"
            >
              <Link href={cta.href} target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>
                <button className="w-full bg-[#1A4DFF] hover:opacity-90 text-white py-[18px] px-6 flex items-center justify-center font-bold text-[13px] tracking-widest uppercase transition-opacity rounded-sm">
                  {cta.label}
                  <span className="inline-block ml-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 11" className="w-[10px] h-auto">
                      <circle cx="2.429" cy="2.358" r="1.111" className="fill-current" transform="rotate(45 2.429 2.358)"></circle>
                      <circle cx="5.571" cy="5.5" r="1.111" className="fill-current" transform="rotate(135 5.571 5.5)"></circle>
                      <circle cx="2.429" cy="8.642" r="1.111" className="fill-current" transform="rotate(135 2.429 8.642)"></circle>
                    </svg>
                  </span>
                </button>
              </Link>
              
              <div className="flex items-center text-[15px] tracking-tight text-[#111111]/80 border-t border-black/10 pt-6">
                <span className="font-bold text-[#111111] mr-1">U.</span> {siteConfig.home.hero.footerText || "Digital Thinkers"}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="lg:hidden col-start-12 col-span-1 flex items-center justify-end z-[60]">
        <button
          onClick={toggleMenu}
          className="text-black p-2 -mr-2"
          aria-label="Open menu"
        >
          {/* A simple modern hamburger icon */}
          <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="2" fill="currentColor"/>
            <rect y="9" width="28" height="2" fill="currentColor"/>
            <rect y="18" width="28" height="2" fill="currentColor"/>
          </svg>
        </button>
      </div>

      {mounted && document.body ? createPortal(overlayContent, document.body) : null}
    </>
  );
}
