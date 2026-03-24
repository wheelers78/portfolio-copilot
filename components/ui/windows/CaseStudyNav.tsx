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
    <nav className="w-80 border-r border-[var(--border-subtle)] bg-[var(--surface)] flex flex-col overflow-hidden">
      {/* Project list */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-3 p-6">
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
