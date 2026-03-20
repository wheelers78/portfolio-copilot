"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { notes } from "@/data/notes";

export default function Notes() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section
      id="notes"
      className="px-6 md:px-12 lg:px-16 py-24 border-t border-[var(--border)] bg-[var(--surface)]"
    >
      <div className="max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-16">
          <p className="text-xs tracking-[0.18em] uppercase text-[var(--muted)]">
            Notes
          </p>
          <div className="flex-1 h-px bg-[var(--border)]" />
          <p className="text-xs text-[var(--muted)]">Thinking in public</p>
        </div>

        <div className="divide-y divide-[var(--border)]">
          {notes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
            >
              <button
                className="w-full text-left py-7 group cursor-pointer"
                onClick={() => setExpanded(expanded === note.id ? null : note.id)}
                aria-expanded={expanded === note.id}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-xs text-[var(--subtle)] font-mono">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg md:text-xl font-sans text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-200 leading-snug">
                        {note.title}
                      </h3>
                    </div>
                    <div className="ml-7 flex flex-wrap gap-1.5">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 border border-[var(--border)] rounded-full text-[var(--muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    className="text-[var(--muted)] mt-1 transition-transform duration-200 shrink-0"
                    style={{
                      transform: expanded === note.id ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </div>

                <AnimatePresence>
                  {expanded === note.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="ml-7 mt-4 text-sm text-[var(--muted)] leading-relaxed max-w-2xl">
                        {note.preview}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
