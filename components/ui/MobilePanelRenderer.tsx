"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import AboutWindow from "./windows/AboutWindow";
import AskWindow from "./windows/AskWindow";
import WorkWindow from "./windows/WorkWindow";

interface MobilePanelRendererProps {
  activePanel: string | null;
  onClose: () => void;
}

const PANEL_LABELS: Record<string, string> = {
  about: "About",
  ask: "Ask",
  work: "Work",
};

function PanelContent({ type }: { type: string }) {
  switch (type) {
    case "about":
      return (
        <div style={{ padding: "32px 24px 24px" }}>
          <AboutWindow />
        </div>
      );
    case "ask":
      return <AskWindow />;
    case "work":
      return <WorkWindow isMobile />;
    default:
      return null;
  }
}

export default function MobilePanelRenderer({
  activePanel,
  onClose,
}: MobilePanelRendererProps) {
  return (
    <div className="md:hidden">
      <AnimatePresence mode="wait">
        {activePanel && (
          <motion.div
            key={activePanel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              // Leave room for bottom nav (52px) + safe area
              bottom: 0,
              paddingBottom: "calc(80px + env(safe-area-inset-bottom))",
              zIndex: 50,
              display: "flex",
              flexDirection: "column",
              background: "var(--canvas-bg)",
            }}
          >
            {/* Panel header */}
            <div
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "52px",
                paddingLeft: "24px",
                paddingRight: "16px",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.01em",
                }}
              >
                P—W
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {PANEL_LABELS[activePanel]}
              </span>
            </div>

            {/* Scrollable panel content */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <PanelContent type={activePanel} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
