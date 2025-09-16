import { z } from "zod";

export const loanEditSchema = z.object({
  // Loan Details
  loanType: z.enum([
    "PERSONAL",
    "BUSINESS",
    "MORTGAGE",
    "AUTO",
    "STUDENT",
    "OTHER",
  ]),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  interestRate: z
    .number()
    .min(0, "Interest rate must be non-negative")
    .max(100, "Interest rate cannot exceed 100%"),
  termMonths: z
    .number()
    .int()
    .min(1, "Term must be at least 1 month")
    .max(600, "Term cannot exceed 600 months"),
  paymentFrequency: z.enum([
    "WEEKLY",
    "BIWEEKLY",
    "MONTHLY",
    "QUARTERLY",
    "ANNUALLY",
  ]),

  // Additional Information
  purpose: z.string().optional(),
  notes: z.string().optional(),
  collateral: z.string().optional(),
  coSignerName: z.string().optional(),
  coSignerEmail: z
    .string()
    .email("Invalid email format")
    .optional()
    .or(z.literal("")),
  coSignerPhone: z.string().optional(),

  // Status and Dates
  status: z.enum([
    "PENDING",
    "APPROVED",
    "REJECTED",
    "ACTIVE",
    "COMPLETED",
    "DEFAULTED",
    "CANCELLED",
  ]),
  applicationDate: z.date(),
  approvalDate: z.date().optional().nullable(),
  disbursementDate: z.date().optional().nullable(),
  maturityDate: z.date().optional().nullable(),
});

export type LoanEditFormData = z.infer<typeof loanEditSchema>;

// Schema for creating a new loan
export const loanCreateSchema = z.object({
  // Borrower selection
  borrowerId: z.string().min(1, "Please select a borrower"),

  // Loan Details
  loanType: z.enum([
    "PERSONAL",
    "BUSINESS",
    "MORTGAGE",
    "AUTO",
    "STUDENT",
    "OTHER",
  ]),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  interestRate: z
    .number()
    .min(0, "Interest rate must be non-negative")
    .max(100, "Interest rate cannot exceed 100%"),
  termMonths: z
    .number()
    .int()
    .min(1, "Term must be at least 1 month")
    .max(600, "Term cannot exceed 600 months"),
  paymentFrequency: z.enum([
    "WEEKLY",
    "BIWEEKLY",
    "MONTHLY",
    "QUARTERLY",
    "ANNUALLY",
  ]),

  // Additional Information
  purpose: z.string().optional(),
  notes: z.string().optional(),
  collateral: z.string().optional(),
  coSignerName: z.string().optional(),
  coSignerEmail: z
    .string()
    .email("Invalid email format")
    .optional()
    .or(z.literal("")),
  coSignerPhone: z.string().optional(),

  // Status and Dates
  status: z.enum([
    "PENDING",
    "APPROVED",
    "REJECTED",
    "ACTIVE",
    "COMPLETED",
    "DEFAULTED",
    "CANCELLED",
  ]),
  applicationDate: z.date(),
  approvalDate: z.date().optional().nullable(),
  disbursementDate: z.date().optional().nullable(),
  maturityDate: z.date().optional().nullable(),
});

export type LoanCreateFormData = z.infer<typeof loanCreateSchema>;

// Helper function to calculate loan details
export function calculateLoanDetails(
  amount: number,
  interestRate: number,
  termMonths: number,
  paymentFrequency: "WEEKLY" | "BIWEEKLY" | "MONTHLY" | "QUARTERLY" | "ANNUALLY"
) {
  const annualRate = interestRate / 100;
  const monthlyRate = annualRate / 12;

  // Calculate payments per year based on frequency
  const paymentsPerYear = {
    WEEKLY: 52,
    BIWEEKLY: 26,
    MONTHLY: 12,
    QUARTERLY: 4,
    ANNUALLY: 1,
  }[paymentFrequency];

  const totalPayments = (termMonths / 12) * paymentsPerYear;
  const paymentRate = annualRate / paymentsPerYear;

  // Calculate payment amount
  let paymentAmount: number;
  if (paymentRate === 0) {
    // No interest case
    paymentAmount = amount / totalPayments;
  } else {
    paymentAmount =
      (amount * (paymentRate * Math.pow(1 + paymentRate, totalPayments))) /
      (Math.pow(1 + paymentRate, totalPayments) - 1);
  }

  const totalAmount = paymentAmount * totalPayments;
  const totalInterest = totalAmount - amount;

  return {
    monthlyPayment: Math.round(paymentAmount * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
  };
}
