import { create } from "zustand";

export type PanelType = "project" | "copilot" | "about" | "experience" | null;

interface PortfolioState {
  // Active panel state
  activePanel: PanelType;
  activeProjectSlug: string | null;
  activeNoteId: string | null;

  // Panel stack for back navigation
  panelHistory: PanelType[];

  // Copilot state
  copilotQuery: string | null;
  copilotResult: string | null;

  // Actions
  openProject: (slug: string) => void;
  openCopilot: (query: string) => void;
  openAbout: () => void;
  openExperience: () => void;
  openNote: (id: string) => void;
  closePanel: () => void;
  goBack: () => void;
}

export const usePortfolioState = create<PortfolioState>((set, get) => ({
  activePanel: null,
  activeProjectSlug: null,
  activeNoteId: null,
  panelHistory: [],
  copilotQuery: null,
  copilotResult: null,

  openProject: (slug: string) => {
    const state = get();
    if (state.activePanel) {
      set({ panelHistory: [...state.panelHistory, state.activePanel] });
    }
    set({ activePanel: "project", activeProjectSlug: slug });
  },

  openCopilot: (query: string) => {
    const state = get();
    if (state.activePanel) {
      set({ panelHistory: [...state.panelHistory, state.activePanel] });
    }
    set({ activePanel: "copilot", copilotQuery: query });
  },

  openAbout: () => {
    const state = get();
    if (state.activePanel) {
      set({ panelHistory: [...state.panelHistory, state.activePanel] });
    }
    set({ activePanel: "about", activeProjectSlug: null });
  },

  openExperience: () => {
    const state = get();
    if (state.activePanel) {
      set({ panelHistory: [...state.panelHistory, state.activePanel] });
    }
    set({ activePanel: "experience", activeProjectSlug: null });
  },

  openNote: (id: string) => {
    const state = get();
    if (state.activePanel) {
      set({ panelHistory: [...state.panelHistory, state.activePanel] });
    }
    set({ activePanel: "project", activeNoteId: id });
  },

  closePanel: () => {
    set({
      activePanel: null,
      activeProjectSlug: null,
      activeNoteId: null,
      panelHistory: [],
      copilotQuery: null,
    });
  },

  goBack: () => {
    const state = get();
    if (state.panelHistory.length > 0) {
      const newHistory = [...state.panelHistory];
      const prevPanel = newHistory.pop();
      set({
        activePanel: prevPanel || null,
        panelHistory: newHistory,
        activeProjectSlug: null,
        activeNoteId: null,
      });
    } else {
      set({ activePanel: null, activeProjectSlug: null });
    }
  },
}));
