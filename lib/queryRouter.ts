import { copilotAnswers, CopilotAnswer } from "@/data/copilot";
import { getBestAnswers, scoreAnswer, normalizeQuestion } from "@/lib/copilotMatcher";

export type QueryIntent = "overview" | "outcome" | "challenge" | "approach" | "role" | "visuals";

export interface RouteResult {
  answer: CopilotAnswer;
  secondary?: CopilotAnswer;
  confidence: "high" | "medium" | "low";
  intent: QueryIntent;
}

/**
 * Detects the user's intent within the matched topic.
 * Used to select the appropriate section of the answer to surface.
 * Order matters: more specific patterns are checked first.
 */
function detectIntent(normalized: string): QueryIntent {
  if (/\b(visual[s]?|show me|image[s]?|screenshot[s]?|what.?s it look|what does it look)\b/.test(normalized)) return "visuals";
  if (/\b(impact|outcome[s]?|result[s]?|what changed|what improved|what did it achieve|what difference|did it make|difference did)\b/.test(normalized)) return "outcome";
  if (/\b(challenge[s]?|problem[s]?|difficulty|toughest|obstacle[s]?|hard part|what was hard|what were the challenges?)\b/.test(normalized)) return "challenge";
  if (/\b(your role|what was your role|what did you do|your responsibility|responsibilities|what were you responsible)\b/.test(normalized)) return "role";
  if (/\b(approach|how did you approach|what was your approach|how you approached|process|how did you tackle)\b/.test(normalized)) return "approach";
  return "overview";
}

export function routeQuery(rawQuery: string, contextAnswerId?: string): RouteResult {
  const query = rawQuery.trim();

  if (!query) {
    return {
      answer: copilotAnswers.find((a) => a.id === "fallback")!,
      confidence: "low",
      intent: "overview",
    };
  }

  const best = getBestAnswers(query, copilotAnswers, contextAnswerId);

  if (best[0].id === "fallback") {
    return { answer: best[0], confidence: "low", intent: "overview" };
  }

  // Use normalized query for confidence so synonym expansion is reflected
  const normalized = normalizeQuestion(query);
  const topScore = scoreAnswer(normalized, best[0]);
  const confidence: RouteResult["confidence"] =
    topScore >= 10 ? "high" : topScore >= 5 ? "medium" : "low";

  return {
    answer: best[0],
    secondary: best[1],
    confidence,
    intent: detectIntent(normalized),
  };
}
