"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface ThinkingNode {
  id: string;
  label: string;
  angle: number;
  copy: string;
}

const CENTRE_TEXT = "Turn\ncomplexity\ninto\nclarity";

const NODES: ThinkingNode[] = [
  {
    id: "systems",
    label: "Systems",
    angle: 0,
    copy: "Designing foundations that scale across teams, products, and platforms — not just individual screens.",
  },
  {
    id: "ai",
    label: "AI",
    angle: 72,
    copy: "Shaping intelligent experiences that are useful, usable, and grounded in real value — not novelty.",
  },
  {
    id: "product",
    label: "Product",
    angle: 144,
    copy: "Connecting user needs, business goals, and execution into clear, actionable product direction.",
  },
  {
    id: "craft",
    label: "Craft",
    angle: 216,
    copy: "High attention to detail in interaction, hierarchy, and UI — ensuring ideas hold up in production.",
  },
  {
    id: "collaboration",
    label: "Collaboration",
    angle: 288,
    copy: "Working closely with engineering and stakeholders to turn strong ideas into shipped outcomes.",
  },
];

// Tick mark vertical positions (matching Figma design)
const TICK_POSITIONS = [9504, 9631, 9727, 9823, 9919, 10015, 10111, 10207, 10303, 10399];

// ─── SVG geometry ─────────────────────────────────────────────────────────────

const VW = 1000;
const VH = 940;
const CX = 500;
const CY = 470;
const CENTRE_R = 158;
const ORBIT_R = 400;
const LABEL_R = 438;
const NODE_R = 8;
const REVOLUTION_MS = 120000;

function svgPos(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.sin(rad), y: CY - r * Math.cos(rad) };
}

