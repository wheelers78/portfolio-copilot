"use client";

interface BackgroundToggleProps {
  enabled: boolean;
  onToggle: () => void;
  theme: "light" | "dark";
}

export default function BackgroundToggle({ enabled, onToggle, theme }: BackgroundToggleProps) {
  const isDark = theme === "dark";

  return (
    <button
      onClick={onToggle}
      aria-label="Toggle background"
      aria-pressed={enabled}
      className="flex items-center justify-center w-9 h-9 rounded-full cursor-pointer transition-all duration-150 active:scale-90 glass-base glass-button"
      style={{ color: "var(--text-primary)" }}
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
        <circle cx="2.5" cy="2.5" r="1.2" />
        <circle cx="7.5" cy="2.5" r="1.2" />
        <circle cx="12.5" cy="2.5" r="1.2" />
        <circle cx="2.5" cy="7.5" r="1.2" />
        <circle cx="7.5" cy="7.5" r="1.2" />
        <circle cx="12.5" cy="7.5" r="1.2" />
        <circle cx="2.5" cy="12.5" r="1.2" />
        <circle cx="7.5" cy="12.5" r="1.2" />
        <circle cx="12.5" cy="12.5" r="1.2" />
      </svg>
    </button>
  );
}
