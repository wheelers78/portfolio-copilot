export interface MetaField {
  label: string;
  value: string;
}

export interface ContentSection {
  label: string;
  // Single paragraph of body text.
  content?: string;
  // Multiple body-text paragraphs — same style as `content`, just more than one.
  paragraphs?: string[];
  // Line-by-line list (plain or bulleted).
  items?: string[];
  isBulletList?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  period: string;
  // Controls whether the project is interactive in the nav.
  // Omit or set to "active" for normal projects.
  // Set to "comingSoon" to show the label and disable interaction.
  status?: "active" | "comingSoon";
  roleTitle: string;
  role: string;
  summary: string;
  // Flexible intro paragraphs — each string renders as its own block.
  // Remove the field (or set to []) to hide the intro section entirely.
  introBlocks?: string[];
  // Flexible meta columns (e.g. Role, Responsibilities, Year…).
  // Add, remove, or reorder items freely. Omit to hide the section.
  metaFields?: MetaField[];
  // Flexible body sections rendered in order after the images.
  // Each entry maps directly to a CaseStudySection. Omit to hide all.
  contentSections?: ContentSection[];
  tags: string[];
  related: string[];
  images?: string[];
  imageHeight?: number;
  // Optional overlay colour for the hero image. Accepts any CSS colour value
  // e.g. "rgba(30, 60, 120, 0.6)" or "#1e3c78cc". Defaults to rgba(0,0,0,0.5).
  heroOverlayColor?: string;
  suggestedQuestions: string[];
}

