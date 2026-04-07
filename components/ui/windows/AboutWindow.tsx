"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { SplitTextHeading } from "../SplitTextHeading";
import { BrandLogoRail } from "../brand-logo-rail";
import { FadeInUp } from "../FadeInUp";
import { OrbitDiagram } from "../OrbitDiagram";

interface TabPosition {
  left: number;
  width: number;
}

const tabs = ["About", "Experience"];

function AboutContent() {
  return (
    <div className="pt-0 space-y-4">
      <SplitTextHeading
        text="Dad. Husband. Designer."
        className="text-[32px] font-sans leading-snug tracking-tight text-[var(--text-primary)] pb-2 font-medium"
        trigger={true}
        staggerDelay={0.05}
        wordDelay={0.1}
        duration={0.5}
        coloredWords={{ 2: "text-muted" }}
      />

      <p className="text-[16px] font-sans leading-snug text-[var(--text-primary)] pb-2">
        I'm a Product Design Lead with 15+ years' experience, working across systems, platforms, and product.
        I spend most of my time turning complex, messy problems into things that feel clear and usable.
      </p>

      <p className="text-[16px] font-sans leading-snug text-[var(--text-primary)] pb-2">
        I work closely with product and engineering to make ideas real — shaping direction, building systems, and getting things shipped.
        I care about how things actually work. Not just the interface, but the thinking and structure behind it.
      </p>

      <p className="text-[16px] font-sans leading-snug text-[var(--text-primary)]">
        Outside of work, I'm a dad and a husband — which keeps me grounded, and honest about what really matters.
      </p>

      <p className="text-[16px] font-sans leading-snug text-[var(--text-primary)]">
        Right now, I'm focused on how AI can help us move faster — and close the gap between idea and execution.
      </p>

      <div className="pt-6 flex flex-col">
        <a
          href="https://www.linkedin.com/in/wheelers78/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-[6px] w-fit text-[13px] leading-relaxed text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text-primary)] pb-[2px]"
        >
          <span>Connect on Linkedin</span>
          <svg width="13" height="13" viewBox="0 0 32 32" fill="currentColor" className="shrink-0 opacity-70 transition-opacity duration-200 group-hover:opacity-100">
            <path d="M26 28H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10v2H6v20h20V16h2v10a2 2 0 0 1-2 2z"/>
            <path d="M20 2v2h6.586L18 12.586 19.414 14 28 5.414V12h2V2H20z"/>
          </svg>
          {/* faint base underline */}
          <span className="absolute bottom-0 left-0 h-px w-full" style={{ background: "var(--text-muted)", opacity: 0.25 }} />
          {/* animated fill underline */}
          <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" style={{ background: "var(--text-primary)" }} />
        </a>
      </div>

      <div className="pt-4 flex justify-center pb-8">
        <img
          src="/images/profile.png"
          alt="Paul Whelan"
          className="h-80 w-80 object-cover"
        />
      </div>
    </div>
  );
}

function HowIWorkContent() {
  return (
    <div className="pt-2 pb-4">
      <OrbitDiagram />
    </div>
  );
}

const PREVIEW_W = 300;
const PREVIEW_H = Math.round(300 * (920 / 1050)); // matches source image ratio 1050×920
const CURSOR_OFFSET_X = 24;
const CURSOR_OFFSET_Y = -PREVIEW_H / 2; // vertically centred on cursor

