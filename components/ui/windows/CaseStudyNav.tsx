"use client";

import React, { useState } from "react";
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
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  // Use hovered item if hovering, otherwise use selected item
  const activeSlug = hoveredSlug || selectedSlug;
  const activeIndex = projects.findIndex((p) => p.slug === activeSlug);

  const itemHeight = 96; // Height of each item including gap (card ~84px + gap 12px)
  const activeYPosition = activeIndex * itemHeight;

  return (
    <nav className="w-80 border-r border-[var(--border-subtle)] bg-[var(--surface)] flex flex-col overflow-hidden">
      {/* Project list */}
      <div className="flex-1 overflow-y-auto relative">
        {/* Animated background for active/hovered item */}
        <motion.div
          className="absolute left-6 right-6 h-20 rounded-lg pointer-events-none z-0 border border-[var(--border)]"
          style={{
            background: "rgba(45, 91, 227, 0.15)",
          }}
          animate={{
            top: activeYPosition + 24,
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 25,
            mass: 1,
          }}
        />

        <div className="space-y-3 p-6 relative z-10">
          {projects.map((project) => (
            <div
              key={project.slug}
              onMouseEnter={() => setHoveredSlug(project.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
            >
              <CaseStudyNavItem
                project={project}
                isSelected={project.slug === selectedSlug}
                onSelect={() => onSelectProject(project)}
              />
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