function labelAnchor(angleDeg: number): "middle" | "start" | "end" {
  const s = Math.sin((angleDeg * Math.PI) / 180);
  if (Math.abs(s) < 0.22) return "middle";
  return s > 0 ? "start" : "end";
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function HowIThinkWindow() {
  const [activeId, setActiveId] = useState<string>("systems");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  const spinGroupRef = useRef<SVGGElement>(null);
  const labelRefs = useRef<(SVGTextElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const rotationRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  const activeNode = NODES.find((n) => n.id === activeId)!;
  const activeIndex = NODES.findIndex((n) => n.id === activeId);

  // Theme
  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);

  // Slow orbital drift
  useEffect(() => {
    const tick = (now: number) => {
      const dt = lastTimeRef.current === null ? 0 : now - lastTimeRef.current;
      lastTimeRef.current = now;
      rotationRef.current =
        (rotationRef.current + (dt / REVOLUTION_MS) * 360) % 360;
      const r = rotationRef.current;

      spinGroupRef.current?.setAttribute("transform", `rotate(${r}, ${CX}, ${CY})`);

      NODES.forEach((node, i) => {
        const lbl = svgPos(node.angle, LABEL_R);
        labelRefs.current[i]?.setAttribute(
          "transform",
          `rotate(${-r}, ${lbl.x}, ${lbl.y})`
        );
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const orbitStroke = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.1)";
  const dotActive = "var(--text-primary)";
  const dotInactive = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
  const lblActive = "var(--text-primary)";
  const lblInactive = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)";
  const centreTextColor = isDark ? "#181818" : "#ffffff";
  const panelDivider = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const lineColor = "var(--text-primary)";

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden", minHeight: 0 }}>

      {/* ── Left: editorial nav panel with grid system ────────────────────────────────── */}
      <div
        style={{
          width: "42%",
          minWidth: 210,
          flexShrink: 0,
          padding: "28px 28px 28px 24px",
          display: "grid",
          gridTemplateColumns: "40px 1fr",
          gridAutoRows: "16px",
          gap: "0 12px",
          alignContent: "center",
        }}
      >
        {/* Spine column */}
        <div
          style={{
            gridColumn: "1",
            gridRow: "1 / -1",
            position: "relative",
          }}
        >
          {/* Black ticks at item positions */}
          {NODES.map((node, idx) => {
            const isActive = node.id === activeId;
            return (
              <div
                key={`tick-${node.id}`}
                style={{
                  position: "absolute",
                  left: 9,
                  top: `calc(${idx * 5} * 16px + 8px - 2px)`,
                  height: 1,
                  width: isActive ? 24 : 14,
                  backgroundColor: lineColor,
                  transition: "width 0.22s ease",
                }}
              />
            );
          })}

          {/* Grey lines in between items */}
          {NODES.flatMap((node, idx) =>
            idx < NODES.length - 1
              ? [1, 2, 3, 4].map((i) => (
                  <div
                    key={`grey-${idx}-${i}`}
                    style={{
                      position: "absolute",
                      left: 9,
                      top: `calc(${idx * 5 + i} * 16px + 8px - 2px)`,
                      height: 1,
                      width: 14,
                      backgroundColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
                    }}
                  />
                ))
              : []
          )}
        </div>

        {/* Content items */}
        {NODES.map((node, idx) => {
          const isActive = node.id === activeId;
          const isHovered = node.id === hoverId;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveId(node.id)}
              onMouseEnter={() => setHoverId(node.id)}
              onMouseLeave={() => setHoverId(null)}
              style={{
                gridColumn: "2",
                gridRow: `${idx * 5 + 1}`,
                textAlign: "left",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Label */}
              <motion.p
                animate={{
                  fontSize: isActive ? "clamp(22px, 2.8vw, 28px)" : "clamp(15px, 1.9vw, 17px)",
                  opacity: isActive ? 1 : 0.87,
                }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                style={{
                  fontFamily: "Figtree, -apple-system, sans-serif",
                  fontWeight: 600,
                  lineHeight: 1.4,
                  letterSpacing: "-0.5px",
                  color: "var(--text-primary)",
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                {node.label}
              </motion.p>
            </button>
          );
        })}

        {/* Description text spans multiple rows */}
        <AnimatePresence>
          {NODES.map((node, idx) => {
            const isActive = node.id === activeId;
            return (
              isActive && (
                <motion.p
                  key={`desc-${node.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    gridColumn: "2",
                    gridRow: `${idx * 5 + 2} / span 4`,
                    fontSize: "clamp(12px, 1.2vw, 14px)",
                    lineHeight: 1.35,
                    letterSpacing: "-0.08px",
                    color: "rgba(0,0,0,0.6)",
                    marginTop: 14,
                    marginBottom: 0,
                  }}
                >
                  {node.copy}
                </motion.p>
              )
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Right: orbit diagram ──────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 12,
          backgroundColor: "transparent",
        }}
      >
        <div
          style={{
            position: "relative",
            height: "100%",
            aspectRatio: `${VW} / ${VH}`,
            maxWidth: "100%",
          }}
        >
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              overflow: "visible",
            }}
            aria-label="How I Think — design approach"
            role="img"
          >
            <g ref={spinGroupRef}>
              {/* Orbit ring */}
              <circle
                cx={CX}
                cy={CY}
                r={ORBIT_R}
                fill="none"
                stroke={orbitStroke}
                strokeWidth="1"
              />

              {NODES.map((node, i) => {
                const dot = svgPos(node.angle, ORBIT_R);
                const lbl = svgPos(node.angle, LABEL_R);
                const isActive = node.id === activeId;

                return (
                  <g
                    key={node.id}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setActiveId(node.id)}
                    onClick={() => setActiveId(node.id)}
                  >
                    <circle cx={dot.x} cy={dot.y} r={26} fill="transparent" />

                    {/* Active outer ring */}
                    <circle
                      cx={dot.x}
                      cy={dot.y}
                      r={NODE_R + 8}
                      fill="none"
                      stroke="var(--text-primary)"
                      strokeWidth="1"
                      style={{
                        opacity: isActive ? 0.4 : 0,
                        transition: "opacity 0.2s ease",
                      }}
                    />

                    {/* Node dot */}
                    <circle
                      cx={dot.x}
                      cy={dot.y}
                      r={isActive ? NODE_R + 1.5 : NODE_R}
                      fill={isActive ? dotActive : dotInactive}
                      style={{ transition: "fill 0.22s ease" }}
                    />

                    {/* Label — uppercase, mono */}
                    <text
                      ref={(el) => { labelRefs.current[i] = el; }}
                      x={lbl.x}
                      y={lbl.y}
                      textAnchor={labelAnchor(node.angle)}
                      dominantBaseline="middle"
                      fontSize="18"
                      fontFamily="var(--font-geist-mono), monospace"
                      letterSpacing="0.12em"
                      fill={isActive ? lblActive : lblInactive}
                      fontWeight="600"
                      style={{
                        textTransform: "uppercase",
                        transition: "fill 0.22s ease",
                      }}
                    >
                      {node.label.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Centre circle */}
            <circle
              cx={CX}
              cy={CY}
              r={CENTRE_R}
              fill="var(--text-primary)"
              style={{ transition: "fill 0.3s ease" }}
            />
          </svg>

          {/* Centre text overlay */}
          <div
            style={{
              position: "absolute",
              left: `${(CX / VW) * 100}%`,
              top: `${(CY / VH) * 100}%`,
              width: `${((CENTRE_R * 2) / VW) * 100}%`,
              aspectRatio: "1 / 1",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "10%",
              pointerEvents: "none",
            }}
          >
            <p
              style={{
                fontSize: "clamp(16px, 2.4vw, 28px)",
                lineHeight: 1.3,
                color: centreTextColor,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                whiteSpace: "pre-line",
                transition: "color 0.3s ease",
              }}
            >
              {CENTRE_TEXT}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
