"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { type Project } from "@/data/projects";
import CaseStudyNavItem from "./CaseStudyNavItem";
import CaseStudyNavSection from "./CaseStudyNavSection";

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

  return (
    <nav className="w-80 border-r border-[var(--border-subtle)] bg-[var(--surface)] flex flex-col overflow-hidden">
      {/* Project list */}
      <div className="flex-1 overflow-y-auto relative">
        <div className="p-6 relative z-10 flex flex-col" style={{ gap: "6px" }}>
          {/* Case Studies Section */}
          <CaseStudyNavSection title="Case studies" />
          {projects
            .filter((p) =>
              ["wgsn_trends", "events_culture", "pulse_ai", "shorts", "catwalks", "sedna", "sedna_harbor"].includes(
                p.slug
              )
            )
            .map((project) => (
              <CaseStudyNavItem
                key={project.slug}
                project={project}
                isSelected={project.slug === selectedSlug}
                isHovered={hoveredSlug === project.slug}
                onSelect={() => onSelectProject(project)}
                onHoverChange={(isHovered) =>
                  setHoveredSlug(isHovered ? project.slug : null)
                }
              />
            ))}

          {/* Playground Section */}
          <CaseStudyNavSection title="Playground" />
          {projects
            .filter((p) =>
              ["personal_site", "solana_trading_alerts"].includes(p.slug)
            )
            .map((project) => (
              <CaseStudyNavItem
                key={project.slug}
                project={project}
                isSelected={project.slug === selectedSlug}
                isHovered={hoveredSlug === project.slug}
                onSelect={() => {
                  if (project.status !== "comingSoon") onSelectProject(project);
                }}
                onHoverChange={(isHovered) => {
                  if (project.status !== "comingSoon")
                    setHoveredSlug(isHovered ? project.slug : null);
                }}
              />
            ))}
        </div>
      </div>
    </nav>
  );
}
