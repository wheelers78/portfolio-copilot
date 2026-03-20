import { CopilotAnswer, copilotAnswers } from "@/data/copilot";

const FALLBACK = copilotAnswers.find((a) => a.id === "fallback")!;

// ── Synonym map ───────────────────────────────────────────────────────────────
// Each entry maps one or more user phrasings to a canonical term that exists
// in the keyword/theme data. The canonical term is APPENDED to the question
// (not replaced) so no original signal is lost.

const SYNONYM_MAP: [RegExp, string][] = [
  // Work / output
  [/\b(built|created|made|worked on|shipped|launched|delivered)\b/g, "shipped"],

  // WGSN-specific
  [/\b(wgsn|trend forecasting|fashion intelligence)\b/g, "wgsn"],

  // Working style / collaboration
  [/\b(collaborate|collaborating|collaboration|work together|team dynamic)\b/g, "working style"],
  [/\b(day to day|day-to-day|daily routine|how you operate)\b/g, "how you work"],

  // Design systems
  [/\b(component library|style guide|token architecture|tokens|components|figma library)\b/g, "design system"],

  // AI / LLM
  [/\b(artificial intelligence|machine learning|llm|gpt|chatgpt|large language model|generative)\b/g, "ai"],

  // Leadership / management
  [/\b(manage|managing|manager|team lead|leading a team|growing a team|mentoring)\b/g, "leadership"],

  // Platform / architecture
  [/\b(infrastructure|foundations|scalable|architecture)\b/g, "platform"],

  // Hiring / value
  [/\b(hire|hiring|recruit|recruiting|stand out|differentiate)\b/g, "why hire"],

  // Brand / visual
  [/\b(brand work|campaign|art direct|photography|shoot|visual direction)\b/g, "art direction"],

  // Personal
  [/\b(hobbies|outside work|personal life|interests|life outside)\b/g, "personal"],

  // Process / how I work
  [/\b(process|approach|methodology|workflow|how do you approach)\b/g, "process"],

  // Challenges
  [/\b(difficult|hard|obstacle|struggled|problem you faced|toughest)\b/g, "challenge"],
];

/**
 * Normalizes a user question by appending canonical synonym terms.
 * Original question text is preserved so no scoring signal is lost.
 */
export function normalizeQuestion(question: string): string {
  const q = question.toLowerCase().trim();
  const expansions: string[] = [];

  for (const [pattern, canonical] of SYNONYM_MAP) {
    if (pattern.test(q) && !q.includes(canonical)) {
      expansions.push(canonical);
    }
    // Reset lastIndex for global regexes
    pattern.lastIndex = 0;
  }

  return expansions.length > 0 ? `${q} ${expansions.join(" ")}` : q;
}

// ── Scoring ───────────────────────────────────────────────────────────────────

/**
 * Common question/function words that carry no topical meaning.
 * Filtering these out of the 2-word overlap check prevents phrases like
 * "how do you work" from scoring against "how do you structure your day?"
 * just because they share the words "how", "do", "you".
 */
const STOP_WORDS = new Set([
  "how", "what", "when", "where", "who", "why", "which",
  "do", "does", "did", "is", "are", "was", "were", "be", "been",
  "a", "an", "the", "i", "you", "me", "my", "your", "we", "our",
  "in", "on", "at", "to", "for", "of", "and", "or", "but", "with",
  "can", "could", "would", "should", "have", "has", "had", "will",
  "it", "this", "that", "there", "then", "so", "about", "like",
]);

export function scoreAnswer(question: string, answer: CopilotAnswer): number {
  const q = question.toLowerCase().trim();
  // Strip trailing punctuation from individual words so "day?" matches "day"
  const qWords = q.replace(/[?!.,;:]+/g, "").split(/\s+/);
  let score = 0;

  // Keywords: +5 full phrase match, +3 if 2+ *content* words overlap
  for (const keyword of answer.keywords ?? []) {
    const k = keyword.toLowerCase();
    if (q.includes(k)) {
      score += 5;
      continue;
    }
    // Only count content words (non-stop-words) in the overlap check so that
    // generic question words like "how / do / you" don't create false matches
    const contentWords = k.split(/\s+/).filter((w) => !STOP_WORDS.has(w));
    if (contentWords.length < 2) continue; // need at least 2 content words to compare
    const matched = contentWords.filter((w) => qWords.includes(w));
    if (matched.length >= 2) {
      score += 3;
    }
  }

  // +3 per theme match
  for (const theme of answer.themes ?? []) {
    if (q.includes(theme.toLowerCase())) {
      score += 3;
    }
  }

  // +4 if question contains the answer title
  if (q.includes(answer.title.toLowerCase())) {
    score += 4;
  }

  return score;
}

// ── Answer selection ──────────────────────────────────────────────────────────

export function getBestAnswers(
  question: string,
  answers: CopilotAnswer[]
): CopilotAnswer[] {
  const normalized = normalizeQuestion(question);
  const candidates = answers.filter((a) => a.id !== "fallback");

  const scored = candidates
    .map((answer) => ({ answer, score: scoreAnswer(normalized, answer) }))
    .sort((a, b) => b.score - a.score);

  console.log(
    `[matcher] "${question}" → "${normalized}"`,
    scored.slice(0, 5).map((s) => ({ id: s.answer.id, score: s.score }))
  );

  if (scored[0].score === 0) {
    return [FALLBACK];
  }

  return scored.slice(0, 2).map((s) => s.answer);
}
