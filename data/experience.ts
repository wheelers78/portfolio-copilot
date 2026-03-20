export interface Role {
  id: string;
  company: string;
  title: string;
  period: string;
  summary: string;
  highlights: string[];
  tags: string[];
}

export const experience: Role[] = [
  {
    id: "wgsn",
    company: "WGSN",
    title: "Product Design Lead",
    period: "2021–Present",
    summary:
      "Leading product design across WGSN's suite of B2B and consumer products. Responsible for design systems, AI-powered discovery, and platform experience — working cross-functionally with product, engineering, data science, and content.",
    highlights: [
      "Built and led the Aeon design system — WGSN's first unified component and token architecture",
      "Led design for Pulse AI, WGSN's AI-powered trend discovery feature",
      "Redesigned the core trends discovery and navigation experience",
      "Established design practice standards, including critique, documentation, and handoff",
      "Mentored junior and mid-level designers across the team",
    ],
    tags: ["Design Systems", "AI", "Platform", "Leadership", "B2B"],
  },
  {
    id: "miq",
    company: "MiQ",
    title: "Senior Product Designer",
    period: "2019–2021",
    summary:
      "Senior designer on MiQ's programmatic advertising platform — a complex, data-dense B2B product used by media buyers and strategists globally. Focused on data visualisation, workflow design, and platform coherence.",
    highlights: [
      "Redesigned the campaign performance dashboard — the platform's most used surface",
      "Led the information architecture review for core workflow navigation",
      "Established shared component patterns across the design team",
      "Worked closely with front-end engineering on component specification and delivery",
    ],
    tags: ["Data Visualisation", "Platform", "B2B", "Workflow"],
  },
  {
    id: "sedna",
    company: "Sedna",
    title: "Product Designer",
    period: "2017–2019",
    summary:
      "Early product designer at Sedna, a B2B communication platform for global trade. Worked across the full product surface in a small, high-ownership team — from core inbox and workflow features to onboarding and team management.",
    highlights: [
      "Shaped the core messaging and workflow product from early-stage to growth",
      "Designed the onboarding experience and first-run flows",
      "Contributed to product strategy discussions as a founding design voice",
      "Worked directly with the CEO and engineering lead in a flat, fast-moving team",
    ],
    tags: ["Early Stage", "B2B", "Communication", "Full-stack Design"],
  },
];

export const patternSummary = [
  "Consistently working in complex, information-dense B2B products",
  "Moving from delivery-focused execution to design systems and design leadership",
  "Building at the intersection of AI, data, and content discovery",
  "Always close to engineering — from component specification to implementation review",
];
