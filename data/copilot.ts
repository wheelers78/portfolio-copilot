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
  /** Slug of the primary case study in data/projects.ts this answer is about. */
  projectSlug?: string;
  followUpPrompts?: string[];
  /**
   * When true, this answer is a "global" topic (greeting, about, strengths…)
   * that is checked before project/topic-based answers.
   */
  global?: boolean;
  /**
   * Broad single-word topic tags. Scored +3 when the tag appears verbatim in
   * the query. Best for wide-net matching (e.g. "ai", "wgsn", "platform").
   */
  themes?: string[];
  /**
   * Specific phrases and names. Scored +5 for a full phrase match, +3 if 2+
   * content words overlap. Use for project names, concepts, and compound terms.
   * Single-word entries only score on exact substring matches.
   */
  keywords?: string[];
  images?: CopilotImage[];
  /**
   * Intent-specific content for in-topic follow-up questions.
   * When the user asks "What was the challenge?" or "What was the outcome?" and
   * context keeps them on this answer, these fields replace the generic
   * summary+detail with focused, intent-matched content.
   */
  sections?: {
    challenge?: string;
    approach?: string;
    outcome?: string;
    role?: string;
  };
}

export const copilotAnswers: CopilotAnswer[] = [

  // ── Global topics ────────────────────────────────────────────────────────────
  // Checked before project/topic answers so generic questions resolve correctly.

  {
    id: "greeting",
    title: "Greeting",
    summary:
      "Hey — I'm Paul. Product Design Lead, based in Winchester, UK. I care a lot about UI craft, systems thinking, and making sure what ships is actually good. Ask me anything.",
    detail: [
      "You can dig into specific projects — Pulse AI, Harbor, Catwalks — or ask about how I work, what I value, and what I bring to a team.",
      "I'd start with 'Tell me about yourself' or 'What have you shipped at WGSN?' — but go wherever you're curious.",
    ],
    followUpPrompts: [
      "Tell me about yourself",
      "What have you shipped at WGSN?",
      "Why should I hire you?",
    ],
    global: true,
    keywords: [
      "hello",
      "hi",
      "hey",
      "yo",
      "howdy",
      "greetings",
      "good morning",
      "good afternoon",
      "good evening",
      "introduce yourself",
      "who is this",
      "what is this",
      "what can i ask",
    ],
  },

  {
    id: "about",
    title: "About Me",
    summary:
      "Product Design Lead with 15+ years across brand, product, and systems. I'm a player-coach — I set direction, but I stay hands-on. UI craft is one of my strengths.",
    detail: [
      "Currently working at WGSN as Product Design Lead — Platforms & AI Initiatives, leading design across four engineering squads. Recent work includes Trends Pulse AI, Events + Culture (25% engagement increase), and Aeon — WGSN's design system aligned across Figma, React/MUI, and Storybook.",
      "Before that, I co-led a team of 7 designers at Sedna and recruited and built a global team of 6 at MiQ. Earlier, I spent 2 years at Ness Digital Engineering building pattern libraries for enterprise clients, and nearly 9 years at Pentland Brands — where I started as a front-end developer before moving into art direction across Speedo, Lacoste, Canterbury, Berghaus, and Kickers.",
      "That journey from code to campaign to product is unusual, and it shapes how I work. I'm obsessive about visual detail, I understand how things get built, and I sit naturally between design, product, and engineering.",
    ],
    whyItMattered:
      "I move between strategy and craft quickly — leading workshops one day, fine-tuning component specs the next. That range, across 15+ years, is what makes me effective.",
    followUpPrompts: [
      "What are you good at?",
      "Tell me about your work at WGSN",
      "What do you do outside of work?",
    ],
    global: true,
    keywords: [
      "about you",
      "about yourself",
      "tell me about you",
      "tell me about yourself",
      "who are you",
      "background",
      "your background",
      "your story",
      "overview",
      "introduce",
      "introduction",
      "summary",
      "walk me through",
      "give me an overview",
      "kind of designer",
      "type of designer",
      "what kind of designer",
      "what type of designer",
      "describe yourself",
      "who is paul",
      "what do you do",
      "your experience",
      "your career",
      "tell me about your experience",
    ],
  },

  {
    id: "why-me",
    title: "Why Hire Me",
    summary:
      "I bring structure, craft, and follow-through. I don't just design things — I make sure they ship properly, and I raise the bar for the team around me.",
    detail: [
      "Every team I've joined had fragmented products and a gap between design intent and shipped output. I close that gap — through systems, shared standards, and staying close to the build. At Sedna I was recruited specifically to bring DesignOps and design thinking into a growing team. At MiQ I built the design function from scratch — hired 6 designers and introduced a culture of user-centred design across international teams.",
      "UI is one of my strengths — not just designing it, but making sure it ships at quality. I run critiques, lead design QA, and hold the standard. At WGSN I lead across four squads, partnering with product and engineering leadership to translate strategic initiatives into scalable platform capabilities. Events + Culture alone drove a 25% increase in engagement.",
      "I started my career writing front-end code, which still shapes how I think. Today I use Figma, Cursor, and Claude to experiment with AI-native workflows — prototyping faster, exploring interaction models, and reducing the gap between design and build.",
    ],
    whyItMattered:
      "You're getting a player-coach who's built and mentored teams of 6–7, shipped across five companies, and who cares about every pixel that goes out the door.",
    followUpPrompts: [
      "What are you good at?",
      "Tell me about your work at WGSN",
      "Tell me about Harbor at Sedna",
    ],
    global: true,
    keywords: [
      "why hire",
      "why should i hire",
      "why should we hire",
      "hire you",
      "why you",
      "what do you bring",
      "what value",
      "what makes you different",
      "usp",
      "unique",
      "stand out",
      "differentiate",
      "convince me",
      "sell yourself",
      "why are you the right",
      "what sets you apart",
    ],
  },

  {
    id: "strengths",
    title: "Strengths",
    summary:
      "UI craft, design systems, and the ability to hold quality across the full journey — from first concept through to what users actually see in production.",
    detail: [
      "Strong UI craft. I care deeply about the details — spacing, type hierarchy, motion, interaction feedback. I'm not just designing layouts, I'm designing the feel of the product. That comes from starting as a front-end developer, then spending nearly 9 years in art direction — it trained both my eye and my understanding of how things actually get built.",
      "Design systems at scale. Built Harbor at Sedna, defined Aeon at WGSN (Figma, React/MUI, Storybook), and created Fiber at MiQ. I think at the architectural level but execute at the component level — all three systems are still in production.",
      "Quality ownership. I lead design QA and critique across the team — reviewing builds, flagging regressions, and holding the standard. I use Figma, Cursor, and Claude to prototype faster and get designs closer to real, buildable outputs — tightening the loop with engineering.",
    ],
    whyItMattered:
      "I'm most valuable when the team needs someone who can set the bar and hold it — across systems, craft, and shipped product.",
    followUpPrompts: [
      "Tell me about Harbor at Sedna",
      "How do you work with engineering?",
      "Tell me about Pulse AI",
    ],
    global: true,
    keywords: [
      "strengths",
      "good at",
      "what are you good at",
      "best at",
      "strongest",
      "skills",
      "what skills",
      "your skills",
      "expertise",
      "specialise",
      "specialize",
      "capable",
      "what can you do",
      "superpower",
      "top skills",
    ],
  },

  {
    id: "motivation",
    title: "What Drives Me",
    summary:
      "The craft. Making something that's genuinely good — not just functional, but considered. I want every detail to feel intentional, and I want it to ship that way.",
    detail: [
      "I get energy from the gap between 'good enough' and 'actually good'. Most products settle too early. I like being the person who pushes for that last 10% — spacing, motion, hierarchy, interaction feedback. It all adds up, and users feel it even if they can't name it.",
      "I care about what actually ships. I partner with engineering leadership to make sure design intent survives the build — reviewing production, flagging regressions, iterating until the output matches. I experiment with AI-native workflows (Cursor, Claude, Figma Make) to move faster without losing fidelity.",
      "I'm drawn to environments where craft matters and design has real influence. The best work I've done — at WGSN, Sedna, MiQ — has been in teams with high standards, where I'm shaping direction alongside product and engineering, not decorating someone else's decisions.",
    ],
    whyItMattered:
      "That mindset means I push for clarity, hold quality through delivery, and stick with problems longer than most — because I genuinely care about the end result.",
    followUpPrompts: [
      "What do you do outside of work?",
      "How do you like to work?",
      "What kind of teams do you work best in?",
    ],
    global: true,
    keywords: [
      "what drives you",
      "what motivates you",
      "motivation",
      "what makes you tick",
      "why design",
      "why do you do this",
      "what inspires you",
      "passion",
      "passionate",
      "what excites you",
      "what gets you up",
      "care about",
      "what do you care about",
    ],
  },

  {
  id: "feedback",
  title: "Feedback and Communication",
  summary:
    "I value direct, open feedback and clear communication — it's how teams improve quickly.",
  detail: [
    "I prefer feedback in person or in 1:1s, where there's space for real discussion.",
    "I find frameworks like 'Start, Stop, Continue' really useful for clarity.",
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
    "I work best in environments that balance deep focus with collaboration — where there's space to think, but also strong team alignment.",
  detail: [
    "I'm most productive in the morning — that's when I focus on deep thinking and problem solving.",
    "I like having time to process information before responding, especially on complex problems.",
    "I value a mix of focused solo work and collaborative sessions — both are essential to good design.",
    "I'm comfortable working remotely and value the flexibility it gives, but I also enjoy creative, in-person environments with the team.",
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
    "tools",
    "what tools",
    "tooling",
    "stack",
    "figma",
    "cursor",
  ],
},

  {
    id: "art-direction",
    title: "Art Direction Experience",
    summary:
      "I've art directed campaign shoots — shaping visual direction from concept through to execution.",
    detail: [
      "At Penland Brands, I led art direction on shoots for Canterbury and Speedo.",
      "This included defining visual tone, working with photographers, and ensuring consistency across campaign outputs.",
      "For the Rugby World Cup, I art directed shoots for England and Ireland teams — balancing performance, brand, and storytelling.",
    ],
    whyItMattered:
      "It developed my eye for visual quality and narrative — which directly influences how I design interfaces and systems today.",
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
      "I've led design systems across multiple companies — from building Harbor at Sedna to scaling Aeon across WGSN's complex multi-product environment.",
    detail: [
      "At Sedna, I built Harbor from the ground up — a shared design system that unified design and engineering across teams. We reduced duplicate component builds by 60% and improved delivery speed significantly.",
      "At WGSN, I led the Aeon design system — auditing five product surfaces, defining a multi-tier token architecture, and building the component library alongside engineering.",
      "The real challenge in both cases wasn't components — it was governance, contribution models, and aligning teams that had been working independently.",
    ],
    whyItMattered:
      "A shared design language reduced friction, improved consistency, and compounded efficiency across design and engineering.",
    projectSlug: "sedna_harbor",
    followUpPrompts: [
      "Tell me more about Harbor at Sedna",
      "How did you approach token architecture?",
      "What was the impact of Harbor?",
    ],
    themes: ["design-systems", "systems"],
    keywords: [
      "design system",
      "component",
      "token",
      "figma",
      "library",
      "harbor",
      "sedna harbor",
      "aeon",
      "design language",
      "component library",
    ],
    images: [
      { src: "/images/Sedna_Harbor_1.png", alt: "Harbor component library" },
      { src: "/images/Sedna_Harbor_2.png", alt: "Harbor design tokens" },
      { src: "/images/Sedna_Harbor_3.png", alt: "Harbor pattern documentation" },
      { src: "/images/Sedna_Harbor_4.png", alt: "Harbor component documentation" },
    ],
    sections: {
      challenge: "Design and development were fragmented — inconsistent components, duplicated effort, and no shared language between design and engineering. This slowed delivery and made it harder to maintain quality and alignment at scale. At WGSN, five separate product surfaces had drifted independently without a coherent foundation.",
      approach: "At Sedna I built Harbor from the ground up — defining the system's structure, visual language, component model, design tokens, and contribution framework. At WGSN I led Aeon — auditing five product surfaces, defining a multi-tier token architecture, and building the shared component library in close collaboration with engineering. In both cases, governance and contribution models were as important as the components themselves.",
      outcome: "Reduced duplicate component builds by 60% at Sedna and improved front-end delivery speed significantly. At WGSN, Aeon created a consistent design language across products and aligned teams that had been building independently for years.",
      role: "Design Lead — Design Systems. At Sedna I owned Harbor end-to-end: strategy, visual language, component architecture, and engineering alignment. At WGSN I led Aeon — driving audits, token architecture, component library build, and cross-team adoption.",
    },
  },

  {
    id: "wgsn",
    title: "Work at WGSN",
    summary:
      "Product Design Lead at WGSN — working across design systems, AI products, and large-scale content discovery platforms.",
    detail: [
      "WGSN is a complex B2B platform combining editorial, data, and AI layers. I worked across Pulse AI (generative search), Catwalks (runway intelligence), Shorts (personalised content), Events + Culture, and Trends discovery.",
      "I often act as the bridge between product, engineering, and content — shaping direction from early discovery through to shipped product.",
    ],
    whyItMattered:
      "It's a rare environment where systems thinking, product craft, and cross-functional leadership all matter — and where the work directly affects how global brands make decisions.",
    followUpPrompts: [
      "Tell me about Pulse AI",
      "Tell me about WGSN Catwalks",
      "Tell me about WGSN Shorts",
    ],
    themes: ["wgsn", "b2b"],
    keywords: [
      "wgsn",
      "trend",
      "platform",
      "enterprise",
      "catwalks",
      "catwalk",
      "runway",
      "shorts",
      "events",
      "events culture",
      "events + culture",
      "trends",
      "fashion intelligence",
      "trend forecasting",
      "what have you shipped",
      "shipped",
      "recent work",
      "portfolio",
    ],
    images: [
      { src: "/images/WGSN_Pulse_1.png", alt: "Pulse AI — generative search interface" },
      { src: "/images/WGSN_Catwalks_1.png", alt: "Catwalks — runway intelligence platform" },
      { src: "/images/WGSN_Events_1.png", alt: "Events + Culture — content platform" },
    ],
    sections: {
      challenge: "WGSN is a complex B2B platform combining editorial, data, and AI across multiple product surfaces — each with its own content model and audience. The core challenge was bringing coherence to a platform that had evolved organically, while shipping individual products under constant delivery pressure.",
      approach: "I work across the full product lifecycle at WGSN — from discovery and strategy through to UX/UI, prototyping, and production. I act as the bridge between product, engineering, and content, shaping direction early and staying close to implementation.",
      outcome: "Shipped Pulse AI (generative search), Catwalks (runway intelligence), Shorts (personalised content), Events + Culture, and contributed to the Aeon design system. Each product improved how global brands access and act on trend intelligence.",
      role: "Product Design Lead. I owned design across multiple products simultaneously — driving strategy, UX/UI, and cross-functional alignment across Pulse AI, Catwalks, Shorts, Events + Culture, and the Aeon design system.",
    },
  },

  {
    id: "ai-product",
    title: "Pulse AI — AI in Product Design",
    summary:
      "I designed Pulse AI at WGSN — a generative AI search experience that transforms how users interact with content. I focus on reducing cognitive load and improving clarity, not just generating output.",
    detail: [
      "On Pulse AI, I shifted the interaction model from browsing to asking — using natural language to surface precise, actionable insights from WGSN's content library.",
      "The challenge was making AI responses feel trustworthy and usable: structuring outputs clearly, designing for query intent, and ensuring the experience worked for real users under real time pressure.",
    ],
    whyItMattered:
      "AI UX is fundamentally an information design problem. Pulse laid the foundation for a new interaction paradigm across WGSN's platform.",
    projectSlug: "pulse_ai",
    followUpPrompts: [
      "What was the challenge with Pulse AI?",
      "What impact did Pulse have?",
      "How do you design trust in AI?",
    ],
    themes: ["ai", "wgsn"],
    keywords: [
      "ai",
      "llm",
      "gpt",
      "copilot",
      "pulse",
      "pulse ai",
      "wgsn pulse",
      "natural language",
      "generative",
      "generative ai",
      "search",
      "ai search",
      "artificial intelligence",
    ],
    images: [
      { src: "/images/WGSN_Pulse_1.png", alt: "Pulse AI insight panels" },
      { src: "/images/WGSN_Pulse_2.png", alt: "Pulse AI query surface" },
      { src: "/images/WGSN_Pulse_3.png", alt: "Pulse AI output structure" },
    ],
    sections: {
      challenge: "WGSN's content was rich but difficult to navigate — users struggled to find relevant insights quickly, limiting the platform's full value. The core challenge was designing AI responses that felt trustworthy, structured, and usable under real time pressure — not just technically functional.",
      approach: "I shifted the interaction model from browsing to asking — using natural language to surface precise, actionable insights from WGSN's content library. The focus was on simplicity, speed, and clarity: transforming a complex repository of forecasts, data, and imagery into a conversational, insight-led experience that worked for real users.",
      outcome: "Reduced friction in content discovery, enabling users to access precise, actionable insights in seconds. Established a new interaction paradigm for the platform — laying the foundation for future AI-driven experiences at WGSN.",
      role: "Design Lead — AI Product. I drove the full process: discovery and strategy, UX/UI design, prototyping, and delivery to production.",
    },
  },

  {
    id: "sedna",
    title: "Sedna — Communication Platform",
    summary:
      "I led a full UI overhaul of Sedna's communication platform — designed for high-stakes, real-time maritime and logistics operations.",
    detail: [
      "Teams were managing thousands of messages a day through fragmented, email-like workflows — making it difficult to prioritise and take action. The UI lacked clarity, increasing cognitive load in already high-pressure environments.",
      "I redesigned message flows, simplified layouts, and introduced Harbor — Sedna's shared design system — working closely with engineering to ensure components were practical and production-ready.",
    ],
    whyItMattered:
      "Improved scanability and reduced cognitive load across high-volume message streams. Enabled faster triage and clearer ownership. Harbor reduced duplicate component builds by 60% and accelerated front-end delivery.",
    projectSlug: "sedna",
    followUpPrompts: [
      "Tell me about Harbor, Sedna's design system",
      "What was the challenge with Sedna?",
      "What was your role at Sedna?",
    ],
    themes: ["platform", "systems"],
    keywords: [
      "sedna",
      "communication platform",
      "maritime",
      "logistics",
      "messaging",
      "sedna platform",
    ],
    images: [
      { src: "/images/Experience_Sedna.png", alt: "Sedna platform overview" },
      { src: "/images/Sedna_1.png", alt: "Sedna communication platform" },
      { src: "/images/Sedna_UI.png", alt: "Sedna UI redesign" },
    ],
    sections: {
      challenge: "Teams were managing thousands of messages a day through fragmented, email-like workflows — making it difficult to prioritise, assign ownership, and take action. The UI lacked clarity and structure, increasing cognitive load in already high-pressure maritime and logistics environments.",
      approach: "Led a full UI overhaul focused on clarity, hierarchy, and speed. Redesigned message flows, simplified layouts, and introduced Harbor — Sedna's shared design system — working closely with engineering to ensure components were practical, reusable, and production-ready.",
      outcome: "Improved scanability and reduced cognitive load across high-volume message streams. Enabled faster triage and clearer ownership of tasks. Harbor reduced duplicate component builds by 60% and accelerated front-end delivery, creating a stronger foundation for future product development.",
      role: "Design Lead — Product Redesign. I drove the end-to-end UI overhaul and design system, working across discovery, strategy, UX/UI design, prototyping, and implementation.",
    },
  },

  {
    id: "platform",
    title: "Platform and Systems Experience",
    summary:
      "I design platforms — not just features — focusing on systems that shape entire products.",
    detail: [
      "Platform work is about defining patterns, not just flows. At WGSN I shaped navigation, content models, and discovery — across Catwalks, Shorts, and Events + Culture.",
      "At MiQ: unified a complex data platform across fragmented legacy tools under real time pressure.",
      "At Sedna: rebuilt the communication platform from the ground up alongside a shared design system.",
    ],
    whyItMattered:
      "Good foundations make everything built on top easier — and compound over time.",
    followUpPrompts: [
      "Tell me about MiQ",
      "What's platform vs feature design?",
      "Tell me about WGSN Catwalks",
    ],
    themes: ["platform"],
    keywords: ["platform", "architecture", "system", "catwalks", "runway", "catwalk"],
    images: [
      { src: "/images/WGSN_Catwalks_1.png", alt: "Catwalks runway intelligence platform" },
      { src: "/images/WGSN_Catwalks_2.png", alt: "Catwalks information architecture" },
      { src: "/images/Experience_Sedna.png", alt: "Sedna communication platform" },
    ],
    sections: {
      challenge: "Each company had fragmented, siloed product surfaces with no shared patterns or foundations. At WGSN this meant five separate products built independently; at Sedna the communication platform lacked structure; at MiQ, multiple legacy adtech tools had no coherent design language.",
      approach: "I focus on defining the foundations first — navigation models, component patterns, and IA — before building individual features. Platform work means designing constraints and systems that make everything built on top more coherent and faster to ship.",
      outcome: "At WGSN: consistent platform navigation and content discovery patterns across products. At Sedna: a full UI overhaul with Harbor as the shared design system. At MiQ: unified interaction patterns that became the basis for the Fiber design system.",
      role: "Design Lead — Platform. Across all three companies I owned the platform strategy: IA, navigation systems, component frameworks, and cross-product consistency.",
    },
  },

  {
    id: "miq-platform",
    title: "MiQ Platform Work",
    summary:
      "At MiQ, I helped unify fragmented adtech tools into a coherent platform experience — and laid the foundations for Fiber, their shared design system.",
    detail: [
      "Multiple legacy products with inconsistent UX and mental models — I defined shared interaction patterns and navigation structure.",
      "This became the foundation for Fiber, MiQ's design system, which scaled across global teams.",
    ],
    whyItMattered:
      "Aligned teams globally, reduced duplication, and gave product and engineering a shared language for the first time.",
    followUpPrompts: [
      "How did you unify it?",
      "What were the challenges at MiQ?",
    ],
    themes: ["miq", "platform"],
    keywords: ["miq", "adtech", "dashboard", "fiber", "miq platform"],
    images: [
      { src: "/images/Experience_MiQ.png", alt: "MiQ platform overview" },
      { src: "/images/MIQ_Fiber.png", alt: "MiQ Fiber design system" },
    ],
    sections: {
      challenge: "Multiple legacy adtech products with inconsistent UX and mental models — teams were building in silos with no shared design language or component framework. This created a fragmented experience that was hard for users to navigate and expensive to maintain.",
      approach: "Defined shared interaction patterns and navigation structure to unify the fragmented platform. Identified common components across products and created a shared foundation — which became the basis for Fiber, MiQ's design system.",
      outcome: "Aligned teams globally, reduced duplication, and gave product and engineering a shared language for the first time. Fiber scaled across global teams and became the foundation for future product development.",
      role: "Product Designer — Platform. I defined the interaction model, navigation patterns, and component framework that became the foundation for Fiber, working across product and engineering to align teams.",
    },
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
    followUpPrompts: [
      "How did you apply this at WGSN?",
    ],
    themes: ["ia"],
    keywords: ["information architecture", "navigation", "ia", "structure", "findability"],
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
    keywords: ["end to end", "ownership", "full cycle", "discovery to delivery"],
  },

  {
    id: "engineering-collaboration",
    title: "Working with Engineering",
    summary:
      "I collaborate closely with engineers from the start — not at handoff.",
    detail: [
      "Shared ownership early in projects — designers and engineers thinking together from day one.",
      "I think in components and constraints, which makes handoff easier and builds mutual trust.",
      "At Sedna I co-created Harbor with engineering — the system only worked because both sides owned it.",
    ],
    whyItMattered:
      "Ensures design quality survives build — and creates a foundation of trust that makes future collaboration faster.",
    followUpPrompts: [
      "Tell me about Harbor at Sedna",
      "How do you handle design handoff?",
    ],
    themes: ["engineering", "collaboration"],
    keywords: [
      "engineering",
      "handoff",
      "engineers",
      "developer",
      "developers",
      "front end",
      "frontend",
      "implementation",
      "work with engineers",
      "work with developers",
    ],
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
    keywords: ["leadership", "mentor", "mentoring", "lead", "leading a team", "team lead"],
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
    keywords: ["decision", "tradeoff", "trade-off", "prioritise", "prioritize"],
  },

  {
    id: "challenges",
    title: "Challenges",
    summary:
      "I've learned most working in complex, misaligned environments — where design has to earn its place.",
    detail: [
      "Inherited fragmented systems at Sedna, MiQ, and WGSN — each with different root causes.",
      "Focused on leverage points: the changes that unlock the most value with the least disruption.",
      "Alignment is usually harder than the design itself.",
    ],
    whyItMattered:
      "Design impact comes from influence as much as craft — and that takes patience, clarity, and credibility.",
    followUpPrompts: [
      "How do you handle misaligned stakeholders?",
      "Tell me about Sedna's challenge",
    ],
    keywords: ["challenge", "problem", "difficult", "obstacle", "struggled", "hard part", "toughest"],
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
    // "approach", "methodology", "workflow" are already handled by the synonym map
    // (they expand to "process") — keeping them here causes double-scoring.
    keywords: ["process", "how you approach"],
  },

  {
  id: "personal",
  title: "Outside of Work",
  summary:
    "Outside of design, I'm a dad, I build side projects, and I stay active — I like learning by doing.",
  detail: [
    "I'm a husband and dad — that's a big part of how I structure my time and priorities.",
    "I enjoy building things outside of work — from AI tools to trading bots — as a way to explore ideas hands-on.",
    "I stay active through running, cycling, and the gym.",
    "I'm a big sports fan — especially rugby (Ireland & Munster) and Arsenal.",
    "I also enjoy cooking, music, and going to gigs — electronic music is usually on when I'm designing.",
  ],
  whyItMattered:
    "It keeps me curious, grounded, and constantly learning — which feeds directly back into my work.",
  followUpPrompts: [
    "Tell me more about your side projects",
    "How does this influence your work?",
  ],
  themes: ["personal"],
  keywords: ["outside work", "hobbies", "interests", "life", "personal", "outside of work"],
},

  {
    id: "fallback",
    title: "Fallback",
    summary:
      "I didn't quite catch that — try one of these to get started.",
    detail: [
      "You can ask about specific projects, my process, how I work with teams, or anything from the portfolio.",
    ],
    followUpPrompts: [
      "Tell me about Pulse AI",
      "Tell me about Harbor",
      "How do you approach design systems?",
    ],
    keywords: [],
  },
];

export const suggestedPrompts = [
  "What have you shipped at WGSN?",
  "How do you approach AI in product design?",
  "What do you do outside of work?",
];
