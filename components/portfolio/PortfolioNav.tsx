"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Menu, X, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
}

interface PortfolioNavProps {
  email: string;
}

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
];

export default function PortfolioNav({ email }: PortfolioNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");

  useGSAP(() => {
    // Track active section on scroll with ScrollTrigger
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top 180px",
        end: "bottom 180px",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(item.id);
          }
        },
      });
    });
  }, []);

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;

    setMobileMenuOpen(false);
    setActiveSection(targetId);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      target.scrollIntoView({ behavior: "auto" });
      window.history.pushState(null, "", `#${targetId}`);
      return;
    }

    gsap.to(window, {
      duration: 0.85,
      scrollTo: {
        y: target,
        offsetY: 76, // Height of sticky navbar + top padding
      },
      ease: "power2.inOut",
      onComplete: () => {
        window.history.pushState(null, "", `#${targetId}`);

        // Subtle accent feedback on the reached section
        const cardTarget = target.querySelector(".profile-card") || target;
        gsap.fromTo(
          cardTarget,
          { borderColor: "rgba(255, 63, 129, 0.6)" },
          {
            borderColor: "rgba(225, 190, 231, 0.15)",
            duration: 1.2,
            ease: "power2.out",
          }
        );
      },
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#19153c]/90 backdrop-blur-md border-b border-[#e1bee7]/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Profile back link */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 group text-xs text-[#e1bee7]/80 hover:text-white transition-colors"
          >
            <div className="relative w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-[#ff3f81] to-[#e1bee7] shadow-sm">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-[#070522]">
                <Image
                  src="/image/andre.jpg"
                  alt="Reynold Andre"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-sm text-white group-hover:text-[#ff3f81] transition-colors">
                Reynold Andre
              </span>
              <span className="text-[10px] text-gray-400 block -mt-0.5">
                Web Developer
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-gray-300">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[#e1bee7]/70 hover:text-[#ff3f81] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Profile Card</span>
          </Link>

          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, item.id)}
                className={`relative py-1 transition-colors ${
                  isActive
                    ? "text-[#ff3f81] font-semibold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff3f81] rounded-full" />
                )}
              </a>
            );
          })}

          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ff3f81] hover:bg-[#e0326f] text-white text-xs font-medium transition-all shadow-md shadow-[#ff3f81]/30 active:scale-95"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070522] border-b border-[#e1bee7]/15 px-6 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-xs text-[#e1bee7] py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Profile Card</span>
          </Link>

          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, item.id)}
                className={`block text-sm py-1.5 transition-colors ${
                  isActive
                    ? "text-[#ff3f81] font-semibold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <a
            href={`mailto:${email}`}
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#ff3f81] text-white text-xs font-medium"
          >
            <Mail className="w-4 h-4" />
            <span>Email Me</span>
          </a>
        </div>
      )}
    </header>
  );
}
