export interface Project {
  slug: string;
  title: string;
  period: string;
  roleTitle: string;
  summary: string;
  challenge: string;
  role: string;
  actions: string[];
  outcomes: string[];
  tags: string[];
  related: string[];
  images?: string[];
  imageHeight?: number;
  suggestedQuestions: string[];
}

export const projects: Project[] = [
  {
    slug: "events_culture",
    title: "Events + Culture",
    period: "2025",
    roleTitle: "WGSN",
    summary:
      "WGSN clients need to plan ahead — understanding what's coming and how to respond. However, cultural insights were often broad, fragmented, and difficult to act on.",
    challenge:
      "Cultural event data was scattered across editorial, calendars, and trend reports. There was no unified way for brands to surface, filter, and plan around the events that mattered to them — by category, region, or audience.",
    role:
      "Leading discovery, strategy, and workshops through to UX/UI design, prototyping, and delivery.",
    actions: [
      "Led discovery research and stakeholder workshops to define the product opportunity",
      "Defined the information architecture and filtering model for event discovery",
      "Designed the full end-to-end experience from search to event detail",
      "Built and iterated prototypes with WGSN's editorial and product teams",
      "Delivered final designs and a component set integrated with the Aeon design system",
    ],
    outcomes: [
      "Shipped as a new product surface within WGSN's core platform",
      "Gave brand teams a structured way to plan around culturally relevant moments",
      "Established event discovery patterns reused across WGSN's product roadmap",
    ],
    images: [
      "/images/Events_Cover.jpg",
      "/images/events_visual_1.jpg",
      "/images/events_visual_2.jpg",
      "/images/events_visual_3.jpg",
      "/images/events_visual_4.jpg",
      "/images/events_visual_5.jpg",
      "/images/events_visual_6.jpg",
      "/images/events_visual_code_1.jpg",
      "/images/events_visual_code_2.jpg",
    ],
    imageHeight: 360,
    tags: ["Product Design", "Discovery", "IA", "WGSN"],
    related: ["pulse-ai", "trends-discovery"],
    suggestedQuestions: [
      "How did you approach the discovery research?",
      "What was the filtering model?",
      "How did this fit into WGSN's broader platform?",
    ],
  },

   {
    slug: "pulse_ai",
    title: "Pulse AI",
    period: "2025",
    roleTitle: "WGSN",
    summary:
      "Pulse is WGSN’s natural language search tool, powered by generative AI. Unlike a standard feature release, Pulse represents a step change in how users interact with the platform: faster, more intuitive, and designed to deliver precise, actionable answers in seconds.",
    challenge:
      "Cultural event data was scattered across editorial, calendars, and trend reports. There was no unified way for brands to surface, filter, and plan around the events that mattered to them — by category, region, or audience.",
    role:
      "Discovery, strategy, UX/UI, prototyping, delivery to production.",
    actions: [
      "Led discovery research and stakeholder workshops to define the product opportunity",
      "Defined the information architecture and filtering model for event discovery",
      "Designed the full end-to-end experience from search to event detail",
      "Built and iterated prototypes with WGSN's editorial and product teams",
      "Delivered final designs and a component set integrated with the Aeon design system",
    ],
    outcomes: [
      "Shipped as a new product surface within WGSN's core platform",
      "Gave brand teams a structured way to plan around culturally relevant moments",
      "Established event discovery patterns reused across WGSN's product roadmap",
    ],
    images: [
      "/images/pulse_cover.png",
      "/images/pulse_1.png",
      "/images/pulse_2.png",
      "/images/pulse_3.png",
    ],
    imageHeight: 360,
    tags: ["Product Design", "Discovery", "IA", "WGSN"],
    related: ["pulse-ai", "trends-discovery"],
    suggestedQuestions: [
      "How did you approach the discovery research?",
      "What was the filtering model?",
      "How did this fit into WGSN's broader platform?",
    ],
  },

  {
    slug: "shorts",
    title: "Shorts",
    period: "2024",
    roleTitle: "Design Lead",
    summary:
      "Shorts makes it faster and easier for customers to find relevant content by delivering key insights from reports through personalised targeting. Reports are broken down into their core messages and presented in a simplified, engaging format that's easy to scan and digest.",
    challenge:
      "Cultural event data was scattered across editorial, calendars, and trend reports. There was no unified way for brands to surface, filter, and plan around the events that mattered to them — by category, region, or audience.",
    role:
      "Owned the full design process, collaborating with stakeholders across discovery, UX/UI design, and implementation",
    actions: [
      "Led discovery research and stakeholder workshops to define the product opportunity",
      "Defined the information architecture and filtering model for event discovery",
      "Designed the full end-to-end experience from search to event detail",
      "Built and iterated prototypes with WGSN's editorial and product teams",
      "Delivered final designs and a component set integrated with the Aeon design system",
    ],
    outcomes: [
      "Shipped as a new product surface within WGSN's core platform",
      "Gave brand teams a structured way to plan around culturally relevant moments",
      "Established event discovery patterns reused across WGSN's product roadmap",
    ],
    images: [
      "/images/shorts_cover.png",
      "/images/shorts_visual_1.png",
      "/images/shorts_visual_2.png",
      "/images/shorts_visual_3.png",
      "/images/shorts_visual_4.png",
      "/images/shorts_visual_5.png",
    ],
    imageHeight: 360,
    tags: ["Product Design", "Discovery", "IA", "WGSN"],
    related: ["pulse-ai", "trends-discovery"],
    suggestedQuestions: [
      "How did you approach the discovery research?",
      "What was the filtering model?",
      "How did this fit into WGSN's broader platform?",
    ],
  },

  {
    slug: "catwalks",
    title: "Catwalks",
    period: "2024",
    roleTitle: "Design Lead",
    summary:
      "Catwalks provides fashion designers and buyers with an unparalleled view of global runway trends. The platform's core value proposition is to transform raw catwalk data and insights into actionable intelligence.",
    challenge:
      "Cultural event data was scattered across editorial, calendars, and trend reports. There was no unified way for brands to surface, filter, and plan around the events that mattered to them — by category, region, or audience.",
    role:
      "Leading discovery, strategy, and workshops through to UX/UI design, prototyping, and delivery.",
    actions: [
      "Led discovery research and stakeholder workshops to define the product opportunity",
      "Defined the information architecture and filtering model for event discovery",
      "Designed the full end-to-end experience from search to event detail",
      "Built and iterated prototypes with WGSN's editorial and product teams",
      "Delivered final designs and a component set integrated with the Aeon design system",
    ],
    outcomes: [
      "Shipped as a new product surface within WGSN's core platform",
      "Gave brand teams a structured way to plan around culturally relevant moments",
      "Established event discovery patterns reused across WGSN's product roadmap",
    ],
    images: [
      "/images/catwalks_cover.png",
      "/images/catwalks_1.png",
      "/images/catwalks_2.png",
      "/images/catwalks_3.png",
      "/images/catwalks_4.png",
      "/images/catwalks_5.png",
      "/images/catwalks_6.png",
    ],
    imageHeight: 360,
    tags: ["Product Design", "Discovery", "IA", "WGSN"],
    related: ["pulse-ai", "trends-discovery"],
    suggestedQuestions: [
      "How did you approach the discovery research?",
      "What was the filtering model?",
      "How did this fit into WGSN's broader platform?",
    ],
  },

  {
    slug: "sedna",
    title: "Sedna",
    period: "2022",
    roleTitle: "Design Lead",
    summary:
      "Sedna is reinventing communication for maritime and logistics - industries where clarity and speed directly impact operations. Instead of relying on traditional email, Sedna creates an intelligent workspace that brings messages, data, and decisions together.",
    challenge:
      "Cultural event data was scattered across editorial, calendars, and trend reports. There was no unified way for brands to surface, filter, and plan around the events that mattered to them — by category, region, or audience.",
    role:
      "Discovery, strategy, UX/UI, prototyping, design system integration§",
    actions: [
      "Led discovery research and stakeholder workshops to define the product opportunity",
      "Defined the information architecture and filtering model for event discovery",
      "Designed the full end-to-end experience from search to event detail",
      "Built and iterated prototypes with WGSN's editorial and product teams",
      "Delivered final designs and a component set integrated with the Aeon design system",
    ],
    outcomes: [
      "Shipped as a new product surface within WGSN's core platform",
      "Gave brand teams a structured way to plan around culturally relevant moments",
      "Established event discovery patterns reused across WGSN's product roadmap",
    ],
    images: [
      "/images/sedna_cover.png",
      "/images/sedna_1.png",
      "/images/senad_2.png",
      "/images/sedna_3.png",
      "/images/sedna_4.png",
      "/images/sedna_5.png",
      "/images/sedna_6.png",
    ],
    imageHeight: 360,
    tags: ["Product Design", "Discovery", "IA", "WGSN"],
    related: ["pulse-ai", "trends-discovery"],
    suggestedQuestions: [
      "How did you approach the discovery research?",
      "What was the filtering model?",
      "How did this fit into WGSN's broader platform?",
    ],
  },

  {
    slug: "sedna_harbor",
    title: "Harbor",
    period: "2022",
    roleTitle: "Design Lead",
    summary:
      "Harbor is the shared foundation SEDNAuts use to craft digital experiences. It sits at the heart of SEDNA’s design and development work, empowering designers and engineers to collaborate and build better products, faster..",
    challenge:
      "Cultural event data was scattered across editorial, calendars, and trend reports. There was no unified way for brands to surface, filter, and plan around the events that mattered to them — by category, region, or audience.",
    role:
      "Led the end-to-end creation of the design system, from defining strategy and visual identity to auditing components, aligning stakeholders, and guiding implementation across teams.",
    actions: [
      "Led discovery research and stakeholder workshops to define the product opportunity",
      "Defined the information architecture and filtering model for event discovery",
      "Designed the full end-to-end experience from search to event detail",
      "Built and iterated prototypes with WGSN's editorial and product teams",
      "Delivered final designs and a component set integrated with the Aeon design system",
    ],
    outcomes: [
      "Shipped as a new product surface within WGSN's core platform",
      "Gave brand teams a structured way to plan around culturally relevant moments",
      "Established event discovery patterns reused across WGSN's product roadmap",
    ],
    images: [
      "/images/harbor_cover.png",
      "/images/harbor_1.png",
      "/images/harbor_2.png",
      "/images/harbor_3.png",
      "/images/harbor_4.png",
    ],
    imageHeight: 360,
    tags: ["Product Design", "Discovery", "IA", "WGSN"],
    related: ["pulse-ai", "trends-discovery"],
    suggestedQuestions: [
      "How did you approach the discovery research?",
      "What was the filtering model?",
      "How did this fit into WGSN's broader platform?",
    ],
  },
  
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
