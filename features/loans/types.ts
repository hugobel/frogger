import { Loan, User } from "@prisma/client";

export type LoanWithBorrower = Loan & {
  amount: number;
  interestRate: number;
  monthlyPayment: number | null;
  totalInterest: number | null;
  totalAmount: number | null;
  borrower: User;
};
