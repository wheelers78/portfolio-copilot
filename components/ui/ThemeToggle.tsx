"use client";

import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === "dark";
  const bg = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const bgHover = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)";

  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className="flex items-center justify-center w-9 h-9 rounded-full cursor-pointer transition-all duration-150 active:scale-90"
      style={{ background: bg, color: "var(--text-primary)" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = bgHover)}
      onMouseLeave={(e) => (e.currentTarget.style.background = bg)}
    >
      {isDark ? (
        <Moon size={15} strokeWidth={1.6} />
      ) : (
        <Sun size={15} strokeWidth={1.6} />
      )}
    </button>
  );
}
