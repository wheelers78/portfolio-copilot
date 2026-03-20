"use client";

interface BackgroundToggleProps {
  enabled: boolean;
  onToggle: () => void;
  theme: "light" | "dark";
}

export default function BackgroundToggle({ enabled, onToggle, theme }: BackgroundToggleProps) {
  const isDark = theme === "dark";
  const bg = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const bgHover = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)";

  return (
    <button
      onClick={onToggle}
      aria-label="Toggle background"
      aria-pressed={enabled}
      className="flex items-center justify-center w-9 h-9 rounded-full cursor-pointer transition-all duration-150 active:scale-90"
      style={{ background: bg, color: "var(--text-primary)" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = bgHover)}
      onMouseLeave={(e) => (e.currentTarget.style.background = bg)}
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