function ExperienceContent() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch) return;
    // Clamp so card stays within viewport
    const x = Math.min(e.clientX + CURSOR_OFFSET_X, window.innerWidth - PREVIEW_W - 8);
    const y = Math.max(8, Math.min(e.clientY + CURSOR_OFFSET_Y, window.innerHeight - PREVIEW_H - 8));
    setCursorPos({ x, y });
  };

  const handleMouseEnter = (i: number) => {
    setHoveredIndex(i);
  };

  const experiences: {
    company: string;
    role: string;
    paragraphs?: string[];
    items?: string[];
    isBulletList?: boolean;
    hoverImage: string;
  }[] = [
    {
      company: "WGSN",
      role: "Product Design Lead",
      paragraphs: [
        "As Lead Product Designer at WGSN, I shape product direction and design execution across multiple squads — delivering platform improvements and new features from concept through to launch.",
        "I founded and scaled a company-wide design system, improving consistency and accelerating delivery across design and engineering. My focus is making complex platforms feel clear and usable — aligning product, engineering, and business goals to real user needs.",
        "More recently, I’ve been integrating AI into the workflow — speeding up design handoff while exploring how agentic systems can connect design directly to code.",
      ],
      hoverImage: "Experience_WGSN.png",
    },
    {
      company: "SEDNA",
      role: "Design Lead",
      paragraphs: [
        "At SEDNA, I co-led and mentored a team of seven product designers — raising the bar on craft and collaboration.",
        "I introduced DesignOps and scalable workflows, strengthening the connection between design and engineering.",
        "I built and launched a design system that improved consistency and delivery speed, while aligning product outcomes with user needs and business goals.",      
      ],
      hoverImage: "Experience_Sedna.png",
    },
    {
      company: "MIQ",
      role: "Product Design Lead",
      paragraphs: [
        "At MiQ, I helped shift design from execution to strategy.",
        "I built and mentored a six-person team, introduced design thinking, and strengthened collaboration across global teams.",
        "I created a global design system that improved consistency and speed, helping connect creative, technical, and business goals.",
      ],
      hoverImage: "Experience_MiQ.png",
    },
  ];

  const allBrands = [
    { name: "wgsn", alt: "WGSN" },
    { name: "sedna", alt: "SEDNA" },
    { name: "miq", alt: "MIQ" },
    { name: "berghaus", alt: "Berghaus" },
    { name: "canterbury", alt: "Canterbury" },
    { name: "ellesse", alt: "Ellesse" },
    { name: "speedo", alt: "Speedo" },
    { name: "lacoste", alt: "Lacoste" },
  ];

  const isVisible = hoveredIndex !== null && !isTouch;

  return (
    <div className="space-y-0">
      {/* Compact experience list */}
      <div>
        {experiences.map((exp, i) => (
          <FadeInUp key={i} delay={i * 0.07} duration={0.4}>
            <div
              className="py-4 border-b last:border-0 cursor-default transition-opacity duration-200"
              style={{
                borderColor: "var(--border-subtle)",
                opacity: hoveredIndex !== null && hoveredIndex !== i ? 0.35 : 1,
              }}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <p className="text-[12px] font-mono font-regular text-[var(--text-muted)] tracking-tight">
                  {exp.company}
                </p>
                
              </div>
              <p className="text-[24px] font-medium text-[var(--text-primary)] shrink-0 tracking-tight">{exp.role}</p>
              {exp.paragraphs && exp.paragraphs.length > 0 && (
                <div className="space-y-3 mt-1">
                  {exp.paragraphs.map((p, pi) => (
                    <p key={pi} className="text-[13px] leading-relaxed text-[var(--text-primary)]">{p}</p>
                  ))}
                </div>
              )}
              {exp.items && exp.items.length > 0 && (
                <div className="mt-1">
                  {exp.isBulletList ? (
                    <ul className="space-y-1">
                      {exp.items.map((item, ii) => (
                        <li key={ii} className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--text-primary)]">
                          <div className="flex-shrink-0 w-1 h-1 mt-[9px]" style={{ backgroundColor: "var(--text-primary)" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="space-y-1">
                      {exp.items.map((item, ii) => (
                        <p key={ii} className="text-[13px] leading-relaxed text-[var(--text-primary)]">{item}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Inline image fallback for touch/small screens */}
              <div
                className="mt-3 overflow-hidden rounded-md sm:hidden"
                style={{
                  maxHeight: hoveredIndex === i ? "120px" : "0px",
                  transition: "max-height 0.3s ease",
                }}
              >
                <img
                  src={`/images/${exp.hoverImage}`}
                  alt={exp.company}
                  className="w-full h-[120px] object-cover"
                />
              </div>
            </div>
          </FadeInUp>
        ))}
      </div>

      {/* Floating preview portal — desktop only */}
      {mounted && createPortal(
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            top: cursorPos.y,
            left: cursorPos.x,
            width: PREVIEW_W,
            height: PREVIEW_H,
            zIndex: 9999,
            borderRadius: 10,
            overflow: "hidden",
            pointerEvents: "none",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1)" : "scale(0.94)",
            transition: "opacity 0.18s ease, transform 0.18s ease",
            boxShadow: "0 12px 40px rgba(0,0,0,0.22), 0 1px 4px rgba(0,0,0,0.10)",
          }}
          className="hidden sm:block"
        >
          {experiences.map((exp, i) => (
            <img
              key={i}
              src={`/images/${exp.hoverImage}`}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: hoveredIndex === i ? 1 : 0,
                transition: "opacity 0.18s ease",
              }}
            />
          ))}
        </div>,
        document.body
      )}

      {/* Logo rail — supporting proof, not primary */}
      <div className="pt-10 pb-8">
        <p className="text-[11px] font-sans uppercase tracking-widest text-[var(--text-muted)] pb-6 opacity-50">
          Also worked with
        </p>
        <div className="overflow-x-hidden w-full opacity-60">
          <BrandLogoRail
            brands={allBrands}
            slotCount={4}
            transitionDuration={1.3}
            slotDelay={0.15}
            pauseAfterCycle={1.5}
          />
        </div>
      </div>
    </div>
  );
}

export default function AboutWindow() {
  const [activeTab, setActiveTab] = useState("About");
  const [activePosition, setActivePosition] = useState<TabPosition>({ left: 0, width: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeButton = tabsRef.current[tabs.indexOf(activeTab)];
    if (activeButton) {
      setActivePosition({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, [activeTab]);

  const position = activePosition;

  return (
    <div className="flex flex-col h-full mx-auto w-full max-w-lg">
      {/* Tab Navigation */}
      <div
        className="top-0 relative pb-0 z-10 -mx-3 px-3 pt-6 -mt-5"
      >
        <ul className="flex items-center gap-6">
          {tabs.map((tab, index) => {
            const isActive = tab === activeTab;

            return (
              <li key={tab}>
                <button
                  ref={(el) => {
                    tabsRef.current[index] = el;
                  }}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  aria-current={isActive ? "true" : undefined}
                  className={`px-0 py-2 text-[14px] font-normal transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {tab}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Animated underline */}
        <div
          className="absolute bottom-0 h-px bg-[var(--text-primary)] transition-all duration-300 ease-out"
          style={{
            left: `${position.left}px`,
            width: `${position.width}px`,
          }}
        />
      </div>

      {/* Content Area */}
      <div className="pt-8">
        <div className="transition-opacity duration-150 ease-out" style={{ opacity: 1 }}>
          {activeTab === "About" && <AboutContent />}
          {activeTab === "How I work" && <HowIWorkContent />}
          {activeTab === "Experience" && <ExperienceContent />}
        </div>
      </div>
    </div>
  );
}