export const projects: Project[] = [
  {
    slug: "wgsn_trends",
    title: "WGSN Trends",
    status: "comingSoon",
    period: "2025",
    roleTitle: "Design Lead",
    role: "Leading discovery, strategy, and workshops through to UX/UI design, prototyping, and delivery.",
    summary: "Making cultural foresight actionable for brands",
    introBlocks: [
      "WGSN clients need to plan ahead — understanding what's coming and how to respond. However, cultural insights were often broad, fragmented, and difficult to act on.",
    ],
    metaFields: [
      { label: "Role", value: "Design Lead" },
      { label: "Responsibilities", value: "Leading discovery, strategy, and workshops through to UX/UI design, prototyping, and delivery." },
    ],
    contentSections: [
      {
        label: "Challenge",
        content: "Cultural trend data was scattered and abstract. Brands couldn't easily translate trends into concrete business decisions without deep analysis and interpretation.",
      },
      {
        label: "Actions",
        isBulletList: true,
        items: [
          "Led discovery research with WGSN clients and internal teams",
          "Defined information architecture for trend discovery and filtering",
          "Designed end-to-end experience for accessing and acting on trends",
          "Built interactive prototypes demonstrating trend applications",
          "Delivered final designs integrated with WGSN's design system",
        ],
      },
      {
        label: "Outcomes",
        isBulletList: true,
        items: [
          "Shipped as a core feature within WGSN's platform",
          "Enabled brands to translate trends into actionable insights",
          "Increased engagement with cultural foresight content",
        ],
      },
    ],
    images: [
      "/images/WGSN_Trends_Thumbnail.png",
      "/images/WGSN_Tends_Header.png",
      "/images/WGSN_Trends_Visual_1.png",
    ],
    imageHeight: 360,
    tags: ["Product Design", "Discovery", "WGSN"],
    related: [],
    suggestedQuestions: [
      "How did you approach making trends actionable?",
      "What was the information architecture?",
      "How did this fit into WGSN's broader platform?",
    ],
  },

  {
    slug: "events_culture",
    title: "WGSN Events + Culture",
    period: "2025",
    roleTitle: "Design Lead",
    role: "Leading discovery, strategy, and workshops through to UX/UI design, prototyping, and delivery.",
    summary: "Anticipating global moments and turning insight into action",
    introBlocks: [
      "Brands were continually requesting content around key moments throughout the year, but insights were fragmented across the platform.",
      "We redesigned the experience to bring together content, insights, strategies, and actions into a single destination for planning around cultural events.",
    ],
    metaFields: [
      { label: "Role", value: "Design Lead — Platform & Experience" },
      { label: "Responsibilities", value: "Led end-to-end design across discovery, strategy, UX/UI, and delivery — aligning product, content, and engineering around a unified platform experience." },
    ],
    contentSections: [
      {
        label: "Challenge",
        isBulletList: true,
        items: [
        "Translating complex event and cultural insight into clear, usable product experiences",
        "Aligning multiple stakeholders across product, content, and engineering",
        "Moving quickly without compromising quality across a growing platform",
        ]
      },
      {
        label: "Approach",
        isBulletList: true,
        items: [
          "Led end-to-end design from discovery through to delivery, shaping both product thinking and UX",
          "Used AI-assisted workflows (Figma + Cursor) to rapidly prototype UI and explore interaction patterns",
          "Brought designs closer to production-ready outputs, enabling faster, clearer handoff to engineering",
          "Worked closely with engineers to validate feasibility early and reduce iteration cycles",
        ],
      },
       {
        label: "Outcomes",
        isBulletList: true,
        items: [
          "Accelerated design-to-development workflow through more production-ready UI outputs",
          "Reduced ambiguity in handoff, improving collaboration between design and engineering",
          "Delivered a scalable and consistent experience across events and cultural content",
          "Established a more modern, AI-supported way of working within the design process",
        ]
      },
    ],
    images: [
      "/images/WGSN_Events_Thumbnail.png",
      "/images/WGSN_Events_Header.png",
      "/images/WGSN_Events_1.png",
      "/images/WGSN_Events_2.png",
      "/images/WGSN_Events_3.png",
      "/images/WGSN_Events_4.png",
      "/images/WGSN_Events_5.png",
      "/images/WGSN_Events_6.png",
    ],
    imageHeight: 360,
    tags: ["Product Design", "Discovery", "IA", "WGSN"],
    related: ["pulse-ai", "trends-discovery"],
    suggestedQuestions: [
      "How did you bring fragmented event content together?",
      "How did you align product, content, and engineering?",
      "What role did AI play in your workflow on this project?",
    ],
  },

  {
    slug: "pulse_ai",
    title: "WGSN Pulse AI",
    period: "2025",
    heroOverlayColor: "rgba(27, 21, 55, 0.0)",
    roleTitle: "Design Lead",
    role: "Discovery, strategy, UX/UI, prototyping, delivery to production.",
    summary: "Natural language search for instant, actionable insight",
    introBlocks: [
      "A generative AI-powered search experience that transforms how users interact with WGSN’s content. Designed to replace traditional navigation with fast, intuitive, and precise answers — helping users unlock insight in seconds.",
    ],
    metaFields: [
      { label: "Role", value: "Design Lead - AI Product" },
      { label: "Responsibilities", value: "Shaped a generative AI search experience — redefining how users interact with WGSN’s content by moving from browsing to asking." },
    ],
    contentSections: [
      {
        label: "Challenge",
        content: "WGSN’s content was rich but difficult to navigate, with users struggling to find relevant insights quickly. This limited their ability to fully realise the value of the platform.",
      },
      {
        label: "Approach",
        isBulletList: true,
        items: [
          "Designed a natural language search experience powered by generative AI, shifting the interaction model from browsing to asking.",
          "Focused on simplicity, speed, and clarity — transforming a complex repository of forecasts, data, and imagery into a conversational, insight-led experience.",
        ],
      },
       {
        label: "Outcomes",
        isBulletList: true,
        items: [
        "Reduced friction in content discovery, enabling users to access precise, actionable insights in seconds.",
        "Established a new interaction paradigm for the platform — laying the foundation for future AI-driven experiences.",
        ],
      },
    ],
    images: [
      "/images/WGSN_Pulse_Thumbnail.png",
      "/images/WGSN_Pulse_Header.png",
      "/images/WGSN_Pulse_1.png",
      "/images/WGSN_Pulse_2.png",
      "/images/WGSN_Pulse_3.png",
    ],
    imageHeight: 360,
    tags: ["Product Design", "Discovery", "IA", "WGSN"],
    related: ["pulse-ai", "trends-discovery"],
    suggestedQuestions: [
      "How did you design for AI trust and transparency?",
      "What was the shift from browsing to asking?",
      "How did you define success for the search experience?",
    ],
  },

  {
    slug: "shorts",
    title: "WGSN Shorts",
    period: "2024",
    roleTitle: "Design Lead",
    role: "Owned the full design process, collaborating with stakeholders across discovery, UX/UI design, and implementation.",
    summary: "Fast, digestible insights for quick decision-making",
    introBlocks: [
      "A personalised content experience that distils long-form reports into concise, actionable insights — making it faster to discover and engage with what matters.",
    ],
    metaFields: [
      { label: "Role", value: "Design Lead — Content Experience" },
      { label: "Responsibilities", value: "Defined and delivered a personalised content experience — working with product and engineering to simplify discovery and make insights faster to access and act on." },
    ],
    contentSections: [
      {
        label: "Challenge",
        content: "WGSN reports are rich but often long and time-consuming to navigate, making it difficult for users to quickly find relevant insights. This created friction in discovery and limited engagement with valuable content."
      },
       {
        label: "Approach",
        isBulletList: true,
        items: [
          "Designed a personalised experience that breaks reports into concise, digestible “Shorts”, surfacing the most relevant insights for each user.",
          "Focused on clarity, scanability, and engagement — enabling users to quickly explore topics without the need to read full reports.",
        ]
      },
      {
        label: "Outcomes",
        isBulletList: true,
        items: [
          "Reduced friction in content discovery, allowing users to access key insights faster and more efficiently.",
          "Increased engagement by making content easier to scan, explore, and act on.",
        ]
      },
    ],
    images: [
      "/images/WGSN_Shorts_Thumbnail.png",
      "/images/WGSN_Shorts_Header.png",
      "/images/WGSN_Shorts_1.png",
      "/images/WGSN_Shorts_2.png",
      "/images/WGSN_Shorts_3.png",
      "/images/WGSN_Shorts_4.png",
    ],
    imageHeight: 360,
    tags: ["Product Design", "Discovery", "IA", "WGSN"],
    related: ["pulse-ai", "trends-discovery"],
    suggestedQuestions: [
      "How did you approach the personalisation model?",
      "What made long-form content easier to engage with?",
      "How did you balance brevity with depth?",
    ],
  },

  {
    slug: "catwalks",
    title: "WGSN Catwalks",
    period: "2024",
    roleTitle: "Design Lead",
    role: "Leading discovery, strategy, and workshops through to UX/UI design, prototyping, and delivery.",
    summary: "A real-time view of global runway trends",
    introBlocks: [
      "A real-time runway intelligence experience designed to capture and structure trends as they emerge across global fashion weeks.",
      "I helped shape how high-volume catwalk imagery, data and reports is organised and surfaced — enabling users to move from observation to decision without waiting for post-event reports.",
    ],
    metaFields: [
      { label: "Role", value: "Design Lead — Product Experince" },
      { label: "Responsibilities", value: "Shaped a runway intelligence experience — helping users move from inspiration to insight by connecting shows, imagery, and emerging trends in one place." },
    ],
    contentSections: [
      {
        label: "Challenge",
        content: "Event data lived across multiple formats and teams, making it difficult to discover, compare, and plan effectively.",
      },
      {
        label: "Approach",
        isBulletList: true,
        items: [
          "Designed a unified system that structured event data into a consistent, filterable model — while improving the UI to make content easier to browse, view, and download.",
          "Introduced live data feeds to surface shows with emerging insights, alongside faster access to catwalk reports and imagery.",
        ],
      },
       {
        label: "Outcomes",
        isBulletList: true,
        items: [
        "Improved discoverability and usability of event data, enabling faster planning and more confident decision-making.",
        "Reduced friction in accessing imagery and reports, helping teams move from inspiration to action more efficiently..",
        ]
      },
    ],
    images: [
      "/images/WGSN_Catwalks_Thumbnail.png",
      "/images/WGSN_Catwalks_Header.png",
      "/images/WGSN_Catwalks_1.png",
      "/images/WGSN_Catwalks_2.png",
      "/images/WGSN_Catwalks_3.png",
      "/images/WGSN_Catwalks_4.png",
      "/images/WGSN_Catwalks_5.png",
    ],
    imageHeight: 360,
    tags: ["Product Design", "Discovery", "IA", "WGSN"],
    related: ["pulse-ai", "trends-discovery"],
    suggestedQuestions: [
      "How did you structure high-volume catwalk data?",
      "How did you connect shows, imagery, and trends in one place?",
      "What was the challenge of designing for real-time runway intelligence?",
    ],
  },

  {
    slug: "sedna",
    title: "Sedna",
    period: "2022",
    heroOverlayColor: "rgba(27, 21, 55, 0.8)",
    roleTitle: "Design Lead",
    role: "Discovery, strategy, UX/UI, prototyping, design system integration.",
    summary: "Reinventing communication for high-stakes, real-time operations",
    introBlocks: [
      "A communication platform for maritime and logistics, designed to bring clarity to high-volume, time-critical workflows.",
      "I led the end-to-end UI overhaul and design system, improving how teams triage, act, and collaborate at speed.",    ],
    metaFields: [
      { label: "Role", value: "Design Lead — Product Redesign" },
      { label: "Responsibilities", value: "Drove a full UI overhaul of Sedna’s communication platform — improving clarity, hierarchy, and speed in high-volume workflows." },
    ],
    contentSections: [
      {
        label: "Challenge",
        content: "Teams were managing thousands of messages a day through fragmented, email-like workflows — making it difficult to prioritise, assign ownership, and take action. The UI lacked clarity and structure, increasing cognitive load in already high-pressure environments."
      },
      {
        label: "Approach",
        isBulletList: true,
        items: [
         "Led a full UI overhaul focused on clarity, hierarchy, and speed.",
         "Redesigned message flows, simplified layouts, and introduced a scalable design system — working closely with engineering to ensure components were practical, reusable, and production-ready.",
        ]
      },
      {
        label: "Outcome",
        isBulletList: true,
        items: [
        "Improved scanability and reduced cognitive load across high-volume message streams.",
        "Enabled faster triage and clearer ownership of tasks.",
        "Increased consistency and accelerated front-end delivery through a shared design system.",
        "Created a stronger foundation for future product development.",
        ]
      },
      
    ],
    images: [
      "/images/Sedna_Thumbnail.png",
      "/images/Sedna_Header.png",
      "/images/Sedna_1.png",
      "/images/Sedna_2.png",
      "/images/Sedna_3.png",
      "/images/Sedna_4.png",
      "/images/Sedna_5.png",
      "/images/Sedna_6.png",
      "/images/Sedna_7.png",
    ],
    imageHeight: 360,
    tags: ["Product Design", "Discovery", "IA", "WGSN"],
    related: ["pulse-ai", "trends-discovery"],
    suggestedQuestions: [
      "How did you reduce cognitive load for high-volume messaging?",
      "What drove the decision to do a full UI overhaul?",
      "How did you collaborate with engineering on the design system?",
    ],
  },

  {
    slug: "sedna_harbor",
    title: "Sedna Harbor",
    period: "2022",
    heroOverlayColor: "rgba(27, 21, 55, 0.8)",
    roleTitle: "Design Lead",
    role: "Led the end-to-end creation of the design system, from defining strategy and visual identity to auditing components, aligning stakeholders, and guiding implementation across teams.",
    summary: "Driving consistency and scale through a shared design system",
    introBlocks: [
      "A scalable design system built to unify how SEDNA designs and builds products. I led the end-to-end creation — aligning design and engineering around shared components, patterns, and principles to improve speed, consistency, and collaboration.",
    ],
    metaFields: [
      { label: "Role", value: "Design Lead — Design System" },
      { label: "Responsibilities", value: "Established Harbor as SEDNA’s shared design system — defining its structure, visual language, and component model." },
    ],
    contentSections: [
      {
        label: "Challenge",
        content: "Design and development were fragmented, with inconsistent components and duplicated effort across teams. This slowed delivery and made it harder to maintain quality and alignment at scale."
      },
      {
        label: "Approach",
        isBulletList: true,
        items: [
          "Led the creation of Harbor as a shared foundation for design and engineering.",
          "Defined the system’s structure, visual language, and component model — introducing reusable patterns, design tokens, and a scalable framework that worked across platforms.",
          "Worked closely with engineers to ensure the system was practical, maintainable, and actively contributed to by multiple teams.",
        ],
      },
      {
        label: "Outcomes",
       isBulletList: true,
        items: [
          "Established a consistent design language across products.",
          "Reduced duplicate component builds by 60% and improved delivery speed.",
          "Strengthened design–engineering collaboration through a shared system and contribution model.",
          "Created a scalable foundation for future product development.",
        ],
      },
    ],
    images: [
      "/images/Sedna_Harbor_Thumbnail.png",
      "/images/Sedna_Habor_Header.png",
      "/images/Sedna_Harbor_1.png",
      "/images/Sedna_Harbor_2.png",
      "/images/Sedna_Harbor_3.png",
      "/images/Sedna_Harbor_4.png",
      "/images/Sedna_Harbor_5.png",
      "/images/Sedna_Harbor_8.png",
      "/images/Sedna_Harbor_6.png",
      "/images/Sedna_Harbor_7.png",
    ],
    imageHeight: 360,
    tags: ["Product Design", "Discovery", "IA", "WGSN"],
    related: ["pulse-ai", "trends-discovery"],
    suggestedQuestions: [
      "How did you build adoption for the design system?",
      "What was your approach to the component model?",
      "How did you align design and engineering around a shared system?",
    ],
  },

  {
    slug: "solana_trading_alerts",
    title: "Crypto Telegram Bot",
    period: "2024",
    status: "comingSoon",
    roleTitle: "Product Designer",
    role: "Discovery, UX/UI design, and working with engineering to implement real-time notification systems.",
    summary: "Real-time trading intelligence for blockchain traders",
    introBlocks: [
      "Traders needed a way to monitor multiple blockchain assets and respond quickly to market movements without constantly checking dashboards.",
      "A personal project focused on the Solana ecosystem — experimenting with real-time signals, wallet flows, and meme market dynamics to make faster, more informed decisions.",
    ],
    metaFields: [
      { label: "Role", value: "Product Designer" },
      { label: "Responsibilities", value: "Discovery, UX/UI design, and working with engineering to implement real-time notification systems." },
    ],
    contentSections: [
      {
        label: "Challenge",
        content: "Traders needed a way to monitor multiple blockchain assets and respond quickly to market movements without constantly checking dashboards.",
      },
      {
        label: "Actions",
        isBulletList: true,
        items: [
          "Conducted user research with active traders and portfolio managers",
          "Designed the alert configuration and notification system",
          "Created mobile and desktop interfaces for alert management",
          "Implemented real-time data visualization and updates",
        ],
      },
    ],
    images: [
      "/images/Solana_Alerts_Thumbnail.png",
      "/images/Solana_Alerts_Header.png",
      "/images/solana_alerts_1.png",
    ],
    imageHeight: 360,
    tags: ["Product Design", "Trading", "Real-time"],
    related: [],
    suggestedQuestions: [
      "What was the research process?",
      "How did you handle real-time updates?",
      "What were the key design challenges?",
    ],
  },

];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
