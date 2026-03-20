"use client";

import { motion } from "framer-motion";
import { experience, patternSummary } from "@/data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className="px-6 md:px-12 lg:px-16 py-24 border-t border-[var(--border)]"
    >
      <div className="max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-16">
          <p className="text-xs tracking-[0.18em] uppercase text-[var(--muted)]">
            Experience
          </p>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Roles */}
          <div className="md:col-span-2 space-y-10">
            {experience.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
                className="relative pl-4 border-l border-[var(--border)]"
              >
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <div>
                    <span className="text-base font-medium text-[var(--foreground)]">
                      {role.company}
                    </span>
                    <span className="text-sm text-[var(--muted)] ml-2">— {role.title}</span>
                  </div>
                  <span className="text-xs font-mono text-[var(--subtle)] shrink-0">
                    {role.period}
                  </span>
                </div>

                <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
                  {role.summary}
                </p>

                <ul className="space-y-1.5">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="text-xs text-[var(--muted)] flex items-start gap-2"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--subtle)] shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-[var(--surface)] border border-[var(--border)] rounded-full text-[var(--subtle)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pattern recognition sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-xs tracking-[0.14em] uppercase text-[var(--muted)] mb-5">
              Pattern across roles
            </p>
            <div className="space-y-4 pl-4 border-l border-[var(--border)]">
              {patternSummary.map((pattern, i) => (
                <p key={i} className="text-sm text-[var(--muted)] leading-relaxed">
                  {pattern}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
