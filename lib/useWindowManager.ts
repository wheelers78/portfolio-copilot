import { create } from "zustand";

export type WindowRole = "launcher" | "case-study" | "workspace";

export interface WindowState {
  id: string;
  type: "about" | "ask" | "recent" | "work" | "how-i-think";
  role: WindowRole;
  title: string;
  data?: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

interface WindowManagerStore {
  windows: WindowState[];
  caseStudyCount: number;
  openWindow: (type: WindowState["type"], title: string, data?: any) => void;
  closeWindow: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
  bringToFront: (id: string) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

// Shared sizing constants — all primary windows use the same base width
const PRIMARY_WIDTH = 560;
const SAFE_MARGIN = 20;

const LAUNCHER_POSITION = { x: 40, y: 80 };
const LAUNCHER_SIZE = { width: PRIMARY_WIDTH, height: 580 };

// First case study opens to the right of the launcher with a small gap
const CASE_STUDY_BASE_X = LAUNCHER_POSITION.x + PRIMARY_WIDTH + 24; // 624
const CASE_STUDY_BASE_Y = 80;
const CASE_STUDY_SIZE = { width: PRIMARY_WIDTH, height: 680 };
const CASCADE_OFFSET = { x: 28, y: 24 };

// Work window (unified case study browser)
const WORK_WIDTH = 1000;
const WORK_HEIGHT = 700;
const WORK_POSITION = { x: 60, y: 100 };

const clamp = (
  x: number,
  y: number,
  size: { width: number; height: number }
) => {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  return {
    x: Math.max(SAFE_MARGIN, Math.min(x, vw - size.width - SAFE_MARGIN)),
    y: Math.max(SAFE_MARGIN, Math.min(y, vh - size.height - SAFE_MARGIN)),
  };
};

const getSizeForType = (type: WindowState["type"], role: WindowRole) => {
  if (role === "launcher") return LAUNCHER_SIZE;
  if (role === "workspace") return { width: WORK_WIDTH, height: WORK_HEIGHT };
  switch (type) {
    case "about":
      return { width: PRIMARY_WIDTH, height: 520 };
    case "ask":
      return { width: PRIMARY_WIDTH, height: 520 };
    case "work":
      return { width: WORK_WIDTH, height: WORK_HEIGHT };
    case "how-i-think":
      return { width: 820, height: 600 };
    default:
      return CASE_STUDY_SIZE;
  }
};

const getPositionForRole = (
  role: WindowRole,
  type: WindowState["type"],
  caseStudyIndex: number,
  size: { width: number; height: number }
) => {
  if (role === "launcher") {
    return LAUNCHER_POSITION;
  }

  if (role === "workspace") {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
    const vh = typeof window !== "undefined" ? window.innerHeight : 900;
    return clamp(
      Math.round((vw - size.width) / 2),
      Math.round((vh - size.height) / 2),
      size
    );
  }

  if (type === "about") {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
    const vh = typeof window !== "undefined" ? window.innerHeight : 900;
    return clamp(
      Math.round((vw - size.width) / 2) - 40,
      Math.round((vh - size.height) / 2) - 20,
      size
    );
  }

  if (type === "ask") {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
    const vh = typeof window !== "undefined" ? window.innerHeight : 900;
    return clamp(
      Math.round((vw - size.width) / 2) + 40,
      Math.round((vh - size.height) / 2) + 20,
      size
    );
  }

  if (type === "how-i-think") {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
    const vh = typeof window !== "undefined" ? window.innerHeight : 900;
    return clamp(
      Math.round((vw - size.width) / 2),
      Math.round((vh - size.height) / 2),
      size
    );
  }

  // Case study: cascade diagonally from the launcher's right edge, clamped to viewport
  return clamp(
    CASE_STUDY_BASE_X + caseStudyIndex * CASCADE_OFFSET.x,
    CASE_STUDY_BASE_Y + caseStudyIndex * CASCADE_OFFSET.y,
    size
  );
};

export const useWindowManager = create<WindowManagerStore>((set) => ({
  windows: [],
  caseStudyCount: 0,

  openWindow: (type, title, data) =>
    set((state) => {
      const nextZ =
        state.windows.reduce((maxZ, w) => Math.max(maxZ, w.zIndex), 40) + 1;

      // Work window is a singleton workspace — update slug and bring to front if already open
      if (type === "work") {
        const existing = state.windows.find((w) => w.type === "work");
        if (existing) {
          return {
            windows: state.windows.map((w) =>
              w.id === existing.id ? { ...w, zIndex: nextZ, data } : w
            ),
          };
        }
        const size = getSizeForType("work", "workspace");
        const newWindow: WindowState = {
          id: generateId(),
          type: "work",
          role: "workspace",
          title,
          data,
          position: getPositionForRole("workspace", "work", 0, size),
          size,
          zIndex: nextZ,
        };
        return { windows: [...state.windows, newWindow] };
      }

      // Launcher windows (type "recent") are singletons — bring to front if already open
      if (type === "recent") {
        const existing = state.windows.find((w) => w.type === "recent");
        if (existing) {
          return {
            windows: state.windows.map((w) =>
              w.id === existing.id ? { ...w, zIndex: nextZ } : w
            ),
          };
        }
        const size = getSizeForType("recent", "launcher");
        const newWindow: WindowState = {
          id: generateId(),
          type: "recent",
          role: "launcher",
          title,
          data,
          position: getPositionForRole("launcher", "recent", 0, size),
          size,
          zIndex: nextZ,
        };
        return { windows: [...state.windows, newWindow] };
      }

      // Non-recent windows are singletons too (about, ask)
      const existing = state.windows.find((w) => w.type === type);
      if (existing) {
        return {
          windows: state.windows.map((w) =>
            w.id === existing.id ? { ...w, zIndex: nextZ } : w
          ),
        };
      }
      const size = getSizeForType(type, "case-study");
      const newWindow: WindowState = {
        id: generateId(),
        type,
        role: "case-study",
        title,
        data,
        position: getPositionForRole("case-study", type, state.caseStudyCount, size),
        size,
        zIndex: nextZ,
      };
      return {
        windows: [...state.windows, newWindow],
        caseStudyCount: state.caseStudyCount + 1,
      };
    }),

  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    })),

  updatePosition: (id, position) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, position } : w)),
    })),

  updateSize: (id, size) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, size } : w)),
    })),

  bringToFront: (id) =>
    set((state) => {
      const nextZ =
        state.windows.reduce((maxZ, w) => Math.max(maxZ, w.zIndex), 40) + 1;
      return {
        windows: state.windows.map((w) =>
          w.id === id ? { ...w, zIndex: nextZ } : w
        ),
      };
    }),
}));
