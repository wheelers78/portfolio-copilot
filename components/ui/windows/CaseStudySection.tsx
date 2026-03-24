"use client";

import React from "react";

interface CaseStudySectionProps {
  label: string;
  content?: string;
  items?: string[];
  isBulletList?: boolean;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[11px] font-medium text-[var(--text-muted)] uppercase">
      {children}
    </span>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-3 text-[13px] leading-relaxed text-[var(--text-muted)]"
        >
          <span className="mt-[6px] h-[3px] w-[3px] shrink-0 rounded-full bg-[var(--text-muted)] opacity-40" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function CaseStudySection({
  label,
  content,
  items,
  isBulletList = false,
}: CaseStudySectionProps) {
  return (
    <div className="space-y-3">
      <SectionLabel>{label}</SectionLabel>
      {content && (
        <p className="text-[13px] leading-relaxed text-[var(--text-primary)]">
          {content}
        </p>
      )}
      {items && isBulletList && <BulletList items={items} />}
      {items && !isBulletList && (
        <div className="space-y-2">
          {items.map((item, i) => (
            <p
              key={i}
              className="text-[13px] leading-relaxed text-[var(--text-muted)]"
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
