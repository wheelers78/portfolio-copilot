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

  // Greeting
  [/^(hi|hey|yo|howdy|greetings|sup|hello there|hey there)$/g, "hello"],

  // About / self-intro
  [/\b(who are you|tell me about you|about yourself|your background|your story|walk me through)\b/g, "about you"],

  // Strengths
  [/\b(what are you good at|your skills|top skills|best at|strongest|expertise|superpower|specialise|specialize)\b/g, "strengths"],

  // Motivation
  [/\b(what drives you|what motivates you|what makes you tick|what inspires you|what excites you|why design)\b/g, "what motivates you"],

  // Personal
  [/\b(hobbies|outside work|personal life|interests|life outside)\b/g, "personal"],

  // Process / how I work
  [/\b(process|approach|methodology|workflow|how do you approach)\b/g, "process"],

  // Challenges
  [/\b(difficult|hard|obstacle|struggled|problem you faced|toughest)\b/g, "challenge"],

  // Engineering collaboration
  [/\b(engineers?|developers?|dev team|front.?end|back.?end|implementation team)\b/g, "engineering"],
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
  "tell", "show", "give", "any", "more",
]);

export function scoreAnswer(question: string, answer: CopilotAnswer): number {
  const q = question.toLowerCase().trim();
  // Strip trailing punctuation from individual words so "day?" matches "day"
  const qWords = q.replace(/[?!.,;:]+/g, "").split(/\s+/);
  let score = 0;

  // Keywords: +5 full phrase match, +3 if 2+ *content* words overlap
  for (const keyword of answer.keywords ?? []) {
    const k = keyword.toLowerCase();
    // Use word-boundary matching to prevent "hi" matching inside "shipped"
    const keywordRe = new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
    if (keywordRe.test(q)) {
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
    const t = theme.toLowerCase();
    const themeRe = new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
    if (themeRe.test(q)) {
      score += 3;
    }
  }

  // +4 if question contains the answer title
  if (q.includes(answer.title.toLowerCase())) {
    score += 4;
  }

  return score;
}

// ── Follow-up intent detection ────────────────────────────────────────────────
//
// These words signal that the user is asking *about the current topic* rather
// than changing subject. When they appear in a contextual follow-up, we raise
// the override threshold so a generic answer (e.g. "Challenges", "How I Work")
// with a base score of 5 can't steal focus from the previous topic.
//
// Examples that should stay in context:
//   "What was the challenge?"  → matches generic `challenges` at score 5
//   "What was your approach?"  → matches generic `how-i-work` at score 5
//
// Examples that should correctly break context (NOT in this list):
//   "What about Harbor?"       → has a direct keyword match for a specific answer
//   "How do you work with engineers?" → synonym expansion gives a strong signal

const FOLLOW_UP_INTENT_RE =
  /\b(challenge[s]?|your role|the role|impact|outcome[s]?|result[s]?|visual[s]?|example[s]?|approach|improve[d]?|what did you|what was|tell me more)\b/;

// ── Answer selection ──────────────────────────────────────────────────────────

/**
 * Returns the best 1–2 matching answers for the given question.
 *
 * contextAnswerId: the ID of the answer shown in the previous turn.
 * When the query has no strong intrinsic signal, the previous answer gets a
 * context boost so follow-ups stay on topic.
 *
 * The boost threshold is raised to 10 when the query contains follow-up intent
 * words (challenge, role, impact, visuals, example, approach…). This prevents
 * a generic answer with a base score of 5 from incorrectly overriding context
 * for questions like "What was the challenge?" or "What was your approach?".
 * Only a strong direct match (score ≥ 10) can break context in those cases.
 */
export function getBestAnswers(
  question: string,
  answers: CopilotAnswer[],
  contextAnswerId?: string
): CopilotAnswer[] {
  const normalized = normalizeQuestion(question);
  const candidates = answers.filter((a) => a.id !== "fallback");

  // ── Pass 1: check global topics first ────────────────────────────────────
  // Global topics (greeting, about, strengths, etc.) take priority over
  // project/topic answers — but only when no non-global answer scores higher.
  const globals = candidates.filter((a) => a.global);
  const nonGlobals = candidates.filter((a) => !a.global);
  if (globals.length > 0) {
    const globalScored = globals.map((answer) => ({
      answer,
      score: scoreAnswer(normalized, answer),
    }));
    globalScored.sort((a, b) => b.score - a.score);
    const bestGlobalScore = globalScored[0].score;

    if (bestGlobalScore >= 5) {
      // Check if any non-global answer scores higher
      const bestNonGlobalScore = nonGlobals.reduce(
        (max, a) => Math.max(max, scoreAnswer(normalized, a)),
        0
      );
      if (bestGlobalScore >= bestNonGlobalScore) {
        console.log(
          `[matcher] "${question}" → normalized: "${normalized}" | GLOBAL match`,
          globalScored.slice(0, 3).map((s) => ({ id: s.answer.id, score: s.score }))
        );
        return globalScored.slice(0, 2).map((s) => s.answer);
      }
    }
  }

  // ── Pass 2: score all topics ─────────────────────────────────────────────
  const scored = candidates.map((answer) => ({
    answer,
    score: scoreAnswer(normalized, answer),
  }));

  const maxBaseScore = scored.reduce((max, s) => Math.max(max, s.score), 0);

  // Raise the threshold when the query looks like a contextual follow-up intent
  // so generic answers don't steal focus from the current topic.
  const isFollowUpIntent = !!contextAnswerId && FOLLOW_UP_INTENT_RE.test(normalized);
  const boostThreshold = isFollowUpIntent ? 10 : 5;

  if (contextAnswerId && maxBaseScore < boostThreshold) {
    for (const item of scored) {
      if (item.answer.id === contextAnswerId) {
        item.score += 6;
        break;
      }
    }
  }

  scored.sort((a, b) => b.score - a.score);

  console.log(
    `[matcher] "${question}" → normalized: "${normalized}" | context: ${contextAnswerId ?? "none"}`,
    scored.slice(0, 5).map((s) => ({ id: s.answer.id, score: s.score }))
  );

  if (scored[0].score === 0) {
    return [FALLBACK];
  }

  return scored.slice(0, 2).map((s) => s.answer);
}
