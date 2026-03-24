"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Project } from "@/data/projects";
import CaseStudyMeta from "./CaseStudyMeta";
import CaseStudySection from "./CaseStudySection";

interface CaseStudyDetailProps {
  project: Project;
}

export default function CaseStudyDetail({ project }: CaseStudyDetailProps) {
  // First image is the hero/cover image
  const coverImage = project.images?.[0];
  const remainingImages = project.images?.slice(1) || [];

  return (
    <div className="flex-1 overflow-y-auto bg-[var(--surface)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={project.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-0"
        >
          {/* Cover image - flush at top, no sticky header */}
          {coverImage && (
            <div className="w-full overflow-hidden">
              <img
                src={coverImage}
                alt={`${project.title} cover`}
                className="w-full h-auto block"
              />
            </div>
          )}

          {/* Main content */}
          <div className="px-12 py-8 space-y-8">
            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
                {project.title}
              </h1>
            </div>

            {/* Summary */}
            {project.summary && (
              <p className="text-sm leading-relaxed text-[var(--text-primary)] max-w-3xl">
                {project.summary}
              </p>
            )}

            {/* Company & Role - two column layout */}
            <div className="grid grid-cols-2 gap-8 py-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  Company
                </p>
                <p className="text-sm text-[var(--text-primary)]">
                  {project.roleTitle}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  Role
                </p>
                <p className="text-sm text-[var(--text-primary)]">
                  {project.role}
                </p>
              </div>
            </div>

            {/* Remaining content sections */}
            {project.challenge && (
              <CaseStudySection label="Challenge" content={project.challenge} />
            )}

            {project.actions && project.actions.length > 0 && (
              <CaseStudySection
                label="Actions"
                items={project.actions}
                isBulletList
              />
            )}

            {project.outcomes && project.outcomes.length > 0 && (
              <CaseStudySection
                label="Outcomes"
                items={project.outcomes}
                isBulletList
              />
            )}

            {/* Remaining images */}
            {remainingImages.length > 0 && (
              <div className="space-y-4 pt-4">
                {remainingImages.map((src, i) => (
                  <div key={i} className="overflow-hidden">
                    <img
                      src={src}
                      alt={`${project.title} visual ${i + 2}`}
                      className="w-full h-auto block"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Bottom padding */}
            <div className="pb-12" />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
