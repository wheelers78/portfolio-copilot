"use client";

import React, { useState } from "react";
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

  return (
    <div className="flex h-full bg-[var(--surface)]">
      {/* Left navigation rail */}
      <CaseStudyNav
        projects={projects}
        selectedSlug={selectedProject.slug}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* Right content pane */}
      <CaseStudyDetail project={selectedProject} />
    </div>
  );
}
