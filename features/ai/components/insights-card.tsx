"use client";

import { useState } from "react";

import {
  TrendingUp,
  CheckCircle,
  RefreshCw,
  Brain,
  XCircle,
  Loader2,
} from "lucide-react";
import { updateLoanWithAIAnalysis } from "../actions/analysis";
import {
  Card,
  CardAction,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getRiskScoreColor } from "../utils";

interface AIInsightsProps {
  loanId: string;
  riskScore?: number | null;
  aiRecommendation?: string | null;
  aiNotes?: string | null;
  loanStatus?: string;
}

function RunAIAnalysisButton({
  onClick,
  isBusy,
  hasScore,
  isDisabled = false,
}: {
  onClick: () => void;
  isBusy: boolean;
  hasScore: boolean;
  isDisabled?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={isBusy || isDisabled}
      size="sm"
      variant="outline"
      className="dark text-maui-mist"
    >
      {isBusy ? (
        <>
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <TrendingUp className="mr-2 h-4 w-4" />
          {hasScore ? "Re-analyze" : "Analyze"}
        </>
      )}
    </Button>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-300">Risk Score</span>
          <div className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-metal-spark" />
            <span className="text-lg font-bold text-metal-spark">
              Analyzing...
            </span>
          </div>
        </div>
        <div className="w-full bg-hadopelagic/25 rounded-full h-2">
          <div className="h-2 rounded-full bg-gradient-to-r from-metal-spark/30 to-metal-spark/60 animate-pulse"></div>
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-sm text-slate-300">AI Recommendation</div>
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-metal-spark" />
          <span className="text-lg font-semibold text-metal-spark">
            Processing...
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-sm text-slate-300">Analysis Notes</div>
        <div className="space-y-2">
          <div className="h-3 bg-metal-spark/20 rounded animate-pulse"></div>
          <div className="h-3 bg-metal-spark/20 rounded animate-pulse w-4/5"></div>
          <div className="h-3 bg-metal-spark/20 rounded animate-pulse w-3/5"></div>
        </div>
      </div>
    </div>
  );
}

export function AIInsights({
  loanId,
  riskScore,
  aiRecommendation,
  aiNotes,
  loanStatus,
}: AIInsightsProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState({
    riskScore: riskScore || null,
    aiRecommendation: aiRecommendation || null,
    aiNotes: aiNotes || null,
  });

  const isCancelled = loanStatus === "CANCELLED";

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await updateLoanWithAIAnalysis(loanId);

      if (result.success && result.loan) {
        setAnalysis({
          riskScore: Number(result.loan.riskScore),
          aiRecommendation: result.loan.aiRecommendation,
          aiNotes: result.loan.aiNotes,
        });
      }
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-ashenvale/90 to-sea-fantasy border-hadopelagic/50 text-pale-grey">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="size-8 text-metal-spark" />
          AI Risk Assessment
        </CardTitle>
        <CardAction>
          <RunAIAnalysisButton
            onClick={handleAnalyze}
            isBusy={isAnalyzing}
            hasScore={analysis.riskScore !== null}
            isDisabled={isCancelled}
          />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-metal-spark mb-4">
          {isCancelled
            ? "This loan has been cancelled. AI analysis is not available."
            : isAnalyzing
            ? "AI is analyzing loan data and generating risk assessment..."
            : "AI-powered risk assessment and recommendations"}
        </div>

        {isAnalyzing ? (
          <LoadingSkeleton />
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Risk Score</span>
                <span
                  className={cn(
                    "text-lg font-bold",
                    isCancelled
                      ? "text-gray-500"
                      : getRiskScoreColor(analysis.riskScore)
                  )}
                >
                  {isCancelled
                    ? "N/A"
                    : analysis.riskScore
                    ? `${analysis.riskScore}/100`
                    : "N/A"}
                </span>
              </div>
              {analysis.riskScore && !isCancelled && (
                <div className="w-full bg-hadopelagic/25 rounded-full h-2">
                  <div
                    className={cn(
                      "h-2 rounded-full",
                      getRiskScoreColor(analysis.riskScore, true)
                    )}
                    style={{ width: `${analysis.riskScore}%` }}
                  ></div>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="text-sm text-slate-300">AI Recommendation</div>
              <div className="flex items-center gap-2">
                {isCancelled ? (
                  <>
                    <XCircle className="w-5 h-5 text-rose-300" />
                    <span className="text-lg font-semibold text-stone-100">
                      Cancelled
                    </span>
                  </>
                ) : analysis.riskScore && analysis.riskScore >= 80 ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-lime-300" />
                    <span className="text-lg font-semibold text-lime-300">
                      Approve
                    </span>
                  </>
                ) : analysis.riskScore && analysis.riskScore >= 60 ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-blue-300" />
                    <span className="text-lg font-semibold text-blue-300">
                      Approve with Conditions
                    </span>
                  </>
                ) : analysis.riskScore && analysis.riskScore >= 40 ? (
                  <>
                    <XCircle className="w-5 h-5 text-amber-300" />
                    <span className="text-lg font-semibold text-amber-300">
                      Review Required
                    </span>
                  </>
                ) : analysis.riskScore && analysis.riskScore < 40 ? (
                  <>
                    <XCircle className="w-5 h-5 text-red-300" />
                    <span className="text-lg font-semibold text-red-300">
                      Reject
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-semibold text-stone-100">
                    {analysis.aiRecommendation || "Pending Analysis"}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-slate-300">Analysis Notes</div>
              <p className="text-sm text-sky-100">
                {isCancelled
                  ? "This loan has been cancelled and is no longer eligible for AI analysis."
                  : (analysis.aiNotes || "No analysis available yet")
                      .split("\n")
                      .map((line, idx) => (
                        <span key={idx}>
                          {line}
                          <br />
                        </span>
                      ))}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
