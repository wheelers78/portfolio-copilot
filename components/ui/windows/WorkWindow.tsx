"use client";

import React, { useState, useRef } from "react";
import { projects, type Project } from "@/data/projects";
import CaseStudyNav from "./CaseStudyNav";
import CaseStudyDetail from "./CaseStudyDetail";

interface WorkWindowProps {
  initialSlug?: string;
}

export default function WorkWindow({ initialSlug }: WorkWindowProps) {
  const initialProject =
    initialSlug && projects.find((p) => p.slug === initialSlug)
      ? projects.find((p) => p.slug === initialSlug)!
      : projects[0];

  const [selectedProject, setSelectedProject] = useState<Project>(initialProject);
  const [isVisible, setIsVisible] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleSelectProject = (project: Project) => {
    setIsVisible(false);
    setSelectedProject(project);
    // Fade back in after project changes
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  };

  return (
    <div className="flex h-full bg-[var(--surface)]">
      {/* Left navigation rail */}
      <CaseStudyNav
        projects={projects}
        selectedSlug={selectedProject.slug}
        onSelectProject={handleSelectProject}
      />

      {/* Right content pane - key forces remount with scroll at 0 */}
      <div
        key={selectedProject.slug}
        ref={scrollContainerRef}
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.2s' }}
        className="flex-1 overflow-y-auto bg-[var(--surface)]"
      >
        <CaseStudyDetail project={selectedProject} />
      </div>
    </div>
  );
}
