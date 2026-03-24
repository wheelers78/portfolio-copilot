"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Project } from "@/data/projects";
import CaseStudyHero from "./CaseStudyHero";
import CaseStudyMeta from "./CaseStudyMeta";
import CaseStudySection from "./CaseStudySection";

interface CaseStudyDetailProps {
  project: Project;
}

export default function CaseStudyDetail({ project }: CaseStudyDetailProps) {
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
          {/* Hero section with title */}
          <CaseStudyHero project={project} />

          {/* Main content */}
          <div className="px-12 py-8 space-y-8">
            {/* Summary */}
            <p className="text-[14px] leading-relaxed text-[var(--text-primary)] max-w-2xl">
              {project.summary}
            </p>

            {/* Meta grid (role, period, etc.) */}
            <CaseStudyMeta project={project} />

            {/* Challenge/overview section */}
            {project.challenge && (
              <CaseStudySection label="Challenge" content={project.challenge} />
            )}

            {/* Actions/responsibilities */}
            {project.actions.length > 0 && (
              <CaseStudySection
                label="Actions"
                items={project.actions}
                isBulletList
              />
            )}

            {/* Outcomes */}
            {project.outcomes.length > 0 && (
              <CaseStudySection
                label="Outcomes"
                items={project.outcomes}
                isBulletList
              />
            )}

            {/* Images */}
            {project.images && project.images.length > 0 && (
              <div className="space-y-4 pt-4">
                {project.images.map((src, i) => (
                  <div key={i} className="overflow-hidden rounded-sm">
                    <img
                      src={src}
                      alt={`${project.title} visual ${i + 1}`}
                      className="w-full h-auto block"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
