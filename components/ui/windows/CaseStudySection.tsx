"use client";

import React from "react";

interface CaseStudySectionProps {
  label: string;
  content?: string;
  paragraphs?: string[];
  items?: string[];
  isBulletList?: boolean;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-xs font-normal text-[var(--text-muted)] uppercase font-mono" style={{ letterSpacing: '-0.1px' }}>
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
          className="flex items-start gap-2 text-[16px] leading-relaxed text-[var(--text-primary)]"
        >
          <div className="flex-shrink-0 w-1 h-1 mt-[11px]" style={{ backgroundColor: 'var(--text-primary)' }} />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function CaseStudySection({
  label,
  content,
  paragraphs,
  items,
  isBulletList = false,
}: CaseStudySectionProps) {
  return (
    <div className="space-y-3">
      <SectionLabel>{label}</SectionLabel>
      {content && (
        <p className="text-[16px] leading-relaxed text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
          {content}
        </p>
      )}
      {paragraphs && paragraphs.length > 0 && (
        <div className="space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-[16px] leading-relaxed text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
              {p}
            </p>
          ))}
        </div>
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
