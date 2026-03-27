"use client";

import React, { useState, useRef, useEffect } from "react";
import { SplitTextHeading } from "../SplitTextHeading";
import { BrandLogoRail } from "../brand-logo-rail";
import { LogoImage } from "../brand-logo";
import { FadeInUp } from "../FadeInUp";

interface TabPosition {
  left: number;
  width: number;
}

const tabs = ["About", "Experience"];

function AboutContent() {
  return (
    <div className="space-y-4">
      <SplitTextHeading
        text="Dad. Husband. Designer."
        className="text-[32px] font-sans leading-snug tracking-loose text-[var(--text-primary)] pb-2 font-medium"
        trigger={true}
        staggerDelay={0.05}
        wordDelay={0.1}
        duration={0.5}
        coloredWords={{ 2: "text-muted" }}
      />

      <p className="text-[16px] font-sans leading-snug text-[var(--text-primary)] pb-2">
        I’m a Product Design Lead with 15+ years’ experience, working across systems, platforms, and product.
        I spend most of my time turning complex, messy problems into things that feel clear and usable.
      </p>

      <p className="text-[16px] font-sans leading-snug text-[var(--text-primary)] pb-2">
        I work closely with product and engineering to make ideas real — shaping direction, building systems, and getting things shipped.
        I care about how things actually work. Not just the interface, but the thinking and structure behind it.
      </p>

      <p className="text-[16px] font-sans leading-snug text-[var(--text-primary)]">
        Outside of work, I’m a dad and a husband — which keeps me grounded, and honest about what really matters.
      </p>

      <p className="text-[16px] font-sans leading-snug text-[var(--text-primary)]">
        Right now, I’m focused on how AI can help us move faster — and close the gap between idea and execution.
      </p>

      <div className="pt-6 flex flex-col">
        <p className="text-[13px]leading-relaxed text-[var(--text-muted)]">Connect on Linkedin</p>
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

function ExperienceContent() {
  const cardStyle = {
    background: "var(--ask-card-bg)",
    backdropFilter: "blur(10px)",
    border: "1px solid var(--glass-border-dark, rgba(255, 255, 255, 0.08))"
  };

  const featuredCompanies = [
    {
      name: "wgsn",
      alt: "WGSN",
      title: "Product Design Lead",
      description: "As Lead Product Designer at WGSN, I drive end-to-end design across four engineering squads - from concept to rollout - delivering new features and platform improvements that elevate the user experience.",
    },
    {
      name: "sedna",
      alt: "SEDNA",
      title: "Design Lead",
      description: "At SEDNA, I co-led and mentored a team of seven product designers, fostering a collaborative culture that encouraged experimentation and design excellence.",
    },
    {
      name: "miq",
      alt: "MiQ",
      title: "Product Design Lead",
      description: "Over three years at MiQ, I helped evolve the company’s design practice from executional to strategic. I built and mentored a six-person design team, introduced design thinking and user-centred principles, and championed cross-functional collaboration across global offices.",
    },
  ];

  const allBrands = [
    { name: "wgsn", alt: "WGSN" },
    { name: "sedna", alt: "SEDNA" },
    { name: "miq", alt: "MiQ" },
    { name: "berghaus", alt: "Berghaus" },
    { name: "canterbury", alt: "Canterbury" },
    { name: "ellesse", alt: "Ellesse" },
    { name: "speedo", alt: "Speedo" },
    { name: "lacoste", alt: "Lacoste" },
  ];

  return (
    <div className="space-y-10">
      {/* Featured Companies */}
      {featuredCompanies.map((company, index) => (
        <FadeInUp key={index} delay={index * 0.1} duration={0.5}>
        <div
          className="rounded-2xl flex flex-col px-6 pt-5 pb-8"
          style={cardStyle}
        >
          {/* Company label */}
          <p className="text-[13px] text-[var(--text-muted)] mb-10">
            {company.alt}
          </p>
          {/* Logo */}
          <div className="flex items-center justify-center py-10">
            <LogoImage
              name={company.name}
              alt={company.alt}
              className="h-24 w-auto max-w-[320px] object-contain"
            />
          </div>
          {/* Title */}
          <p className="text-[22px] font-medium pt-10 pb-2 text-[var(--text-primary)]">
            {company.title}
          </p>
          {/* Description */}
          <p className="text-[13px] leading-relaxed text-[var(--text-muted)]">
            {company.description}
          </p>
        </div>
        </FadeInUp>
      ))}

      {/* Other Brands — restored cycling behaviour, overflow clipped for responsiveness */}
      <div className="pt-8 mt-8 border-t border-[var(--border-subtle)]">
        <p className="text-[14px] font-sans font-medium text-[var(--text-primary)] pb-6 pt-4">
          Brands I’ve worked with
        </p>
        <div className="overflow-x-hidden w-full">
          <BrandLogoRail
            brands={allBrands}
            slotCount={4}
            transitionDuration={1.3}
            slotDelay={0.15}
            pauseAfterCycle={1.5}
          />
        </div>
        <div className="h-8" />
      </div>
    </div>
  );
}

export default function AboutWindow() {
  const [activeTab, setActiveTab] = useState("About");
  const [activePosition, setActivePosition] = useState<TabPosition>({ left: 0, width: 0 });
  const [hoveredPosition, setHoveredPosition] = useState<TabPosition | null>(null);
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

  const handleMouseEnter = (tab: string) => {
    const index = tabs.indexOf(tab);
    const button = tabsRef.current[index];
    if (button) {
      setHoveredPosition({
        left: button.offsetLeft,
        width: button.offsetWidth,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredPosition(null);
  };

  const position = hoveredPosition || activePosition;

  return (
    <div className="flex flex-col h-full">
      {/* Tab Navigation */}
      <div
        className="sticky top-0 relative pb-0 backdrop-blur-lg"
        style={{
          borderBottom: "1px solid var(--glass-border-dark, rgba(255, 255, 255, 0.08))"
        }}>
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
                  onMouseEnter={() => handleMouseEnter(tab)}
                  onMouseLeave={handleMouseLeave}
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
          className="absolute bottom-0 h-[1px] bg-[var(--text-primary)] transition-all duration-300 ease-out"
          style={{
            left: `${position.left}px`,
            width: `${position.width}px`,
          }}
        />
      </div>

      {/* Content Area with Fade Transition */}
      <div className="flex-1 overflow-y-auto pt-8">
        <div
          className="transition-opacity duration-150 ease-out"
          style={{ opacity: 1 }}
        >
          {activeTab === "About" && <AboutContent />}
          {activeTab === "Experience" && <ExperienceContent />}
        </div>
      </div>
    </div>
  );
}
