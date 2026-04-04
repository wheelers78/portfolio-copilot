"use client";

import React, { useState, useEffect, useRef } from "react";

// ─── Data shape ──────────────────────────────────────────────────────────────

export interface OrbitNode {
  id: string;
  label: string;
  /** Degrees clockwise from 12 o'clock */
  angle: number;
  copy: string;
}

export interface OrbitDiagramProps {
  centreText?: string;
  nodes?: OrbitNode[];
}

// ─── Content ─────────────────────────────────────────────────────────────────

const DEFAULT_CENTRE = "Turn complexity\ninto clarity";

const DEFAULT_NODES: OrbitNode[] = [
  {
    id: "systems",
    label: "Systems",
    angle: 0,
    copy: "Designing foundations that scale across teams, products, and platforms.",
  },
  {
    id: "ai",
    label: "AI",
    angle: 72,
    copy: "Shaping intelligent experiences that are useful, usable, and grounded in real value.",
  },
  {
    id: "product",
    label: "Product",
    angle: 144,
    copy: "Connecting user needs, business goals, and execution into clear product direction.",
  },
  {
    id: "craft",
    label: "Craft",
    angle: 216,
    copy: "High attention to detail in interaction, hierarchy, layout, and final UI quality.",
  },
  {
    id: "collaboration",
    label: "Collaboration",
    angle: 288,
    copy: "Working closely with engineering and stakeholders to make strong ideas real.",
  },
];

// ─── SVG coordinate constants ─────────────────────────────────────────────────

const VW = 460;
const VH = 420;
const CX = 230;
const CY = 215;
const CENTRE_R = 120;
const ORBIT_R = 168;
const LABEL_R = 196;
const NODE_R = 11;

const REVOLUTION_MS = 48000;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function svgPos(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.sin(rad), y: CY - r * Math.cos(rad) };
}

function textAnchor(angleDeg: number): "middle" | "start" | "end" {
  const s = Math.sin((angleDeg * Math.PI) / 180);
  if (Math.abs(s) < 0.3) return "middle";
  return s > 0 ? "start" : "end";
}

// ─── Component ───────────────────────────────────────────────────────────────

