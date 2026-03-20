"use client";

import { motion } from "framer-motion";
import { principles } from "@/data/principles";

export default function HowIThink() {
  return (
    <section
      id="thinking"
      className="px-6 md:px-12 lg:px-16 py-24 border-t border-[var(--border)] bg-[var(--surface)]"
    >
      <div className="max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-16">
          <p className="text-xs tracking-[0.18em] uppercase text-[var(--muted)]">
            How I Think
          </p>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        {/* Principles grid */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.08,
              }}
            >
              <p className="text-xs font-mono text-[var(--subtle)] mb-3">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-lg md:text-xl font-sans text-[var(--foreground)] leading-snug mb-4">
                {principle.title}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {principle.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
