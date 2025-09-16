// AI functionality for loan management
// This is a placeholder implementation that can be enhanced with actual OpenAI API calls

export interface LoanRiskAssessment {
  riskScore: number;
  recommendation: string;
  factors: string[];
  notes: string;
}

export interface LoanAnalysisInput {
  borrowerName: string;
  borrowerEmail: string;
  loanType: string;
  amount: number;
  interestRate: number;
  termMonths: number;
  purpose?: string;
  collateral?: string;
  coSignerName?: string;
}

// Mock AI risk assessment function
export async function assessLoanRisk(
  input: LoanAnalysisInput
): Promise<LoanRiskAssessment> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Basic risk assessment algorithm
  let riskScore = 50; // Base score

  // Loan amount factor
  if (input.amount <= 10000) riskScore += 15;
  else if (input.amount <= 50000) riskScore += 10;
  else if (input.amount <= 100000) riskScore += 5;
  else if (input.amount <= 500000) riskScore -= 5;
  else riskScore -= 15;

  // Interest rate factor
  if (input.interestRate <= 5) riskScore += 20;
  else if (input.interestRate <= 10) riskScore += 10;
  else if (input.interestRate <= 15) riskScore += 0;
  else if (input.interestRate <= 20) riskScore -= 10;
  else riskScore -= 20;

  // Term length factor
  if (input.termMonths <= 12) riskScore += 15;
  else if (input.termMonths <= 36) riskScore += 10;
  else if (input.termMonths <= 60) riskScore += 5;
  else if (input.termMonths <= 120) riskScore += 0;
  else riskScore -= 10;

  // Loan type factor
  const typeRisk = {
    PERSONAL: -5,
    BUSINESS: 10,
    MORTGAGE: 15,
    AUTO: 5,
    STUDENT: 0,
    OTHER: -10,
  };
  riskScore += typeRisk[input.loanType as keyof typeof typeRisk] || 0;

  // Co-signer factor
  if (input.coSignerName) riskScore += 15;

  // Collateral factor
  if (input.collateral) riskScore += 10;

  // Ensure score is between 0 and 100
  riskScore = Math.max(0, Math.min(100, riskScore));

  // Add RNG factor that can modify the risk score by ±3 points
  const rngFactor = Math.floor(Math.random() * 7) - 3; // Range: -3 to +3
  riskScore = Math.max(0, Math.min(100, riskScore + rngFactor));

  const factors = [];

  if (input.amount > 100000) {
    factors.push("High loan amount increases risk");
  }

  if (input.interestRate > 15) {
    factors.push("High interest rate indicates higher risk profile");
  }

  if (input.termMonths > 120) {
    factors.push("Extended loan term increases default risk");
  }

  if (input.coSignerName) {
    factors.push("Co-signer presence reduces risk");
  }

  if (input.collateral) {
    factors.push("Collateral backing reduces risk");
  }

  let recommendation: string;
  let notes: string;

  if (riskScore >= 80) {
    recommendation =
      "APPROVE: The application demonstrates strong financials and low risk";
    notes = `Key factors: 
        - High risk score (${riskScore}/100) indicates excellent creditworthiness.
        - Loan type (${input.loanType}) is considered low risk.
        - ${
          input.coSignerName
            ? "Presence of a co-signer adds additional security."
            : "No co-signer, but other factors compensate."
        }
        - ${
          input.collateral
            ? "Collateral provided further reduces risk."
            : "No collateral, but risk remains low due to other factors."
        }
        - Loan amount and interest rate are within safe thresholds.`;
  } else if (riskScore >= 60) {
    recommendation =
      "APPROVE_WITH_CONDITIONS: The application is generally favorable but has some moderate risk factors.";
    notes = `Key considerations:
        - Risk score (${riskScore}/100) is above average, but not exceptional.
        - ${
          input.amount > 100000
            ? "High loan amount increases risk."
            : "Loan amount is reasonable."
        }
        - ${
          input.interestRate > 15
            ? "Interest rate is above market average."
            : "Interest rate is within normal range."
        }
        - ${
          input.termMonths > 120
            ? "Extended loan term increases exposure."
            : "Loan term is standard."
        }
        - ${
          input.coSignerName
            ? "Co-signer present, which helps mitigate risk."
            : "No co-signer, so stricter conditions may apply."
        }
        - ${
          input.collateral
            ? "Collateral provided, which is positive."
            : "No collateral, consider requiring it for approval."
        }
        \n\nRecommendation: Approve with additional conditions such as stricter documentation, higher collateral, or lower loan amount.`;
  } else if (riskScore >= 40) {
    recommendation =
      "REVIEW_REQUIRED: The application presents notable risk factors that require further manual review.";
    notes = `Key concerns:
        - Risk score (${riskScore}/100) is moderate, indicating potential issues.
        - ${
          input.amount > 100000
            ? "Very high loan amount."
            : "Loan amount is not excessive."
        }
        - ${
          input.interestRate > 15
            ? "High interest rate signals higher risk profile."
            : "Interest rate is acceptable."
        }
        - ${
          input.termMonths > 120
            ? "Very long loan term increases risk."
            : "Loan term is not unusually long."
        }
        - ${
          input.coSignerName
            ? "Co-signer present, which helps."
            : "No co-signer, which increases risk."
        }
        - ${
          input.collateral
            ? "Collateral provided, which is positive."
            : "No collateral, which increases risk."
        }
        \n\nRecommendation: Manual review is required to assess compensating factors or request additional information.`;
  } else {
    recommendation =
      "REJECT: The application does not meet minimum risk requirements.";
    notes = `Key reasons:
        - Low risk score (${riskScore}/100) indicates high likelihood of default or insufficient creditworthiness.
        - ${
          input.amount > 100000
            ? "Excessive loan amount for risk profile."
            : "Loan amount is not the main issue."
        }
        - ${
          input.interestRate > 15
            ? "Very high interest rate is a red flag."
            : "Interest rate is not the main issue."
        }
        - ${
          input.termMonths > 120
            ? "Very long loan term increases risk."
            : "Loan term is not the main issue."
        }
        - ${
          input.coSignerName
            ? "Co-signer present, but not enough to offset risk."
            : "No co-signer, which further increases risk."
        }
        - ${
          input.collateral
            ? "Collateral provided, but risk remains too high."
            : "No collateral, which is a major concern."
        }
        \n\nRecommendation: Reject the application due to high risk and insufficient mitigating factors.`;
  }

  return {
    riskScore,
    recommendation,
    factors,
    notes,
  };
}

