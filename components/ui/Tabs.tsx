"use client";

import React from "react";

interface TabsProps {
  audiences: string[];
  activeTab: string;
  onTabChange: (audience: string) => void;
}

export default function Tabs({ audiences, activeTab, onTabChange }: TabsProps) {
  const handleTabClick = (audience: string) => {
    if (audience === activeTab) return;
    onTabChange(audience);
  };

  return (
    <nav aria-label="Audience navigation" className="w-full overflow-x-auto">
      <ul className="flex min-w-max items-end gap-6 border-b border-[var(--border)]">
      {audiences.map((audience) => {
        const isActive = audience === activeTab;

        return (
          <li key={audience} className="flex h-8 items-end">
            <button
              type="button"
              onClick={() => handleTabClick(audience)}
              aria-current={isActive ? "true" : undefined}
              className={`inline-flex h-8 items-end border-b-[1.5px] border-transparent pb-1 text-[11px] leading-none tracking-[0.04em] transition-all duration-200 ${
                isActive
                  ? "border-[var(--tab-active-indicator)] text-[var(--text-primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              {audience}
            </button>
          </li>
        );
      })}
      </ul>
    </nav>
  );
}
