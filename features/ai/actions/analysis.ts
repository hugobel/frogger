"use server";

import prisma from "@/lib/prisma";
import {
  assessLoanRisk,
  generateLoanInsights,
  estimateCreditworthiness,
} from "../services/openai";
import { Loan, User } from "@prisma/client";

type LoanWithBorrower = Omit<
  Loan,
  "amount" | "interestRate" | "monthlyPayment" | "totalInterest" | "totalAmount"
> & {
  amount: number;
  interestRate: number;
  monthlyPayment: number | null;
  totalInterest: number | null;
  totalAmount: number | null;
  borrower: User;
};

export async function analyzeLoanApplication(loanData: LoanWithBorrower) {
  try {
    // Perform AI risk assessment
    const riskAssessment = await assessLoanRisk({
      borrowerName: loanData.borrower.name,
      borrowerEmail: loanData.borrower.email,
      loanType: loanData.loanType,
      amount: loanData.amount,
      interestRate: loanData.interestRate,
      termMonths: loanData.termMonths,
      purpose: loanData.purpose || undefined,
      collateral: loanData.collateral || undefined,
      coSignerName: loanData.coSignerName || undefined,
    });

    // Generate insights
    const insights = await generateLoanInsights({
      borrowerName: loanData.borrower.name,
      borrowerEmail: loanData.borrower.email,
      loanType: loanData.loanType,
      amount: loanData.amount,
      interestRate: loanData.interestRate,
      termMonths: loanData.termMonths,
      purpose: loanData.purpose || undefined,
      collateral: loanData.collateral || undefined,
      coSignerName: loanData.coSignerName || undefined,
    });

    // Estimate creditworthiness
    const creditEstimate = await estimateCreditworthiness(
      loanData.borrower.email
    );

    return {
      success: true,
      analysis: {
        riskScore: riskAssessment.riskScore,
        recommendation: riskAssessment.recommendation,
        factors: riskAssessment.factors,
        notes: riskAssessment.notes,
        insights,
        creditEstimate,
      },
    };
  } catch (error) {
    console.error("AI analysis failed:", error);

    return {
      success: false,
      error: "Failed to analyze loan application",
    };
  }
}

export async function updateLoanWithAIAnalysis(loanId: string) {
  try {
    const loan = await prisma.loan.findUnique({
      where: { id: loanId },
      include: {
        borrower: true,
      },
    });

    if (!loan) {
      return { success: false, error: "Loan not found" };
    }

    const analysis = await analyzeLoanApplication({
      ...loan,
      amount: loan.amount.toNumber(),
      interestRate: loan.interestRate.toNumber() * 100,
      monthlyPayment: loan.monthlyPayment?.toNumber() || null,
      totalInterest: loan.totalInterest?.toNumber() || null,
      totalAmount: loan.totalAmount?.toNumber() || null,
      borrower: loan.borrower,
    });

    if (!analysis.success) {
      return { success: false, error: "Failed to analyze loan application" };
    }

    // Update loan with AI analysis results
    const updatedLoan = await prisma.loan.update({
      where: { id: loanId },
      data: {
        riskScore: analysis.analysis?.riskScore,
        aiRecommendation: analysis.analysis?.recommendation,
        aiNotes: `${analysis.analysis?.insights}\n\n${analysis.analysis?.notes}\n\nCredit Estimate: ${analysis.analysis?.creditEstimate.estimatedScore} (${analysis.analysis?.creditEstimate.confidence}% confidence)`,
      },
    });

    const serializedLoan = {
      ...updatedLoan,
      amount: updatedLoan.amount.toNumber(),
      interestRate: updatedLoan.interestRate.toNumber(),
      monthlyPayment: updatedLoan.monthlyPayment?.toNumber() || null,
      totalInterest: updatedLoan.totalInterest?.toNumber() || null,
      totalAmount: updatedLoan.totalAmount?.toNumber() || null,
    };

    return { success: true, loan: serializedLoan };
  } catch (error) {
    console.error("Failed to update loan with AI analysis:", error);
    return { success: false, error: "Failed to update loan with AI analysis" };
  }
}

export async function generateLoanRecommendations() {
  try {
    // Get all pending loans for AI recommendations
    const pendingLoans = await prisma.loan.findMany({
      where: {
        status: "PENDING",
      },
      orderBy: {
        applicationDate: "desc",
      },
      include: {
        borrower: true,
      },
      take: 10,
    });

    const recommendations = [];

    for (const loan of pendingLoans) {
      const analysis = await analyzeLoanApplication({
        ...loan,
        amount: loan.amount.toNumber(),
        interestRate: loan.interestRate.toNumber() * 100,
        monthlyPayment: loan.monthlyPayment?.toNumber() || null,
        totalInterest: loan.totalInterest?.toNumber() || null,
        totalAmount: loan.totalAmount?.toNumber() || null,
        borrower: loan.borrower,
      });

      if (analysis.success && analysis.analysis) {
        const { riskScore, recommendation } = analysis.analysis;
        recommendations.push({
          loanId: loan.id,
          loanNumber: loan.loanNumber,
          borrowerName: loan.borrower.name,
          amount: loan.amount.toNumber(),
          riskScore,
          recommendation,
          priority:
            riskScore >= 80 ? "HIGH" : riskScore >= 60 ? "MEDIUM" : "LOW",
        });
      }
    }

    return { success: true, recommendations };
  } catch (error) {
    console.error("Failed to generate recommendations:", error);
    return { success: false, error: "Failed to generate recommendations" };
  }
}
