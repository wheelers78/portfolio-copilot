"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import Window from "./Window";
import { useWindowManager } from "@/lib/useWindowManager";
import AboutWindow from "./windows/AboutWindow";
import AskWindow from "./windows/AskWindow";
import RecentWindow from "./windows/RecentWindow";
import ProjectWindow from "./windows/ProjectWindow";
import { WindowState } from "@/lib/useWindowManager";

export default function WindowRenderer() {
  const { windows, closeWindow, bringToFront, updatePosition, updateSize } = useWindowManager();

  const maxZ = windows.reduce((m, w) => Math.max(m, w.zIndex), 0);

  const renderContent = (window: WindowState) => {
    switch (window.type) {
      case "about":
        return <AboutWindow />;
      case "ask":
        return <AskWindow />;
      case "recent":
        return <RecentWindow />;
      case "project":
        return <ProjectWindow project={window.data} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {windows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          onClose={() => closeWindow(window.id)}
          onFocus={() => bringToFront(window.id)}
          onPositionChange={(position) => updatePosition(window.id, position)}
          onSizeChange={(size) => updateSize(window.id, size)}
          defaultPosition={window.position}
          defaultSize={window.size}
          zIndex={window.zIndex}
          isActive={window.zIndex === maxZ}
          contentClassName={
            window.type === "recent"
              ? "px-5 py-5"
              : window.type === "ask"
              ? "p-0"
              : "px-12 py-12"
          }
          showScrollFade={false}
        >
          {renderContent(window)}
        </Window>
      ))}
    </AnimatePresence>
  );
}
