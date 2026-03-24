"use client";

import React from "react";
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
  return (
    <nav className="w-56 border-r border-[var(--border-subtle)] bg-[var(--surface)] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-5 py-5 border-b border-[var(--border-subtle)]">
        <h2 className="text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--text-primary)]">
          Work
        </h2>
        <p className="text-[11px] text-[var(--text-muted)] mt-1.5">
          {projects.length} projects
        </p>
      </div>

      {/* Project list */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-0.5 p-3">
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
