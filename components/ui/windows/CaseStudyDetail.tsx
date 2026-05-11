"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Project } from "@/data/projects";
import CaseStudyMeta from "./CaseStudyMeta";
import CaseStudySection from "./CaseStudySection";
import { FadeInUp } from "@/components/ui/FadeInUp";
import FadeImage from "@/components/ui/FadeImage";

interface CaseStudyDetailProps {
  project: Project;
  sectionLabel: string;
  isMobile?: boolean;
}

export default function CaseStudyDetail({ project, sectionLabel, isMobile = false }: CaseStudyDetailProps) {
  const sidePad = isMobile ? '24px' : '80px';
  // All projects: use second image as hero background, third onwards as content
  const heroImage = project.images?.[1];
  const remainingImages = project.images?.slice(2) || [];

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={project.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-0"
        >
          {/* SECTION A: Hero header with background image and text overlay */}
          {heroImage ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full"
              style={{
                backgroundImage: `url(${heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '256px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: sidePad,
                paddingRight: sidePad,
                overflow: 'hidden',
              }}
            >
              {/* Overlay for text readability — colour set via heroOverlayColor in projects.ts */}
              <div
                className="absolute inset-0"
                style={{
                  background: project.heroOverlayColor ?? 'rgba(0, 0, 0, 0.5)',
                }}
              />

              {/* Text content over background */}
              <div
                className="relative z-10 flex flex-col text-left"
                style={{
                  gap: '-1px',
                }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-white/70 font-mono uppercase font-medium"
                  style={{
                    fontSize: '10px',
                    lineHeight: '14.5px',
                    letterSpacing: '0',
                  }}
                >
                  {sectionLabel}
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
                  className="text-white font-normal"
                  style={{
                    fontFamily: 'Figtree, sans-serif',
                    fontSize: isMobile ? '32px' : '47.99px',
                    letterSpacing: '-0.48px',
                    lineHeight: isMobile ? '40px' : '62.39px',
                    marginTop: '-1px',
                  }}
                >
                  {project.title}
                </motion.h1>
              </div>
            </motion.div>
          ) : null}

          {/* SECTION B: Intro blocks — one <p> per entry; omit field to hide section */}
          {project.introBlocks && project.introBlocks.length > 0 && (
            <div style={{ paddingLeft: sidePad, paddingRight: sidePad, paddingTop: '64px', paddingBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {project.introBlocks.map((block, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: 'Figtree, sans-serif',
                    fontSize: '20px',
                    fontWeight: 400,
                    lineHeight: '32px',
                    color: 'var(--text-primary)',
                    maxWidth: '800px',
                  }}
                >
                  {block}
                </p>
              ))}
            </div>
          )}

          {/* SECTION C: Meta fields — add/remove/relabel columns freely; omit field to hide section */}
          {project.metaFields && project.metaFields.length > 0 && (
            <div style={{ paddingLeft: sidePad, paddingRight: sidePad, paddingTop: '16px', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {project.metaFields.map((field, i) => (
                  <div
                    key={i}
                    style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: i > 0 ? 1 : undefined }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-geist-mono), monospace',
                        fontSize: '12px',
                        fontWeight: 400,
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                        lineHeight: '17.4px',
                        letterSpacing: '-0.1px',
                      }}
                    >
                      {field.label}
                    </p>
                    <p
                      style={{
                        fontFamily: 'Figtree, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        color: 'var(--text-primary)',
                        lineHeight: '19.92px',
                        maxWidth: '800px',
                      }}
                    >
                      {field.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION D: Image section */}
          {remainingImages.length > 0 && (
            <div className="py-8" style={{ paddingLeft: sidePad, paddingRight: sidePad }}>
              <div className="space-y-6">
                {remainingImages.map((src, i) => (
                  <FadeInUp key={i} delay={i * 0.1}>
                    <div className="overflow-hidden rounded-lg">
                      <FadeImage
                        src={src}
                        alt={`${project.title} visual ${i + 1}`}
                        className="w-full h-auto block"
                      />
                    </div>
                  </FadeInUp>
                ))}
              </div>
            </div>
          )}

          {/* Content sections — driven by data; add/remove/reorder in projects.ts */}
          {project.contentSections?.map((section, i) => (
            <div key={i} style={{ paddingLeft: sidePad, paddingRight: sidePad, marginBottom: '32px' }}>
              <CaseStudySection
                label={section.label}
                content={section.content}
                paragraphs={section.paragraphs}
                items={section.items}
                isBulletList={section.isBulletList}
              />
            </div>
          ))}

          {/* Bottom padding */}
          <div className="pb-12" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