// Mock AI loan insights function
export async function generateLoanInsights(
  input: LoanAnalysisInput
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const insights = [];

  // Market analysis
  insights.push(
    `Based on current market conditions, a ${
      input.interestRate
    }% interest rate for a ${input.loanType.toLowerCase()} loan is ${
      input.interestRate > 10 ? "above" : "competitive with"
    } market averages.`
  );

  // Risk factors
  if (input.amount > 50000) {
    insights.push(
      `The loan amount of $${input.amount.toLocaleString()} places this in the high-value category, requiring enhanced due diligence.`
    );
  }

  // Term analysis
  if (input.termMonths > 60) {
    insights.push(
      `The ${input.termMonths}-month term provides lower monthly payments but increases total interest paid over the loan lifetime.`
    );
  }

  // Purpose analysis
  if (input.purpose) {
    insights.push(
      `The stated purpose "${
        input.purpose
      }" aligns with typical use cases for ${input.loanType.toLowerCase()} loans.`
    );
  }

  return insights.join(" ");
}

// Mock credit score estimation (in a real app, this would integrate with credit bureaus)
export async function estimateCreditworthiness(borrowerEmail: string): Promise<{
  estimatedScore: number;
  confidence: number;
  factors: string[];
}> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Mock estimation based on email domain (for demo purposes)
  const domain = borrowerEmail.split("@")[1] || "";
  let estimatedScore = 650; // Base score

  if (domain.includes("gmail") || domain.includes("yahoo"))
    estimatedScore += 20;
  if (domain.includes("company") || domain.includes("corp"))
    estimatedScore += 30;
  if (domain.includes("edu")) estimatedScore += 40;

  // Add some randomness for demo
  estimatedScore += Math.floor(Math.random() * 100) - 50;
  estimatedScore = Math.max(300, Math.min(850, estimatedScore));

  const confidence = Math.floor(Math.random() * 30) + 60; // 60-90% confidence

  const factors = [
    "Email domain analysis",
    "Historical payment patterns (limited data)",
    "Account age estimation",
    "Digital footprint assessment",
  ];

  return {
    estimatedScore,
    confidence,
    factors,
  };
}
