export interface Note {
  id: string;
  title: string;
  preview: string;
  tags: string[];
}

export const notes: Note[] = [
  {
    id: "design-systems-as-products",
    title: "Why design systems should feel more like products",
    preview:
      "Most design systems fail not because of bad components, but because they're treated as deliverables rather than products. They need adoption strategies, feedback loops, versioning, and a clear value proposition for the teams that use them. The teams that get this right build systems that earn trust incrementally rather than demanding it upfront.",
    tags: ["Design Systems", "Product Thinking"],
  },
  {
    id: "ai-discovery-structure",
    title: "AI discovery needs structure before it needs magic",
    preview:
      "There's a temptation to treat AI-powered discovery as a black box that handles everything. In practice, the products that work best pair model capability with deliberate information architecture — clear taxonomies, well-scoped retrieval, and output formats that match user intent. The magic is downstream of the structure.",
    tags: ["AI", "Discovery", "IA"],
  },
  {
    id: "exploration-navigation",
    title: "Designing for exploration, not just navigation",
    preview:
      "Navigation gets users to where they already know they're going. Exploration helps them find what they didn't know they were looking for. These are fundamentally different design problems, and most products conflate them. Discovery-led products — content platforms, research tools, data products — need to design explicitly for serendipity, adjacency, and progressive depth.",
    tags: ["Navigation", "Discovery", "UX Patterns"],
  },
  {
    id: "systems-thinking-product-teams",
    title: "What product teams can learn from systems thinking",
    preview:
      "Systems thinking — understanding feedback loops, emergent behaviour, and leverage points — is underused in product design. Most teams optimise locally: fix this screen, improve this flow. Systems thinkers ask: what does this decision affect downstream? Where does complexity accumulate? What are the second-order effects? This perspective changes both what you design and how you prioritise.",
    tags: ["Systems Thinking", "Product Strategy", "Leadership"],
  },
];
