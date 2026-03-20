import { copilotAnswers, CopilotAnswer } from "@/data/copilot";
import { getBestAnswers, scoreAnswer } from "@/lib/copilotMatcher";

export interface RouteResult {
  answer: CopilotAnswer;
  secondary?: CopilotAnswer;
  confidence: "high" | "medium" | "low";
}

export function routeQuery(rawQuery: string): RouteResult {
  const query = rawQuery.trim();

  if (!query) {
    return {
      answer: copilotAnswers.find((a) => a.id === "fallback")!,
      confidence: "low",
    };
  }

  const best = getBestAnswers(query, copilotAnswers);

  if (best[0].id === "fallback") {
    return { answer: best[0], confidence: "low" };
  }

  const topScore = scoreAnswer(query, best[0]);
  const confidence: RouteResult["confidence"] =
    topScore >= 10 ? "high" : topScore >= 5 ? "medium" : "low";

  return {
    answer: best[0],
    secondary: best[1],
    confidence,
  };
}
