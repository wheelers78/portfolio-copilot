"use client";

import React from "react";
import { useWindowManager } from "@/lib/useWindowManager";
import { projects, type Project } from "@/data/projects";

// ─── Local presentational sub-components ─────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[11px] font-medium text-[var(--text-primary)]">
      {children}
    </span>
  );
}

function Divider() {
  return <div className="h-px bg-[var(--border-subtle)]" />;
}

function MetaGrid({ role, responsibilities, period }: { role: string; responsibilities: string; period: string }) {
  return (
    <div className="grid gap-x-3 gap-y-0 pt-2" style={{ gridTemplateColumns: "1fr 2fr auto" }}>
      <div className="space-y-1.5">
        <SectionLabel>Role</SectionLabel>
        <p className="text-[12px] leading-snug text-[var(--text-muted)]">{role}</p>
      </div>
      <div className="space-y-1.5">
        <SectionLabel>Responsibilities</SectionLabel>
        <p className="text-[12px] leading-snug text-[var(--text-muted)]">{responsibilities}</p>
      </div>
      <div className="space-y-1.5">
        <SectionLabel>Date</SectionLabel>
        <p className="text-[12px] leading-snug text-[var(--text-muted)]">{period}</p>
      </div>
    </div>
  );
}

function ImageBlock({ src, alt, company, title }: { src?: string; alt?: string; company: string; title: string; height?: number }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-sm"
      style={{ background: "var(--surface-muted)" }}
    >
      {src ? (
        <img src={src} alt={alt ?? title} className="w-full h-auto block" />
      ) : (
        // Designed placeholder — replace with real images via project.images
        <div
          className="flex items-end p-4"
          style={{
            minHeight: "220px",
            background: "linear-gradient(135deg, var(--surface-muted) 0%, var(--border-subtle) 100%)",
          }}
        >
          <span
            className="text-[11px] font-medium tracking-[0.04em] text-[var(--text-muted)] opacity-40"
          >
            {company} — {title}
          </span>
        </div>
      )}
    </div>
  );
}

function ContentSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <SectionLabel>{label}</SectionLabel>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[12px] leading-relaxed text-[var(--text-muted)]">
          <span className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full bg-[var(--text-muted)] opacity-40" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function RelatedWork({
  slugs,
  onOpen,
}: {
  slugs: string[];
  onOpen: (slug: string) => void;
}) {
  const items = slugs.map((s) => projects.find((p) => p.slug === s)).filter(Boolean) as Project[];
  if (!items.length) return null;

  return (
    <div className="space-y-2">
      <SectionLabel>Related Work</SectionLabel>
      <div className="flex flex-col gap-0.5">
        {items.map((rel) => (
          <button
            key={rel.slug}
            type="button"
            onClick={() => onOpen(rel.slug)}
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-[var(--surface-muted)]"
          >
            <div className="flex-1 min-w-0">
              <span className="text-[12px] font-medium text-[var(--text-primary)]">{rel.title}</span>
              <span className="ml-2 text-[11px] text-[var(--text-muted)]">{rel.company} · {rel.period}</span>
            </div>
            <svg
              width="10" height="10" viewBox="0 0 10 10" fill="none"
              className="shrink-0 text-[var(--text-muted)] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-60"
            >
              <path d="M2 5H8M8 5L5.5 2.5M8 5L5.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface ProjectWindowProps {
  project: Project;
}

export default function ProjectWindow({ project }: ProjectWindowProps) {
  const { openWindow } = useWindowManager();

  const openRelated = (slug: string) => {
    const related = projects.find((p) => p.slug === slug);
    if (!related) return;
    openWindow("project", related.title, related);
  };

  return (
    <div className="space-y-0">

      {/* ── Hero intro ──────────────────────────────────────────────────── */}
      <div className="space-y-4 pb-6">
        <div className="space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)] opacity-50">
            {project.company}
          </p>
          <h1
            className="font-sans leading-[1.1] text-[var(--text-primary)]"
            style={{ fontSize: "26px", letterSpacing: "-0.01em" }}
          >
            {project.title}
          </h1>
        </div>
        <p className="text-[14px] leading-relaxed text-[var(--text-primary)]">
          {project.summary}
        </p>
        <MetaGrid
          role={project.roleTitle}
          responsibilities={project.role}
          period={project.period}
        />
      </div>

      {/* ── Images ──────────────────────────────────────────────────────── */}
      {(project.images && project.images.length > 0 ? project.images : [undefined]).map((src, i) => (
        <div key={i} className={i === 0 ? "pb-3" : "py-3"}>
          <ImageBlock
            src={src}
            company={project.company ?? ""}
            title={project.title}
            height={project.imageHeight ?? 360}
          />
        </div>
      ))}

      {/* ── Related work ────────────────────────────────────────────────── */}
      {project.related.length > 0 && (
        <>
          <div className="py-6">
            <RelatedWork slugs={project.related} onOpen={openRelated} />
          </div>
        </>
      )}
    </div>
  );
}
