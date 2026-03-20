export interface CopilotImage {
  src: string;
  alt?: string;
}

export interface CopilotAnswer {
  id: string;
  title: string;
  summary: string;
  detail: string[];
  whyItMattered?: string;
  relatedTopics?: string[];
  relatedProjects?: string[];
  followUpPrompts?: string[];
  themes?: string[];
  keywords?: string[];
  images?: CopilotImage[];
}

export const copilotAnswers: CopilotAnswer[] = [

  {
  id: "feedback",
  title: "Feedback and Communication",
  summary:
    "I value direct, open feedback and clear communication — it’s how teams improve quickly.",
  detail: [
    "I prefer feedback in person or in 1:1s, where there’s space for real discussion.",
    "I find frameworks like ‘Start, Stop, Continue’ really useful for clarity.",
    "I appreciate feedback early — not just at the end of a project.",
    "I try to create an environment where feedback flows both ways, not just top-down.",
  ],
  whyItMattered:
    "Strong feedback loops are one of the fastest ways to improve both design quality and team performance.",
  followUpPrompts: [
    "How do you run critique?",
    "How do you handle disagreement?",
  ],
  themes: ["communication", "leadership"],
  keywords: ["feedback", "critique", "communication"],
},

  {
    id: "day-structure",
    title: "How I Structure My Day",
    summary:
      "Mornings are for deep focus, afternoons for collaboration — I protect the hours that matter most.",
    detail: [
      "I'm most productive before 1pm — that's when I tackle complex thinking, design decisions, and anything that needs real concentration.",
      "I batch reviews and meetings into the afternoon, so mornings stay free from interruptions where possible.",
      "I aim to wrap around 5:30–6pm to be present with my family — that boundary keeps me intentional about how I spend my working hours.",
      "Deep work and collaboration are both essential — I try to balance them deliberately, not reactively.",
    ],
    whyItMattered:
      "A clear daily structure makes me a more focused designer and a more present person outside of work.",
    followUpPrompts: [
      "How do you like to work?",
      "How do you handle meetings?",
    ],
    themes: ["process", "working-style"],
    keywords: [
      "structure day",
      "daily",
      "morning",
      "schedule",
      "routine",
      "time management",
      "productive",
      "deep work",
      "how do you structure",
      "structure your day",
    ],
  },

  {
  id: "working-style",
  title: "How I Like to Work",
  summary:
    "I work best in environments that balance deep focus with collaboration — where there’s space to think, but also strong team alignment.",
  detail: [
    "I’m most productive in the morning — that’s when I focus on deep thinking and problem solving.",
    "I like having time to process information before responding, especially on complex problems.",
    "I value a mix of focused solo work and collaborative sessions — both are essential to good design.",
    "I’m comfortable working remotely and value the flexibility it gives, but I also enjoy creative, in-person environments with the team.",
  ],
  whyItMattered:
    "The way I work allows me to think deeply while staying connected to the team — which leads to better decisions and stronger outcomes.",
  followUpPrompts: [
    "How do you structure your day?",
    "How do you handle meetings?",
  ],
  themes: ["process", "working-style", "work", "collaboration"],
  keywords: [
    "how i like to work",
    "how do you like to work",
    "how you like to work",
    "how you work",
    "working style",
    "work style",
    "how do you work",
    "environment",
    "productivity",
    "remote",
    "collaboration",
  ],
},

  {
    id: "art-direction",
    title: "Art Direction Experience",
    summary:
      "I’ve art directed campaign shoots — shaping visual direction from concept through to execution.",
    detail: [
      "At Penland Brands, I led art direction on shoots for Canterbury and Speedo.",
      "This included defining visual tone, working with photographers, and ensuring consistency across campaign outputs.",
      "For the Rugby World Cup, I art directed shoots for England and Ireland teams — balancing performance, brand, and storytelling.",
    ],
    whyItMattered:
      "It developed my eye for visual quality and narrative — which directly influences how I design interfaces and systems today.",
    relatedTopics: ["Brand", "Creative Direction"],
    followUpPrompts: [
      "How does art direction influence your UI work?",
      "Do you still apply this today?",
    ],
    themes: ["art-direction", "visual"],
    keywords: ["art direction", "photoshoot", "creative direction", "campaign"],
  },

  {
    id: "brand-to-product",
    title: "From Brand to Product",
    summary:
      "My background in brand and campaign work gives me a different perspective on product design — one grounded in storytelling and visual clarity.",
    detail: [
      "Brand work taught me how to communicate ideas quickly and emotionally — something many products struggle with.",
      "I bring that thinking into product: clarity of message, strong visual hierarchy, and cohesive experience.",
      "It also helps when working with marketing and brand teams — I understand both worlds.",
    ],
    whyItMattered:
      "It allows me to bridge brand and product — ensuring experiences are not just usable, but expressive and memorable.",
    relatedTopics: ["Product Design", "Brand"],
    followUpPrompts: [
      "How does this show up in your work?",
      "Where have you applied this at WGSN?",
    ],
    themes: ["brand", "product"],
    keywords: ["brand vs product", "storytelling", "visual design"],
  },

  {
    id: "design-systems",
    title: "Design Systems Work",
    summary:
      "I’ve led design systems across multiple companies — from building Aeon at WGSN to scaling systems across complex, multi-team environments.",
    detail: [
      "At WGSN, I led the Aeon design system from the ground up — auditing five product surfaces, defining a multi-tier token architecture, and building the component library alongside engineering.",
      "The real challenge wasn’t components — it was governance, contribution models, and aligning teams that had been working independently.",
      "I treat systems work like product work: clear value, rollout strategy, and continuous feedback loops.",
    ],
    whyItMattered:
      "A shared design language reduced friction, improved consistency, and compounded efficiency across design and engineering.",
    relatedTopics: ["Token Architecture", "Governance", "Component Libraries"],
    relatedProjects: ["aeon-design-system"],
    followUpPrompts: [
      "How did you approach token architecture?",
      "What governance model did you use?",
    ],
    themes: ["design-systems", "systems"],
    keywords: ["design system", "component", "token", "figma", "library"],
    images: [
      { src: "/images/harbor_framework.png", alt: "Token architecture framework" },
      { src: "/images/harbor_1.png", alt: "Component library overview" },
      { src: "/images/harbor_branding.png", alt: "Design system branding" },
      { src: "/images/harbor_2.png", alt: "Component documentation" },
    ],
  },

  {
    id: "wgsn",
    title: "Work at WGSN",
    summary:
      "Product Design Lead at WGSN — working across design systems, AI products, and large-scale content discovery.",
    detail: [
      "WGSN is a complex B2B platform combining editorial, data, and AI layers.",
      "I worked across design systems (Aeon), AI discovery (Pulse), and platform navigation (Digital Destinations).",
      "I often act as the bridge between product, engineering, and content.",
    ],
    whyItMattered:
      "It’s a rare environment where systems thinking, product craft, and cross-functional leadership all matter.",
    relatedProjects: ["aeon-design-system", "pulse-ai"],
    followUpPrompts: [
      "Tell me about the AI work",
      "What did you redesign?",
    ],
    themes: ["wgsn", "b2b"],
    keywords: ["wgsn", "trend", "platform", "enterprise"],
    images: [
      { src: "/images/pulse_cover.png", alt: "Pulse AI — WGSN" },
      { src: "/images/catwalks_cover.png", alt: "Catwalks discovery — WGSN" },
      { src: "/images/harbor_cover.png", alt: "Aeon design system — WGSN" },
    ],
  },

  {
    id: "ai-product",
    title: "AI in Product Design",
    summary:
      "I design AI experiences that reduce cognitive load and improve clarity — not just generate output.",
    detail: [
      "On Pulse AI, I focused on structuring outputs to feel trustworthy and usable.",
      "I think deeply about query design, intent clarity, and response structure.",
      "Oracle explored AI as a thinking tool — not just a generator.",
    ],
    whyItMattered:
      "AI UX is fundamentally an information design problem.",
    relatedProjects: ["pulse-ai", "oracle"],
    followUpPrompts: [
      "How do you design trust in AI?",
      "Tell me about Oracle",
    ],
    themes: ["ai"],
    keywords: ["ai", "llm", "gpt", "copilot"],
    images: [
      { src: "/images/pulse_1.png", alt: "Pulse AI insight panels" },
      { src: "/images/pulse_2.png", alt: "Pulse AI query surface" },
      { src: "/images/pulse_3.png", alt: "Pulse AI output structure" },
    ],
  },

  {
    id: "platform",
    title: "Platform and Systems Experience",
    summary:
      "I design platforms — not just features — focusing on systems that shape entire products.",
    detail: [
      "Platform work is about defining patterns, not just flows.",
      "At WGSN: design system, navigation, and content model.",
      "At MiQ: complex data platform under time pressure.",
    ],
    whyItMattered:
      "Good foundations make everything built on top easier.",
    relatedProjects: ["aeon-design-system"],
    followUpPrompts: [
      "Tell me about MiQ",
      "What’s platform vs feature design?",
    ],
    themes: ["platform"],
    keywords: ["platform", "architecture", "system"],
    images: [
      { src: "/images/catwalks_1.png", alt: "Platform navigation" },
      { src: "/images/catwalks_2.png", alt: "Information architecture" },
      { src: "/images/sedna_cover.png", alt: "Sedna platform" },
    ],
  },

  {
    id: "miq-platform",
    title: "MiQ Platform Work",
    summary:
      "At MiQ, I helped unify fragmented tools into a coherent platform experience.",
    detail: [
      "Multiple legacy products with inconsistent UX and mental models.",
      "Defined shared interaction patterns and navigation structure.",
      "Foundation for what became the Fiber system.",
    ],
    whyItMattered:
      "Aligned teams globally and reduced duplication.",
    relatedProjects: ["miq-platform"],
    followUpPrompts: [
      "How did you unify it?",
      "What were the challenges?",
    ],
    themes: ["miq"],
    keywords: ["miq", "adtech", "dashboard"],
  },

  {
    id: "ia-approach",
    title: "Information Architecture",
    summary:
      "I design IA around user intent — not system structure.",
    detail: [
      "Start with user goals, not content.",
      "Map relationships and complexity.",
      "Simplify aggressively.",
    ],
    whyItMattered:
      "Good IA reduces friction and improves discoverability.",
    relatedProjects: ["digital-destinations"],
    followUpPrompts: [
      "How did you apply this at WGSN?",
    ],
    themes: ["ia"],
    keywords: ["information architecture", "navigation"],
  },

  {
    id: "end-to-end",
    title: "End-to-End Design",
    summary:
      "I work across the full product lifecycle — from problem framing to implementation.",
    detail: [
      "Operate across strategy and execution.",
      "Design is a continuous loop, not a phase.",
      "Stay close to implementation.",
    ],
    whyItMattered:
      "Leads to better alignment and faster iteration.",
    themes: ["product"],
    keywords: ["end to end", "ownership"],
  },

  {
    id: "engineering-collaboration",
    title: "Working with Engineering",
    summary:
      "I collaborate closely with engineers from the start — not at handoff.",
    detail: [
      "Shared ownership early in projects.",
      "Think in components and constraints.",
      "Handoff is continuous, not a moment.",
    ],
    whyItMattered:
      "Ensures design quality survives build.",
    themes: ["engineering"],
    keywords: ["engineering", "handoff"],
  },

  {
    id: "leadership",
    title: "Leadership",
    summary:
      "I lead by creating clarity — in direction, process, and standards.",
    detail: [
      "Established critique, documentation, and team standards.",
      "Mentor designers to think strategically.",
      "Push design upstream into strategy.",
    ],
    whyItMattered:
      "Better teams produce better products.",
    themes: ["leadership"],
    keywords: ["leadership", "mentor"],
  },

  {
    id: "decision-making",
    title: "Decision Making",
    summary:
      "I balance user needs, business goals, and constraints — making trade-offs explicit.",
    detail: [
      "Clarity over optionality.",
      "Move forward without perfect data.",
      "Decisions are about direction, not perfection.",
    ],
    whyItMattered:
      "Speed comes from clarity.",
    keywords: ["decision", "tradeoff"],
  },

  {
    id: "challenges",
    title: "Challenges",
    summary:
      "I’ve learned most working in complex, misaligned environments.",
    detail: [
      "Inherited fragmented systems.",
      "Focused on leverage points.",
      "Alignment over perfection.",
    ],
    whyItMattered:
      "Design impact comes from influence.",
    keywords: ["challenge", "problem"],
  },

  {
    id: "why-me",
    title: "What I Bring",
    summary:
      "Systems thinking + product craft + cross-functional leadership.",
    detail: [
      "Platform-level thinking.",
      "Strong design execution.",
      "Bridges teams and ideas.",
    ],
    whyItMattered:
      "Allows impact across the full product lifecycle.",
    keywords: ["why hire", "hire", "strength", "strengths", "value", "offer", "bring", "designer", "kind of designer"],
  },

  {
    id: "how-i-work",
    title: "How I Work",
    summary:
      "Collaborative, structured, and focused on momentum.",
    detail: [
      "Work in the open.",
      "Balance structure and speed.",
      "Prioritise momentum.",
    ],
    whyItMattered:
      "Team dynamics shape outcomes.",
    keywords: ["process", "workflow"],
  },

  {
  id: "personal",
  title: "Outside of Work",
  summary:
    "Outside of design, I’m a dad, I build side projects, and I stay active — I like learning by doing.",
  detail: [
    "I’m a husband and dad — that’s a big part of how I structure my time and priorities.",
    "I enjoy building things outside of work — from AI tools to trading bots — as a way to explore ideas hands-on.",
    "I stay active through running, cycling, and the gym.",
    "I’m a big sports fan — especially rugby (Ireland & Munster) and Arsenal.",
    "I also enjoy cooking, music, and going to gigs — electronic music is usually on when I’m designing.",
  ],
  whyItMattered:
    "It keeps me curious, grounded, and constantly learning — which feeds directly back into my work.",
  followUpPrompts: [
    "Tell me more about your side projects",
    "How does this influence your work?",
  ],
  themes: ["personal"],
  keywords: ["outside work", "hobbies", "interests", "life"],
},

  {
    id: "fallback",
    title: "Fallback",
    summary:
      "I didn’t find a precise match — try one of these.",
    detail: [
      "Ask about projects, systems, AI, or leadership.",
    ],
    followUpPrompts: [
      "Show design systems work",
      "Tell me about AI",
    ],
    keywords: [],
  },
];

export const suggestedPrompts = [
  "What have you shipped at WGSN?",
  "How do you approach AI in product design?",
  "What do you do outside of work?",
];
