"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PortfolioAnimationsProps {
  children: React.ReactNode;
}

export default function PortfolioAnimations({ children }: PortfolioAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Only execute scroll animations if user does not prefer reduced motion
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Scroll Progress Bar (Top)
        gsap.to(".gsap-scroll-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.15,
          },
        });

        // 2. Hero Section Entrance
        const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } });
        heroTl
          .from(".gsap-hero-avatar", {
            opacity: 0,
            scale: 0.88,
            duration: 0.75,
          })
          .from(
            ".gsap-hero-badge",
            {
              opacity: 0,
              y: 14,
              duration: 0.45,
            },
            "-=0.4"
          )
          .from(
            ".gsap-hero-title",
            {
              opacity: 0,
              y: 18,
              duration: 0.5,
            },
            "-=0.3"
          )
          .from(
            ".gsap-hero-role",
            {
              opacity: 0,
              y: 14,
              duration: 0.45,
            },
            "-=0.3"
          )
          .from(
            ".gsap-hero-desc",
            {
              opacity: 0,
              y: 14,
              duration: 0.5,
            },
            "-=0.25"
          )
          .from(
            ".gsap-hero-actions > *",
            {
              opacity: 0,
              y: 12,
              stagger: 0.08,
              duration: 0.45,
            },
            "-=0.2"
          );

        // 3. Work Experience Section Entrance
        const expHeader = document.querySelector(".gsap-exp-header");
        if (expHeader) {
          gsap.from(".gsap-exp-header", {
            scrollTrigger: {
              trigger: ".gsap-exp-header",
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            y: 22,
            duration: 0.55,
            ease: "power2.out",
          });
        }

        const expCards = document.querySelectorAll(".gsap-exp-card");
        if (expCards.length > 0) {
          gsap.from(".gsap-exp-card", {
            scrollTrigger: {
              trigger: ".gsap-exp-list",
              start: "top 82%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            y: 28,
            stagger: 0.12,
            duration: 0.6,
            ease: "power2.out",
          });
        }

        // 4. Education Section Entrance
        const eduHeader = document.querySelector(".gsap-edu-header");
        if (eduHeader) {
          gsap.from(".gsap-edu-header", {
            scrollTrigger: {
              trigger: ".gsap-edu-header",
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            y: 22,
            duration: 0.55,
            ease: "power2.out",
          });
        }

        const eduCards = document.querySelectorAll(".gsap-edu-card");
        if (eduCards.length > 0) {
          gsap.from(".gsap-edu-card", {
            scrollTrigger: {
              trigger: ".gsap-edu-list",
              start: "top 82%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            y: 28,
            stagger: 0.12,
            duration: 0.6,
            ease: "power2.out",
          });
        }

        // 4. Projects Showcase Section Entrance
        const projHeader = document.querySelector(".gsap-proj-header");
        if (projHeader) {
          gsap.from(".gsap-proj-header", {
            scrollTrigger: {
              trigger: ".gsap-proj-header",
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            y: 22,
            duration: 0.55,
            ease: "power2.out",
          });
        }

        const projCards = document.querySelectorAll(".gsap-proj-card");
        if (projCards.length > 0) {
          gsap.from(".gsap-proj-card", {
            scrollTrigger: {
              trigger: ".gsap-proj-grid",
              start: "top 80%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            y: 32,
            stagger: 0.12,
            duration: 0.65,
            ease: "power2.out",
          });
        }

        // 5. Footer entrance
        const footer = document.querySelector(".gsap-footer");
        if (footer) {
          gsap.from(".gsap-footer", {
            scrollTrigger: {
              trigger: ".gsap-footer",
              start: "top 95%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            y: 16,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative">
      {/* Scroll Progress Bar at the top */}
      <div
        className="gsap-scroll-progress fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#ff3f81] via-[#e1bee7] to-[#ff3f81] z-50 origin-left scale-x-0 pointer-events-none"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
