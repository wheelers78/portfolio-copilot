"use client";

import React from "react";
import { motion } from "framer-motion";
import CanvasLayout from "@/components/ui/CanvasLayout";
import TopNav from "@/components/ui/TopNav";
import HeroSection from "@/components/ui/hero/HeroSection";
import Dock from "@/components/ui/Dock";
import WindowRenderer from "@/components/ui/WindowRenderer";
import MobileNav from "@/components/ui/MobileNav";
import MobilePanelRenderer from "@/components/ui/MobilePanelRenderer";
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
  Everyone: "Hello there — I’m Paul. A designer who likes making complex things feel simple.",
  Recruiters: "I work across systems, AI, and product — and I’ve spent the last 15+ years turning messy ideas into things that actually ship.",
  "Design Directors":
    "I care about how things really work. Not just the interface, but the logic, the structure, the system behind it.",
  "Product Designers":
    "From process to pixels, I’ll work with you to shape, refine, and build something we’re proud of.",
  "Product Managers":
    "I’ll work closely with you — design, product, engineering — to shape it, test it, and make it real.",
  Engineers:
    "I’m pretty technical too. Not an engineer — but I can hold my own, and I like getting into the build.",
};

export default function BaseCanvas() {
  const [loading, setLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<Audience>("Everyone");
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [showBackground, setShowBackground] = React.useState(true);
  const [time, setTime] = React.useState("");
  const [mobileActivePanel, setMobileActivePanel] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Start loading sequence on client-side only (after hydration)
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2850);
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
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
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
          isInitialLoad={loading}
        />
        {/* Desktop navigation */}
        <Dock isInitialLoad={loading} />
        <WindowRenderer />

        {/* Mobile navigation */}
        <MobileNav
          activePanel={mobileActivePanel}
          onSelect={setMobileActivePanel}
          isInitialLoad={loading}
        />
        <MobilePanelRenderer activePanel={mobileActivePanel} onClose={() => setMobileActivePanel(null)} />

        <motion.div
          className="absolute left-6 md:left-8 lg:left-10 z-30 flex flex-col gap-2 items-start bottom-[84px] md:bottom-5"
          initial={loading ? undefined : { opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={
            loading
              ? { duration: 0 }
              : { duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <BackgroundToggle
            enabled={showBackground}
            onToggle={handleToggleBackground}
            theme={theme}
          />
          <ThemeToggle theme={theme} onToggle={handleToggleTheme} />
        </motion.div>
        <footer
          className="hidden md:block"
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
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.01em",
              opacity: 0.6,
            }}
          >
            Designed & built with AI — Claude, Cursor, Figma
          </span>
        </footer>
      </CanvasLayout>
    </>
  );
}
