"use client";

import React from "react";
import CanvasLayout from "@/components/ui/CanvasLayout";
import TopNav from "@/components/ui/TopNav";
import HeroSection from "@/components/ui/hero/HeroSection";
import Dock from "@/components/ui/Dock";
import WindowRenderer from "@/components/ui/WindowRenderer";
import ThemeToggle from "@/components/ui/ThemeToggle";
import BackgroundToggle from "@/components/ui/BackgroundToggle";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

const audiences = [
  "Everyone",
  "Recruiters",
  "Design Directors",
  "Product Designers",
  "Product Managers",
  "Engineers",
] as const;

type Audience = (typeof audiences)[number];

const headlines: Record<Audience, string> = {
  Everyone: "Hi there, I'm Paul, a designer working across systems, strategy, and craft.",
  Recruiters: "I lead product design teams to turn complexity into measurable outcomes and durable product quality.",
  "Design Directors":
    "I build coherent design systems and operating models that help teams ship with consistency and confidence.",
  "Product Designers":
    "I mentor designers and shape product direction through strong craft, clear thinking, and practical systems.",
  "Product Managers":
    "I partner closely with product leaders to translate ambiguity into aligned priorities, useful flows, and momentum.",
  Engineers:
    "I collaborate deeply with engineering to make product decisions concrete, scalable, and reliable in execution.",
};

export default function BaseCanvas() {
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<Audience>("Everyone");
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [showBackground, setShowBackground] = React.useState(true);
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
    const savedBg = window.localStorage.getItem("portfolio-background");
    if (savedBg === "false") {
      setShowBackground(false);
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  React.useEffect(() => {
    window.localStorage.setItem("portfolio-background", String(showBackground));
  }, [showBackground]);

  React.useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const updateTime = () => {
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const handleToggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  const handleToggleBackground = () => {
    setShowBackground((prev) => !prev);
  };

  return (
    <>
      <LoadingScreen show={loading} />
      <CanvasLayout theme={theme} showBackground={showBackground}>
        <TopNav time={time} />
        <HeroSection
          audiences={[...audiences]}
          activeTab={activeTab}
          onTabChange={(audience) => setActiveTab(audience as Audience)}
          headline={headlines[activeTab]}
        />
        <Dock />
        <WindowRenderer />
        <div className="absolute bottom-5 left-6 md:left-8 lg:left-10 z-30 flex flex-col gap-2 items-start">
          <BackgroundToggle
            enabled={showBackground}
            onToggle={handleToggleBackground}
            theme={theme}
          />
          <ThemeToggle theme={theme} onToggle={handleToggleTheme} />
        </div>
        <footer
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            padding: "24px 24px",
            textAlign: "right",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-sans)",
              letterSpacing: "0.01em",
              opacity: 0.6,
            }}
          >
            Personal experiment built with Claude, Cursor & Figma.
          </span>
        </footer>
      </CanvasLayout>
    </>
  );
}
