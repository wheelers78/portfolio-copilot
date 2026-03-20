"use client";

import React from "react";

interface CanvasLayoutProps {
  children: React.ReactNode;
  theme: "light" | "dark";
  showBackground?: boolean;
}

export default function CanvasLayout({ children, theme, showBackground = true }: CanvasLayoutProps) {
  const isDark = theme === "dark";

  return (
    <main
      data-theme={theme}
      className="relative h-screen w-screen overflow-hidden bg-[var(--canvas-bg)] text-[var(--text-primary)] transition-colors duration-500"
    >
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          opacity: showBackground ? 1 : 0,
          backgroundImage: `radial-gradient(circle, ${
            isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.11)"
          } 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      />
      {children}
    </main>
  );
}
