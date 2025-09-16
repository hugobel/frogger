import { Suspense } from "react";
import { AIInsights } from "@/features/ai";
import { AIInsightsSkeleton } from "./ai-insights-skeleton";

interface AsyncAIInsightsProps {
  loanId: string;
  riskScore?: number | null;
  aiRecommendation?: string | null;
  aiNotes?: string | null;
  loanStatus?: string;
}

export function AsyncAIInsights(props: AsyncAIInsightsProps) {
  return (
    <Suspense fallback={<AIInsightsSkeleton />}>
      <AIInsights {...props} />
    </Suspense>
  );
}
