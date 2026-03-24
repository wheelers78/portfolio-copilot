"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { type Project } from "@/data/projects";
import CaseStudyNavItem from "./CaseStudyNavItem";

interface CaseStudyNavProps {
  projects: Project[];
  selectedSlug: string;
  onSelectProject: (project: Project) => void;
}

export default function CaseStudyNav({
  projects,
  selectedSlug,
  onSelectProject,
}: CaseStudyNavProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollY(container.scrollTop);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const selectedIndex = projects.findIndex((p) => p.slug === selectedSlug);
  const itemHeight = 104; // Height of each CaseStudyNavItem (approximate: h + gap)
  const selectedYPosition = selectedIndex * itemHeight;

  return (
    <nav className="w-80 border-r border-[var(--border-subtle)] bg-[var(--surface)] flex flex-col overflow-hidden">
      {/* Project list */}
      <div className="flex-1 overflow-y-auto relative" ref={scrollContainerRef}>
        {/* Animated background for active item */}
        <motion.div
          className="absolute left-6 right-6 h-24 rounded-lg pointer-events-none z-0 border border-[var(--border)]"
          style={{
            background: "rgba(45, 91, 227, 0.1)",
          }}
          animate={{
            top: selectedYPosition + 24 - scrollY,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1,
          }}
        />

        <div className="space-y-3 p-6 relative z-10">
          {projects.map((project) => (
            <CaseStudyNavItem
              key={project.slug}
              project={project}
              isSelected={project.slug === selectedSlug}
              onSelect={() => onSelectProject(project)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
