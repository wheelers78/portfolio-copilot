export interface Principle {
  id: string;
  title: string;
  body: string;
}

export const principles: Principle[] = [
  {
    id: "systems-as-infrastructure",
    title: "Design systems are product infrastructure",
    body:
      "A design system isn't a style guide or a Figma kit. It's a product decision with upstream consequences. Built well, it compresses design and engineering cost, creates consistent user experiences, and gives teams shared language. Built poorly — or built as an afterthought — it becomes a liability. I treat systems work with the same rigour as any product surface.",
  },
  {
    id: "ai-clarity",
    title: "AI should improve clarity, not add novelty",
    body:
      "The temptation with AI features is to show capability — to make the product feel intelligent by making it do more. The harder, more valuable thing is to use AI to remove friction: surface the right signal, reduce cognitive load, get users to insight faster. The best AI UX is often invisible. It should feel less like a feature and more like the product got sharper.",
  },
  {
    id: "discovery-structure",
    title: "Discovery depends on structure",
    body:
      "Good discovery experiences — whether in search, content, or AI — are built on carefully considered information architecture. The visual layer is downstream of structure. Before asking how something should look, I ask: what is the user trying to find, what shape does that information take, and how does the system help them move through it? Structure first, polish second.",
  },
  {
    id: "designers-think-systems",
    title: "Designers should think in systems",
    body:
      "The most valuable thing a designer can bring to a cross-functional team is systems thinking — the ability to see how parts connect, how decisions compound, and where leverage points are. This applies equally to interface design, team dynamics, and product strategy. A designer who thinks in systems is harder to replace than one who executes well in isolation.",
  },
];