export function OrbitDiagram({
  centreText = DEFAULT_CENTRE,
  nodes = DEFAULT_NODES,
}: OrbitDiagramProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  const spinGroupRef = useRef<SVGGElement>(null);
  const labelRefs = useRef<(SVGTextElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const rotationRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const hoveredRef = useRef<string | null>(null);

  useEffect(() => { hoveredRef.current = hovered; }, [hovered]);

  // Theme tracking
  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  // Orbital animation loop
  useEffect(() => {
    const tick = (now: number) => {
      const dt = lastTimeRef.current === null ? 0 : now - lastTimeRef.current;
      lastTimeRef.current = now;

      // Slow to 25% speed on hover
      const speed = hoveredRef.current ? 0.25 : 1;
      rotationRef.current = (rotationRef.current + (dt / REVOLUTION_MS) * 360 * speed) % 360;
      const r = rotationRef.current;

      spinGroupRef.current?.setAttribute("transform", `rotate(${r}, ${CX}, ${CY})`);

      nodes.forEach((node, i) => {
        const lbl = svgPos(node.angle, LABEL_R);
        labelRefs.current[i]?.setAttribute("transform", `rotate(${-r}, ${lbl.x}, ${lbl.y})`);
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [nodes]);

  const activeId = hovered;
  const activeIndex = nodes.findIndex((n) => n.id === activeId);
  const activeNode = activeIndex >= 0 ? nodes[activeIndex] : null;
  const isAnyActive = activeId !== null;

  const centreTextColor = isDark ? "#181818" : "#ffffff";

  // Solid colour values — no opacity tricks
  const dotActiveColor = "var(--text-primary)";
  const dotInactiveColor = isDark ? "#555" : "#bbb";
  const dotDefaultColor = "var(--text-primary)";

  const labelActiveColor = "var(--text-primary)";
  const labelInactiveColor = isDark ? "#555" : "#bbb";
  const labelDefaultColor = isDark ? "#888" : "#999";

  const glassBg = isDark
    ? "rgba(18, 18, 18, 0.78)"
    : "rgba(255, 255, 255, 0.78)";
  const glassBorder = isDark
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid rgba(0,0,0,0.07)";

  return (
    <div className="pb-4">
      <div
        className="relative w-full select-none"
        style={{ aspectRatio: `${VW} / ${VH}` }}
      >
        {/* SVG — full width, orbit centred */}
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          className="absolute inset-0 w-full h-full"
          style={{ overflow: "visible" }}
          aria-label="Design approach diagram"
          role="img"
        >
          <g ref={spinGroupRef}>
            {/* Orbit ring — dashed */}
            <circle
              cx={CX}
              cy={CY}
              r={ORBIT_R}
              fill="none"
              stroke={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}
              strokeWidth="1"
              strokeDasharray="2 7"
              strokeLinecap="round"
            />

            {nodes.map((node, i) => {
              const dot = svgPos(node.angle, ORBIT_R);
              const lbl = svgPos(node.angle, LABEL_R);
              const isActive = node.id === activeId;

              // Solid fills — no opacity
              const dotFill = isAnyActive
                ? isActive ? dotActiveColor : dotInactiveColor
                : dotDefaultColor;

              const labelFill = isAnyActive
                ? isActive ? labelActiveColor : labelInactiveColor
                : labelDefaultColor;

              return (
                <g
                  key={node.id}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Hit area */}
                  <circle cx={dot.x} cy={dot.y} r={24} fill="transparent" />

                  {/* Bullseye outer ring — active only */}
                  <circle
                    cx={dot.x}
                    cy={dot.y}
                    r={NODE_R + 9}
                    fill="none"
                    stroke="var(--text-primary)"
                    strokeWidth="1.5"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.2s ease",
                    }}
                  />

                  {/* Node dot */}
                  <circle
                    cx={dot.x}
                    cy={dot.y}
                    r={NODE_R}
                    fill={dotFill}
                    style={{ transition: "fill 0.25s ease" }}
                  />

                  {/* Label */}
                  <text
                    ref={(el) => { labelRefs.current[i] = el; }}
                    x={lbl.x}
                    y={lbl.y}
                    textAnchor={textAnchor(node.angle)}
                    dominantBaseline="middle"
                    fontSize="11"
                    fontFamily="inherit"
                    fill={labelFill}
                    fontWeight={isActive ? "500" : "400"}
                    style={{
                      transition: "fill 0.25s ease",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Centre circle — fixed, outside spin group */}
          <circle
            cx={CX}
            cy={CY}
            r={CENTRE_R}
            fill="var(--text-primary)"
            style={{ transition: "fill 0.3s ease" }}
          />
        </svg>

        {/* Centre text — HTML overlay */}
        <div
          className="absolute pointer-events-none flex items-center justify-center text-center"
          style={{
            left: `${(CX / VW) * 100}%`,
            top: `${(CY / VH) * 100}%`,
            width: `${(CENTRE_R * 2 / VW) * 100}%`,
            aspectRatio: "1 / 1",
            transform: "translate(-50%, -50%)",
            padding: "9%",
          }}
        >
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.35,
              color: centreTextColor,
              fontWeight: 400,
              letterSpacing: "-0.02em",
              transition: "color 0.3s ease",
              whiteSpace: "pre-line",
            }}
          >
            {centreText}
          </p>
        </div>

        {/* Hover info panel — glass blur, top-left, no pointer events */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: 0,
            top: "8%",
            width: 260,
            padding: "14px 18px 16px",
            borderRadius: 12,
            background: glassBg,
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: glassBorder,
            opacity: activeNode ? 1 : 0,
            transform: activeNode ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: "var(--text-muted)",
              letterSpacing: "-0.03em",
              marginBottom: 3,
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            ({activeNode ? String(activeIndex + 1).padStart(2, "0") : "01"})
          </p>
          <h3
            style={{
              fontSize: 26,
              fontWeight: 500,
              lineHeight: 1.05,
              color: "var(--text-primary)",
              marginBottom: 8,
              fontFamily: "inherit",
              letterSpacing: "-0.02em",
            }}
          >
            {activeNode?.label ?? ""}
          </h3>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.6,
              color: "var(--text-primary)",
              fontFamily: "inherit",
            }}
          >
            {activeNode?.copy ?? ""}
          </p>
        </div>
      </div>
    </div>
  );
}
